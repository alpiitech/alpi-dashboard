import { useMemo, useState } from "react"
import { Archive, CircleCheckBig, Clock3, MoreHorizontal, Package, Plus } from "lucide-react"
import { useNavigate } from "react-router"
import { ErrorState } from "@/components/dashboard/error-state"
import { LoadingState } from "@/components/dashboard/loading-state"
import { PageShell, type StatCard } from "@/components/dashboard/page-shell"
import { SortableHead, useTableSort } from "@/components/dashboard/sortable-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/shared/utils/cn"
import { useActivitiesQuery } from "@/features/activities/activities.queries"
import { ActivityStatusBadge } from "@/features/activities/components/activity-status-badge"
import type { PartnerActivity } from "@/features/activities/activities.types"

const TABS = ["All", "Draft", "Pending Review", "Published", "Revision Requests", "Archived"]

type SortKey = "title" | "partnerName" | "city" | "category" | "price" | "updatedAt" | "status"

const STATUS_ORDER: Record<string, number> = {
  published: 0,
  pending_review: 1,
  revision_requested: 2,
  draft: 3,
  archived: 4,
}

export function ActivitiesPage() {
  const navigate = useNavigate()
  const activitiesQuery = useActivitiesQuery({ page: 1, pageSize: 50 })
  const [activeTab, setActiveTab] = useState("All")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { sortKey, sortDir, toggleSort } = useTableSort<SortKey>("updatedAt", "desc")

  const activities = activitiesQuery.data?.data ?? []

  const cards: StatCard[] = useMemo(
    () => [
      { label: "Total Activities", value: activities.length, sub: "All marketplace products", icon: Package, tone: "info" },
      { label: "Published", value: activities.filter((a) => a.status === "published").length, sub: "Visible in marketplace", icon: CircleCheckBig, tone: "success" },
      { label: "Pending Review", value: activities.filter((a) => a.status === "pending_review").length, sub: "Awaiting moderation", icon: Clock3, tone: "warning" },
      { label: "Needs Attention", value: activities.filter((a) => a.status === "revision_requested" || a.status === "archived").length, sub: "Revision or archived", icon: Archive, tone: "danger" },
    ],
    [activities],
  )

  const filteredActivities = useMemo(() => {
    const tabFilter: Partial<Record<string, string>> = {
      "Draft": "draft",
      "Pending Review": "pending_review",
      "Published": "published",
      "Revision Requests": "revision_requested",
      "Archived": "archived",
    }

    let rows = activities.filter((a) => {
      if (activeTab === "All") return true
      return a.status === tabFilter[activeTab]
    })

    rows = [...rows].sort((a, b) => {
      let cmp: number
      if (sortKey === "price") {
        cmp = a.price - b.price
      } else if (sortKey === "status") {
        cmp = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)
      } else {
        cmp = String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? ""))
      }
      return sortDir === "asc" ? cmp : -cmp
    })

    return rows
  }, [activities, activeTab, sortKey, sortDir])

  const allVisibleSelected =
    filteredActivities.length > 0 && filteredActivities.every((a) => selectedIds.has(a.id))

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) filteredActivities.forEach((a) => next.delete(a.id))
      else filteredActivities.forEach((a) => next.add(a.id))
      return next
    })
  }

  const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" })
  const fmtCurrency = (activity: PartnerActivity) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: activity.currency, maximumFractionDigits: 0 }).format(activity.price)

  return (
    <PageShell
      title="Activities"
      description="Review and manage every marketplace product submitted by agents."
      action={<Button><Plus />Add activity</Button>}
      cards={cards}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activitiesQuery.isLoading ? (
        <LoadingState variant="table" />
      ) : activitiesQuery.isError ? (
        <ErrorState
          description="Activities could not be loaded."
          action={<Button variant="outline" onClick={() => void activitiesQuery.refetch()}>Try again</Button>}
        />
      ) : (
        <>
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
                <SortableHead column="title" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Activity</SortableHead>
                <SortableHead column="partnerName" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Agent</SortableHead>
                <SortableHead column="city" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Destination</SortableHead>
                <SortableHead column="category" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Category</SortableHead>
                <SortableHead column="price" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Price</SortableHead>
                <SortableHead column="updatedAt" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Updated</SortableHead>
                <SortableHead column="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Status</SortableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => {
                const isSelected = selectedIds.has(activity.id)
                return (
                  <TableRow key={activity.id} className={cn(isSelected && "bg-primary/5")}>
                    <TableCell className="px-4">
                      <input type="checkbox" aria-label={`Select ${activity.title}`} checked={isSelected}
                        onChange={() => setSelectedIds((p) => { const n = new Set(p); n.has(activity.id) ? n.delete(activity.id) : n.add(activity.id); return n })}
                        className="size-4 rounded border-border accent-primary" />
                    </TableCell>
                    <TableCell className="py-3">
                      <button type="button" onClick={() => navigate(`/activities/${activity.id}`)} className="group flex max-w-72 items-center gap-2.5 text-left outline-none">
                        <span className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-primary/10 text-primary">
                          <Package className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-foreground group-hover:text-primary">{activity.title}</span>
                          <span className="block truncate text-xs font-normal text-muted-foreground">/{activity.slug}</span>
                        </span>
                      </button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{activity.partnerName}</TableCell>
                    <TableCell className="text-muted-foreground">{activity.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full font-normal text-muted-foreground">{activity.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium tabular-nums">{fmtCurrency(activity)}</TableCell>
                    <TableCell className="text-muted-foreground">{fmt.format(new Date(activity.updatedAt))}</TableCell>
                    <TableCell><ActivityStatusBadge status={activity.status} /></TableCell>
                    <TableCell className="pr-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="iconSm" aria-label={`Actions for ${activity.title}`}><MoreHorizontal /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/activities/${activity.id}`)}>View detail</DropdownMenuItem>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-danger">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <span>Showing {filteredActivities.length} of {activities.length} activities</span>
            <span>Updated a few minutes ago</span>
          </div>
        </>
      )}
    </PageShell>
  )
}
