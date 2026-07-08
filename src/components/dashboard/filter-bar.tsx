import type { ReactNode } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type FilterBarProps = {
  searchValue: string
  searchPlaceholder?: string
  onSearchChange: (value: string) => void
  children?: ReactNode
  activeFilterCount?: number
  onClearFilters?: () => void
}

export function FilterBar({
  searchValue,
  searchPlaceholder = "Search",
  onSearchChange,
  children,
  activeFilterCount = 0,
  onClearFilters,
}: FilterBarProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      {children ? (
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:flex sm:flex-1 sm:flex-wrap sm:items-center">
          {children}
        </div>
      ) : null}

      {activeFilterCount > 0 && onClearFilters ? (
        <Button
          variant="ghost"
          size="sm"
          className="w-full sm:w-auto"
          onClick={onClearFilters}
        >
          <X className="size-3.5" />
          Clear
        </Button>
      ) : null}
    </div>
  )
}
