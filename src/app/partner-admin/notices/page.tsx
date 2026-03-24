"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/admin/AdminIcons";
import { AdminInput, AdminStatusBadge } from "@/components/admin/AdminUi";

type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
  important: boolean;
  category: string;
};

const mockNotices: Notice[] = [
  {
    id: 1,
    title: "3월 정산 일정 안내",
    content:
      "2024년 3월분 정산은 4월 5일에 진행될 예정입니다. 정산 금액은 등록된 계좌로 입금되며, 정산서는 마이페이지에서 다운로드 가능합니다.",
    date: "2024-03-20",
    important: true,
    category: "정산",
  },
  {
    id: 2,
    title: "신규 카테고리 추가 안내",
    content:
      "협력사 여러분의 요청에 따라 '친환경 제품' 카테고리가 새롭게 추가되었습니다. 해당 카테고리에 맞는 상품이 있으시다면 등록해 주시기 바랍니다.",
    date: "2024-03-18",
    important: false,
    category: "상품",
  },
  {
    id: 3,
    title: "배송비 정책 변경 안내",
    content:
      "4월 1일부터 배송비 정책이 변경됩니다. 50,000원 이상 구매 시 무료배송이 적용되며, 미만 구매 시 3,000원의 배송비가 부과됩니다.",
    date: "2024-03-15",
    important: true,
    category: "배송",
  },
  {
    id: 4,
    title: "구독상품 기능 업데이트",
    content:
      "구독상품 관리 기능이 개선되었습니다. 이제 더 다양한 구독 주기를 설정할 수 있으며, 구독자 관리가 더욱 편리해졌습니다.",
    date: "2024-03-12",
    important: false,
    category: "시스템",
  },
  {
    id: 5,
    title: "2월 우수 협력사 선정",
    content:
      "2024년 2월 우수 협력사가 선정되었습니다. 우수 협력사에게는 다음 달 수수료 할인 혜택이 제공됩니다. 축하드립니다.",
    date: "2024-03-10",
    important: false,
    category: "이벤트",
  },
  {
    id: 6,
    title: "개인정보 처리방침 개정 안내",
    content:
      "개인정보 처리방침이 일부 개정되었습니다. 자세한 내용은 공지사항을 확인해 주시기 바랍니다.",
    date: "2024-03-05",
    important: true,
    category: "정책",
  },
];

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [expandedNotices, setExpandedNotices] = useState<number[]>([]);

  const categories = ["전체", ...new Set(mockNotices.map((notice) => notice.category))];

  const filteredNotices = mockNotices.filter((notice) => {
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      notice.title.toLowerCase().includes(keyword) ||
      notice.content.toLowerCase().includes(keyword);
    const matchesCategory =
      selectedCategory === "전체" || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedNotices((current) =>
      current.includes(id)
        ? current.filter((noticeId) => noticeId !== id)
        : [...current, id],
    );
  };

  return (
    <div className="space-y-5">
      <p className="text-[14px] text-slate-500">
        운영팀이 전달한 중요 공지와 카테고리별 안내사항을 확인할 수 있습니다.
      </p>

      <section className="rounded-[18px] border border-red-200 bg-red-50 px-6 py-5">
        <h3 className="text-[16px] font-semibold text-red-900">중요 공지사항</h3>
        <ul className="mt-3 space-y-1.5 text-[14px] text-red-800">
          {mockNotices
            .filter((notice) => notice.important)
            .map((notice) => (
              <li key={notice.id}>
                • {notice.title} ({notice.date})
              </li>
            ))}
        </ul>
      </section>

      <section className="admin-card p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <AdminInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="공지사항 제목 또는 내용으로 검색"
              className="pl-11"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 rounded-[12px] border border-[#d8deea] bg-white px-4 text-[14px] text-slate-800 outline-none lg:w-[180px]"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-3">
        {filteredNotices.map((notice) => {
          const isExpanded = expandedNotices.includes(notice.id);

          return (
            <article key={notice.id} className="admin-card overflow-hidden">
              <button
                type="button"
                onClick={() => toggleExpanded(notice.id)}
                className="w-full px-6 py-5 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {notice.important ? (
                        <AdminStatusBadge tone="red">중요</AdminStatusBadge>
                      ) : null}
                      <AdminStatusBadge tone="slate">{notice.category}</AdminStatusBadge>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900">
                      {notice.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-slate-400">{notice.date}</p>
                  </div>
                  <span className="text-[13px] font-medium text-slate-400">
                    {isExpanded ? "닫기" : "열기"}
                  </span>
                </div>
              </button>

              {isExpanded ? (
                <div className="border-t border-[#e4e8f1] px-6 py-5">
                  <p className="text-[14px] leading-7 text-slate-600">{notice.content}</p>
                </div>
              ) : null}
            </article>
          );
        })}

        {filteredNotices.length === 0 ? (
          <div className="admin-card px-6 py-12 text-center text-[14px] text-slate-400">
            검색 결과가 없습니다.
          </div>
        ) : null}
      </section>
    </div>
  );
}
