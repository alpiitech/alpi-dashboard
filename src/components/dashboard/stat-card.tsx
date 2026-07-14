import type { LucideIcon } from "lucide-react"
import { Caption, H2, Text } from "@/components/ui/typography"
import { cn } from "@/shared/utils/cn"

const toneStyles = {
  neutral: {
    card: "border-border bg-surface",
    icon: "bg-secondary text-secondary-foreground",
  },
  info: {
    card: "border-info/20 bg-info/5",
    icon: "bg-info/14 text-info",
  },
  success: {
    card: "border-success/20 bg-success/5",
    icon: "bg-success/14 text-success",
  },
  warning: {
    card: "border-warning/25 bg-warning/5",
    icon: "bg-warning/18 text-warning-foreground",
  },
  danger: {
    card: "border-danger/20 bg-danger/5",
    icon: "bg-danger/14 text-danger",
  },
} as const

export type StatCardProps = {
  label: string
  value: string
  description?: string
  icon?: LucideIcon
  tone?: keyof typeof toneStyles
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  tone = "neutral",
}: StatCardProps) {
  const styles = toneStyles[tone]

  return (
    <div
      className={cn(
        "min-w-0 rounded-[var(--radius-card)] border p-4",
        styles.card,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Text as="div" className="text-muted-foreground">
            {label}
          </Text>
          <H2 as="div" className="mt-1.5 break-words">
            {value}
          </H2>
        </div>
        {Icon ? (
          <div
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)]",
              styles.icon,
            )}
          >
            <Icon className="size-4" />
          </div>
        ) : null}
      </div>
      {description ? (
        <Caption className="mt-2.5 leading-4">{description}</Caption>
      ) : null}
    </div>
  )
}
