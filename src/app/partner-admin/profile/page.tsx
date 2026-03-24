"use client";

import { useState } from "react";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
} from "@/components/admin/AdminUi";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: "샘플 협력사",
    businessNumber: "123-45-67890",
    representative: "홍길동",
    email: "partner@example.com",
    phone: "02-1234-5678",
    mobile: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
    detailAddress: "ABC빌딩 5층",
    accountBank: "국민은행",
    accountNumber: "123-456-789012",
    accountHolder: "샘플 협력사",
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[14px] text-slate-500">
          협력사 기본 정보와 정산 계좌 정보를 확인하고 수정할 수 있습니다.
        </p>
        {isEditing ? (
          <div className="flex gap-3">
            <AdminButton
              type="button"
              tone="secondary"
              onClick={() => setIsEditing(false)}
            >
              취소
            </AdminButton>
            <AdminButton type="button" onClick={() => setIsEditing(false)}>
              저장
            </AdminButton>
          </div>
        ) : (
          <AdminButton type="button" onClick={() => setIsEditing(true)}>
            정보 수정
          </AdminButton>
        )}
      </div>

      <section className="admin-card p-6">
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
          기본 정보
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <AdminField label="협력사명">
            <AdminInput
              value={profileData.companyName}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, companyName: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
          <AdminField label="사업자등록번호" hint="사업자등록번호는 변경할 수 없습니다">
            <AdminInput
              value={profileData.businessNumber}
              disabled
              className="bg-slate-50 text-slate-500"
            />
          </AdminField>
          <AdminField label="대표자명">
            <AdminInput
              value={profileData.representative}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, representative: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
        </div>
      </section>

      <section className="admin-card p-6">
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
          연락처 정보
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <AdminField label="이메일">
            <AdminInput
              type="email"
              value={profileData.email}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, email: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
          <AdminField label="대표 전화">
            <AdminInput
              value={profileData.phone}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, phone: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
          <AdminField label="휴대폰">
            <AdminInput
              value={profileData.mobile}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, mobile: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
        </div>
      </section>

      <section className="admin-card p-6">
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
          주소 정보
        </h3>
        <div className="mt-5 space-y-4">
          <AdminField label="주소">
            <div className="flex gap-3">
              <AdminInput
                value={profileData.address}
                disabled
                className="bg-slate-50 text-slate-500"
              />
              {isEditing ? (
                <AdminButton type="button" tone="secondary" className="shrink-0">
                  주소 검색
                </AdminButton>
              ) : null}
            </div>
          </AdminField>
          <AdminField label="상세주소">
            <AdminInput
              value={profileData.detailAddress}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, detailAddress: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
        </div>
      </section>

      <section className="admin-card p-6">
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
          정산 계좌 정보
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <AdminField label="은행">
            <AdminSelect
              value={profileData.accountBank}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, accountBank: event.target.value }))
              }
              disabled={!isEditing}
              className={`w-full ${isEditing ? "" : "bg-slate-50 text-slate-500"}`}
            >
              <option>국민은행</option>
              <option>신한은행</option>
              <option>우리은행</option>
              <option>하나은행</option>
              <option>기업은행</option>
            </AdminSelect>
          </AdminField>
          <AdminField label="계좌번호">
            <AdminInput
              value={profileData.accountNumber}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, accountNumber: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
          <AdminField label="예금주">
            <AdminInput
              value={profileData.accountHolder}
              onChange={(event) =>
                setProfileData((current) => ({ ...current, accountHolder: event.target.value }))
              }
              disabled={!isEditing}
              className={isEditing ? "" : "bg-slate-50 text-slate-500"}
            />
          </AdminField>
        </div>
      </section>
    </div>
  );
}
