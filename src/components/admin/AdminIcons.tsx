import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function DashboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 13.5c0-.7.57-1.25 1.25-1.25h4c.68 0 1.25.55 1.25 1.25v5.25H5.25A1.25 1.25 0 0 1 4 17.5v-4Z"
        strokeWidth="1.8"
      />
      <path
        d="M13.5 6.5c0-.68.55-1.25 1.25-1.25h4c.68 0 1.25.57 1.25 1.25v3.25c0 .7-.57 1.25-1.25 1.25h-5.25V6.5Z"
        strokeWidth="1.8"
      />
      <path
        d="M4 6.5c0-.68.57-1.25 1.25-1.25h4c.68 0 1.25.57 1.25 1.25V10H5.25A1.25 1.25 0 0 1 4 8.75V6.5Z"
        strokeWidth="1.8"
      />
      <path
        d="M13.5 14h5.25c.68 0 1.25.55 1.25 1.25v2.25c0 .7-.57 1.25-1.25 1.25h-4c-.7 0-1.25-.55-1.25-1.25V14Z"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m12 3 7 4v10l-7 4-7-4V7l7-4Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 7v14" strokeWidth="1.8" />
      <path d="m5 7 7 4 7-4" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function PartnersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 18.5c.82-2.24 2.85-3.5 4.5-3.5 1.66 0 3.7 1.26 4.5 3.5"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 18.5c.54-1.64 1.95-2.5 3-2.5 1.06 0 2.47.86 3 2.5"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M9 4.75A1.75 1.75 0 0 1 10.75 3h2.5A1.75 1.75 0 0 1 15 4.75V6h1.75c.97 0 1.75.78 1.75 1.75v10.5c0 .97-.78 1.75-1.75 1.75h-9.5A1.75 1.75 0 0 1 5.5 18.25V7.75C5.5 6.78 6.28 6 7.25 6H9V4.75Z"
        strokeWidth="1.8"
      />
      <path d="M9 6h6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 11h6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 15h4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.75 7.5h12.5A1.75 1.75 0 0 1 19 9.25v7a1.75 1.75 0 0 1-1.75 1.75H6.75A1.75 1.75 0 0 1 5 16.25V8.75c0-.69.56-1.25 1.25-1.25Z"
        strokeWidth="1.8"
      />
      <path d="M5.5 8V6.75C5.5 5.78 6.28 5 7.25 5h9.5" strokeWidth="1.8" />
      <path d="M18.5 12h-4.25a1.75 1.75 0 1 0 0 3.5h4.25V12Z" strokeWidth="1.8" />
      <circle cx="14.75" cy="13.75" r=".75" fill="currentColor" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m10.2 4.7.38-1.2h2.84l.38 1.2a2 2 0 0 0 1.9 1.4h1.27l1.42 2.46-.9.9a2 2 0 0 0-.42 2.2l.52 1.14-.52 1.14a2 2 0 0 0 .42 2.2l.9.9-1.42 2.46H15.7a2 2 0 0 0-1.9 1.4l-.38 1.2h-2.84l-.38-1.2a2 2 0 0 0-1.9-1.4H7.03l-1.42-2.46.9-.9a2 2 0 0 0 .42-2.2L6.4 12l.52-1.14a2 2 0 0 0-.42-2.2l-.9-.9 1.42-2.46H8.3a2 2 0 0 0 1.9-1.4Z"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.75" strokeWidth="1.8" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M3.5 7.75c0-.97.78-1.75 1.75-1.75h8.5c.97 0 1.75.78 1.75 1.75v7.75H5.25A1.75 1.75 0 0 1 3.5 13.75v-6Z"
        strokeWidth="1.8"
      />
      <path
        d="M15.5 9.5h2.58c.5 0 .97.22 1.3.61l1.12 1.29c.32.37.5.84.5 1.33v2.77h-5.5V9.5Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="16.5" r="1.5" strokeWidth="1.8" />
      <circle cx="17.5" cy="16.5" r="1.5" strokeWidth="1.8" />
    </svg>
  );
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 12.5V10a1.5 1.5 0 0 1 1.5-1.5H8l7-3v11l-7-3H6.5A1.5 1.5 0 0 1 5 12.5Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M15 8.5c1.56.4 2.5 1.68 2.5 3s-.94 2.6-2.5 3" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m8.5 13.5 1.3 4.1a.9.9 0 0 0 .86.63H12"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 19V9" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 19V5" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 19v-7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 19h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BoxStackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m12 4 6 3.25L12 10.5 6 7.25 12 4Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m6 11.25 6 3.25 6-3.25"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m6 15.25 6 3.25 6-3.25"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="11" cy="11" r="6" strokeWidth="1.8" />
      <path d="m20 20-4.35-4.35" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M8 17h8l-1-1.7V11a3 3 0 1 0-6 0v4.3L8 17Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10.5 18.5a1.5 1.5 0 0 0 3 0" strokeWidth="1.8" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 4v9" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="m8.5 10.5 3.5 3.5 3.5-3.5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 19h14" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 5v14" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.5 6h1.7a1 1 0 0 1 .97.75l1.43 5.75a1 1 0 0 0 .97.75h6.86a1 1 0 0 0 .96-.72L19 8H8.2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="18" r="1.5" strokeWidth="1.8" />
      <circle cx="17" cy="18" r="1.5" strokeWidth="1.8" />
    </svg>
  );
}

export function CurrencyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M15.5 6.5c-.6-.54-1.52-.9-2.5-.9-1.93 0-3.5 1.2-3.5 2.9s1.57 2.55 3.5 2.9 3.5 1.2 3.5 2.9-1.57 2.9-3.5 2.9c-1.2 0-2.25-.45-2.9-1.13"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M13 4v16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function TrendUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 16 11 10 14.5 13.5 20 8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 8H20v4.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RepeatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M17 8h-8a3 3 0 0 0-3 3v0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m14 5 3 3-3 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 16h8a3 3 0 0 0 3-3v0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m10 19-3-3 3-3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M6 6.75A1.75 1.75 0 0 1 7.75 5h8.5A1.75 1.75 0 0 1 18 6.75v6.5A1.75 1.75 0 0 1 16.25 15H10l-3.5 3v-3H7.75A1.75 1.75 0 0 1 6 13.25v-6.5Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="8" r="3" strokeWidth="1.8" />
      <path d="M6.5 18.5c.95-2.62 3.26-4 5.5-4 2.25 0 4.55 1.38 5.5 4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
