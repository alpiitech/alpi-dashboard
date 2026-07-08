import type { ReactNode } from "react"
import { PageHeader } from "@/components/dashboard/page-header"

export function PageShell({
  title,
  description,
  actions,
  children,
  spacing = "default",
}: {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  spacing?: "default" | "compact"
}) {
  return (
    <div className={spacing === "compact" ? "space-y-5" : "space-y-6"}>
      <PageHeader title={title} description={description} actions={actions} />
      {children}
    </div>
  )
}
