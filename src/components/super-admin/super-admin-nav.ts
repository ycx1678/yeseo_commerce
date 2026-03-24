import type { ComponentType, SVGProps } from "react";
import {
  BoxStackIcon,
  CartIcon,
  ClipboardIcon,
  DashboardIcon,
  MegaphoneIcon,
  MessageIcon,
  PackageIcon,
  PartnersIcon,
  RepeatIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from "@/components/admin/AdminIcons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type SuperAdminNavLeaf = {
  href: string;
  label: string;
  icon: IconComponent;
};

type SuperAdminNavBranch = {
  label: string;
  children: readonly SuperAdminNavLeaf[];
};

type SuperAdminNavItem = SuperAdminNavLeaf | SuperAdminNavBranch;

export const superAdminNavItems = [
  {
    href: "/super-admin",
    label: "대시보드",
    icon: DashboardIcon,
  },
  {
    label: "협력사 관리",
    children: [
      {
        href: "/super-admin/partners",
        label: "협력사 목록",
        icon: PartnersIcon,
      },
      {
        href: "/super-admin/partners/approval",
        label: "승인 관리",
        icon: ClipboardIcon,
      },
    ],
  },
  {
    href: "/super-admin/products",
    label: "상품 전체 관리",
    icon: PackageIcon,
  },
  {
    href: "/super-admin/orders",
    label: "주문 관리",
    icon: CartIcon,
  },
  {
    href: "/super-admin/settlement",
    label: "정산 관리",
    icon: WalletIcon,
  },
  {
    href: "/super-admin/members",
    label: "회원 관리",
    icon: UserIcon,
  },
  {
    href: "/super-admin/categories",
    label: "카테고리 관리",
    icon: BoxStackIcon,
  },
  {
    href: "/super-admin/notices",
    label: "공지사항 관리",
    icon: MegaphoneIcon,
  },
  {
    href: "/super-admin/suggestions",
    label: "건의사항 관리",
    icon: MessageIcon,
  },
  {
    href: "/super-admin/subscriptions",
    label: "구독 관리",
    icon: RepeatIcon,
  },
  {
    href: "/super-admin/reviews",
    label: "리뷰/Q&A 관리",
    icon: MessageIcon,
  },
  {
    href: "/super-admin/settings",
    label: "사이트 설정",
    icon: SettingsIcon,
  },
] as const satisfies readonly SuperAdminNavItem[];

function isNavLeaf(item: SuperAdminNavItem): item is SuperAdminNavLeaf {
  return "href" in item;
}

export function isSuperAdminPathActive(pathname: string, href: string) {
  if (href === "/super-admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getSuperAdminFlatNav() {
  const flatItems: SuperAdminNavLeaf[] = [];

  for (const item of superAdminNavItems as readonly SuperAdminNavItem[]) {
    if (isNavLeaf(item)) {
      flatItems.push(item);
    } else {
      flatItems.push(...item.children);
    }
  }

  return flatItems;
}

export function getSuperAdminPageMeta(pathname: string) {
  for (const item of superAdminNavItems as readonly SuperAdminNavItem[]) {
    if (isNavLeaf(item)) {
      if (isSuperAdminPathActive(pathname, item.href)) {
        return {
          title: item.label,
          breadcrumbs: ["최고관리자", item.label],
        };
      }
      continue;
    }

    for (const child of item.children) {
      if (isSuperAdminPathActive(pathname, child.href)) {
        return {
          title: child.label,
          breadcrumbs: [item.label, child.label],
        };
      }
    }
  }

  return {
    title: "대시보드",
    breadcrumbs: ["최고관리자", "대시보드"],
  };
}
