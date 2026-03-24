"use client";

import { usePathname } from "next/navigation";
import { getAdminPageLabel } from "./admin-nav";

export function PartnerAdminHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between pb-6">
      <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-slate-950">
        {getAdminPageLabel(pathname)}
      </h2>
      <p className="text-[15px] font-medium text-slate-500">관리자님</p>
    </header>
  );
}
