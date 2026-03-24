import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StorefrontProvider } from "@/components/storefront/StorefrontProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "예서커머스",
  description:
    "메인 쇼핑몰과 입점업체 관리센터를 함께 운영하는 B2B 커머스 플랫폼",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StorefrontProvider>{children}</StorefrontProvider>
      </body>
    </html>
  );
}
