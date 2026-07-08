import * as React from "react"
import { cn } from "@/shared/utils/cn"

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-[var(--radius-input)] border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = "Select"
