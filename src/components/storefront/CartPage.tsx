"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartIcon } from "@/components/admin/AdminIcons";
import { useStorefront } from "./StorefrontProvider";

export function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    cartSubtotal,
    shippingFee,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
  } = useStorefront();

  if (!cartItems.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <CartIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-[30px] font-black tracking-[-0.05em] text-slate-900">
          장바구니가 비어 있습니다
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-slate-500">
          상품을 담아두면 이곳에서 수량과 금액을 한 번에 확인할 수 있습니다.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-[14px] bg-slate-900 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-slate-800"
        >
          상품 둘러보기
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    const nextOrder = checkout();

    if (!nextOrder) {
      return;
    }

    router.push(`/orders?latest=${nextOrder.id}`);
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#2f6eff]">
          Cart
        </p>
        <h1 className="mt-2 text-[36px] font-black tracking-[-0.05em] text-slate-900">
          장바구니
        </h1>
        <p className="mt-3 text-[15px] text-slate-500">
          담아둔 상품을 확인하고 주문을 진행하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={item.productId}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="h-28 w-full overflow-hidden rounded-[18px] bg-slate-100 sm:w-28">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] text-slate-400">{item.partnerName}</p>
                      <h2 className="mt-1 text-[20px] font-bold text-slate-900">
                        {item.name}
                      </h2>
                      <p className="mt-2 text-[13px] text-slate-500">
                        상품코드 {item.sku}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="text-[14px] font-semibold text-rose-500 transition hover:text-rose-600"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - item.minOrderQty,
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-slate-200 text-[20px] text-slate-600 transition hover:bg-slate-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={item.minOrderQty}
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(
                            item.productId,
                            Number(event.target.value) || item.minOrderQty,
                          )
                        }
                        className="h-10 w-24 rounded-[12px] border border-slate-200 bg-slate-50 px-3 text-center text-[14px] font-semibold text-slate-900 outline-none transition focus:border-[#2f6eff] focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + item.minOrderQty,
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-slate-200 text-[20px] text-slate-600 transition hover:bg-slate-50"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[13px] text-slate-400">
                        {item.price.toLocaleString()}원 x {item.quantity}
                      </p>
                      <p className="mt-1 text-[24px] font-black tracking-[-0.05em] text-[#2457d6]">
                        {(item.price * item.quantity).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={clearCart}
            className="inline-flex rounded-[12px] border border-rose-200 bg-rose-50 px-4 py-3 text-[14px] font-semibold text-rose-600 transition hover:bg-rose-100"
          >
            장바구니 비우기
          </button>
        </div>

        <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#2f6eff]">
            Summary
          </p>
          <h2 className="mt-2 text-[28px] font-black tracking-[-0.05em] text-slate-900">
            주문 요약
          </h2>

          <div className="mt-6 space-y-4 text-[15px] text-slate-600">
            <div className="flex items-center justify-between">
              <span>상품 금액</span>
              <span className="font-semibold text-slate-900">
                {cartSubtotal.toLocaleString()}원
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>배송비</span>
              <span className="font-semibold text-slate-900">
                {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
              </span>
            </div>
          </div>

          {shippingFee > 0 ? (
            <p className="mt-4 rounded-[16px] bg-[#f5f9ff] px-4 py-3 text-[13px] leading-6 text-slate-500">
              {(500000 - cartSubtotal).toLocaleString()}원 더 구매하시면 무료배송이 적용됩니다.
            </p>
          ) : null}

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="text-[16px] font-semibold text-slate-900">
              총 결제 금액
            </span>
            <span className="text-[30px] font-black tracking-[-0.06em] text-[#2457d6]">
              {cartTotal.toLocaleString()}원
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={handleCheckout}
              className="inline-flex items-center justify-center rounded-[14px] bg-slate-900 px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-slate-800"
            >
              주문하기
            </button>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-[14px] border border-slate-200 px-4 py-3 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              계속 쇼핑하기
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
