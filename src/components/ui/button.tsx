import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[var(--radius-button)] font-medium leading-none outline-none transition-[background,color,border,box-shadow,transform] duration-150 ease-[var(--ease-standard)] focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_1px_oklch(0_0_0/0.06),0_5px_12px_oklch(0_0_0/0.08)] hover:-translate-y-px hover:bg-primary/80 hover:shadow-[0_1px_2px_oklch(0_0_0/0.08),0_8px_18px_oklch(0_0_0/0.1)] active:translate-y-0 active:bg-primary/70 active:shadow-[0_1px_1px_oklch(0_0_0/0.08)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        outline:
          "border border-border bg-surface text-foreground shadow-[0_1px_1px_oklch(0_0_0/0.03)] hover:border-border-strong hover:bg-surface-muted active:bg-secondary",
        ghost:
          "text-muted-foreground hover:bg-surface-muted hover:text-foreground active:bg-secondary",
        subtle:
          "bg-surface-muted text-foreground hover:bg-secondary hover:text-secondary-foreground active:bg-secondary/80",
        destructive:
          "bg-danger text-danger-foreground shadow-[0_1px_1px_oklch(0_0_0/0.06),0_5px_12px_oklch(0_0_0/0.08)] hover:bg-danger/90 active:shadow-[0_1px_1px_oklch(0_0_0/0.08)]",
        destructiveSubtle:
          "border border-danger/20 bg-danger/10 text-danger hover:border-danger/35 hover:bg-danger/15 active:bg-danger/20",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3.5 text-sm",
        lg: "h-10 px-4 text-sm",
        icon: "size-10",
        iconSm: "size-8",
        "icon-xs": "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { buttonVariants }
