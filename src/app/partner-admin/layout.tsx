import type { ReactNode } from "react";
import { PartnerAdminHeader } from "@/components/admin/PartnerAdminHeader";
import { PartnerAdminSidebar } from "@/components/admin/PartnerAdminSidebar";

type PartnerAdminLayoutProps = {
  children: ReactNode;
};

export default function PartnerAdminLayout({
  children,
}: PartnerAdminLayoutProps) {
  return (
    <div className="flex min-h-screen min-w-[1480px] bg-[#f7f8fc] text-slate-900">
      <PartnerAdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fc] px-10 pb-10 pt-10">
        <PartnerAdminHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
