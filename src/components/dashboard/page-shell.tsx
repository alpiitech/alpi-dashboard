import {
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Search, type LucideIcon } from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/shared/utils/cn"

export type StatCard = {
  label: string
  value: string | number
  sub?: string
  icon?: LucideIcon
  tone?: "neutral" | "info" | "success" | "warning" | "danger"
}

const statToneStyles = {
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

type PageShellProps = {
  title: string
  description?: string
  action?: ReactNode
  cards?: StatCard[]
  tabs?: string[]
  activeTab?: string
  onTabChange?: (tab: string) => void
  filterBar?: ReactNode
  children: ReactNode
  className?: string
}

type TableFilterContextValue = {
  activeTab?: string
  search: string
}

const TableFilterContext = createContext<TableFilterContextValue>({ search: "" })

export function PageShell({
  title,
  description,
  action,
  cards,
  tabs,
  activeTab,
  onTabChange,
  filterBar,
  children,
  className,
}: PageShellProps) {
  const [search, setSearch] = useState("")
  const hasDataToolbar = Boolean(tabs?.length || filterBar)

  const content = (
    <TableFilterContext.Provider value={{ activeTab, search }}>
      {children}
    </TableFilterContext.Provider>
  )

  return (
    <div className={cn("space-y-5", className)}>
      <PageHeader title={title} description={description} actions={action} />

      {cards && cards.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const tone = statToneStyles[card.tone ?? "neutral"]
            const Icon = card.icon
            return (
              <div
                key={card.label}
                className={cn(
                  "min-w-0 rounded-[var(--radius-card)] border p-4",
                  tone.card,
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm text-muted-foreground">{card.label}</div>
                    <div className="mt-1.5 text-2xl font-semibold tabular-nums text-foreground">
                      {card.value}
                    </div>
                  </div>
                  {Icon ? (
                    <div className={cn("grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)]", tone.icon)}>
                      <Icon className="size-4" />
                    </div>
                  ) : null}
                </div>
                {card.sub ? (
                  <div className="mt-2.5 text-xs leading-4 text-muted-foreground">
                    {card.sub}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : null}

      {hasDataToolbar ? (
        <section className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
          <div className="flex flex-col gap-3 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
            {tabs && tabs.length > 0 ? (
              <div className="max-w-full overflow-x-auto">
                <div className="inline-flex min-w-max items-center gap-1 rounded-[var(--radius-button)] bg-surface-muted p-1">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => onTabChange?.(tab)}
                        className={cn(
                          "inline-flex h-8 items-center rounded-[calc(var(--radius-button)-2px)] px-3 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/25",
                          isActive &&
                            "bg-primary text-primary-foreground shadow-[0_1px_2px_oklch(0_0_0/0.12)] hover:text-primary-foreground",
                        )}
                      >
                        {tab}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div />
            )}

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              {filterBar}
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          {content}
        </section>
      ) : (
        content
      )}
    </div>
  )
}

export function EmptyState({ message = "No data yet." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-3 grid size-12 place-items-center rounded-full bg-muted">
        <svg
          className="size-6 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-foreground">Nothing to show</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

type TableColumn = { key: string; label: string; className?: string }
type TableRowData = Record<string, ReactNode>

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join(" ")
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }
  return ""
}

function getRowText(row: TableRowData) {
  return Object.values(row).map(getNodeText).join(" ").toLowerCase()
}

function compareNodes(a: ReactNode, b: ReactNode) {
  const aText = getNodeText(a)
  const bText = getNodeText(b)
  const aNum = Number(aText)
  const bNum = Number(bText)
  if (aText !== "" && bText !== "" && !Number.isNaN(aNum) && !Number.isNaN(bNum)) {
    return aNum - bNum
  }
  return aText.localeCompare(bText)
}

export function DummyTable({
  columns,
  rows,
}: {
  columns: TableColumn[]
  rows: TableRowData[]
}) {
  const { activeTab, search } = useContext(TableFilterContext)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const searched = rows
      .map((row, index) => ({ index, row, text: getRowText(row) }))
      .filter(({ text }) => !term || text.includes(term))

    let filtered = searched
    if (activeTab && activeTab !== "All" && activeTab !== "Users" && activeTab !== "Profiles") {
      const normalizedTab = activeTab
        .toLowerCase()
        .replace("pending verification", "pending")
        .replace("pending payouts", "pending")
        .replace("paid payouts", "paid")
        .replace("agent payables", "agent")
        .replace("affiliate payables", "affiliate")
        .replace("revision requests", "revision requested")
      const matchingTabRows = searched.filter(({ text }) => text.includes(normalizedTab))

      // Some tabs represent alternate views not modeled in Sprint 1 mock rows.
      filtered = matchingTabRows.length > 0 ? matchingTabRows : searched
    }

    if (!sortKey) return filtered

    const sorted = [...filtered].sort((a, b) => {
      const cmp = compareNodes(a.row[sortKey], b.row[sortKey])
      return sortDir === "asc" ? cmp : -cmp
    })
    return sorted
  }, [activeTab, rows, search, sortKey, sortDir])

  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every(({ index }) => selectedRows.has(index))

  function toggleAllVisible() {
    setSelectedRows((current) => {
      const next = new Set(current)
      if (allVisibleSelected) {
        visibleRows.forEach(({ index }) => next.delete(index))
      } else {
        visibleRows.forEach(({ index }) => next.add(index))
      }
      return next
    })
  }

  function toggleRow(index: number) {
    setSelectedRows((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  if (visibleRows.length === 0) {
    return <EmptyState message="No records match the selected filters." />
  }

  return (
    <>
      {selectedRows.size > 0 ? (
        <div className="flex items-center justify-between border-b border-border bg-primary/5 px-4 py-2">
          <span className="text-xs font-medium text-foreground">
            {selectedRows.size} record{selectedRows.size > 1 ? "s" : ""} selected
          </span>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRows(new Set())}>
            Clear selection
          </Button>
        </div>
      ) : null}

      <Table>
        <TableHeader className="bg-surface-muted/60">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-11 px-4">
              <input
                type="checkbox"
                aria-label="Select all visible records"
                checked={allVisibleSelected}
                onChange={toggleAllVisible}
                className="size-4 rounded border-border accent-primary"
              />
            </TableHead>
            {columns.map((column) => {
              const isActive = sortKey === column.key
              return (
                <TableHead
                  key={column.key}
                  className={cn("normal-case tracking-normal", column.className)}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(column.key)}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-1.5 rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20",
                      isActive && "text-foreground",
                    )}
                  >
                    {column.label}
                    {isActive ? (
                      sortDir === "asc" ? (
                        <ArrowUp className="size-3.5 text-primary" />
                      ) : (
                        <ArrowDown className="size-3.5 text-primary" />
                      )
                    ) : (
                      <ArrowUpDown className="size-3.5 text-muted-foreground/50" />
                    )}
                  </button>
                </TableHead>
              )
            })}
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.map(({ index, row }) => {
            const isSelected = selectedRows.has(index)
            return (
              <TableRow key={index} className={cn(isSelected && "bg-primary/5")}>
                <TableCell className="px-4">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${index + 1}`}
                    checked={isSelected}
                    onChange={() => toggleRow(index)}
                    className="size-4 rounded border-border accent-primary"
                  />
                </TableCell>
                {columns.map((column, columnIndex) => (
                  <TableCell
                    key={column.key}
                    className={cn(
                      "py-3",
                      columnIndex === 0 && "font-medium text-foreground",
                      column.className,
                    )}
                  >
                    {row[column.key]}
                  </TableCell>
                ))}
                <TableCell className="pr-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm" aria-label={`Actions for row ${index + 1}`}>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit record</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-danger">Archive record</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span>Showing {visibleRows.length} of {rows.length} records</span>
        <span>Updated a few minutes ago</span>
      </div>
    </>
  )
}

const badgeVariants: Record<string, string> = {
  approved: "bg-success/14 text-success",
  published: "bg-success/14 text-success",
  paid: "bg-success/14 text-success",
  succeeded: "bg-success/14 text-success",
  finished: "bg-success/14 text-success",
  refunded: "bg-success/14 text-success",
  active: "bg-success/14 text-success",
  pending: "bg-warning/18 text-warning-foreground",
  requested: "bg-warning/18 text-warning-foreground",
  ongoing: "bg-warning/18 text-warning-foreground",
  "pending payment": "bg-warning/18 text-warning-foreground",
  "revision requested": "bg-warning/18 text-warning-foreground",
  upcoming: "bg-info/14 text-info",
  rejected: "bg-danger/14 text-danger",
  failed: "bg-danger/14 text-danger",
  cancelled: "bg-danger/14 text-danger",
  expired: "bg-danger/14 text-danger",
  suspended: "bg-danger/14 text-danger",
  draft: "bg-muted text-muted-foreground",
  inactive: "bg-muted text-muted-foreground",
}

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase()
  const styles = badgeVariants[key] ?? "bg-muted text-muted-foreground"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
        styles,
      )}
    >
      {status}
    </span>
  )
}
