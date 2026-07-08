import type { ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { H4, Text } from "@/components/ui/typography"

export type ErrorStateProps = {
  title?: string
  description?: string
  action?: ReactNode
}

export function ErrorState({
  title = "We could not load this information.",
  description = "Try again, or refresh the page if the issue continues.",
  action,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 grid size-11 place-items-center rounded-[var(--radius-button)] bg-danger/12 text-danger">
        <AlertCircle className="size-5" />
      </div>
      <H4 as="h3">{title}</H4>
      <Text className="mt-2 max-w-md text-muted-foreground">{description}</Text>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
