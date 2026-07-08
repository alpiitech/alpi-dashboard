import type { ReactNode } from "react"
import { cn } from "@/shared/utils/cn"

type SurfacePadding = "none" | "sm" | "md"
type SurfaceTone = "surface" | "muted" | "background"

const paddingClasses: Record<SurfacePadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
}

const toneClasses: Record<SurfaceTone, string> = {
  surface: "bg-surface",
  muted: "bg-surface-muted",
  background: "bg-background",
}

export function Surface({
  children,
  className,
  padding = "md",
  tone = "surface",
}: {
  children: ReactNode
  className?: string
  padding?: SurfacePadding
  tone?: SurfaceTone
}) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-card)] border border-border shadow-[0_1px_1px_oklch(0_0_0/0.03)]",
        paddingClasses[padding],
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </section>
  )
}

export function SurfaceHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("flex items-center gap-3", className)}>{children}</div>
}

export function IconSurface({
  children,
  className,
  tone = "secondary",
}: {
  children: ReactNode
  className?: string
  tone?: "secondary" | "primary"
}) {
  return (
    <div
      className={cn(
        "grid size-10 place-items-center rounded-[var(--radius-button)]",
        tone === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {children}
    </div>
  )
}
