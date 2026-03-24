import Link from "next/link";
import type { StorefrontProduct } from "./storefront-data";

type StorefrontProductCardProps = {
  product: StorefrontProduct;
};

export function StorefrontProductCard({
  product,
}: StorefrontProductCardProps) {
  const discountRate =
    product.tierPricing && product.tierPricing.length > 1
      ? Math.round(
          (1 -
            product.tierPricing[product.tierPricing.length - 1].price /
              product.price) *
            100,
        )
      : 0;

  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-[#2f6eff] px-3 py-1 text-[12px] font-semibold text-white">
          {product.category}
        </div>
        {discountRate > 0 ? (
          <div className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-[12px] font-semibold text-white">
            최대 {discountRate}% 할인
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <p className="text-[12px] text-slate-400">{product.partnerName}</p>
        <h3 className="mt-2 min-h-[48px] text-[18px] font-bold leading-6 tracking-[-0.03em] text-slate-900">
          {product.name}
        </h3>
        <p className="mt-3 text-[13px] text-slate-500">
          ★ {product.rating.toFixed(1)} ({product.reviewCount})
        </p>
        <div className="mt-4 flex items-end gap-1">
          <span className="text-[28px] font-black tracking-[-0.05em] text-[#2f6eff]">
            {product.price.toLocaleString()}원
          </span>
          <span className="pb-1 text-[13px] text-slate-400">/{product.unit}</span>
        </div>
        <p className="mt-2 text-[13px] text-slate-500">
          최소 {product.minOrderQty}
          {product.unit}
        </p>
        <div className="mt-5">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex w-full items-center justify-center rounded-[12px] bg-slate-900 px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-slate-800"
          >
            상세보기
          </Link>
        </div>
      </div>
    </article>
  );
}
