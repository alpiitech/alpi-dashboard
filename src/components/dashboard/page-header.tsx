import { type ReactNode } from "react"
import { H1, Text } from "@/components/ui/typography"

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 max-w-2xl">
        <H1>{title}</H1>
        {description ? (
          <Text className="mt-1.5 text-muted-foreground">{description}</Text>
        ) : null}
      </div>
      {actions ? (
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0 sm:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  )
}
