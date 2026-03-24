"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./admin-nav";

export function PartnerAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[318px] shrink-0 flex-col bg-[#f7f8fc] px-8 pb-10 pt-10">
      <div>
        <h1 className="text-[22px] font-extrabold tracking-[-0.03em] text-[#2f6eff]">
          예서커머스
        </h1>

        <div className="mt-9">
          <p className="text-[12px] font-medium text-slate-400">협력사</p>
          <p className="mt-2 text-[16px] font-semibold tracking-[-0.02em] text-slate-800">
            샘플 협력사
          </p>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-2.5">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/partner-admin"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-[44px] w-[172px] items-center gap-3 rounded-[12px] px-4 text-left transition ${
                isActive
                  ? "bg-[#eaf2ff] text-[#2f6eff]"
                  : "text-slate-700 hover:bg-white/70"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-[#2f6eff]" : "text-slate-500"
                }`}
              />
              <span className="text-[15px] font-medium tracking-[-0.02em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
