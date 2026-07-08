import type { LucideIcon } from "lucide-react"
import { Caption, H2, Text } from "@/components/ui/typography"

export type StatCardProps = {
  label: string
  value: string
  description?: string
  icon?: LucideIcon
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="min-w-0 rounded-[var(--radius-card)] border border-border bg-surface p-4">
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
          <div className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-secondary text-secondary-foreground">
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
