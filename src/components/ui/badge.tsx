import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/cn"

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-medium leading-5",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-surface text-foreground",
        success: "bg-success/14 text-success",
        warning: "bg-warning/18 text-warning-foreground",
        danger: "bg-danger/14 text-danger",
        info: "bg-info/14 text-info",
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { badgeVariants }
