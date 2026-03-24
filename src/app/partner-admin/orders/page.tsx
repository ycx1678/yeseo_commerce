"use client";

import { useState } from "react";
import { DownloadIcon, SearchIcon } from "@/components/admin/AdminIcons";
import {
  AdminButton,
  AdminInput,
  AdminModal,
  AdminStatusBadge,
} from "@/components/admin/AdminUi";

type Order = {
  id: string;
  product: string;
  customer: string;
  quantity: number;
  amount: number;
  status: "주문완료" | "배송중" | "배송완료";
  date: string;
  address: string;
};

const mockOrders: Order[] = [
  { id: "ORD-2024-001", product: "프리미엄 노트북 거치대", customer: "김철수", quantity: 10, amount: 450000, status: "배송중", date: "2024-03-23", address: "서울시 강남구 테헤란로 123" },
  { id: "ORD-2024-002", product: "무선 마우스 세트", customer: "이영희", quantity: 25, amount: 625000, status: "주문완료", date: "2024-03-23", address: "서울시 서초구 서초대로 456" },
  { id: "ORD-2024-003", product: "USB-C 허브", customer: "박민수", quantity: 15, amount: 975000, status: "배송완료", date: "2024-03-22", address: "경기도 성남시 분당구 판교로 789" },
  { id: "ORD-2024-004", product: "블루투스 키보드", customer: "정수진", quantity: 8, amount: 640000, status: "배송중", date: "2024-03-22", address: "인천시 연수구 송도대로 321" },
  { id: "ORD-2024-005", product: "휴대용 보조배터리", customer: "최동욱", quantity: 30, amount: 1050000, status: "주문완료", date: "2024-03-21", address: "부산시 해운대구 해운대로 654" },
  { id: "ORD-2024-006", product: "책상 정리함", customer: "한지연", quantity: 50, amount: 750000, status: "배송완료", date: "2024-03-21", address: "대전시 유성구 대학로 987" },
];

function getOrderTone(status: Order["status"]) {
  if (status === "배송완료") return "green";
  if (status === "배송중") return "blue";
  return "slate";
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = mockOrders.filter((order) => {
    const keyword = searchTerm.toLowerCase();

    return (
      order.id.toLowerCase().includes(keyword) ||
      order.product.toLowerCase().includes(keyword) ||
      order.customer.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[14px] text-slate-500">
          내 상품에 대한 주문 현황과 상세 정보를 확인할 수 있습니다.
        </p>
        <AdminButton tone="success" type="button">
          <DownloadIcon className="h-4 w-4" />
          엑셀 다운로드
        </AdminButton>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "총 주문", value: mockOrders.length, className: "text-slate-900" },
          { label: "주문완료", value: mockOrders.filter((order) => order.status === "주문완료").length, className: "text-[#2f6eff]" },
          { label: "배송중", value: mockOrders.filter((order) => order.status === "배송중").length, className: "text-orange-500" },
          { label: "배송완료", value: mockOrders.filter((order) => order.status === "배송완료").length, className: "text-emerald-500" },
        ].map((item) => (
          <article key={item.label} className="admin-card p-5">
            <p className="text-[13px] font-medium text-slate-400">{item.label}</p>
            <p className={`mt-2 text-[28px] font-bold tracking-[-0.04em] ${item.className}`}>
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="admin-card p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <AdminInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="주문번호, 상품명, 고객명으로 검색"
              className="pl-11"
            />
          </div>
          <select className="h-11 rounded-[12px] border border-[#d8deea] bg-white px-4 text-[14px] text-slate-800 outline-none lg:w-[180px]">
            <option>전체 상태</option>
            <option>주문완료</option>
            <option>배송중</option>
            <option>배송완료</option>
          </select>
          <AdminButton type="button" tone="secondary">
            필터
          </AdminButton>
        </div>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-[#fafbfe]">
              <tr className="text-left text-[13px] font-semibold text-slate-400">
                <th className="px-6 py-4">주문번호</th>
                <th className="px-6 py-4">상품명</th>
                <th className="px-6 py-4">고객명</th>
                <th className="px-6 py-4">수량</th>
                <th className="px-6 py-4">금액</th>
                <th className="px-6 py-4">주문일</th>
                <th className="px-6 py-4">상태</th>
                <th className="px-6 py-4 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">{order.id}</td>
                  <td className="px-6 py-4 text-slate-800">{order.product}</td>
                  <td className="px-6 py-4 text-slate-500">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{order.quantity}개</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    ₩{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <AdminStatusBadge tone={getOrderTone(order.status)}>
                      {order.status}
                    </AdminStatusBadge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="text-[13px] font-medium text-slate-500 transition hover:text-[#2f6eff]"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdminModal
        open={selectedOrder !== null}
        title="주문 상세 정보"
        onClose={() => setSelectedOrder(null)}
        footer={
          <div className="flex justify-end">
            <AdminButton type="button" onClick={() => setSelectedOrder(null)}>
              닫기
            </AdminButton>
          </div>
        }
      >
        {selectedOrder ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] text-slate-400">주문번호</p>
                <p className="mt-1 text-[15px] font-medium text-slate-800">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400">주문일</p>
                <p className="mt-1 text-[15px] font-medium text-slate-800">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400">고객명</p>
                <p className="mt-1 text-[15px] font-medium text-slate-800">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400">주문 상태</p>
                <div className="mt-2">
                  <AdminStatusBadge tone={getOrderTone(selectedOrder.status)}>
                    {selectedOrder.status}
                  </AdminStatusBadge>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[13px] text-slate-400">배송지</p>
              <p className="mt-1 text-[15px] font-medium text-slate-800">{selectedOrder.address}</p>
            </div>

            <div className="rounded-[16px] border border-[#e4e8f1] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] font-semibold text-slate-800">{selectedOrder.product}</p>
                  <p className="mt-1 text-[13px] text-slate-500">수량: {selectedOrder.quantity}개</p>
                </div>
                <p className="text-[17px] font-semibold text-slate-900">
                  ₩{selectedOrder.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}
