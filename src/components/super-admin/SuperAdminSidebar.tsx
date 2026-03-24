"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getSuperAdminFlatNav,
  isSuperAdminPathActive,
  superAdminNavItems,
} from "./super-admin-nav";

export function SuperAdminSidebar() {
  const pathname = usePathname();
  const flatNav = getSuperAdminFlatNav();

  return (
    <aside className="flex w-[296px] shrink-0 flex-col bg-[#0f2744] px-6 pb-8 pt-8 text-white">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-sky-200/70">
          Yeseo Commerce
        </p>
        <h1 className="mt-3 text-[26px] font-black tracking-[-0.05em] text-white">
          최고관리자
        </h1>
        <p className="mt-3 text-[13px] leading-6 text-slate-300">
          전체 플랫폼 운영 현황과 파트너, 상품, 주문, 정산을 한 곳에서 관리합니다.
        </p>
      </div>

      <nav className="mt-10 flex-1 space-y-2 overflow-y-auto pr-1">
        {superAdminNavItems.map((item) => {
          if ("href" in item) {
            const Icon = item.icon;
            const isActive = isSuperAdminPathActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-[14px] px-4 py-3 transition ${
                  isActive
                    ? "bg-white text-[#0f2744] shadow-[0_12px_30px_rgba(15,39,68,0.25)]"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[14px] font-semibold tracking-[-0.02em]">
                  {item.label}
                </span>
              </Link>
            );
          }

          const hasActiveChild = item.children.some((child) =>
            isSuperAdminPathActive(pathname, child.href),
          );

          return (
            <div
              key={item.label}
              className={`rounded-[18px] border px-3 py-3 ${
                hasActiveChild
                  ? "border-white/15 bg-white/10"
                  : "border-transparent bg-[#17324f]"
              }`}
            >
              <p className="px-2 text-[12px] font-semibold tracking-[-0.01em] text-sky-100/70">
                {item.label}
              </p>
              <div className="mt-2 space-y-1">
                {item.children.map((child) => {
                  const Icon = child.icon;
                  const isActive = isSuperAdminPathActive(pathname, child.href);

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition ${
                        isActive
                          ? "bg-white text-[#0f2744]"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      <span className="text-[14px] font-medium">
                        {child.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="mt-6 rounded-[18px] border border-white/10 bg-[#17324f] p-4">
        <p className="text-[12px] font-medium text-sky-100/70">접속 계정</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-400/20 text-[15px] font-bold text-sky-200">
            SA
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white">Super Admin</p>
            <p className="text-[12px] text-slate-300">platform@yeseo.co.kr</p>
          </div>
        </div>
        <div className="mt-4 rounded-[14px] bg-white/5 px-3 py-2 text-[12px] text-slate-300">
          관리 가능한 메뉴 {flatNav.length}개
        </div>
      </div>
    </aside>
  );
}
