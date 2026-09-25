import type { ReactNode } from "react";

interface TooltipProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export default function Tooltip({
  label,
  children,
  className = "",
}: TooltipProps) {
  if (!label) return children;

  return (
    <span className={`group/tip relative inline-flex ${className}`}>
      {children}

      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 translate-y-0.5 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[11px] font-medium leading-none text-white opacity-0 shadow-sm transition-all duration-150 delay-150 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100 dark:bg-white dark:text-neutral-900"
      >
        {label}
        <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-neutral-900 dark:bg-white" />
      </span>
    </span>
  );
}
