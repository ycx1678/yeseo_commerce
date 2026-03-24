"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLineItem = {
  productId: string;
  name: string;
  image: string;
  sku: string;
  unit: string;
  minOrderQty: number;
  partnerName: string;
  price: number;
  quantity: number;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  items: CartLineItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  itemCount: number;
};

type ProductSnapshot = Omit<CartLineItem, "quantity">;

type StorefrontContextValue = {
  cartItems: CartLineItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;
  orders: OrderRecord[];
  addToCart: (product: ProductSnapshot, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => OrderRecord | null;
};

const CART_STORAGE_KEY = "yeseo-storefront-cart";
const ORDER_STORAGE_KEY = "yeseo-storefront-orders";

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

type StorefrontProviderProps = {
  children: ReactNode;
};

function readStorageValue<T>(storageKey: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function StorefrontProvider({ children }: StorefrontProviderProps) {
  const [cartItems, setCartItems] = useState<CartLineItem[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    setCartItems(readStorageValue<CartLineItem[]>(CART_STORAGE_KEY, []));
    setOrders(readStorageValue<OrderRecord[]>(ORDER_STORAGE_KEY, []));
    setHasLoadedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders, hasLoadedStorage]);

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (totalPrice, item) => totalPrice + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );
  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );
  const shippingFee = cartSubtotal >= 500000 || cartSubtotal === 0 ? 0 : 30000;
  const cartTotal = cartSubtotal + shippingFee;

  const addToCart = (product: ProductSnapshot, quantity: number) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.productId === product.productId,
      );

      if (!existingItem) {
        return [...previousItems, { ...product, quantity }];
      }

      return previousItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + quantity, price: product.price }
          : item,
      );
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(item.minOrderQty, quantity),
            }
          : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.productId !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    if (!cartItems.length) {
      return null;
    }

    const now = new Date();
    const newOrder: OrderRecord = {
      id: `YS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
        now.getDate(),
      ).padStart(2, "0")}-${now.getTime().toString().slice(-5)}`,
      createdAt: now.toISOString(),
      items: cartItems,
      subtotal: cartSubtotal,
      shippingFee,
      total: cartTotal,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    };

    setOrders((previousOrders) => [newOrder, ...previousOrders]);
    setCartItems([]);

    return newOrder;
  };

  const value = useMemo<StorefrontContextValue>(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      shippingFee,
      cartTotal,
      orders,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      checkout,
    }),
    [cartItems, cartCount, cartSubtotal, shippingFee, cartTotal, orders],
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }

  return context;
}
