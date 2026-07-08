import type { ReactNode } from "react"

export function DataTableToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-border bg-surface px-3 py-3">
      {children}
    </div>
  )
}
