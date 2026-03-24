"use client";

import { BellIcon, SearchIcon } from "@/components/admin/AdminIcons";
import { usePathname } from "next/navigation";
import { getSuperAdminPageMeta } from "./super-admin-nav";

export function SuperAdminHeader() {
  const pathname = usePathname();
  const pageMeta = getSuperAdminPageMeta(pathname);

  return (
    <header className="mb-6 flex items-start justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
          {pageMeta.breadcrumbs.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-slate-300">/</span> : null}
              <span>{item}</span>
            </span>
          ))}
        </div>
        <h2 className="mt-2 text-[30px] font-black tracking-[-0.05em] text-slate-950">
          {pageMeta.title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative hidden w-[320px] lg:block">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="협력사, 상품, 주문, 회원 검색"
            className="h-12 w-full rounded-[14px] border border-[#dbe3ef] bg-white pl-12 pr-4 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#9cb8ff] focus:ring-4 focus:ring-[#dbe7ff]"
          />
        </label>

        <button
          type="button"
          className="relative flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#dbe3ef] bg-white text-slate-500 transition hover:border-[#bfd0f4] hover:text-slate-700"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-3 rounded-[16px] border border-[#dbe3ef] bg-white px-4 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f2744] text-[14px] font-bold text-white">
            SA
          </div>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">최고관리자</p>
            <p className="text-[12px] text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
