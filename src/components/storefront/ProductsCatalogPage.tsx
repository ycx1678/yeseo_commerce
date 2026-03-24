"use client";

import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/admin/AdminIcons";
import { StorefrontProductCard } from "./StorefrontProductCard";
import {
  storefrontCategoryTabs,
  storefrontProducts,
} from "./storefront-data";

export function ProductsCatalogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "all",
  );
  const [sortBy, setSortBy] = useState("popular");
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return storefrontProducts
      .filter((product) => {
        const normalizedQuery = deferredQuery.trim().toLowerCase();
        const matchesSearch =
          normalizedQuery.length === 0 ||
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.partnerName.toLowerCase().includes(normalizedQuery);
        const matchesCategory =
          selectedCategory === "all" || product.categoryId === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((left, right) => {
        switch (sortBy) {
          case "price-asc":
            return left.price - right.price;
          case "price-desc":
            return right.price - left.price;
          case "name":
            return left.name.localeCompare(right.name);
          default:
            return right.reviewCount - left.reviewCount;
        }
      });
  }, [deferredQuery, selectedCategory, sortBy]);

  const currentCategoryName =
    storefrontCategoryTabs.find((category) => category.id === selectedCategory)
      ?.name ?? "전체";

  const updateCategory = (nextCategory: string) => {
    setSelectedCategory(nextCategory);

    const nextParams = new URLSearchParams(searchParams.toString());

    if (nextCategory === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", nextCategory);
    }

    const nextQueryString = nextParams.toString();

    startTransition(() => {
      router.replace(
        nextQueryString ? `${pathname}?${nextQueryString}` : pathname,
        { scroll: false },
      );
    });
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#2f6eff]">
          Product Catalog
        </p>
        <h1 className="mt-2 text-[36px] font-black tracking-[-0.05em] text-slate-900">
          {selectedCategory === "all" ? "전체 상품" : currentCategoryName}
        </h1>
        <p className="mt-3 text-[15px] text-slate-500">
          사업자 전용 도매 상품을 검색하고, 카테고리별로 빠르게 비교해보세요.
        </p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {storefrontCategoryTabs.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => updateCategory(category.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition ${
              selectedCategory === category.id
                ? "border-[#2f6eff] bg-[#2f6eff] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#b8ccff] hover:text-[#2457d6]"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="상품명, 설명, 협력사를 검색해보세요."
              className="h-12 w-full rounded-[14px] border border-slate-200 bg-slate-50 pl-12 pr-4 text-[14px] outline-none transition focus:border-[#2f6eff] focus:bg-white"
            />
          </label>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-12 rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[14px] text-slate-700 outline-none transition focus:border-[#2f6eff] focus:bg-white"
          >
            <option value="popular">인기순</option>
            <option value="name">이름순</option>
            <option value="price-asc">가격 낮은순</option>
            <option value="price-desc">가격 높은순</option>
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <p className="text-[14px] text-slate-500">
            총 <span className="font-bold text-slate-900">{filteredProducts.length}</span>
            개 상품
          </p>
          <Link
            href="/cart"
            className="text-[14px] font-semibold text-[#2457d6] transition hover:text-[#1d4fcc]"
          >
            장바구니 확인하기
          </Link>
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <StorefrontProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="text-[18px] font-bold text-slate-900">
            검색 결과가 없습니다
          </p>
          <p className="mt-3 text-[14px] leading-7 text-slate-500">
            다른 검색어를 입력하거나 카테고리를 전체로 변경해보세요.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              updateCategory("all");
            }}
            className="mt-5 inline-flex rounded-[12px] bg-slate-900 px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-slate-800"
          >
            전체 상품 보기
          </button>
        </div>
      )}
    </div>
  );
}
