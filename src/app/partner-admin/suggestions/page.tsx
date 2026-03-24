"use client";

import { type FormEvent, useState } from "react";
import { MessageIcon } from "@/components/admin/AdminIcons";
import {
  AdminButton,
  AdminField,
  AdminSelect,
  AdminStatusBadge,
  AdminTextarea,
  AdminInput,
} from "@/components/admin/AdminUi";

type Suggestion = {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
  status: "완료" | "검토중" | "접수완료";
  response: string | null;
};

const initialSuggestions: Suggestion[] = [
  {
    id: 1,
    title: "상품 일괄 등록 기능 추가 요청",
    category: "기능개선",
    content:
      "상품을 하나씩 등록하는 것이 번거로워서 엑셀 파일로 일괄 등록할 수 있는 기능이 있었으면 좋겠습니다.",
    date: "2024-03-20",
    status: "검토중",
    response: null,
  },
  {
    id: 2,
    title: "배송 추적 기능 개선",
    category: "기능개선",
    content:
      "실시간 배송 추적이 가능하도록 개선해 주시면 고객 응대에 도움이 될 것 같습니다.",
    date: "2024-03-15",
    status: "완료",
    response:
      "소중한 의견 감사합니다. 다음 업데이트에 실시간 배송 추적 기능이 포함될 예정입니다.",
  },
  {
    id: 3,
    title: "정산 보고서 양식 변경 요청",
    category: "정산",
    content:
      "정산 보고서에 품목별 상세 내역이 포함되었으면 합니다.",
    date: "2024-03-10",
    status: "검토중",
    response: null,
  },
];

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "기능개선",
    content: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newSuggestion: Suggestion = {
      id: suggestions.length + 1,
      title: formData.title,
      category: formData.category,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
      status: "접수완료",
      response: null,
    };

    setSuggestions((current) => [newSuggestion, ...current]);
    setFormData({
      title: "",
      category: "기능개선",
      content: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[14px] text-slate-500">
          서비스 개선을 위한 건의사항을 등록하고 운영팀 답변을 확인할 수 있습니다.
        </p>
        <AdminButton type="button" onClick={() => setShowForm((current) => !current)}>
          <MessageIcon className="h-4 w-4" />
          {showForm ? "작성 취소" : "건의하기"}
        </AdminButton>
      </div>

      {showForm ? (
        <section className="admin-card p-6">
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
            새 건의사항 작성
          </h3>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <AdminField label="제목">
              <AdminInput
                required
                value={formData.title}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="건의사항 제목을 입력하세요"
              />
            </AdminField>
            <AdminField label="카테고리">
              <AdminSelect
                value={formData.category}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, category: event.target.value }))
                }
                className="w-full"
              >
                <option>기능개선</option>
                <option>정산</option>
                <option>배송</option>
                <option>상품관리</option>
                <option>기타</option>
              </AdminSelect>
            </AdminField>
            <AdminField label="내용">
              <AdminTextarea
                required
                rows={6}
                value={formData.content}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, content: event.target.value }))
                }
                placeholder="건의사항 내용을 자세히 입력해 주세요"
              />
            </AdminField>
            <div className="flex justify-end gap-3">
              <AdminButton
                type="button"
                tone="secondary"
                onClick={() => setShowForm(false)}
              >
                취소
              </AdminButton>
              <AdminButton type="submit">제출하기</AdminButton>
            </div>
          </form>
        </section>
      ) : null}

      <section className="space-y-4">
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
          내 건의사항 내역
        </h3>

        {suggestions.map((suggestion) => (
          <article key={suggestion.id} className="admin-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <AdminStatusBadge tone="slate">{suggestion.category}</AdminStatusBadge>
                  <AdminStatusBadge
                    tone={
                      suggestion.status === "완료"
                        ? "green"
                        : suggestion.status === "검토중"
                          ? "blue"
                          : "slate"
                    }
                  >
                    {suggestion.status}
                  </AdminStatusBadge>
                </div>
                <h4 className="text-[16px] font-semibold tracking-[-0.02em] text-slate-900">
                  {suggestion.title}
                </h4>
                <p className="mt-1 text-[13px] text-slate-400">{suggestion.date}</p>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] bg-slate-50 px-4 py-4 text-[14px] leading-7 text-slate-600">
              {suggestion.content}
            </div>

            {suggestion.response ? (
              <div className="mt-4 border-t border-[#e4e8f1] pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2ff]">
                    <MessageIcon className="h-4 w-4 text-[#2f6eff]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900">운영진 답변</p>
                    <p className="mt-1 text-[14px] leading-7 text-slate-600">
                      {suggestion.response}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </article>
        ))}

        {suggestions.length === 0 && !showForm ? (
          <div className="admin-card px-6 py-12 text-center">
            <p className="text-[14px] text-slate-400">등록된 건의사항이 없습니다.</p>
            <div className="mt-4">
              <AdminButton type="button" onClick={() => setShowForm(true)}>
                건의사항 작성하기
              </AdminButton>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
