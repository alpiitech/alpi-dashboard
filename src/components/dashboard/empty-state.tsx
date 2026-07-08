import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { H4, Text } from "@/components/ui/typography"

export type EmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
  action?: ReactNode
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
      {Icon ? (
        <div className="mb-4 grid size-11 place-items-center rounded-[var(--radius-button)] bg-secondary text-secondary-foreground">
          <Icon className="size-5" />
        </div>
      ) : null}
      <H4 as="h3">{title}</H4>
      {description ? (
        <Text className="mt-2 max-w-md text-muted-foreground">{description}</Text>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
