import {
  BellIcon,
  CartIcon,
  DashboardIcon,
  MessageIcon,
  PackageIcon,
  RepeatIcon,
  UserIcon,
  WalletIcon,
} from "./AdminIcons";

export const adminNavItems = [
  {
    href: "/partner-admin",
    label: "대시보드",
    icon: DashboardIcon,
  },
  {
    href: "/partner-admin/products",
    label: "상품 관리",
    icon: PackageIcon,
  },
  {
    href: "/partner-admin/orders",
    label: "주문 확인",
    icon: CartIcon,
  },
  {
    href: "/partner-admin/settlement",
    label: "정산 내역",
    icon: WalletIcon,
  },
  {
    href: "/partner-admin/subscriptions",
    label: "구독상품 관리",
    icon: RepeatIcon,
  },
  {
    href: "/partner-admin/notices",
    label: "공지사항 확인",
    icon: BellIcon,
  },
  {
    href: "/partner-admin/suggestions",
    label: "건의사항 등록",
    icon: MessageIcon,
  },
  {
    href: "/partner-admin/profile",
    label: "내 정보 관리",
    icon: UserIcon,
  },
] as const;

export function getAdminPageLabel(pathname: string) {
  const matchedItem = adminNavItems.find((item) => {
    if (item.href === "/partner-admin") {
      return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  });

  return matchedItem?.label ?? "대시보드";
}
