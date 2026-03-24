"use client";

import { useState } from "react";
import { PlusIcon, SearchIcon } from "@/components/admin/AdminIcons";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminModal,
  AdminSelect,
  AdminStatusBadge,
  AdminTextarea,
} from "@/components/admin/AdminUi";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "판매중" | "품절";
};

const mockProducts: Product[] = [
  { id: 1, name: "프리미엄 노트북 거치대", category: "사무용품", price: 45000, stock: 150, status: "판매중" },
  { id: 2, name: "무선 마우스 세트", category: "전자기기", price: 25000, stock: 320, status: "판매중" },
  { id: 3, name: "USB-C 허브", category: "전자기기", price: 65000, stock: 85, status: "판매중" },
  { id: 4, name: "블루투스 키보드", category: "전자기기", price: 80000, stock: 42, status: "판매중" },
  { id: 5, name: "휴대용 보조배터리", category: "전자기기", price: 35000, stock: 0, status: "품절" },
  { id: 6, name: "책상 정리함", category: "사무용품", price: 15000, stock: 200, status: "판매중" },
];

export default function ProductManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const keyword = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[14px] text-slate-500">
          등록된 상품을 검색하고 새 상품을 추가할 수 있습니다.
        </p>
        <AdminButton type="button" onClick={() => setShowAddModal(true)}>
          <PlusIcon className="h-4 w-4" />
          상품 등록
        </AdminButton>
      </div>

      <section className="admin-card p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <AdminInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="상품명 또는 카테고리로 검색"
              className="pl-11"
            />
          </div>
          <AdminSelect defaultValue="전체 카테고리" className="lg:w-[180px]">
            <option>전체 카테고리</option>
            <option>사무용품</option>
            <option>전자기기</option>
          </AdminSelect>
          <AdminSelect defaultValue="전체 상태" className="lg:w-[160px]">
            <option>전체 상태</option>
            <option>판매중</option>
            <option>품절</option>
          </AdminSelect>
        </div>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#fafbfe]">
              <tr className="text-left text-[13px] font-semibold text-slate-400">
                <th className="px-6 py-4">상품명</th>
                <th className="px-6 py-4">카테고리</th>
                <th className="px-6 py-4">가격</th>
                <th className="px-6 py-4">재고</th>
                <th className="px-6 py-4">상태</th>
                <th className="px-6 py-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-[#e4e8f1] text-[14px] text-slate-700"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-slate-100 text-[11px] font-semibold text-slate-400">
                        IMG
                      </div>
                      <span className="font-medium text-slate-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    ₩{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{product.stock}개</td>
                  <td className="px-6 py-4">
                    <AdminStatusBadge
                      tone={product.status === "판매중" ? "green" : "red"}
                    >
                      {product.status}
                    </AdminStatusBadge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4 text-[13px] font-medium">
                      <button type="button" className="text-slate-500 transition hover:text-[#2f6eff]">
                        보기
                      </button>
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
        title="상품 등록"
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
              등록하기
            </AdminButton>
          </div>
        }
      >
        <div className="space-y-4">
          <AdminField label="상품명">
            <AdminInput placeholder="상품명을 입력하세요" />
          </AdminField>
          <AdminField label="카테고리">
            <AdminSelect className="w-full">
              <option>카테고리 선택</option>
              <option>사무용품</option>
              <option>전자기기</option>
            </AdminSelect>
          </AdminField>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="가격">
              <AdminInput type="number" placeholder="0" />
            </AdminField>
            <AdminField label="재고">
              <AdminInput type="number" placeholder="0" />
            </AdminField>
          </div>
          <AdminField label="상품 설명">
            <AdminTextarea rows={5} placeholder="상품 설명을 입력하세요" />
          </AdminField>
        </div>
      </AdminModal>
    </div>
  );
}
