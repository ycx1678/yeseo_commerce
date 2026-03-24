export function PartnerAdminTopbar() {
  return (
    <header className="flex h-[68px] items-center justify-between bg-[#2f2d2d] px-4 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md text-lg font-semibold text-white/90">
          f
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-sm font-medium text-white/80">
          AI
        </div>
      </div>

      <div className="flex items-center gap-2 text-[18px] font-semibold tracking-tight">
        <span>B2B 업체 페이지 메뉴</span>
        <span className="text-xs text-white/70">▼</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-white/80">⌘</div>
        <button className="rounded-xl bg-[#4f46ff] px-5 py-3 text-[16px] font-semibold text-white">
          공유하기
        </button>
      </div>
    </header>
  );
}
