"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useMemo, useState } from "react";
import {
  CartIcon,
  MessageIcon,
  PackageIcon,
  RepeatIcon,
  TruckIcon,
} from "@/components/admin/AdminIcons";
import { StorefrontProductCard } from "./StorefrontProductCard";
import { useStorefront } from "./StorefrontProvider";
import {
  findStorefrontProduct,
  getRelatedProducts,
  getStorefrontQuestions,
  getStorefrontReviews,
} from "./storefront-data";

type ProductDetailPageProps = {
  productId: string;
};

const tabItems = [
  { id: "description", label: "상품 상세" },
  { id: "shipping", label: "배송 안내" },
  { id: "reviews", label: "리뷰" },
  { id: "qna", label: "Q&A" },
] as const;

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useStorefront();
  const product = findStorefrontProduct(productId);
  const reviews = getStorefrontReviews(productId);
  const relatedProducts = getRelatedProducts(productId);
  const [activeTab, setActiveTab] =
    useState<(typeof tabItems)[number]["id"]>("description");
  const [quantity, setQuantity] = useState(product?.minOrderQty ?? 1);
  const [questionDraft, setQuestionDraft] = useState("");
  const [questionList, setQuestionList] = useState(getStorefrontQuestions(productId));

  const currentPrice = useMemo(() => {
    if (!product) {
      return 0;
    }

    if (!product.tierPricing?.length) {
      return product.price;
    }

    const matchingTier = [...product.tierPricing]
      .reverse()
      .find((tier) => quantity >= tier.quantity);

    return matchingTier?.price ?? product.price;
  }, [product, quantity]);

  if (!product) {
    return null;
  }

  const totalPrice = currentPrice * quantity;
  const savings = product.price * quantity - totalPrice;

  const syncQuantity = (nextValue: number) => {
    setQuantity(Math.max(product.minOrderQty, nextValue));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        name: product.name,
        image: product.image,
        sku: product.sku,
        unit: product.unit,
        minOrderQty: product.minOrderQty,
        partnerName: product.partnerName,
        price: currentPrice,
      },
      quantity,
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();

    startTransition(() => {
      router.push("/cart");
    });
  };

  const handleQuestionSubmit = () => {
    const trimmedQuestion = questionDraft.trim();

    if (!trimmedQuestion) {
      return;
    }

    setQuestionList((previousQuestions) => [
      {
        id: `local-${Date.now()}`,
        productId,
        author: "방문기업",
        question: trimmedQuestion,
        answer: null,
        date: new Date().toISOString().slice(0, 10),
        answered: false,
      },
      ...previousQuestions,
    ]);
    setQuestionDraft("");
    setActiveTab("qna");
  };

  return (
    <div>
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
        <Link href="/" className="transition hover:text-[#2457d6]">
          홈
        </Link>
        <span>/</span>
        <Link href="/products" className="transition hover:text-[#2457d6]">
          상품
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-900">{product.name}</span>
      </nav>

      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2457d6]"
      >
        ← 상품 목록으로
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="aspect-square overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#2f6eff] px-3 py-1 text-[12px] font-semibold text-white">
              {product.category}
            </span>
            <span className="text-[13px] text-slate-500">{product.partnerName}</span>
          </div>

          <h1 className="mt-4 text-[34px] font-black tracking-[-0.05em] text-slate-900">
            {product.name}
          </h1>

          <p className="mt-4 text-[15px] leading-8 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 rounded-[24px] border border-[#d8e4ff] bg-[#f5f9ff] p-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#2f6eff]">
              Price
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-[40px] font-black tracking-[-0.06em] text-[#2457d6]">
                {currentPrice.toLocaleString()}원
              </span>
              <span className="pb-2 text-[14px] text-slate-400">/{product.unit}</span>
            </div>
            {savings > 0 ? (
              <p className="mt-2 text-[14px] font-semibold text-emerald-600">
                현재 수량 기준 총 {savings.toLocaleString()}원 절약
              </p>
            ) : null}
          </div>

          <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[13px] font-semibold text-slate-500">
                  주문 수량
                </p>
                <p className="mt-1 text-[14px] text-slate-500">
                  최소 {product.minOrderQty}
                  {product.unit}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => syncQuantity(quantity - product.minOrderQty)}
                  className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-slate-200 text-[20px] text-slate-600 transition hover:bg-slate-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(event) =>
                    syncQuantity(Number(event.target.value) || product.minOrderQty)
                  }
                  min={product.minOrderQty}
                  className="h-11 w-28 rounded-[12px] border border-slate-200 bg-slate-50 px-3 text-center text-[15px] font-semibold text-slate-900 outline-none transition focus:border-[#2f6eff] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => syncQuantity(quantity + product.minOrderQty)}
                  className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-slate-200 text-[20px] text-slate-600 transition hover:bg-slate-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-[18px] bg-slate-50 px-4 py-4">
              <span className="text-[15px] font-medium text-slate-600">총 주문 금액</span>
              <span className="text-[28px] font-black tracking-[-0.05em] text-slate-900">
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-slate-200 px-4 py-3 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <CartIcon className="h-4 w-4" />
                장바구니 담기
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center rounded-[14px] bg-slate-900 px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-slate-800"
              >
                바로 구매
              </button>
            </div>

            <div className="mt-5 grid gap-3 text-[14px] text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span>상품코드</span>
                <span className="font-semibold text-slate-900">{product.sku}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span>재고 상태</span>
                <span className="font-semibold text-slate-900">{product.stock}개 이상</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span>리뷰</span>
                <span className="font-semibold text-slate-900">
                  ★ {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>배송비</span>
                <span className="font-semibold text-slate-900">
                  50만원 이상 무료배송
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.tierPricing?.length ? (
        <section className="mt-10 rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-[24px] font-black tracking-[-0.04em] text-slate-900">
            대량 구매 할인 구간
          </h2>
          <p className="mt-2 text-[14px] text-slate-500">
            주문 수량이 많아질수록 단가가 낮아집니다.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {product.tierPricing.map((tier) => (
              <div
                key={tier.quantity}
                className={`rounded-[20px] border-2 p-5 ${
                  quantity >= tier.quantity
                    ? "border-[#2f6eff] bg-[#f5f9ff]"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-[13px] font-semibold text-slate-500">
                  {tier.quantity}
                  {product.unit} 이상
                </p>
                <p className="mt-2 text-[28px] font-black tracking-[-0.05em] text-[#2457d6]">
                  {tier.price.toLocaleString()}원
                </p>
                {quantity >= tier.quantity ? (
                  <span className="mt-3 inline-flex rounded-full bg-[#2f6eff] px-3 py-1 text-[12px] font-semibold text-white">
                    현재 적용 구간
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10 rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-5">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "description" ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-[20px] bg-slate-50 p-5">
              <PackageIcon className="h-6 w-6 text-[#2457d6]" />
              <h3 className="mt-4 text-[18px] font-bold text-slate-900">상품 상세</h3>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">
                {product.description}
              </p>
            </article>
            <article className="rounded-[20px] bg-slate-50 p-5">
              <TruckIcon className="h-6 w-6 text-[#2457d6]" />
              <h3 className="mt-4 text-[18px] font-bold text-slate-900">납기 일정</h3>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">
                주문 후 평균 1~2영업일 내 출고됩니다. 대량 물량은 별도 협의를 통해 일정 조정이 가능합니다.
              </p>
            </article>
            <article className="rounded-[20px] bg-slate-50 p-5">
              <RepeatIcon className="h-6 w-6 text-[#2457d6]" />
              <h3 className="mt-4 text-[18px] font-bold text-slate-900">반품 정책</h3>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">
                제품 수령 후 7일 이내 반품 접수가 가능하며, 기업 단위 정기 발주 계약은 별도 운영 정책이 적용됩니다.
              </p>
            </article>
          </div>
        ) : null}

        {activeTab === "shipping" ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-[20px] border border-slate-200 p-5">
              <TruckIcon className="h-6 w-6 text-[#2457d6]" />
              <h3 className="mt-4 text-[18px] font-bold text-slate-900">배송 안내</h3>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">
                전국 물류 네트워크를 통해 빠르게 배송되며, 도서산간 지역은 추가 일정이 발생할 수 있습니다.
              </p>
            </article>
            <article className="rounded-[20px] border border-slate-200 p-5">
              <PackageIcon className="h-6 w-6 text-[#2457d6]" />
              <h3 className="mt-4 text-[18px] font-bold text-slate-900">포장 방식</h3>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">
                대량 출고 기준의 안전 포장으로 발송되며, 행사 스티커나 납품 라벨 추가는 별도 요청 시 반영 가능합니다.
              </p>
            </article>
            <article className="rounded-[20px] border border-slate-200 p-5">
              <RepeatIcon className="h-6 w-6 text-[#2457d6]" />
              <h3 className="mt-4 text-[18px] font-bold text-slate-900">교환 및 반품</h3>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">
                파손 또는 오배송 상품은 확인 즉시 재출고를 진행하며, 단순 변심 반품은 상품 상태 기준으로 처리됩니다.
              </p>
            </article>
          </div>
        ) : null}

        {activeTab === "reviews" ? (
          <div className="mt-6 space-y-4">
            {reviews.length ? (
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-[20px] border border-slate-200 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">
                        {review.author}
                      </p>
                      <p className="text-[13px] text-slate-400">{review.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-semibold text-slate-900">
                        {"★".repeat(review.rating)}
                        <span className="ml-2 text-slate-400">
                          {review.rating.toFixed(1)}
                        </span>
                      </p>
                      <p className="text-[13px] text-slate-400">{review.date}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] leading-7 text-slate-500">
                    {review.content}
                  </p>
                  <p className="mt-3 text-[13px] text-slate-400">
                    도움이 됐어요 {review.helpful}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-[20px] bg-slate-50 px-6 py-12 text-center">
                <p className="text-[18px] font-bold text-slate-900">
                  아직 등록된 리뷰가 없습니다
                </p>
                <p className="mt-2 text-[14px] text-slate-500">
                  첫 구매 후기를 남겨보세요.
                </p>
              </div>
            )}
          </div>
        ) : null}

        {activeTab === "qna" ? (
          <div className="mt-6">
            <div className="rounded-[20px] border border-[#d8e4ff] bg-[#f5f9ff] p-5">
              <div className="flex items-center gap-2 text-[15px] font-bold text-slate-900">
                <MessageIcon className="h-4 w-4 text-[#2457d6]" />
                상품 문의 남기기
              </div>
              <textarea
                value={questionDraft}
                onChange={(event) => setQuestionDraft(event.target.value)}
                placeholder="납기, 포장, 커스터마이징 등 궁금한 내용을 남겨주세요."
                className="mt-4 h-28 w-full rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-[14px] outline-none transition focus:border-[#2f6eff]"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleQuestionSubmit}
                  className="inline-flex rounded-[12px] bg-slate-900 px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-slate-800"
                >
                  문의 등록
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {questionList.map((question) => (
                <article
                  key={question.id}
                  className="rounded-[20px] border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dce7ff] text-[13px] font-bold text-[#2457d6]">
                      Q
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[15px] font-bold text-slate-900">
                            {question.question}
                          </p>
                          <p className="mt-1 text-[13px] text-slate-400">
                            {question.author}
                          </p>
                        </div>
                        <p className="text-[13px] text-slate-400">{question.date}</p>
                      </div>

                      {question.answered && question.answer ? (
                        <div className="mt-4 rounded-[18px] bg-slate-50 p-4">
                          <p className="text-[13px] font-semibold text-[#2457d6]">
                            판매자 답변
                          </p>
                          <p className="mt-2 text-[14px] leading-7 text-slate-500">
                            {question.answer}
                          </p>
                        </div>
                      ) : (
                        <p className="mt-4 text-[14px] font-medium text-slate-400">
                          답변 대기 중입니다.
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {relatedProducts.length ? (
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#2f6eff]">
              Related Products
            </p>
            <h2 className="mt-2 text-[30px] font-black tracking-[-0.05em] text-slate-900">
              함께 보기 좋은 상품
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <StorefrontProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
