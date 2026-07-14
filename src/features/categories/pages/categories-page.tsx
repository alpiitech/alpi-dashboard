import { useMemo, useState } from "react"
import { CheckCircle2, CircleOff, Layers3, Plus, Tag } from "lucide-react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"
import { SortableHead, sortByKey, useTableSort } from "@/components/dashboard/sortable-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/shared/utils/cn"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const TABS = ["All", "Active", "Inactive", "Display Order"]

const CARDS: StatCard[] = [
  { label: "Total Categories", value: "8", sub: "Marketplace category groups", icon: Tag, tone: "info" },
  { label: "Active", value: "7", sub: "Available for new activities", icon: CheckCircle2, tone: "success" },
  { label: "Inactive", value: "1", sub: "Hidden from agent selection", icon: CircleOff, tone: "danger" },
  { label: "Listed Activities", value: "184", sub: "Across all categories", icon: Layers3, tone: "warning" },
]

type Category = {
  id: string
  name: string
  slug: string
  activities: number
  order: number
  status: "Active" | "Inactive"
}

const CATEGORIES: Category[] = [
  { id: "cat-1", name: "Tours & Sightseeing", slug: "tours-sightseeing", activities: 45, order: 1, status: "Active" },
  { id: "cat-2", name: "Nature & Outdoor", slug: "nature-outdoor", activities: 38, order: 2, status: "Active" },
  { id: "cat-3", name: "Food & Drink", slug: "food-drink", activities: 22, order: 3, status: "Active" },
  { id: "cat-4", name: "Culture & Heritage", slug: "culture-heritage", activities: 19, order: 4, status: "Active" },
  { id: "cat-5", name: "Water Activities", slug: "water-activities", activities: 27, order: 5, status: "Active" },
  { id: "cat-6", name: "Classes & Workshops", slug: "classes-workshops", activities: 14, order: 6, status: "Active" },
  { id: "cat-7", name: "Transfers", slug: "transfers", activities: 8, order: 7, status: "Active" },
  { id: "cat-8", name: "Private Experiences", slug: "private-experiences", activities: 11, order: 8, status: "Inactive" },
]

const CATEGORY_COLORS: Record<string, string> = {
  "cat-1": "bg-blue-500/12 text-blue-600",
  "cat-2": "bg-emerald-500/12 text-emerald-600",
  "cat-3": "bg-orange-500/12 text-orange-600",
  "cat-4": "bg-violet-500/12 text-violet-600",
  "cat-5": "bg-cyan-500/12 text-cyan-600",
  "cat-6": "bg-pink-500/12 text-pink-600",
  "cat-7": "bg-amber-500/12 text-amber-600",
  "cat-8": "bg-slate-500/12 text-slate-500",
}

type SortKey = "name" | "slug" | "activities" | "order" | "status"

export function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { sortKey, sortDir, toggleSort } = useTableSort<SortKey>("order")

  const filteredCategories = useMemo(() => {
    let rows = CATEGORIES.filter((cat) => {
      if (activeTab === "Active") return cat.status === "Active"
      if (activeTab === "Inactive") return cat.status === "Inactive"
      return true
    })
    rows = sortByKey(rows as unknown as Record<string, unknown>[], sortKey, sortDir, ["activities", "order"]) as unknown as Category[]
    return rows
  }, [activeTab, sortKey, sortDir])

  const allVisibleSelected =
    filteredCategories.length > 0 &&
    filteredCategories.every((c) => selectedIds.has(c.id))

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) filteredCategories.forEach((c) => next.delete(c.id))
      else filteredCategories.forEach((c) => next.add(c.id))
      return next
    })
  }

  return (
    <PageShell
      title="Categories"
      description="Activity categories used for discovery, filtering, and SEO."
      action={
        <Button>
          <Plus />
          Add category
        </Button>
      }
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {selectedIds.size > 0 ? (
        <div className="flex items-center justify-between border-b border-border bg-primary/5 px-4 py-2">
          <span className="text-xs font-medium text-foreground">
            {selectedIds.size} record{selectedIds.size > 1 ? "s" : ""} selected
          </span>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>Clear selection</Button>
        </div>
      ) : null}

      <Table>
        <TableHeader className="bg-surface-muted/60">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-11 px-4">
              <input type="checkbox" aria-label="Select all" checked={allVisibleSelected} onChange={toggleAll} className="size-4 rounded border-border accent-primary" />
            </TableHead>
            <SortableHead column="name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Category</SortableHead>
            <SortableHead column="slug" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Slug</SortableHead>
            <SortableHead column="activities" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Activities</SortableHead>
            <SortableHead column="order" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Sort Order</SortableHead>
            <SortableHead column="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Status</SortableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((cat) => {
            const isSelected = selectedIds.has(cat.id)
            const color = CATEGORY_COLORS[cat.id] ?? "bg-slate-500/12 text-slate-500"
            return (
              <TableRow key={cat.id} className={cn(isSelected && "bg-primary/5")}>
                <TableCell className="px-4">
                  <input type="checkbox" aria-label={`Select ${cat.name}`} checked={isSelected} onChange={() => setSelectedIds((p) => { const n = new Set(p); n.has(cat.id) ? n.delete(cat.id) : n.add(cat.id); return n })} className="size-4 rounded border-border accent-primary" />
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-[var(--radius-button)] ${color}`}>
                      <Tag className="size-3.5" />
                    </span>
                    <span className="font-medium text-foreground">{cat.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">/{cat.slug}</TableCell>
                <TableCell className="font-medium tabular-nums">{cat.activities}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{cat.order}</TableCell>
                <TableCell>
                  <StatusBadge status={cat.status} />
                </TableCell>
                <TableCell className="pr-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm" aria-label={`Actions for ${cat.name}`}><MoreHorizontal /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit category</DropdownMenuItem>
                      <DropdownMenuItem>View activities</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-danger">{cat.status === "Active" ? "Deactivate" : "Activate"}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span>Showing {filteredCategories.length} of {CATEGORIES.length} categories</span>
        <span>Updated a few minutes ago</span>
      </div>
    </PageShell>
  )
}
