import { Suspense } from "react";
import { ProductsCatalogPage } from "@/components/storefront/ProductsCatalogPage";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export default function ProductsPage() {
  return (
    <StorefrontShell>
      <Suspense
        fallback={
          <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            상품 목록을 불러오는 중입니다.
          </div>
        }
      >
        <ProductsCatalogPage />
      </Suspense>
    </StorefrontShell>
  );
}
