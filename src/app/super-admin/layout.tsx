import type { ReactNode } from "react";
import { SuperAdminHeader } from "@/components/super-admin/SuperAdminHeader";
import { SuperAdminSidebar } from "@/components/super-admin/SuperAdminSidebar";

type SuperAdminLayoutProps = {
  children: ReactNode;
};

export default function SuperAdminLayout({
  children,
}: SuperAdminLayoutProps) {
  return (
    <div className="flex min-h-screen min-w-[1600px] bg-[#eef2f7] text-slate-900">
      <SuperAdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col px-8 pb-8 pt-8">
        <SuperAdminHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
