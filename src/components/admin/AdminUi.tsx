import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type ButtonTone = "primary" | "secondary" | "success";

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  children: ReactNode;
};

const buttonToneClassMap: Record<ButtonTone, string> = {
  primary: "bg-[#2f6eff] text-white hover:bg-[#245df2]",
  secondary: "border border-[#d8deea] bg-white text-slate-700 hover:bg-slate-50",
  success: "bg-emerald-600 text-white hover:bg-emerald-700",
};

export function AdminButton({
  tone = "primary",
  className = "",
  children,
  ...props
}: AdminButtonProps) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-[12px] px-4 text-[14px] font-medium transition ${buttonToneClassMap[tone]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type AdminInputProps = InputHTMLAttributes<HTMLInputElement>;

export function AdminInput({ className = "", ...props }: AdminInputProps) {
  return (
    <input
      className={`h-11 w-full rounded-[12px] border border-[#d8deea] bg-white px-4 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#9cb8ff] focus:ring-4 focus:ring-[#dbe7ff] ${className}`}
      {...props}
    />
  );
}

type AdminSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function AdminSelect({ className = "", children, ...props }: AdminSelectProps) {
  return (
    <select
      className={`h-11 rounded-[12px] border border-[#d8deea] bg-white px-4 text-[14px] text-slate-800 outline-none transition focus:border-[#9cb8ff] focus:ring-4 focus:ring-[#dbe7ff] ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

type AdminTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function AdminTextarea({
  className = "",
  ...props
}: AdminTextareaProps) {
  return (
    <textarea
      className={`w-full rounded-[12px] border border-[#d8deea] bg-white px-4 py-3 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#9cb8ff] focus:ring-4 focus:ring-[#dbe7ff] ${className}`}
      {...props}
    />
  );
}

type AdminFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function AdminField({ label, hint, children }: AdminFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-600">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-[12px] text-slate-400">{hint}</span> : null}
    </label>
  );
}

type AdminStatusBadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "orange" | "red" | "slate" | "yellow";
};

const badgeToneClassMap: Record<NonNullable<AdminStatusBadgeProps["tone"]>, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  slate: "bg-slate-100 text-slate-600",
  yellow: "bg-yellow-100 text-yellow-700",
};

export function AdminStatusBadge({
  children,
  tone = "slate",
}: AdminStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${badgeToneClassMap[tone]}`}
    >
      {children}
    </span>
  );
}

type AdminModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClassName?: string;
};

export function AdminModal({
  open,
  title,
  onClose,
  children,
  footer,
  maxWidthClassName = "max-w-2xl",
}: AdminModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`w-full ${maxWidthClassName} overflow-hidden rounded-[18px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]`}
      >
        <div className="flex items-center justify-between border-b border-[#e4e8f1] px-6 py-5">
          <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-slate-950">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] font-medium text-slate-400 transition hover:text-slate-700"
          >
            닫기
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">{children}</div>
        {footer ? <div className="border-t border-[#e4e8f1] px-6 py-5">{footer}</div> : null}
      </div>
    </div>
  );
}
