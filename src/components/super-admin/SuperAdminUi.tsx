import type { ReactNode } from "react";

type SuperAdminPanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SuperAdminPanel({
  title,
  description,
  action,
  children,
  className = "",
}: SuperAdminPanelProps) {
  return (
    <section className={`admin-card overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-[#e4e8f1] px-6 py-5">
        <div>
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-slate-950">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-[13px] text-slate-400">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

type SuperAdminMetricCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: "blue" | "green" | "violet" | "orange" | "rose" | "slate";
};

const metricToneClassMap: Record<
  NonNullable<SuperAdminMetricCardProps["tone"]>,
  string
> = {
  blue: "bg-blue-50 text-[#2f6eff]",
  green: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
  rose: "bg-rose-50 text-rose-600",
  slate: "bg-slate-100 text-slate-600",
};

export function SuperAdminMetricCard({
  label,
  value,
  helper,
  icon,
  tone = "blue",
}: SuperAdminMetricCardProps) {
  return (
    <article className="admin-card px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-slate-400">{label}</p>
          <p className="mt-4 text-[31px] font-black leading-none tracking-[-0.05em] text-slate-950">
            {value}
          </p>
          {helper ? (
            <p className="mt-3 text-[13px] font-medium text-slate-500">{helper}</p>
          ) : null}
        </div>
        {icon ? (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${metricToneClassMap[tone]}`}
          >
            {icon}
          </div>
        ) : null}
      </div>
    </article>
  );
}

type ChartBar = {
  label: string;
  value: number;
  color?: string;
};

type SuperAdminMiniBarChartProps = {
  data: readonly ChartBar[];
  valueSuffix?: string;
};

export function SuperAdminMiniBarChart({
  data,
  valueSuffix = "",
}: SuperAdminMiniBarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="grid grid-cols-6 gap-3">
      {data.map((item) => {
        const height = `${Math.max((item.value / maxValue) * 168, 18)}px`;

        return (
          <div key={item.label} className="flex flex-col items-center gap-3">
            <span className="text-[12px] font-semibold text-slate-500">
              {item.value.toLocaleString()}
              {valueSuffix}
            </span>
            <div className="flex h-[190px] w-full items-end justify-center rounded-[18px] bg-[#f8faff] px-2 py-3">
              <div
                className="w-full rounded-[14px] bg-[#2f6eff]"
                style={{
                  height,
                  background:
                    item.color ??
                    "linear-gradient(180deg, #5b7cff 0%, #2f6eff 100%)",
                }}
              />
            </div>
            <span className="text-[12px] font-medium text-slate-400">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

type DonutSlice = {
  label: string;
  value: number;
  color: string;
};

function buildConicGradient(data: readonly DonutSlice[]) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let start = 0;

  return `conic-gradient(${data
    .map((item) => {
      const startPercent = (start / total) * 100;
      start += item.value;
      const endPercent = (start / total) * 100;

      return `${item.color} ${startPercent}% ${endPercent}%`;
    })
    .join(", ")})`;
}

type SuperAdminDonutCardProps = {
  title: string;
  data: readonly DonutSlice[];
};

export function SuperAdminDonutCard({
  title,
  data,
}: SuperAdminDonutCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <SuperAdminPanel title={title}>
      <div className="relative mx-auto h-[210px] w-[210px]">
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundImage: buildConicGradient(data) }}
        />
        <div className="absolute inset-[32px] rounded-full border border-[#eef2f8] bg-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[12px] font-medium text-slate-400">총 건수</p>
            <p className="mt-1 text-[30px] font-bold leading-none tracking-[-0.04em] text-slate-950">
              {total}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#eef2f8] pt-5">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 text-[13px]"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-medium text-slate-500">
                {item.label}
              </span>
            </div>
            <span className="font-semibold text-slate-700">{item.value}</span>
          </div>
        ))}
      </div>
    </SuperAdminPanel>
  );
}

type SuperAdminToggleProps = {
  value: boolean;
  onChange: (nextValue: boolean) => void;
};

export function SuperAdminToggle({
  value,
  onChange,
}: SuperAdminToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative h-6 w-11 rounded-full transition ${
        value ? "bg-[#2f6eff]" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
          value ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
