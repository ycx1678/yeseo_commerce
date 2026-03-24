"use client";

import { Fragment, useState } from "react";
import {
  BellIcon,
  CartIcon,
  ClipboardIcon,
  DownloadIcon,
  MegaphoneIcon,
  MessageIcon,
  PackageIcon,
  PartnersIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  TrendUpIcon,
  UserIcon,
  WalletIcon,
} from "@/components/admin/AdminIcons";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminModal,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/AdminUi";
import type {
  AdminMember,
  AdminNotice,
  AdminOrder,
  AdminProduct,
  AdminSuggestion,
  CategoryItem,
  PartnerApprovalRequest,
  PartnerApprovalStatus,
  PartnerCompany,
  SubscriptionPlan,
  Subscriber,
  ReviewItem,
} from "./super-admin-data";
import {
  adminMembers,
  adminNotices,
  adminOrders,
  adminProducts,
  adminSuggestions,
  categoryTree,
  partnerApprovalRequests,
  partnerCompanies,
  reviewItems,
  settlementTrend,
  settlements,
  subscribers,
  subscriptionPlans,
} from "./super-admin-data";
import {
  SuperAdminDonutCard,
  SuperAdminMetricCard,
  SuperAdminMiniBarChart,
  SuperAdminPanel,
  SuperAdminToggle,
} from "./SuperAdminUi";

type PillToneClass =
  | "bg-blue-100 text-blue-700"
  | "bg-emerald-100 text-emerald-700"
  | "bg-orange-100 text-orange-700"
  | "bg-red-100 text-red-700"
  | "bg-slate-100 text-slate-600"
  | "bg-yellow-100 text-yellow-700"
  | "bg-violet-100 text-violet-700";

function Pill({
  children,
  className,
}: {
  children: string;
  className: PillToneClass;
}) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${className}`}>
      {children}
    </span>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
        active
          ? "bg-[#2f6eff] text-white"
          : "bg-white text-slate-500 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function TableActionButton({
  label,
  tone = "slate",
  onClick,
}: {
  label: string;
  tone?: "slate" | "blue" | "red" | "green";
  onClick?: () => void;
}) {
  const toneClassMap = {
    slate: "text-slate-500 hover:text-slate-700",
    blue: "text-[#2f6eff] hover:text-[#245df2]",
    red: "text-red-500 hover:text-red-600",
    green: "text-emerald-600 hover:text-emerald-700",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[13px] font-semibold transition ${toneClassMap[tone]}`}
    >
      {label}
    </button>
  );
}

function formatWon(value: number) {
  return `₩${value.toLocaleString()}`;
}

function getApprovalTone(status: PartnerApprovalStatus): PillToneClass {
  switch (status) {
    case "승인":
      return "bg-emerald-100 text-emerald-700";
    case "반려":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getPartnerTone(status: PartnerCompany["status"]): PillToneClass {
  switch (status) {
    case "활성":
      return "bg-emerald-100 text-emerald-700";
    case "정지":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getProductTone(status: AdminProduct["status"]): PillToneClass {
  switch (status) {
    case "승인 완료":
      return "bg-emerald-100 text-emerald-700";
    case "판매 중지":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getOrderTone(status: AdminOrder["status"]): PillToneClass {
  switch (status) {
    case "배송완료":
      return "bg-emerald-100 text-emerald-700";
    case "배송중":
      return "bg-blue-100 text-blue-700";
    case "취소":
      return "bg-red-100 text-red-700";
    case "처리중":
      return "bg-violet-100 text-violet-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export function SuperAdminDashboardPage() {
  const pendingApprovals = partnerApprovalRequests.filter(
    (item) => item.status === "대기",
  );

  const activePartners = partnerCompanies.filter(
    (item) => item.status === "활성",
  ).length;

  const totalSettlement = settlements.reduce(
    (sum, item) => sum + item.payable,
    0,
  );

  const orderStatusData = [
    {
      label: "주문접수",
      value: adminOrders.filter((item) => item.status === "주문접수").length,
      color: "#f59e0b",
    },
    {
      label: "처리중",
      value: adminOrders.filter((item) => item.status === "처리중").length,
      color: "#8b5cf6",
    },
    {
      label: "배송중",
      value: adminOrders.filter((item) => item.status === "배송중").length,
      color: "#2f6eff",
    },
    {
      label: "배송완료",
      value: adminOrders.filter((item) => item.status === "배송완료").length,
      color: "#10b981",
    },
    {
      label: "취소",
      value: adminOrders.filter((item) => item.status === "취소").length,
      color: "#ef4444",
    },
  ] as const;

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        <SuperAdminMetricCard
          label="대기 중 승인 요청"
          value={`${pendingApprovals.length}건`}
          helper="오늘 신규 2건 접수"
          icon={<ClipboardIcon className="h-6 w-6" />}
          tone="orange"
        />
        <SuperAdminMetricCard
          label="활성 협력사"
          value={`${activePartners}개사`}
          helper="전월 대비 +3개사"
          icon={<PartnersIcon className="h-6 w-6" />}
          tone="blue"
        />
        <SuperAdminMetricCard
          label="월간 거래액"
          value="₩4.14억"
          helper="전월 대비 +6.4%"
          icon={<TrendUpIcon className="h-6 w-6" />}
          tone="violet"
        />
        <SuperAdminMetricCard
          label="이번 달 정산 예정"
          value={formatWon(totalSettlement)}
          helper="검토 필요 2건"
          icon={<WalletIcon className="h-6 w-6" />}
          tone="green"
        />
      </section>

      <section className="grid grid-cols-[minmax(0,1.35fr)_minmax(360px,0.95fr)] gap-5">
        <SuperAdminPanel
          title="월간 거래액 추이"
          description="최근 6개월 기준 정산 대상 거래액입니다."
          action={
            <AdminButton tone="secondary" type="button">
              <DownloadIcon className="h-4 w-4" />
              리포트 다운로드
            </AdminButton>
          }
        >
          <SuperAdminMiniBarChart data={settlementTrend} valueSuffix="만" />
        </SuperAdminPanel>

        <SuperAdminDonutCard title="주문 상태 분포" data={orderStatusData} />
      </section>

      <section className="grid grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)] gap-5">
        <SuperAdminPanel
          title="최근 승인 요청"
          description="파트너 입점 승인 처리 대기 목록"
        >
          <table className="w-full">
            <thead className="bg-[#fafbfe] text-left">
              <tr className="text-[13px] font-semibold text-slate-400">
                <th className="px-4 py-3">업체명</th>
                <th className="px-4 py-3">카테고리</th>
                <th className="px-4 py-3">접수일</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody>
              {partnerApprovalRequests.slice(0, 4).map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">{item.company}</p>
                    <p className="mt-1 text-[12px] text-slate-400">
                      {item.representative} / {item.contact}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{item.category}</td>
                  <td className="px-4 py-4 text-slate-500">{item.appliedAt}</td>
                  <td className="px-4 py-4">
                    <Pill className={getApprovalTone(item.status)}>
                      {item.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SuperAdminPanel>

        <SuperAdminPanel
          title="오늘 처리할 항목"
          description="운영 이슈와 필수 확인 항목"
        >
          <div className="space-y-4">
            {[
              {
                title: "반려 사유 회신 필요",
                body: "그린라이프코퍼레이션 입점 반려 사유를 고객센터와 동기화하세요.",
                tone: "bg-red-50 text-red-600",
              },
              {
                title: "재고 부족 상품 12건",
                body: "천연 세면대 청소제 외 11건의 재고 보충 알림이 필요합니다.",
                tone: "bg-yellow-50 text-yellow-700",
              },
              {
                title: "정산 보류 1건",
                body: "코리아프린팅솔루션 서류 미비 상태를 확인하세요.",
                tone: "bg-blue-50 text-blue-700",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[16px] border border-[#e4e8f1] bg-[#fbfcff] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[15px] font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.tone}`}>
                    확인 필요
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-slate-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </SuperAdminPanel>
      </section>
    </div>
  );
}

export function SuperAdminPartnersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("전체");
  const [selectedPartner, setSelectedPartner] = useState<PartnerCompany | null>(null);

  const filteredPartners = partnerCompanies.filter((item) => {
    const matchesQuery =
      item.company.includes(query) || item.representative.includes(query);
    const matchesStatus = status === "전체" || item.status === status;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[18px] border border-[#dbe3ef] bg-white px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <AdminInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="업체명 또는 담당자명 검색"
            className="pl-12"
          />
        </div>
        <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1">
          {["전체", "활성", "검토중", "정지"].map((item) => (
            <FilterChip
              key={item}
              active={status === item}
              label={item}
              onClick={() => setStatus(item)}
            />
          ))}
        </div>
      </div>

      <SuperAdminPanel title="협력사 운영 목록" description="입점된 협력사의 상태와 실적을 확인합니다.">
        <table className="w-full">
          <thead className="bg-[#fafbfe] text-left">
            <tr className="text-[13px] font-semibold text-slate-400">
              <th className="px-4 py-3">업체명</th>
              <th className="px-4 py-3">카테고리</th>
              <th className="px-4 py-3 text-right">상품 수</th>
              <th className="px-4 py-3 text-right">월 매출</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map((item) => (
              <tr
                key={item.id}
                className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
              >
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{item.company}</p>
                  <p className="mt-1 text-[12px] text-slate-400">
                    {item.representative} / {item.contact}
                  </p>
                </td>
                <td className="px-4 py-4 text-slate-500">{item.category}</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">
                  {item.products.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">
                  {formatWon(item.monthlyRevenue)}
                </td>
                <td className="px-4 py-4">
                  <Pill className={getPartnerTone(item.status)}>{item.status}</Pill>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-4">
                    <TableActionButton
                      label="상세"
                      tone="blue"
                      onClick={() => setSelectedPartner(item)}
                    />
                    <TableActionButton label="정지" tone="red" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SuperAdminPanel>

      <AdminModal
        open={selectedPartner !== null}
        title="협력사 상세"
        onClose={() => setSelectedPartner(null)}
        footer={
          <div className="flex justify-end gap-3">
            <AdminButton type="button" tone="secondary" onClick={() => setSelectedPartner(null)}>
              닫기
            </AdminButton>
          </div>
        }
      >
        {selectedPartner ? (
          <div className="grid grid-cols-2 gap-4 text-[14px] text-slate-600">
            <div className="rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">업체명</p>
              <p className="mt-2 text-[16px] font-semibold text-slate-900">
                {selectedPartner.company}
              </p>
            </div>
            <div className="rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">담당자</p>
              <p className="mt-2 text-[16px] font-semibold text-slate-900">
                {selectedPartner.representative}
              </p>
            </div>
            <div className="rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">카테고리</p>
              <p className="mt-2">{selectedPartner.category}</p>
            </div>
            <div className="rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">정산 등급</p>
              <p className="mt-2">{selectedPartner.settlementScore}</p>
            </div>
            <div className="rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">상품 수</p>
              <p className="mt-2">{selectedPartner.products}개</p>
            </div>
            <div className="rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">월 매출</p>
              <p className="mt-2">{formatWon(selectedPartner.monthlyRevenue)}</p>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}

export function SuperAdminPartnerApprovalPage() {
  const [items, setItems] = useState(partnerApprovalRequests);
  const [tab, setTab] = useState<"전체" | PartnerApprovalStatus>("전체");
  const [selectedRequest, setSelectedRequest] =
    useState<PartnerApprovalRequest | null>(null);
  const [rejectingRequest, setRejectingRequest] =
    useState<PartnerApprovalRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filteredItems =
    tab === "전체" ? items : items.filter((item) => item.status === tab);

  const updateStatus = (id: number, nextStatus: PartnerApprovalStatus) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item,
      ),
    );
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1 w-fit">
        {(["전체", "대기", "승인", "반려"] as const).map((item) => (
          <FilterChip
            key={item}
            active={tab === item}
            label={item}
            onClick={() => setTab(item)}
          />
        ))}
      </div>

      <SuperAdminPanel title="협력사 승인 요청" description="신규 입점 신청을 검토하고 상태를 변경합니다.">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-[18px] border border-[#e4e8f1] bg-[#fbfcff] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-[17px] font-semibold text-slate-900">
                      {item.company}
                    </h4>
                    <Pill className={getApprovalTone(item.status)}>{item.status}</Pill>
                  </div>
                  <p className="mt-2 text-[13px] text-slate-500">
                    {item.representative} / {item.category} / {item.businessNo}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-slate-600">
                    {item.note}
                  </p>
                </div>
                <div className="flex gap-3">
                  <AdminButton type="button" tone="secondary" onClick={() => setSelectedRequest(item)}>
                    상세 보기
                  </AdminButton>
                  {item.status === "대기" ? (
                    <>
                      <AdminButton type="button" tone="success" onClick={() => updateStatus(item.id, "승인")}>
                        승인
                      </AdminButton>
                      <AdminButton type="button" tone="secondary" onClick={() => setRejectingRequest(item)}>
                        반려
                      </AdminButton>
                    </>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SuperAdminPanel>

      <AdminModal
        open={selectedRequest !== null}
        title="입점 신청 상세"
        onClose={() => setSelectedRequest(null)}
        footer={
          selectedRequest ? (
            <div className="flex justify-end gap-3">
              <AdminButton type="button" tone="secondary" onClick={() => setSelectedRequest(null)}>
                닫기
              </AdminButton>
              {selectedRequest.status === "대기" ? (
                <>
                  <AdminButton type="button" tone="secondary" onClick={() => setRejectingRequest(selectedRequest)}>
                    반려
                  </AdminButton>
                  <AdminButton type="button" tone="success" onClick={() => updateStatus(selectedRequest.id, "승인")}>
                    승인 확정
                  </AdminButton>
                </>
              ) : null}
            </div>
          ) : undefined
        }
      >
        {selectedRequest ? (
          <div className="grid grid-cols-2 gap-4">
            {[
              ["업체명", selectedRequest.company],
              ["대표자", selectedRequest.representative],
              ["사업자번호", selectedRequest.businessNo],
              ["카테고리", selectedRequest.category],
              ["접수일", selectedRequest.appliedAt],
              ["연락처", selectedRequest.contact],
              ["이메일", selectedRequest.email],
              ["서류", selectedRequest.documentLabel],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-[#f8faff] p-4">
                <p className="text-[12px] font-medium text-slate-400">{label}</p>
                <p className="mt-2 text-[14px] font-semibold text-slate-900">{value}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-[16px] bg-[#f8faff] p-4">
              <p className="text-[12px] font-medium text-slate-400">비고</p>
              <p className="mt-2 text-[14px] leading-7 text-slate-600">
                {selectedRequest.note}
              </p>
            </div>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={rejectingRequest !== null}
        title="승인 반려"
        onClose={() => {
          setRejectingRequest(null);
          setRejectReason("");
        }}
        footer={
          <div className="flex justify-end gap-3">
            <AdminButton
              type="button"
              tone="secondary"
              onClick={() => {
                setRejectingRequest(null);
                setRejectReason("");
              }}
            >
              취소
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => {
                if (rejectingRequest) {
                  updateStatus(rejectingRequest.id, "반려");
                }
                setRejectingRequest(null);
                setRejectReason("");
              }}
            >
              반려 처리
            </AdminButton>
          </div>
        }
      >
        <AdminField label="반려 사유">
          <AdminTextarea
            rows={5}
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
            placeholder="반려 사유를 입력하세요."
          />
        </AdminField>
      </AdminModal>
    </div>
  );
}

export function SuperAdminProductsPage() {
  const [items, setItems] = useState(adminProducts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("전체");

  const filteredItems = items.filter((item) => {
    const matchesQuery =
      item.name.includes(query) ||
      item.partner.includes(query) ||
      item.category.includes(query);
    const matchesStatus = status === "전체" || item.status === status;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        <SuperAdminMetricCard
          label="전체 상품"
          value={`${items.length}개`}
          helper="이번 주 신규 4건"
          icon={<PackageIcon className="h-6 w-6" />}
          tone="blue"
        />
        <SuperAdminMetricCard
          label="승인 대기"
          value={`${items.filter((item) => item.status === "검토 중").length}개`}
          helper="우선 확인 필요"
          icon={<ClipboardIcon className="h-6 w-6" />}
          tone="orange"
        />
        <SuperAdminMetricCard
          label="판매 중지"
          value={`${items.filter((item) => item.status === "판매 중지").length}개`}
          helper="재고/품질 이슈"
          icon={<BellIcon className="h-6 w-6" />}
          tone="rose"
        />
        <SuperAdminMetricCard
          label="누적 판매"
          value={`${items.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}건`}
          helper="카테고리 전체 기준"
          icon={<TrendUpIcon className="h-6 w-6" />}
          tone="green"
        />
      </section>

      <div className="flex flex-col gap-4 rounded-[18px] border border-[#dbe3ef] bg-white px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <AdminInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="상품명, 협력사, 카테고리 검색"
            className="pl-12"
          />
        </div>
        <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1">
          {["전체", "승인 완료", "검토 중", "판매 중지"].map((item) => (
            <FilterChip
              key={item}
              active={status === item}
              label={item}
              onClick={() => setStatus(item)}
            />
          ))}
        </div>
      </div>

      <SuperAdminPanel title="상품 검수 및 운영" description="상품 승인 상태와 판매 성과를 함께 봅니다.">
        <table className="w-full">
          <thead className="bg-[#fafbfe] text-left">
            <tr className="text-[13px] font-semibold text-slate-400">
              <th className="px-4 py-3">상품명</th>
              <th className="px-4 py-3">협력사</th>
              <th className="px-4 py-3">카테고리</th>
              <th className="px-4 py-3 text-right">가격</th>
              <th className="px-4 py-3 text-right">재고</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#eef3ff] text-[18px]">
                      📦
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-[12px] text-slate-400">
                        평점 {item.rating} / 판매 {item.sales}건
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-500">{item.partner}</td>
                <td className="px-4 py-4 text-slate-500">{item.category}</td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">
                  {formatWon(item.price)}
                </td>
                <td className="px-4 py-4 text-right text-slate-500">{item.stock}</td>
                <td className="px-4 py-4">
                  <Pill className={getProductTone(item.status)}>{item.status}</Pill>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-4">
                    {item.status !== "승인 완료" ? (
                      <TableActionButton
                        label="승인"
                        tone="green"
                        onClick={() =>
                          setItems((previous) =>
                            previous.map((product) =>
                              product.id === item.id
                                ? { ...product, status: "승인 완료" }
                                : product,
                            ),
                          )
                        }
                      />
                    ) : null}
                    <TableActionButton
                      label={item.status === "판매 중지" ? "재판매" : "중지"}
                      tone="red"
                      onClick={() =>
                        setItems((previous) =>
                          previous.map((product) =>
                            product.id === item.id
                              ? {
                                  ...product,
                                  status:
                                    product.status === "판매 중지"
                                      ? "승인 완료"
                                      : "판매 중지",
                                }
                              : product,
                          ),
                        )
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SuperAdminPanel>
    </div>
  );
}

export function SuperAdminOrdersPage() {
  const [status, setStatus] = useState("전체");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredOrders =
    status === "전체"
      ? adminOrders
      : adminOrders.filter((item) => item.status === status);

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-5 gap-4">
        {(["주문접수", "처리중", "배송중", "배송완료", "취소"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`admin-card px-5 py-5 text-left transition ${
                status === item ? "ring-2 ring-[#9cb8ff]" : ""
              }`}
            >
              <p className="text-[13px] font-medium text-slate-400">{item}</p>
              <p className="mt-3 text-[28px] font-black tracking-[-0.04em] text-slate-950">
                {adminOrders.filter((order) => order.status === item).length}
              </p>
            </button>
          ),
        )}
      </section>

      <SuperAdminPanel title="주문 운영 현황" description="주문 상태별 진행 상황과 배송 정보를 확인합니다.">
        <table className="w-full">
          <thead className="bg-[#fafbfe] text-left">
            <tr className="text-[13px] font-semibold text-slate-400">
              <th className="px-4 py-3">주문번호</th>
              <th className="px-4 py-3">업체</th>
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3 text-right">금액</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">상세</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((item) => (
              <Fragment key={item.id}>
                <tr
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {item.orderNo}
                  </td>
                  <td className="px-4 py-4 text-slate-500">{item.company}</td>
                  <td className="px-4 py-4 text-slate-500">{item.product}</td>
                  <td className="px-4 py-4 text-right font-semibold text-slate-800">
                    {formatWon(item.amount)}
                  </td>
                  <td className="px-4 py-4">
                    <Pill className={getOrderTone(item.status)}>{item.status}</Pill>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <TableActionButton
                      label={expandedId === item.id ? "닫기" : "보기"}
                      tone="blue"
                      onClick={() =>
                        setExpandedId((previous) =>
                          previous === item.id ? null : item.id,
                        )
                      }
                    />
                  </td>
                </tr>
                {expandedId === item.id ? (
                  <tr className="border-t border-[#edf1f6] bg-[#fbfcff]">
                    <td colSpan={6} className="px-4 py-5">
                      <div className="grid grid-cols-3 gap-4 text-[14px] text-slate-600">
                        <div className="rounded-[16px] bg-white p-4">
                          <p className="text-[12px] font-medium text-slate-400">주문일</p>
                          <p className="mt-2">{item.createdAt}</p>
                        </div>
                        <div className="rounded-[16px] bg-white p-4">
                          <p className="text-[12px] font-medium text-slate-400">배송 정보</p>
                          <p className="mt-2">{item.delivery}</p>
                        </div>
                        <div className="rounded-[16px] bg-white p-4">
                          <p className="text-[12px] font-medium text-slate-400">운영 메모</p>
                          <p className="mt-2">주문 단계별 알림과 정산 반영 상태를 확인하세요.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </SuperAdminPanel>
    </div>
  );
}

export function SuperAdminSettlementPage() {
  const [status, setStatus] = useState("전체");

  const filteredSettlements =
    status === "전체"
      ? settlements
      : settlements.filter((item) => item.status === status);

  const settlementStatusToneMap = {
    정산완료: "bg-emerald-100 text-emerald-700",
    검토중: "bg-yellow-100 text-yellow-700",
    보류: "bg-red-100 text-red-700",
    정산대기: "bg-blue-100 text-blue-700",
  } as const;

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        <SuperAdminMetricCard
          label="이번 달 총 정산액"
          value={formatWon(settlements.reduce((sum, item) => sum + item.payable, 0))}
          helper="정산 완료 1건"
          icon={<WalletIcon className="h-6 w-6" />}
          tone="green"
        />
        <SuperAdminMetricCard
          label="검토 중"
          value={`${settlements.filter((item) => item.status === "검토중").length}건`}
          helper="승인 전 확인 필요"
          icon={<ClipboardIcon className="h-6 w-6" />}
          tone="orange"
        />
        <SuperAdminMetricCard
          label="보류 건"
          value={`${settlements.filter((item) => item.status === "보류").length}건`}
          helper="서류 미비 포함"
          icon={<BellIcon className="h-6 w-6" />}
          tone="rose"
        />
        <SuperAdminMetricCard
          label="정산 예정일"
          value="3월 31일"
          helper="월 1회 일괄 정산"
          icon={<DownloadIcon className="h-6 w-6" />}
          tone="blue"
        />
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-5">
        <SuperAdminPanel title="월별 정산 추이" description="정산 대상 금액 기준 최근 6개월 추이">
          <SuperAdminMiniBarChart data={settlementTrend} valueSuffix="만" />
        </SuperAdminPanel>

        <SuperAdminPanel title="정산 내역" description="정산 대상별 상세 내역과 지급 상태">
          <div className="mb-4 flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1 w-fit">
            {["전체", "정산완료", "검토중", "보류", "정산대기"].map((item) => (
              <FilterChip
                key={item}
                active={status === item}
                label={item}
                onClick={() => setStatus(item)}
              />
            ))}
          </div>

          <div className="space-y-3">
            {filteredSettlements.map((item) => (
              <div
                key={item.id}
                className="rounded-[16px] border border-[#e4e8f1] bg-[#fbfcff] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-[15px] font-semibold text-slate-900">
                        {item.company}
                      </h4>
                      <Pill className={settlementStatusToneMap[item.status]}>
                        {item.status}
                      </Pill>
                    </div>
                    <p className="mt-2 text-[13px] text-slate-500">
                      정산 기간 {item.period} / 지급 예정일 {item.payoutDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-medium text-slate-400">지급 금액</p>
                    <p className="mt-1 text-[18px] font-bold text-slate-900">
                      {formatWon(item.payable)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-[13px] text-slate-500">
                  <div className="rounded-[14px] bg-white px-4 py-3">
                    총 거래액 {formatWon(item.grossAmount)}
                  </div>
                  <div className="rounded-[14px] bg-white px-4 py-3">
                    수수료 {formatWon(item.fee)}
                  </div>
                  <div className="rounded-[14px] bg-white px-4 py-3">
                    지급액 {formatWon(item.payable)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SuperAdminPanel>
      </section>
    </div>
  );
}

function getMemberTone(status: AdminMember["status"]): PillToneClass {
  switch (status) {
    case "활성":
      return "bg-emerald-100 text-emerald-700";
    case "정지":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getMemberRoleTone(role: AdminMember["role"]): PillToneClass {
  switch (role) {
    case "협력사 관리자":
      return "bg-violet-100 text-violet-700";
    case "일반회원":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

export function SuperAdminMembersPage() {
  const [items, setItems] = useState(adminMembers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("전체");
  const [status, setStatus] = useState("전체");
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesQuery =
      item.name.includes(query) ||
      item.email.includes(query) ||
      item.company.includes(query);
    const matchesRole = role === "전체" || item.role === role;
    const matchesStatus = status === "전체" || item.status === status;

    return matchesQuery && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        <SuperAdminMetricCard
          label="전체 회원"
          value={`${items.length}명`}
          helper="오늘 신규 3명"
          icon={<UserIcon className="h-6 w-6" />}
          tone="blue"
        />
        <SuperAdminMetricCard
          label="활성 회원"
          value={`${items.filter((item) => item.status === "활성").length}명`}
          helper="운영 계정 포함"
          icon={<TrendUpIcon className="h-6 w-6" />}
          tone="green"
        />
        <SuperAdminMetricCard
          label="협력사 관리자"
          value={`${items.filter((item) => item.role === "협력사 관리자").length}명`}
          helper="입점 파트너별 계정"
          icon={<PartnersIcon className="h-6 w-6" />}
          tone="violet"
        />
        <SuperAdminMetricCard
          label="정지/탈퇴"
          value={`${items.filter((item) => item.status !== "활성").length}명`}
          helper="정책 위반/휴면 포함"
          icon={<BellIcon className="h-6 w-6" />}
          tone="rose"
        />
      </section>

      <div className="rounded-[18px] border border-[#dbe3ef] bg-white px-6 py-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <AdminInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="이름, 이메일, 소속 검색"
            className="pl-12"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1">
            {["전체", "바이어", "협력사 관리자", "일반회원"].map((item) => (
              <FilterChip
                key={item}
                active={role === item}
                label={item}
                onClick={() => setRole(item)}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1">
            {["전체", "활성", "정지", "탈퇴"].map((item) => (
              <FilterChip
                key={item}
                active={status === item}
                label={item}
                onClick={() => setStatus(item)}
              />
            ))}
          </div>
        </div>
      </div>

      <SuperAdminPanel title="회원 목록" description="바이어와 협력사 운영 계정을 함께 관리합니다.">
        <table className="w-full">
          <thead className="bg-[#fafbfe] text-left">
            <tr className="text-[13px] font-semibold text-slate-400">
              <th className="px-4 py-3">회원</th>
              <th className="px-4 py-3">소속</th>
              <th className="px-4 py-3">역할</th>
              <th className="px-4 py-3 text-right">주문 수</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
              >
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-[12px] text-slate-400">{item.email}</p>
                </td>
                <td className="px-4 py-4 text-slate-500">{item.company}</td>
                <td className="px-4 py-4">
                  <Pill className={getMemberRoleTone(item.role)}>{item.role}</Pill>
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-800">
                  {item.orders}
                </td>
                <td className="px-4 py-4">
                  <Pill className={getMemberTone(item.status)}>{item.status}</Pill>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-4">
                    <TableActionButton
                      label="상세"
                      tone="blue"
                      onClick={() => setSelectedMember(item)}
                    />
                    {item.status !== "탈퇴" ? (
                      <TableActionButton
                        label={item.status === "활성" ? "정지" : "복구"}
                        tone={item.status === "활성" ? "red" : "green"}
                        onClick={() =>
                          setItems((previous) =>
                            previous.map((member) =>
                              member.id === item.id
                                ? {
                                    ...member,
                                    status:
                                      member.status === "활성" ? "정지" : "활성",
                                  }
                                : member,
                            ),
                          )
                        }
                      />
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SuperAdminPanel>

      <AdminModal
        open={selectedMember !== null}
        title="회원 상세"
        onClose={() => setSelectedMember(null)}
      >
        {selectedMember ? (
          <div className="grid grid-cols-2 gap-4">
            {[
              ["이름", selectedMember.name],
              ["이메일", selectedMember.email],
              ["연락처", selectedMember.phone],
              ["소속", selectedMember.company],
              ["가입일", selectedMember.joinDate],
              ["최근 로그인", selectedMember.lastLogin],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-[#f8faff] p-4">
                <p className="text-[12px] font-medium text-slate-400">{label}</p>
                <p className="mt-2 text-[14px] font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}

function cloneCategories() {
  return categoryTree.map((item) => ({
    ...item,
    children: item.children ? item.children.map((child) => ({ ...child })) : undefined,
  }));
}

export function SuperAdminCategoriesPage() {
  const [items, setItems] = useState<CategoryItem[]>(cloneCategories);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("📦");
  const [expandedId, setExpandedId] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] text-slate-500">
            상품 분류 체계를 운영하고 하위 카테고리를 추가합니다.
          </p>
        </div>
        <AdminButton type="button" onClick={() => setShowModal(true)}>
          <PlusIcon className="h-4 w-4" />
          카테고리 추가
        </AdminButton>
      </div>

      <section className="grid grid-cols-3 gap-5">
        <SuperAdminMetricCard
          label="전체 대카테고리"
          value={`${items.length}개`}
          helper="현재 노출 기준"
          icon={<PackageIcon className="h-6 w-6" />}
          tone="blue"
        />
        <SuperAdminMetricCard
          label="활성 카테고리"
          value={`${items.filter((item) => item.isActive).length}개`}
          helper="비활성 0개"
          icon={<TrendUpIcon className="h-6 w-6" />}
          tone="green"
        />
        <SuperAdminMetricCard
          label="연결 상품"
          value={`${items.reduce((sum, item) => sum + item.productCount, 0)}개`}
          helper="전체 카테고리 합산"
          icon={<CartIcon className="h-6 w-6" />}
          tone="orange"
        />
      </section>

      <SuperAdminPanel title="카테고리 트리" description="대카테고리와 하위 카테고리 구조를 관리합니다.">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-[18px] border border-[#e4e8f1] bg-[#fbfcff]">
              <div className="flex items-center gap-4 px-5 py-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${item.color} text-[20px]`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[16px] font-semibold text-slate-900">{item.name}</h4>
                    <Pill className={item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                      {item.isActive ? "활성" : "비활성"}
                    </Pill>
                  </div>
                  <p className="mt-1 text-[13px] text-slate-500">
                    상품 {item.productCount}개 / 하위 분류 {item.children?.length ?? 0}개
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <TableActionButton
                    label={expandedId === item.id ? "접기" : "펼치기"}
                    tone="blue"
                    onClick={() => setExpandedId((previous) => (previous === item.id ? null : item.id))}
                  />
                  <TableActionButton
                    label={item.isActive ? "비활성" : "활성"}
                    tone={item.isActive ? "red" : "green"}
                    onClick={() =>
                      setItems((previous) =>
                        previous.map((category) =>
                          category.id === item.id
                            ? { ...category, isActive: !category.isActive }
                            : category,
                        ),
                      )
                    }
                  />
                </div>
              </div>
              {expandedId === item.id ? (
                <div className="space-y-2 border-t border-[#e4e8f1] bg-white px-5 py-4">
                  {item.children?.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between rounded-[14px] bg-[#f8faff] px-4 py-3"
                    >
                      <div>
                        <p className="text-[14px] font-medium text-slate-800">{child.name}</p>
                        <p className="mt-1 text-[12px] text-slate-400">
                          연결 상품 {child.productCount}개
                        </p>
                      </div>
                      <Pill className={child.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                        {child.isActive ? "활성" : "비활성"}
                      </Pill>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </SuperAdminPanel>

      <AdminModal
        open={showModal}
        title="새 카테고리 추가"
        onClose={() => setShowModal(false)}
        footer={
          <div className="flex justify-end gap-3">
            <AdminButton type="button" tone="secondary" onClick={() => setShowModal(false)}>
              취소
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => {
                if (!newCategoryName.trim()) {
                  return;
                }
                setItems((previous) => [
                  ...previous,
                  {
                    id: Date.now(),
                    name: newCategoryName,
                    icon: newCategoryIcon,
                    color: "bg-slate-100",
                    productCount: 0,
                    isActive: true,
                    children: [],
                  },
                ]);
                setNewCategoryName("");
                setNewCategoryIcon("📦");
                setShowModal(false);
              }}
            >
              추가하기
            </AdminButton>
          </div>
        }
      >
        <div className="space-y-4">
          <AdminField label="카테고리명">
            <AdminInput
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              placeholder="카테고리명을 입력하세요."
            />
          </AdminField>
          <AdminField label="대표 아이콘">
            <div className="flex flex-wrap gap-3">
              {["📦", "🥬", "🧴", "📎", "👔", "💻", "🪑"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setNewCategoryIcon(item)}
                  className={`flex h-12 w-12 items-center justify-center rounded-[14px] border text-[22px] transition ${
                    newCategoryIcon === item
                      ? "border-[#2f6eff] bg-[#eef3ff]"
                      : "border-[#dbe3ef] bg-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </AdminField>
        </div>
      </AdminModal>
    </div>
  );
}

function getNoticeCategoryTone(category: AdminNotice["category"]): PillToneClass {
  switch (category) {
    case "공지":
      return "bg-blue-100 text-blue-700";
    case "점검":
      return "bg-red-100 text-red-700";
    case "업데이트":
      return "bg-violet-100 text-violet-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export function SuperAdminNoticesPage() {
  const [items, setItems] = useState(adminNotices);
  const [selectedNotice, setSelectedNotice] = useState<AdminNotice | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "공지" as AdminNotice["category"],
    target: "전체" as AdminNotice["target"],
    isPinned: false,
    isPublished: true,
  });

  const openEditor = (notice?: AdminNotice) => {
    if (notice) {
      setSelectedNotice(notice);
      setForm({
        title: notice.title,
        content: notice.content,
        category: notice.category,
        target: notice.target,
        isPinned: notice.isPinned,
        isPublished: notice.isPublished,
      });
    } else {
      setSelectedNotice(null);
      setForm({
        title: "",
        content: "",
        category: "공지",
        target: "전체",
        isPinned: false,
        isPublished: true,
      });
    }
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-slate-500">
          전체 운영 공지와 점검 안내를 작성하고 노출 상태를 조정합니다.
        </p>
        <AdminButton type="button" onClick={() => openEditor()}>
          <PlusIcon className="h-4 w-4" />
          공지 등록
        </AdminButton>
      </div>

      <SuperAdminPanel title="공지사항 목록" description="중요 공지는 상단 고정으로 운영할 수 있습니다.">
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className={`rounded-[18px] border p-5 ${
                item.isPublished
                  ? "border-[#e4e8f1] bg-white"
                  : "border-[#e4e8f1] bg-[#f8fafc] opacity-80"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Pill className={getNoticeCategoryTone(item.category)}>
                      {item.category}
                    </Pill>
                    <Pill className="bg-slate-100 text-slate-600">
                      {item.target}
                    </Pill>
                    {item.isPinned ? (
                      <Pill className="bg-red-100 text-red-700">고정</Pill>
                    ) : null}
                  </div>
                  <h4 className="mt-3 text-[18px] font-semibold tracking-[-0.03em] text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[14px] leading-7 text-slate-600">
                    {item.content}
                  </p>
                  <p className="mt-3 text-[12px] text-slate-400">
                    {item.createdAt} / 조회 {item.views}
                  </p>
                </div>
                <div className="flex gap-4">
                  <TableActionButton
                    label="수정"
                    tone="blue"
                    onClick={() => openEditor(item)}
                  />
                  <TableActionButton
                    label={item.isPublished ? "숨김" : "게시"}
                    tone={item.isPublished ? "red" : "green"}
                    onClick={() =>
                      setItems((previous) =>
                        previous.map((notice) =>
                          notice.id === item.id
                            ? { ...notice, isPublished: !notice.isPublished }
                            : notice,
                        ),
                      )
                    }
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </SuperAdminPanel>

      <AdminModal
        open={isEditorOpen}
        title={selectedNotice ? "공지 수정" : "공지 등록"}
        onClose={() => setIsEditorOpen(false)}
        footer={
          <div className="flex justify-end gap-3">
            <AdminButton type="button" tone="secondary" onClick={() => setIsEditorOpen(false)}>
              취소
            </AdminButton>
            <AdminButton
              type="button"
              onClick={() => {
                if (!form.title.trim() || !form.content.trim()) {
                  return;
                }
                if (selectedNotice) {
                  setItems((previous) =>
                    previous.map((item) =>
                      item.id === selectedNotice.id ? { ...item, ...form } : item,
                    ),
                  );
                } else {
                  setItems((previous) => [
                    {
                      id: Date.now(),
                      author: "최고관리자",
                      createdAt: "2026-03-25",
                      views: 0,
                      ...form,
                    },
                    ...previous,
                  ]);
                }
                setIsEditorOpen(false);
              }}
            >
              저장
            </AdminButton>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="분류">
              <AdminSelect
                className="w-full"
                value={form.category}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    category: event.target.value as AdminNotice["category"],
                  }))
                }
              >
                {["공지", "점검", "업데이트", "이벤트"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="대상">
              <AdminSelect
                className="w-full"
                value={form.target}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    target: event.target.value as AdminNotice["target"],
                  }))
                }
              >
                {["전체", "협력사", "바이어"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </AdminSelect>
            </AdminField>
          </div>
          <AdminField label="제목">
            <AdminInput
              value={form.title}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, title: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="내용">
            <AdminTextarea
              rows={6}
              value={form.content}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, content: event.target.value }))
              }
            />
          </AdminField>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium text-slate-600">상단 고정</span>
              <SuperAdminToggle
                value={form.isPinned}
                onChange={(value) =>
                  setForm((previous) => ({ ...previous, isPinned: value }))
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium text-slate-600">즉시 게시</span>
              <SuperAdminToggle
                value={form.isPublished}
                onChange={(value) =>
                  setForm((previous) => ({ ...previous, isPublished: value }))
                }
              />
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}

function getSuggestionTone(status: AdminSuggestion["status"]): PillToneClass {
  switch (status) {
    case "답변완료":
      return "bg-emerald-100 text-emerald-700";
    case "반영예정":
      return "bg-blue-100 text-blue-700";
    case "검토중":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-red-100 text-red-700";
  }
}

export function SuperAdminSuggestionsPage() {
  const [items, setItems] = useState(adminSuggestions);
  const [tab, setTab] = useState("전체");
  const [replyMap, setReplyMap] = useState<Record<number, string>>({});
  const [statusMap, setStatusMap] = useState<Record<number, AdminSuggestion["status"]>>({});

  const filteredItems =
    tab === "전체" ? items : items.filter((item) => item.status === tab);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1 w-fit">
        {["전체", "미답변", "검토중", "답변완료", "반영예정"].map((item) => (
          <FilterChip
            key={item}
            active={tab === item}
            label={item}
            onClick={() => setTab(item)}
          />
        ))}
      </div>

      <SuperAdminPanel title="건의사항 응대" description="기능 제안과 문의를 검토하고 답변 상태를 관리합니다.">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article key={item.id} className="rounded-[18px] border border-[#e4e8f1] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Pill className="bg-slate-100 text-slate-600">{item.type}</Pill>
                    <Pill className={getSuggestionTone(item.status)}>{item.status}</Pill>
                  </div>
                  <h4 className="mt-3 text-[17px] font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[14px] leading-7 text-slate-600">
                    {item.content}
                  </p>
                  <p className="mt-3 text-[12px] text-slate-400">
                    {item.author} / {item.company} / {item.createdAt}
                  </p>
                </div>
              </div>
              {item.reply ? (
                <div className="mt-4 rounded-[16px] bg-[#f0f9ff] px-4 py-4 text-[14px] text-slate-700">
                  <p className="text-[12px] font-medium text-slate-400">운영 답변</p>
                  <p className="mt-2 leading-7">{item.reply}</p>
                </div>
              ) : null}
              {item.status !== "답변완료" ? (
                <div className="mt-4 rounded-[16px] border border-[#e4e8f1] bg-[#fbfcff] p-4">
                  <div className="flex gap-3">
                    <AdminSelect
                      value={statusMap[item.id] ?? "답변완료"}
                      onChange={(event) =>
                        setStatusMap((previous) => ({
                          ...previous,
                          [item.id]: event.target.value as AdminSuggestion["status"],
                        }))
                      }
                    >
                      {["답변완료", "검토중", "반영예정"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </AdminSelect>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <AdminTextarea
                      rows={3}
                      value={replyMap[item.id] ?? ""}
                      onChange={(event) =>
                        setReplyMap((previous) => ({
                          ...previous,
                          [item.id]: event.target.value,
                        }))
                      }
                      placeholder="운영 답변을 입력하세요."
                    />
                    <AdminButton
                      type="button"
                      className="self-end"
                      onClick={() =>
                        setItems((previous) =>
                          previous.map((suggestion) =>
                            suggestion.id === item.id
                              ? {
                                  ...suggestion,
                                  reply: replyMap[item.id],
                                  repliedAt: "2026-03-25",
                                  status: statusMap[item.id] ?? "답변완료",
                                }
                              : suggestion,
                          ),
                        )
                      }
                    >
                      답변 저장
                    </AdminButton>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </SuperAdminPanel>
    </div>
  );
}

export function SuperAdminSubscriptionsPage() {
  const [plans, setPlans] = useState(subscriptionPlans);
  const [tab, setTab] = useState<"plans" | "subscribers">("plans");

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        <SuperAdminMetricCard
          label="활성 구독사"
          value={`${subscribers.filter((item) => item.status === "활성").length}개사`}
          helper="이번 달 신규 5개사"
          icon={<PartnersIcon className="h-6 w-6" />}
          tone="blue"
        />
        <SuperAdminMetricCard
          label="월 구독 수익"
          value={formatWon(subscribers.reduce((sum, item) => sum + item.amount, 0))}
          helper="활성 계약 기준"
          icon={<WalletIcon className="h-6 w-6" />}
          tone="green"
        />
        <SuperAdminMetricCard
          label="운영 중 플랜"
          value={`${plans.filter((item) => item.isActive).length}개`}
          helper="추천 플랜 1개"
          icon={<PackageIcon className="h-6 w-6" />}
          tone="violet"
        />
        <SuperAdminMetricCard
          label="만료 예정"
          value={`${subscribers.filter((item) => item.status === "만료예정").length}건`}
          helper="사전 연장 안내 필요"
          icon={<BellIcon className="h-6 w-6" />}
          tone="orange"
        />
      </section>

      <div className="flex gap-2 rounded-full bg-[#f5f7fb] p-1 w-fit">
        <FilterChip active={tab === "plans"} label="플랜 관리" onClick={() => setTab("plans")} />
        <FilterChip active={tab === "subscribers"} label="구독 현황" onClick={() => setTab("subscribers")} />
      </div>

      {tab === "plans" ? (
        <section className="grid grid-cols-3 gap-5">
          {plans.map((item) => (
            <article
              key={item.id}
              className={`admin-card relative px-6 py-6 ${item.isRecommended ? "ring-2 ring-[#9cb8ff]" : ""}`}
            >
              {item.isRecommended ? (
                <div className="absolute -top-3 left-6 rounded-full bg-[#2f6eff] px-3 py-1 text-[11px] font-semibold text-white">
                  추천 플랜
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[20px] font-bold tracking-[-0.03em] text-slate-950">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-7 text-slate-500">
                    {item.description}
                  </p>
                </div>
                <Pill className={item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                  {item.isActive ? "운영중" : "비활성"}
                </Pill>
              </div>
              <p className="mt-6 text-[34px] font-black tracking-[-0.05em] text-slate-950">
                {formatWon(item.price)}
              </p>
              <p className="mt-1 text-[13px] text-slate-400">/{item.billingCycle}</p>
              <div className="mt-6 space-y-3 text-[14px] text-slate-600">
                {item.features.map((feature) => (
                  <div key={feature} className="rounded-[14px] bg-[#f8faff] px-4 py-3">
                    {feature}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-[13px] text-slate-500">
                  구독사 {item.subscriberCount}개 / 수수료 {item.commissionRate}%
                </p>
                <TableActionButton
                  label={item.isActive ? "비활성" : "활성"}
                  tone={item.isActive ? "red" : "green"}
                  onClick={() =>
                    setPlans((previous) =>
                      previous.map((plan) =>
                        plan.id === item.id ? { ...plan, isActive: !plan.isActive } : plan,
                      ),
                    )
                  }
                />
              </div>
            </article>
          ))}
        </section>
      ) : (
        <SuperAdminPanel title="구독 현황" description="협력사별 구독 상태와 차기 결제일">
          <table className="w-full">
            <thead className="bg-[#fafbfe] text-left">
              <tr className="text-[13px] font-semibold text-slate-400">
                <th className="px-4 py-3">협력사</th>
                <th className="px-4 py-3">플랜</th>
                <th className="px-4 py-3">시작일</th>
                <th className="px-4 py-3">다음 결제일</th>
                <th className="px-4 py-3 text-right">구독료</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-4 py-4 font-semibold text-slate-900">{item.company}</td>
                  <td className="px-4 py-4 text-slate-500">{item.plan}</td>
                  <td className="px-4 py-4 text-slate-500">{item.startDate}</td>
                  <td className="px-4 py-4 text-slate-500">{item.nextBillingDate}</td>
                  <td className="px-4 py-4 text-right font-semibold text-slate-800">
                    {item.amount > 0 ? formatWon(item.amount) : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <Pill className={item.status === "활성" ? "bg-emerald-100 text-emerald-700" : item.status === "만료예정" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}>
                      {item.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SuperAdminPanel>
      )}
    </div>
  );
}

function renderRating(rating: number) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`text-[14px] ${index < rating ? "text-yellow-400" : "text-slate-200"}`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-[12px] text-slate-400">{rating}.0</span>
    </div>
  );
}

function getReviewTone(status: ReviewItem["status"]): PillToneClass {
  switch (status) {
    case "게시중":
      return "bg-emerald-100 text-emerald-700";
    case "답변완료":
      return "bg-blue-100 text-blue-700";
    case "답변대기":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function SuperAdminReviewsPage() {
  const [items, setItems] = useState(reviewItems);
  const [tab, setTab] = useState("전체");
  const [replyMap, setReplyMap] = useState<Record<number, string>>({});

  const filteredItems = items.filter((item) => {
    if (tab === "전체") {
      return true;
    }
    if (tab === "신고") {
      return item.isReported;
    }
    return item.type === tab;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 rounded-full bg-[#f5f7fb] p-1 w-fit">
        {["전체", "리뷰", "Q&A", "신고"].map((item) => (
          <FilterChip
            key={item}
            active={tab === item}
            label={item}
            onClick={() => setTab(item)}
          />
        ))}
      </div>

      <SuperAdminPanel title="리뷰 / Q&A 관리" description="신고 리뷰를 숨기고 Q&A에는 운영 답변을 남깁니다.">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`rounded-[18px] border p-5 ${item.isReported ? "border-red-100 bg-red-50/40" : "border-[#e4e8f1] bg-white"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Pill className={item.type === "리뷰" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}>
                      {item.type}
                    </Pill>
                    <Pill className={getReviewTone(item.status)}>{item.status}</Pill>
                    {item.isReported ? (
                      <Pill className="bg-red-100 text-red-700">신고됨</Pill>
                    ) : null}
                  </div>
                  <h4 className="mt-3 text-[17px] font-semibold text-slate-900">
                    {item.productName}
                  </h4>
                  {item.rating ? <div className="mt-2">{renderRating(item.rating)}</div> : null}
                  <p className="mt-3 text-[14px] leading-7 text-slate-600">
                    {item.content}
                  </p>
                  <p className="mt-3 text-[12px] text-slate-400">
                    {item.author} / {item.company} / {item.createdAt}
                  </p>
                </div>
                <div className="flex gap-4">
                  <TableActionButton
                    label={item.status === "숨김" ? "복구" : "숨김"}
                    tone={item.status === "숨김" ? "green" : "red"}
                    onClick={() =>
                      setItems((previous) =>
                        previous.map((review) =>
                          review.id === item.id
                            ? {
                                ...review,
                                status:
                                  review.status === "숨김" ? "게시중" : "숨김",
                              }
                            : review,
                        ),
                      )
                    }
                  />
                </div>
              </div>
              {item.reply ? (
                <div className="mt-4 rounded-[16px] bg-[#f0f9ff] px-4 py-4 text-[14px] text-slate-700">
                  <p className="text-[12px] font-medium text-slate-400">운영 답변</p>
                  <p className="mt-2 leading-7">{item.reply}</p>
                </div>
              ) : null}
              {item.type === "Q&A" && item.status !== "답변완료" ? (
                <div className="mt-4 rounded-[16px] border border-[#e4e8f1] bg-[#fbfcff] p-4">
                  <div className="flex gap-3">
                    <AdminTextarea
                      rows={3}
                      value={replyMap[item.id] ?? ""}
                      onChange={(event) =>
                        setReplyMap((previous) => ({
                          ...previous,
                          [item.id]: event.target.value,
                        }))
                      }
                      placeholder="운영 답변을 입력하세요."
                    />
                    <AdminButton
                      type="button"
                      className="self-end"
                      onClick={() =>
                        setItems((previous) =>
                          previous.map((review) =>
                            review.id === item.id
                              ? {
                                  ...review,
                                  reply: replyMap[item.id],
                                  status: "답변완료",
                                }
                              : review,
                          ),
                        )
                      }
                    >
                      답변 등록
                    </AdminButton>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </SuperAdminPanel>
    </div>
  );
}

const settingSections = [
  { id: "general", label: "기본 설정", icon: <SettingsIcon className="h-4 w-4" /> },
  { id: "notifications", label: "알림 설정", icon: <BellIcon className="h-4 w-4" /> },
  { id: "billing", label: "결제/수수료", icon: <WalletIcon className="h-4 w-4" /> },
  { id: "content", label: "운영 콘텐츠", icon: <MegaphoneIcon className="h-4 w-4" /> },
];

export function SuperAdminSettingsPage() {
  const [section, setSection] = useState("general");
  const [siteName, setSiteName] = useState("예서커머스");
  const [siteUrl, setSiteUrl] = useState("https://yeseocommerce.co.kr");
  const [contactEmail, setContactEmail] = useState("admin@yeseocommerce.co.kr");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [requireApproval, setRequireApproval] = useState(true);
  const [orderAlertEmail, setOrderAlertEmail] = useState(true);
  const [partnerAlertEmail, setPartnerAlertEmail] = useState(true);
  const [defaultFee, setDefaultFee] = useState("12");
  const [businessFee, setBusinessFee] = useState("10");
  const [noticeTemplate, setNoticeTemplate] = useState("운영 공지 템플릿을 관리합니다.");

  return (
    <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-5">
      <aside className="admin-card h-fit overflow-hidden">
        {settingSections.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`flex w-full items-center gap-3 border-b border-[#eef2f8] px-5 py-4 text-left text-[14px] font-medium transition last:border-b-0 ${
              section === item.id
                ? "bg-[#eef3ff] text-[#2f6eff]"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </aside>

      <div className="space-y-5">
        {section === "general" ? (
          <SuperAdminPanel
            title="기본 설정"
            description="플랫폼 기본 정보와 운영 옵션을 관리합니다."
            action={<AdminButton type="button">저장</AdminButton>}
          >
            <div className="grid grid-cols-2 gap-4">
              <AdminField label="사이트명">
                <AdminInput value={siteName} onChange={(event) => setSiteName(event.target.value)} />
              </AdminField>
              <AdminField label="사이트 URL">
                <AdminInput value={siteUrl} onChange={(event) => setSiteUrl(event.target.value)} />
              </AdminField>
              <AdminField label="운영 이메일">
                <AdminInput value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} />
              </AdminField>
              <div className="rounded-[16px] bg-[#f8faff] px-4 py-4">
                <p className="text-[12px] font-medium text-slate-400">점검 모드</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[14px] text-slate-600">사이트 전체 접근 제한</span>
                  <SuperAdminToggle value={maintenanceMode} onChange={setMaintenanceMode} />
                </div>
              </div>
              <div className="rounded-[16px] bg-[#f8faff] px-4 py-4">
                <p className="text-[12px] font-medium text-slate-400">협력사 승인 필수</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[14px] text-slate-600">수동 승인 프로세스 유지</span>
                  <SuperAdminToggle value={requireApproval} onChange={setRequireApproval} />
                </div>
              </div>
            </div>
          </SuperAdminPanel>
        ) : null}

        {section === "notifications" ? (
          <SuperAdminPanel
            title="알림 설정"
            description="운영팀과 협력사에게 발송되는 주요 알림을 설정합니다."
            action={<AdminButton type="button">저장</AdminButton>}
          >
            <div className="space-y-4">
              <div className="rounded-[16px] bg-[#f8faff] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-semibold text-slate-900">신규 주문 알림</p>
                    <p className="mt-1 text-[13px] text-slate-500">주문 발생 시 운영팀 이메일 발송</p>
                  </div>
                  <SuperAdminToggle value={orderAlertEmail} onChange={setOrderAlertEmail} />
                </div>
              </div>
              <div className="rounded-[16px] bg-[#f8faff] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-semibold text-slate-900">신규 협력사 알림</p>
                    <p className="mt-1 text-[13px] text-slate-500">입점 신청 접수 시 담당자 이메일 발송</p>
                  </div>
                  <SuperAdminToggle value={partnerAlertEmail} onChange={setPartnerAlertEmail} />
                </div>
              </div>
            </div>
          </SuperAdminPanel>
        ) : null}

        {section === "billing" ? (
          <SuperAdminPanel
            title="결제 및 수수료"
            description="기본 수수료율과 플랜별 정책을 조정합니다."
            action={<AdminButton type="button">저장</AdminButton>}
          >
            <div className="grid grid-cols-2 gap-4">
              <AdminField label="기본 수수료율 (%)">
                <AdminInput value={defaultFee} onChange={(event) => setDefaultFee(event.target.value)} />
              </AdminField>
              <AdminField label="비즈니스 플랜 수수료율 (%)">
                <AdminInput value={businessFee} onChange={(event) => setBusinessFee(event.target.value)} />
              </AdminField>
            </div>
          </SuperAdminPanel>
        ) : null}

        {section === "content" ? (
          <SuperAdminPanel
            title="운영 콘텐츠"
            description="공지 템플릿과 기본 운영 문구를 편집합니다."
            action={<AdminButton type="button">저장</AdminButton>}
          >
            <AdminField label="공지 템플릿">
              <AdminTextarea
                rows={8}
                value={noticeTemplate}
                onChange={(event) => setNoticeTemplate(event.target.value)}
              />
            </AdminField>
          </SuperAdminPanel>
        ) : null}
      </div>
    </div>
  );
}
