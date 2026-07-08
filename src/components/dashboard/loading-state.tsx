import { Skeleton } from "@/components/ui/skeleton"

export type LoadingStateProps = {
  variant?: "table" | "page" | "card" | "stats"
  rows?: number
  columns?: number
}

export function LoadingState({
  variant = "table",
  rows = 6,
  columns = 4,
}: LoadingStateProps) {
  if (variant === "page") {
    return (
      <div className="space-y-5">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96 max-w-full" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

  if (variant === "stats") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[var(--radius-card)] border border-border bg-surface p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-8 rounded-[var(--radius-button)]" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2 p-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-9" />
          ))}
        </div>
      ))}
    </div>
  )
}
