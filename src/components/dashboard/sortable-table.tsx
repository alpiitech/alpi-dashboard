import { type ReactNode, useMemo, useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { TableHead } from "@/components/ui/table"
import { cn } from "@/shared/utils/cn"

export type SortDir = "asc" | "desc"

export type SortableColumn<TKey extends string> = {
  key: TKey
  label: string
  className?: string
  sortable?: boolean
  // Provide a value extractor for sorting; defaults to row[key]
  getValue?: (row: Record<string, unknown>) => string | number
}

export function useTableSort<TKey extends string>(defaultKey: TKey, defaultDir: SortDir = "asc") {
  const [sortKey, setSortKey] = useState<TKey>(defaultKey)
  const [sortDir, setSortDir] = useState<SortDir>(defaultDir)

  function toggleSort(key: TKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  function sortRows<TRow extends Record<string, unknown>>(
    rows: TRow[],
    getValue?: (key: TKey, row: TRow) => string | number,
  ): TRow[] {
    return [...rows].sort((a, b) => {
      const aVal = getValue ? getValue(sortKey, a) : (a[sortKey] as string | number) ?? ""
      const bVal = getValue ? getValue(sortKey, b) : (b[sortKey] as string | number) ?? ""
      let cmp = 0
      if (typeof aVal === "number" && typeof bVal === "number") {
        cmp = aVal - bVal
      } else {
        cmp = String(aVal).localeCompare(String(bVal))
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }

  return { sortKey, sortDir, toggleSort, sortRows }
}

export function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown className="size-3.5 text-muted-foreground/50" />
  return dir === "asc"
    ? <ArrowUp className="size-3.5 text-primary" />
    : <ArrowDown className="size-3.5 text-primary" />
}

export function SortableHead<TKey extends string>({
  column,
  sortKey,
  sortDir,
  onSort,
  children,
}: {
  column: TKey
  sortKey: TKey
  sortDir: SortDir
  onSort: (key: TKey) => void
  children: ReactNode
}) {
  const isActive = sortKey === column
  return (
    <TableHead className="normal-case tracking-normal">
      <button
        type="button"
        onClick={() => onSort(column)}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20",
          isActive && "text-foreground",
        )}
      >
        {children}
        <SortIcon active={isActive} dir={sortDir} />
      </button>
    </TableHead>
  )
}

// Helper: sort an array of plain objects by a string key
export function sortByKey<TRow extends Record<string, unknown>>(
  rows: TRow[],
  key: string,
  dir: SortDir,
  numericKeys: string[] = [],
): TRow[] {
  return [...rows].sort((a, b) => {
    const aVal = a[key] ?? ""
    const bVal = b[key] ?? ""
    let cmp = 0
    if (numericKeys.includes(key)) {
      cmp = Number(aVal) - Number(bVal)
    } else {
      cmp = String(aVal).localeCompare(String(bVal))
    }
    return dir === "asc" ? cmp : -cmp
  })
}

// Re-export useMemo so pages don't need a separate import
export { useMemo }
