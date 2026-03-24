import {
  CartIcon,
  CurrencyIcon,
  PackageIcon,
  TrendUpIcon,
} from "@/components/admin/AdminIcons";

const summaryCards = [
  {
    label: "총 등록 상품",
    value: "248",
    delta: "+12",
    icon: PackageIcon,
    tint: "bg-blue-50 text-[#2f6eff]",
  },
  {
    label: "이번 달 주문",
    value: "152",
    delta: "+23",
    icon: CartIcon,
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "이번 달 매출",
    value: "₩45,230,000",
    delta: "+8.2%",
    icon: CurrencyIcon,
    tint: "bg-violet-50 text-violet-500",
  },
  {
    label: "구독 상품",
    value: "32",
    delta: "+5",
    icon: TrendUpIcon,
    tint: "bg-orange-50 text-orange-500",
  },
] as const;

const recentOrders = [
  {
    orderNo: "ORD-2024-001",
    product: "프리미엄 노트북 거치대",
    quantity: "10개",
    amount: "₩450,000",
    status: "배송중",
    statusClass: "bg-blue-100 text-blue-600",
  },
  {
    orderNo: "ORD-2024-002",
    product: "무선 마우스 세트",
    quantity: "25개",
    amount: "₩625,000",
    status: "주문완료",
    statusClass: "bg-slate-100 text-slate-500",
  },
  {
    orderNo: "ORD-2024-003",
    product: "USB-C 허브",
    quantity: "15개",
    amount: "₩975,000",
    status: "배송완료",
    statusClass: "bg-emerald-100 text-emerald-600",
  },
  {
    orderNo: "ORD-2024-004",
    product: "블루투스 키보드",
    quantity: "8개",
    amount: "₩640,000",
    status: "배송중",
    statusClass: "bg-blue-100 text-blue-600",
  },
] as const;

const notices = [
  {
    title: "3월 정산 일정 안내",
    date: "2024-03-20",
    important: true,
  },
  {
    title: "신규 카테고리 추가 안내",
    date: "2024-03-18",
    important: false,
  },
  {
    title: "배송비 정책 변경 안내",
    date: "2024-03-15",
    important: true,
  },
] as const;

const categoryData = [
  { name: "전자기기", value: 45, color: "#3B82F6" },
  { name: "사무용품", value: 30, color: "#10B981" },
  { name: "생활용품", value: 15, color: "#F59E0B" },
  { name: "기타", value: 10, color: "#6B7280" },
] as const;

const orderStatusData = [
  { name: "배송완료", value: 68, color: "#10B981" },
  { name: "배송중", value: 42, color: "#3B82F6" },
  { name: "주문완료", value: 42, color: "#F59E0B" },
] as const;

type ChartSlice = {
  name: string;
  value: number;
  color: string;
};

type DonutChartCardProps = {
  title: string;
  data: readonly ChartSlice[];
};

function buildConicGradient(data: readonly ChartSlice[]) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let start = 0;

  return `conic-gradient(${data
    .map((item) => {
      const startPercent = (start / total) * 100;
      start += item.value;
      const endPercent = (start / total) * 100;

      return `${item.color} ${startPercent}% ${endPercent}%`;
    })
    .join(", ")})`;
}

function formatPercent(value: number, total: number) {
  return `${Math.round((value / total) * 100)}%`;
}

function DonutChartCard({ title, data }: DonutChartCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="admin-card overflow-hidden">
      <div className="border-b border-[#e4e8f1] px-7 py-5">
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
          {title}
        </h3>
      </div>

      <div className="px-7 py-6">
        <div className="relative mx-auto h-[210px] w-[210px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: buildConicGradient(data),
            }}
          />
          <div className="absolute inset-[32px] rounded-full border border-[#eef2f8] bg-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[12px] font-medium text-slate-400">총 비중</p>
              <p className="mt-1 text-[30px] font-bold leading-none tracking-[-0.04em] text-slate-950">
                100%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#eef2f8] pt-5">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 text-[13px]"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate font-medium text-slate-500">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-slate-700">
                {formatPercent(item.value, total)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PartnerAdminPage() {
  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.label} className="admin-card h-[136px] px-7 py-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[14px] font-medium text-slate-400">
                    {card.label}
                  </p>
                  <p className="mt-4 text-[31px] font-bold leading-none tracking-[-0.04em] text-slate-950">
                    {card.value}
                  </p>
                  <p className="mt-4 text-[13px] font-semibold text-emerald-500">
                    {card.delta}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${card.tint}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-[minmax(0,2.05fr)_minmax(320px,0.96fr)] gap-5">
        <section className="admin-card overflow-hidden">
          <div className="border-b border-[#e4e8f1] px-7 py-5">
            <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
              최근 주문
            </h3>
          </div>

          <table className="w-full table-fixed">
            <thead className="bg-[#fafbfe] text-left">
              <tr className="text-[13px] font-semibold text-slate-400">
                <th className="px-7 py-4">주문번호</th>
                <th className="px-7 py-4">상품명</th>
                <th className="px-7 py-4">수량</th>
                <th className="px-7 py-4">금액</th>
                <th className="px-7 py-4">상태</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.orderNo}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-7 py-[18px] font-medium text-slate-700">
                    {order.orderNo}
                  </td>
                  <td className="px-7 py-[18px] font-medium text-slate-700">
                    {order.product}
                  </td>
                  <td className="px-7 py-[18px] text-slate-500">
                    {order.quantity}
                  </td>
                  <td className="px-7 py-[18px] text-slate-700">{order.amount}</td>
                  <td className="px-7 py-[18px]">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${order.statusClass}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="admin-card overflow-hidden">
          <div className="border-b border-[#e4e8f1] px-7 py-5">
            <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
              최근 공지사항
            </h3>
          </div>

          <div className="px-7 py-3">
            {notices.map((notice, index) => (
              <div
                key={notice.title}
                className={`py-5 ${
                  index !== notices.length - 1 ? "border-b border-[#e4e8f1]" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <h4 className="text-[15px] font-medium tracking-[-0.02em] text-slate-700">
                    {notice.title}
                  </h4>
                  {notice.important ? (
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-500">
                      중요
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[13px] text-slate-400">{notice.date}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="grid grid-cols-2 gap-5">
        <DonutChartCard title="카테고리별 판매 데이터" data={categoryData} />
        <DonutChartCard title="주문 상태별 데이터" data={orderStatusData} />
      </section>
    </div>
  );
}
