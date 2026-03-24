"use client";

import { useState } from "react";
import { PlusIcon, RepeatIcon, SearchIcon } from "@/components/admin/AdminIcons";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminModal,
  AdminSelect,
  AdminStatusBadge,
  AdminTextarea,
} from "@/components/admin/AdminUi";

type SubscriptionProduct = {
  id: number;
  product: string;
  price: number;
  subscriptionPrice: number;
  cycle: string;
  subscribers: number;
  status: "활성";
};

const mockSubscriptions: SubscriptionProduct[] = [
  { id: 1, product: "프리미엄 노트북 거치대", price: 45000, subscriptionPrice: 40000, cycle: "월간", subscribers: 24, status: "활성" },
  { id: 2, product: "무선 마우스 세트", price: 25000, subscriptionPrice: 22000, cycle: "월간", subscribers: 15, status: "활성" },
  { id: 3, product: "USB-C 허브", price: 65000, subscriptionPrice: 58000, cycle: "월간", subscribers: 8, status: "활성" },
];

const availableProducts = [
  { id: 4, name: "블루투스 키보드", price: 80000 },
  { id: 5, name: "휴대용 보조배터리", price: 35000 },
  { id: 6, name: "책상 정리함", price: 15000 },
] as const;

export default function SubscriptionProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSubscriptions = mockSubscriptions.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalSubscribers = mockSubscriptions.reduce(
    (sum, item) => sum + item.subscribers,
    0,
  );
  const monthlyRevenue = mockSubscriptions.reduce(
    (sum, item) => sum + item.subscriptionPrice * item.subscribers,
    0,
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[14px] text-slate-500">
          정기 구독 상품을 등록하고 월 예상 매출을 관리할 수 있습니다.
        </p>
        <AdminButton type="button" onClick={() => setShowAddModal(true)}>
          <PlusIcon className="h-4 w-4" />
          구독상품 추가
        </AdminButton>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "구독상품 수", value: mockSubscriptions.length, tone: "text-[#2f6eff]" },
          { label: "총 구독자", value: totalSubscribers, tone: "text-emerald-500" },
          { label: "월 예상 매출", value: `₩${monthlyRevenue.toLocaleString()}`, tone: "text-violet-500" },
        ].map((item) => (
          <article key={item.label} className="admin-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-slate-50">
                <RepeatIcon className={`h-6 w-6 ${item.tone}`} />
              </div>
              <div>
                <p className="text-[13px] font-medium text-slate-400">{item.label}</p>
                <p className={`mt-2 text-[26px] font-bold tracking-[-0.04em] ${item.tone}`}>
                  {item.value}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-card p-5">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <AdminInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="상품명으로 검색"
            className="pl-11"
          />
        </div>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px]">
            <thead className="bg-[#fafbfe]">
              <tr className="text-left text-[13px] font-semibold text-slate-400">
                <th className="px-6 py-4">상품명</th>
                <th className="px-6 py-4">일반가격</th>
                <th className="px-6 py-4">구독가격</th>
                <th className="px-6 py-4">구독주기</th>
                <th className="px-6 py-4">구독자</th>
                <th className="px-6 py-4">상태</th>
                <th className="px-6 py-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <RepeatIcon className="h-5 w-5 text-[#2f6eff]" />
                      <span className="font-medium text-slate-800">{subscription.product}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    ₩{subscription.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">
                        ₩{subscription.subscriptionPrice.toLocaleString()}
                      </p>
                      <p className="mt-1 text-[12px] font-medium text-emerald-500">
                        {Math.round((1 - subscription.subscriptionPrice / subscription.price) * 100)}% 할인
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{subscription.cycle}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {subscription.subscribers}명
                  </td>
                  <td className="px-6 py-4">
                    <AdminStatusBadge tone="green">{subscription.status}</AdminStatusBadge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4 text-[13px] font-medium">
                      <button type="button" className="text-slate-500 transition hover:text-[#2f6eff]">
                        수정
                      </button>
                      <button type="button" className="text-slate-500 transition hover:text-red-500">
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdminModal
        open={showAddModal}
        title="구독상품 추가"
        onClose={() => setShowAddModal(false)}
        footer={
          <div className="flex justify-end gap-3">
            <AdminButton
              type="button"
              tone="secondary"
              onClick={() => setShowAddModal(false)}
            >
              취소
            </AdminButton>
            <AdminButton type="button" onClick={() => setShowAddModal(false)}>
              추가하기
            </AdminButton>
          </div>
        }
      >
        <div className="space-y-4">
          <AdminField label="상품 선택">
            <AdminSelect className="w-full">
              <option>상품을 선택하세요</option>
              {availableProducts.map((product) => (
                <option key={product.id}>
                  {product.name} (₩{product.price.toLocaleString()})
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <AdminField label="구독가격">
            <AdminInput type="number" placeholder="구독 시 할인된 가격을 입력하세요" />
          </AdminField>
          <AdminField label="구독주기">
            <AdminSelect className="w-full">
              <option>월간</option>
              <option>분기</option>
              <option>반기</option>
              <option>연간</option>
            </AdminSelect>
          </AdminField>
          <AdminField label="구독 혜택 설명">
            <AdminTextarea rows={4} placeholder="구독 시 제공되는 혜택을 입력하세요" />
          </AdminField>
        </div>
      </AdminModal>
    </div>
  );
}
