import {
  storefrontCategories,
  storefrontFeaturedIds,
  storefrontProducts,
} from "@/components/storefront/storefront-data";

export type MainCategory = {
  id: string;
  name: string;
  icon: string;
};

export type MainProduct = {
  id: string;
  name: string;
  partnerName: string;
  category: string;
  price: number;
  unit: string;
  minOrderQty: number;
  rating: number;
  reviewCount: number;
  image: string;
  categoryId: string;
};

export const mainCategories: MainCategory[] = storefrontCategories;

export const featuredProducts: MainProduct[] = storefrontFeaturedIds
  .map((featuredId) =>
    storefrontProducts.find((product) => product.id === featuredId),
  )
  .filter((product): product is (typeof storefrontProducts)[number] => Boolean(product))
  .map((product) => ({
    id: product.id,
    name: product.name,
    partnerName: product.partnerName,
    category: product.category,
    price: product.price,
    unit: product.unit,
    minOrderQty: product.minOrderQty,
    rating: product.rating,
    reviewCount: product.reviewCount,
    image: product.image,
    categoryId: product.categoryId,
  }));

export const heroProducts = featuredProducts;

export const mainStats = [
  { value: "5,000+", label: "등록 상품", icon: "📦" },
  { value: "3,200+", label: "파트너 기업", icon: "🏢" },
  { value: "98%", label: "고객 만족도", icon: "📈" },
  { value: "50,000+", label: "월간 거래", icon: "🛒" },
] as const;

export const mainFeatures = [
  {
    title: "대량 구매 할인",
    description:
      "수량에 따라 최대 20% 차등 할인. 정기구독 회원은 추가 5% 혜택.",
    icon: "📊",
    tone: "bg-blue-50 text-blue-600",
  },
  {
    title: "1-2일 빠른 배송",
    description:
      "전국 물류센터를 통한 신속 배송. 50만원 이상 무료배송.",
    icon: "🚚",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "검증된 협력사",
    description:
      "엄격한 심사를 통과한 공인 협력사의 품질 보증 상품.",
    icon: "🛡️",
    tone: "bg-violet-50 text-violet-600",
  },
  {
    title: "정기구독 서비스",
    description:
      "자동 재주문과 추가 할인 혜택으로 안정적인 운영을 지원.",
    icon: "🔁",
    tone: "bg-orange-50 text-orange-600",
  },
] as const;
