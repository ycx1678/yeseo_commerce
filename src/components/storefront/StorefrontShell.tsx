"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartIcon, PackageIcon } from "@/components/admin/AdminIcons";
import { useStorefront } from "./StorefrontProvider";
import { storefrontCategories } from "./storefront-data";

type StorefrontShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "홈" },
  { href: "/products", label: "상품" },
  { href: "/cart", label: "장바구니" },
  { href: "/orders", label: "주문내역" },
];

export function StorefrontShell({ children }: StorefrontShellProps) {
  const pathname = usePathname();
  const { cartCount } = useStorefront();

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="bg-[#2457d6] px-4 py-2 text-[12px] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span>예서커머스 B2B 쇼핑몰 | 기업 구매 전용 상품관</span>
          <div className="flex items-center gap-4">
            <Link href="/partner-admin" className="font-semibold text-yellow-200">
              협력사 센터
            </Link>
            <Link href="/super-admin" className="font-semibold text-cyan-200">
              최고관리자
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2f6eff] text-[20px] font-black text-white">
              예
            </div>
            <div>
              <p className="text-[22px] font-black tracking-[-0.04em] text-[#2457d6]">
                예서커머스
              </p>
              <p className="text-[11px] text-slate-400">B2B 전문 도매몰</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-[14px] font-medium text-slate-600 lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${
                    isActive ? "text-[#2457d6]" : "hover:text-[#2457d6]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-[12px] border border-slate-200 px-4 py-2 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <CartIcon className="h-4 w-4" />
              장바구니
              {cartCount > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex min-w-[22px] items-center justify-center rounded-full bg-[#2f6eff] px-1.5 py-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <Link
              href="/partner-admin"
              className="inline-flex rounded-[12px] bg-slate-900 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-slate-800"
            >
              관리자 센터
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

      <footer className="mt-16 bg-slate-950 text-slate-400">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#2f6eff] text-[18px] font-black text-white">
                예
              </div>
              <span className="text-[22px] font-black tracking-[-0.04em] text-white">
                예서커머스
              </span>
            </div>
            <p className="mt-5 max-w-xl text-[14px] leading-7 text-slate-400">
              사업자 전용 B2B 도매 쇼핑몰입니다. 검증된 협력사 상품을 빠르게 비교하고,
              대량 구매와 정기 발주를 한 번에 관리할 수 있습니다.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[14px] text-slate-500">
              <PackageIcon className="h-4 w-4" />
              고객센터 1588-0000 | 평일 09:00 - 18:00
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">쇼핑 가이드</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <Link href="/products" className="transition hover:text-white">
                  전체 상품 보기
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition hover:text-white">
                  장바구니
                </Link>
              </li>
              <li>
                <Link href="/orders" className="transition hover:text-white">
                  주문내역
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">카테고리</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {storefrontCategories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="transition hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 px-4 py-6 text-center text-[13px] text-slate-500">
          © 2026 예서커머스. 사업자등록번호 123-45-67890 | 통신판매업신고
          2026-서울강남-0000
        </div>
      </footer>
    </div>
  );
}
