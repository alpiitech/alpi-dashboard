import { type ReactNode, useMemo, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Building2,
  Globe2,
  Map,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react"
import { EmptyState } from "@/components/dashboard/page-shell"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Badge } from "@/components/ui/badge"
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

type DestinationType = "Country" | "Region" | "City" | "Area"
type DestinationStatus = "Active" | "Inactive"
type DestinationFilter = "All" | "Countries" | "Regions" | "Cities" | "Areas" | "Inactive"

type Destination = {
  id: string
  name: string
  slug: string
  type: DestinationType
  parent: string | null
  activities: number
  status: DestinationStatus
  seoStatus: "Ready" | "Needs content"
}

const DESTINATIONS: Destination[] = [
  { id: "destination-1", name: "Indonesia", slug: "indonesia", type: "Country", parent: null, activities: 120, status: "Active", seoStatus: "Ready" },
  { id: "destination-2", name: "Bali", slug: "bali", type: "Region", parent: "Indonesia", activities: 85, status: "Active", seoStatus: "Ready" },
  { id: "destination-3", name: "Ubud", slug: "ubud", type: "City", parent: "Bali", activities: 34, status: "Active", seoStatus: "Ready" },
  { id: "destination-4", name: "Mount Batur", slug: "mount-batur", type: "Area", parent: "Ubud", activities: 12, status: "Active", seoStatus: "Ready" },
  { id: "destination-5", name: "Seminyak", slug: "seminyak", type: "City", parent: "Bali", activities: 28, status: "Active", seoStatus: "Needs content" },
  { id: "destination-6", name: "Lombok", slug: "lombok", type: "Region", parent: "Indonesia", activities: 18, status: "Active", seoStatus: "Ready" },
  { id: "destination-7", name: "Gili Islands", slug: "gili-islands", type: "Area", parent: "Lombok", activities: 9, status: "Inactive", seoStatus: "Needs content" },
]

const FILTERS: DestinationFilter[] = [
  "All",
  "Countries",
  "Regions",
  "Cities",
  "Areas",
  "Inactive",
]

const FILTER_TYPE: Partial<Record<DestinationFilter, DestinationType>> = {
  Countries: "Country",
  Regions: "Region",
  Cities: "City",
  Areas: "Area",
}

function getTypeIcon(type: DestinationType) {
  if (type === "Country") return Globe2
  if (type === "Region") return Map
  if (type === "City") return Building2
  return MapPin
}

type SortKey = "name" | "type" | "parent" | "activities" | "status"
type SortDir = "asc" | "desc"

export function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState<DestinationFilter>("All")
  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="size-3.5 text-muted-foreground/50" />
    return sortDir === "asc"
      ? <ArrowUp className="size-3.5 text-primary" />
      : <ArrowDown className="size-3.5 text-primary" />
  }

  function SortHead({
    column,
    children,
    className,
  }: {
    column: SortKey
    children: React.ReactNode
    className?: string
  }) {
    return (
      <TableHead className={cn("normal-case tracking-normal", className)}>
        <button
          type="button"
          onClick={() => toggleSort(column)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          {children}
          <SortIcon column={column} />
        </button>
      </TableHead>
    )
  }

  const filteredDestinations = useMemo(() => {
    const term = search.trim().toLowerCase()
    const filterType = FILTER_TYPE[activeFilter]

    const filtered = DESTINATIONS.filter((destination) => {
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Inactive" && destination.status === "Inactive") ||
        destination.type === filterType
      const matchesSearch =
        !term ||
        [destination.name, destination.slug, destination.parent ?? "", destination.type]
          .some((value) => value.toLowerCase().includes(term))
      return matchesFilter && matchesSearch
    })

    return [...filtered].sort((a, b) => {
      let cmp = 0
      if (sortKey === "activities") {
        cmp = a.activities - b.activities
      } else if (sortKey === "name") {
        cmp = a.name.localeCompare(b.name)
      } else if (sortKey === "type") {
        cmp = a.type.localeCompare(b.type)
      } else if (sortKey === "parent") {
        cmp = (a.parent ?? "").localeCompare(b.parent ?? "")
      } else if (sortKey === "status") {
        cmp = a.status.localeCompare(b.status)
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [activeFilter, search, sortKey, sortDir])

  const filterCount = (filter: DestinationFilter) => {
    if (filter === "All") return DESTINATIONS.length
    if (filter === "Inactive") {
      return DESTINATIONS.filter((item) => item.status === "Inactive").length
    }
    return DESTINATIONS.filter((item) => item.type === FILTER_TYPE[filter]).length
  }

  const allVisibleSelected =
    filteredDestinations.length > 0 &&
    filteredDestinations.every((destination) => selectedIds.has(destination.id))

  function toggleAllVisible() {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (allVisibleSelected) {
        filteredDestinations.forEach((destination) => next.delete(destination.id))
      } else {
        filteredDestinations.forEach((destination) => next.add(destination.id))
      }
      return next
    })
  }

  function toggleDestination(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Destinations"
        description="Manage the location hierarchy used for marketplace discovery, SEO, and activity listings."
        actions={
          <Button>
            <Plus />
            Add destination
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total destinations" value="48" description="Across all location levels" icon={MapPin} tone="info" />
        <StatCard label="Countries" value="3" description="Published markets" icon={Globe2} tone="warning" />
        <StatCard label="Active" value="42" description="Available for agent selection" icon={Map} tone="success" />
        <StatCard label="Inactive" value="6" description="Hidden from new activities" icon={Building2} tone="danger" />
      </div>

      <section className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
        <div className="flex flex-col gap-3 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-full overflow-x-auto">
            <div className="inline-flex min-w-max items-center gap-1 rounded-[var(--radius-button)] bg-surface-muted p-1">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "inline-flex h-8 items-center gap-1.5 rounded-[calc(var(--radius-button)-2px)] px-3 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/25",
                      isActive &&
                        "bg-primary text-primary-foreground shadow-[0_1px_2px_oklch(0_0_0/0.12)] hover:text-primary-foreground",
                    )}
                  >
                    {filter}
                    <span
                      className={cn(
                        "rounded-full bg-background px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground",
                        isActive && "bg-primary-foreground/15 text-primary-foreground",
                      )}
                    >
                      {filterCount(filter)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search destination..."
              className="pl-9"
            />
          </div>
        </div>

        {selectedIds.size > 0 ? (
          <div className="flex items-center justify-between border-b border-border bg-primary/5 px-4 py-2">
            <span className="text-xs font-medium text-foreground">
              {selectedIds.size} destination{selectedIds.size > 1 ? "s" : ""} selected
            </span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
              Clear selection
            </Button>
          </div>
        ) : null}

        {filteredDestinations.length > 0 ? (
          <Table>
            <TableHeader className="bg-surface-muted/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-11 px-4">
                  <input
                    type="checkbox"
                    aria-label="Select all visible destinations"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    className="size-4 rounded border-border accent-primary"
                  />
                </TableHead>
                <SortHead column="name" className="min-w-64">Destination</SortHead>
                <SortHead column="type">Type</SortHead>
                <SortHead column="parent">Parent</SortHead>
                <SortHead column="activities" className="text-right">Activities</SortHead>
                <TableHead className="normal-case tracking-normal">SEO</TableHead>
                <SortHead column="status">Status</SortHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.map((destination) => {
                const TypeIcon = getTypeIcon(destination.type)
                const isSelected = selectedIds.has(destination.id)
                return (
                  <TableRow key={destination.id} data-state={isSelected ? "selected" : undefined} className={cn(isSelected && "bg-primary/5")}>
                    <TableCell className="px-4">
                      <input
                        type="checkbox"
                        aria-label={`Select ${destination.name}`}
                        checked={isSelected}
                        onChange={() => toggleDestination(destination.id)}
                        className="size-4 rounded border-border accent-primary"
                      />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-secondary text-secondary-foreground">
                          <TypeIcon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-foreground">{destination.name}</div>
                          <div className="truncate text-xs text-muted-foreground">/{destination.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full font-normal text-muted-foreground">
                        {destination.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{destination.parent ?? "Top level"}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{destination.activities}</TableCell>
                    <TableCell>
                      <Badge variant={destination.seoStatus === "Ready" ? "success" : "warning"} className="rounded-full">
                        {destination.seoStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={destination.status === "Active" ? "success" : "neutral"} className="rounded-full">
                        {destination.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="iconSm" aria-label={`Actions for ${destination.name}`}>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View related activities</DropdownMenuItem>
                          <DropdownMenuItem>Edit destination</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-danger">
                            {destination.status === "Active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyState message="No destinations match the selected filters." />
        )}

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Showing {filteredDestinations.length} of {DESTINATIONS.length} destinations</span>
          <span>Updated a few minutes ago</span>
        </div>
      </section>
    </div>
  )
}
