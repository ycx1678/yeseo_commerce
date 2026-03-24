"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PackageIcon } from "@/components/admin/AdminIcons";
import { useStorefront } from "./StorefrontProvider";

type OrdersPageProps = {
  latestOrderId?: string | null;
};

export function OrdersPage({ latestOrderId = null }: OrdersPageProps) {
  const { orders } = useStorefront();

  const sortedOrders = useMemo(() => {
    if (!latestOrderId) {
      return orders;
    }

    return [...orders].sort((left, right) => {
      if (left.id === latestOrderId) {
        return -1;
      }

      if (right.id === latestOrderId) {
        return 1;
      }

      return 0;
    });
  }, [latestOrderId, orders]);

  if (!sortedOrders.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <PackageIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-[30px] font-black tracking-[-0.05em] text-slate-900">
          아직 주문 내역이 없습니다
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-slate-500">
          첫 주문을 완료하면 납기 확인과 재주문 검토를 이곳에서 할 수 있습니다.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-[14px] bg-slate-900 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-slate-800"
        >
          상품 보러 가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#2f6eff]">
          Orders
        </p>
        <h1 className="mt-2 text-[36px] font-black tracking-[-0.05em] text-slate-900">
          주문내역
        </h1>
        <p className="mt-3 text-[15px] text-slate-500">
          최근 주문과 대량 발주 내역을 확인할 수 있습니다.
        </p>
      </div>

      <div className="space-y-5">
        {sortedOrders.map((order) => (
          <article
            key={order.id}
            className={`rounded-[28px] border bg-white p-6 shadow-sm ${
              order.id === latestOrderId
                ? "border-[#b8ccff] ring-2 ring-[#dce7ff]"
                : "border-slate-200"
            }`}
          >
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[12px] font-semibold text-white">
                    주문번호 {order.id}
                  </span>
                  {order.id === latestOrderId ? (
                    <span className="rounded-full bg-[#2f6eff] px-3 py-1 text-[12px] font-semibold text-white">
                      방금 완료한 주문
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-[14px] text-slate-500">
                  주문일 {order.createdAt.slice(0, 10)} | 총 {order.itemCount.toLocaleString()}개
                </p>
              </div>

              <div className="text-right">
                <p className="text-[13px] text-slate-400">결제 금액</p>
                <p className="mt-1 text-[28px] font-black tracking-[-0.05em] text-[#2457d6]">
                  {order.total.toLocaleString()}원
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              {order.items.map((item) => (
                <div
                  key={`${order.id}-${item.productId}`}
                  className="flex flex-col gap-4 rounded-[20px] bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-[14px] bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] text-slate-400">{item.partnerName}</p>
                      <p className="mt-1 text-[16px] font-bold text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[13px] text-slate-500">
                        {item.price.toLocaleString()}원 x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="text-[18px] font-bold text-slate-900">
                    {(item.price * item.quantity).toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
