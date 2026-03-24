import Link from "next/link";
import {
  CartIcon,
  PackageIcon,
  PartnersIcon,
  TrendUpIcon,
} from "@/components/admin/AdminIcons";
import {
  featuredProducts,
  heroProducts,
  mainCategories,
  mainFeatures,
  mainStats,
} from "./home-data";

const statIcons = [PackageIcon, PartnersIcon, TrendUpIcon, CartIcon] as const;

export function MainHomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-[#2457d6] px-4 py-2 text-[12px] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span>예서커머스 B2B 쇼핑몰 | 사업자 전용</span>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/products" className="transition hover:text-blue-100">
              상품관
            </Link>
            <Link href="/cart" className="transition hover:text-blue-100">
              장바구니
            </Link>
            <Link href="/partner-admin" className="font-semibold text-yellow-200">
              협력사 센터
            </Link>
            <Link href="/super-admin" className="font-semibold text-cyan-200">
              최고관리자
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2f6eff] text-[20px] font-black text-white">
              예
            </div>
            <div>
              <p className="text-[22px] font-black tracking-[-0.04em] text-[#2457d6]">
                예서커머스
              </p>
              <p className="text-[11px] text-slate-400">B2B 전문 도매몰</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-[14px] font-medium text-slate-600 lg:flex">
            <Link href="/" className="transition hover:text-[#2457d6]">
              홈
            </Link>
            <Link href="/products" className="transition hover:text-[#2457d6]">
              상품
            </Link>
            <a href="#categories" className="transition hover:text-[#2457d6]">
              카테고리
            </a>
            <a href="#features" className="transition hover:text-[#2457d6]">
              서비스 소개
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden rounded-[12px] border border-slate-200 px-4 py-2 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
            >
              상품 둘러보기
            </Link>
            <Link
              href="/partner-admin"
              className="inline-flex rounded-[12px] bg-[#2f6eff] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-[#245df2]"
            >
              협력사 센터
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section
          id="hero"
          className="bg-gradient-to-br from-[#2152d2] via-[#2f6eff] to-[#5b5de6] text-white"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 md:grid-cols-2 lg:py-24">
            <div>
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-yellow-100">
                국내 최대 B2B 도매 플랫폼
              </div>
              <h1 className="mt-6 text-[44px] font-black leading-[1.12] tracking-[-0.05em] md:text-[56px]">
                비즈니스 성공을 위한
                <br />
                <span className="text-yellow-300">예서커머스</span>
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-8 text-blue-100">
                패션, 스포츠, 가전, 가구까지 기업 구매에 필요한 핵심 상품을
                한곳에 모았습니다. 대량 주문과 정기 발주를 더 빠르게 운영하세요.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex rounded-[14px] bg-white px-5 py-3 text-[15px] font-bold text-[#2457d6] transition hover:bg-blue-50"
                >
                  인기 상품 보기
                </Link>
                <Link
                  href="/partner-admin"
                  className="inline-flex rounded-[14px] border border-white/30 bg-white/10 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-white/15"
                >
                  입점업체 센터 바로가기
                </Link>
              </div>
            </div>

            <div className="hidden grid-cols-2 gap-4 md:grid">
              {heroProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="overflow-hidden rounded-[24px] border border-white/10 bg-white/10 backdrop-blur"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover opacity-90"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
            {mainStats.map((stat, index) => {
              const Icon = statIcons[index];

              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-slate-50 text-[#2f6eff]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-[30px] font-black tracking-[-0.05em] text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[14px] text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="categories" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="text-[34px] font-black tracking-[-0.05em] text-slate-900">
                카테고리
              </h2>
              <p className="mt-3 text-[15px] text-slate-500">
                필요한 상품군을 빠르게 찾아 바로 비교할 수 있습니다.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {mainCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group flex flex-col items-center justify-center rounded-[20px] border border-slate-200 bg-white px-4 py-6 text-center transition hover:-translate-y-1 hover:border-[#a9c3ff] hover:shadow-lg"
                >
                  <span className="text-[32px] transition group-hover:scale-110">
                    {category.icon}
                  </span>
                  <span className="mt-3 text-[13px] font-medium leading-5 text-slate-700">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="bg-[#f8faff] py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[34px] font-black tracking-[-0.05em] text-slate-900">
                  인기 상품
                </h2>
                <p className="mt-3 text-[15px] text-slate-500">
                  많은 기업이 선택한 베스트셀러 상품입니다.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex rounded-[12px] border border-slate-200 bg-white px-4 py-2 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50"
              >
                전체 상품 보기
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-[#2f6eff] px-3 py-1 text-[12px] font-semibold text-white">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[12px] text-slate-400">{product.partnerName}</p>
                    <h3 className="mt-2 min-h-[48px] text-[18px] font-bold leading-6 tracking-[-0.03em] text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-[13px] text-slate-500">
                      ★ {product.rating} ({product.reviewCount})
                    </p>
                    <div className="mt-4 flex items-end gap-1">
                      <span className="text-[28px] font-black tracking-[-0.05em] text-[#2f6eff]">
                        {product.price.toLocaleString()}원
                      </span>
                      <span className="pb-1 text-[13px] text-slate-400">
                        /{product.unit}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] text-slate-500">
                      최소 {product.minOrderQty}
                      {product.unit}
                    </p>
                    <div className="mt-5">
                      <Link
                        href={`/products/${product.id}`}
                        className="inline-flex w-full items-center justify-center rounded-[12px] bg-slate-900 px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-slate-800"
                      >
                        상세보기
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="text-[34px] font-black tracking-[-0.05em] text-slate-900">
                예서커머스를 선택하는 이유
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {mainFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[24px] border border-slate-200 bg-white px-6 py-7 shadow-sm transition hover:shadow-lg"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-[18px] text-[28px] ${feature.tone}`}
                  >
                    <span>{feature.icon}</span>
                  </div>
                  <h3 className="mt-5 text-[20px] font-bold tracking-[-0.03em] text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 lg:grid-cols-2">
            <div>
              <h2 className="text-[34px] font-black tracking-[-0.05em]">
                협력사로 입점하세요
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-300">
                3,200개 이상의 파트너 기업과 함께 성장하세요. 상품 등록부터 주문,
                배송, 정산까지 한 번에 관리할 수 있는 협력사 포털을 제공합니다.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/partner-admin"
                  className="inline-flex rounded-[14px] bg-[#2f6eff] px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-[#245df2]"
                >
                  협력사 센터 바로가기
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-[34px] font-black tracking-[-0.05em]">
                지금 바로 시작하세요
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-slate-300">
                메인 쇼핑몰과 협력사 관리센터를 분리해 두어 고객용 페이지와 관리자
                기능을 각각 확장하기 좋습니다. 이제 상품 목록, 상세, 장바구니,
                주문내역까지 한 흐름으로 이어집니다.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex rounded-[14px] bg-yellow-400 px-5 py-3 text-[15px] font-bold text-slate-900 transition hover:bg-yellow-300"
                >
                  추천 상품 보기
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex rounded-[14px] border border-slate-500 px-5 py-3 text-[15px] font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  장바구니 보기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#2f6eff] text-[18px] font-black text-white">
                  예
                </div>
                <span className="text-[22px] font-black tracking-[-0.04em] text-white">
                  예서커머스
                </span>
              </div>
              <p className="mt-5 text-[14px] leading-7 text-slate-400">
                사업자 전용 B2B 도매 쇼핑몰. 검증된 협력사의 우수 상품을 합리적인
                가격에 제공합니다.
              </p>
              <p className="mt-5 text-[14px] leading-7 text-slate-500">
                고객센터: <span className="text-white">1588-0000</span>
                <br />
                평일 09:00 - 18:00
                <br />
                이메일: support@yeseo.com
              </p>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-white">쇼핑</h3>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {mainCategories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.id}`}
                      className="transition hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-white">고객지원</h3>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                <li>
                  <Link href="/products" className="transition hover:text-white">
                    추천 상품
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="transition hover:text-white">
                    장바구니
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="transition hover:text-white">
                    주문내역
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-white">협력사</h3>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                <li>
                  <Link href="/partner-admin" className="transition hover:text-white">
                    입점업체 대시보드
                  </Link>
                </li>
                <li>
                  <Link href="/super-admin" className="transition hover:text-white">
                    최고관리자 센터
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner-admin/products"
                    className="transition hover:text-white"
                  >
                    상품 관리
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner-admin/settlement"
                    className="transition hover:text-white"
                  >
                    정산 관리
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-8 text-center text-[13px] text-slate-500">
            © 2026 예서커머스. All rights reserved. | 사업자등록번호:
            123-45-67890 | 통신판매업신고: 2026-서울강남-0000
          </div>
        </div>
      </footer>
    </div>
  );
}
