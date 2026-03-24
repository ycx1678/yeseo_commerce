import { DownloadIcon } from "@/components/admin/AdminIcons";
import { AdminButton, AdminStatusBadge } from "@/components/admin/AdminUi";

const mockSettlements = [
  { id: "SET-2024-03", period: "2024년 3월", totalSales: 45230000, commission: 4523000, settlement: 40707000, status: "정산대기", date: "2024-04-05" },
  { id: "SET-2024-02", period: "2024년 2월", totalSales: 38450000, commission: 3845000, settlement: 34605000, status: "정산완료", date: "2024-03-05" },
  { id: "SET-2024-01", period: "2024년 1월", totalSales: 42180000, commission: 4218000, settlement: 37962000, status: "정산완료", date: "2024-02-05" },
  { id: "SET-2023-12", period: "2023년 12월", totalSales: 51320000, commission: 5132000, settlement: 46188000, status: "정산완료", date: "2024-01-05" },
] as const;

const recentTransactions = [
  { date: "2024-03-23", orderId: "ORD-2024-001", product: "프리미엄 노트북 거치대", amount: 450000, commission: 45000 },
  { date: "2024-03-23", orderId: "ORD-2024-002", product: "무선 마우스 세트", amount: 625000, commission: 62500 },
  { date: "2024-03-22", orderId: "ORD-2024-003", product: "USB-C 허브", amount: 975000, commission: 97500 },
  { date: "2024-03-22", orderId: "ORD-2024-004", product: "블루투스 키보드", amount: 640000, commission: 64000 },
  { date: "2024-03-21", orderId: "ORD-2024-005", product: "휴대용 보조배터리", amount: 1050000, commission: 105000 },
] as const;

export default function SettlementPage() {
  const upcomingSettlement = mockSettlements[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[14px] text-slate-500">
          월별 정산 내역과 최근 거래 기준 정산 금액을 확인할 수 있습니다.
        </p>
        <AdminButton tone="success" type="button">
          <DownloadIcon className="h-4 w-4" />
          정산서 다운로드
        </AdminButton>
      </div>

      <section className="overflow-hidden rounded-[18px] bg-gradient-to-r from-[#3f7bff] to-[#2f6eff] px-7 py-6 text-white">
        <p className="text-[13px] font-medium text-white/85">이번 달 정산 예정</p>
        <p className="mt-2 text-[34px] font-bold tracking-[-0.04em]">
          ₩{upcomingSettlement.settlement.toLocaleString()}
        </p>
        <p className="mt-1 text-[13px] text-white/80">정산일: {upcomingSettlement.date}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5">
          <div>
            <p className="text-[13px] text-white/75">총 매출</p>
            <p className="mt-1 text-[18px] font-semibold">
              ₩{upcomingSettlement.totalSales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[13px] text-white/75">수수료 (10%)</p>
            <p className="mt-1 text-[18px] font-semibold">
              ₩{upcomingSettlement.commission.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-[#e4e8f1] px-6 py-5">
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
            월별 정산 내역
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-[#fafbfe]">
              <tr className="text-left text-[13px] font-semibold text-slate-400">
                <th className="px-6 py-4">정산번호</th>
                <th className="px-6 py-4">정산기간</th>
                <th className="px-6 py-4">총 매출</th>
                <th className="px-6 py-4">수수료</th>
                <th className="px-6 py-4">정산금액</th>
                <th className="px-6 py-4">정산일</th>
                <th className="px-6 py-4">상태</th>
              </tr>
            </thead>
            <tbody>
              {mockSettlements.map((settlement) => (
                <tr
                  key={settlement.id}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">{settlement.id}</td>
                  <td className="px-6 py-4 text-slate-800">{settlement.period}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    ₩{settlement.totalSales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-red-500">
                    -₩{settlement.commission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ₩{settlement.settlement.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{settlement.date}</td>
                  <td className="px-6 py-4">
                    <AdminStatusBadge
                      tone={settlement.status === "정산완료" ? "green" : "yellow"}
                    >
                      {settlement.status}
                    </AdminStatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-[#e4e8f1] px-6 py-5">
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
            최근 거래 내역
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-[#fafbfe]">
              <tr className="text-left text-[13px] font-semibold text-slate-400">
                <th className="px-6 py-4">일자</th>
                <th className="px-6 py-4">주문번호</th>
                <th className="px-6 py-4">상품명</th>
                <th className="px-6 py-4">판매금액</th>
                <th className="px-6 py-4">수수료</th>
                <th className="px-6 py-4">정산금액</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr
                  key={`${transaction.orderId}-${transaction.date}`}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-6 py-4 text-slate-500">{transaction.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{transaction.orderId}</td>
                  <td className="px-6 py-4 text-slate-800">{transaction.product}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    ₩{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-red-500">
                    -₩{transaction.commission.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ₩{(transaction.amount - transaction.commission).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
