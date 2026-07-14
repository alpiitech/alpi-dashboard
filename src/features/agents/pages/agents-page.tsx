import { useMemo, useState } from "react"
import { BadgeCheck, Building2, Clock3, MoreHorizontal, Plus, ShieldAlert, UserRound, UsersRound } from "lucide-react"
import { PageShell, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"
import { SortableHead, sortByKey, useTableSort } from "@/components/dashboard/sortable-table"
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

const TABS = ["All", "Pending Verification", "Revision Requested", "Approved", "Rejected", "Suspended"]

const CARDS: StatCard[] = [
  { label: "Total Agents", value: "64", sub: "Registered marketplace suppliers", icon: UsersRound, tone: "info" },
  { label: "Pending Verification", value: "8", sub: "Awaiting document review", icon: Clock3, tone: "warning" },
  { label: "Approved", value: "51", sub: "Allowed to operate", icon: BadgeCheck, tone: "success" },
  { label: "Suspended", value: "5", sub: "Access currently restricted", icon: ShieldAlert, tone: "danger" },
]

type AgentType = "Business" | "Individual"
type AgentStatus = "Approved" | "Pending" | "Revision Requested" | "Suspended" | "Rejected"

type Agent = {
  id: string
  name: string
  type: AgentType
  location: string
  activities: number
  submitted: string
  status: AgentStatus
  color: string
}

const AGENTS: Agent[] = [
  { id: "ag-1", name: "Bali Adventure Co.", type: "Business", location: "Bali", activities: 12, submitted: "2026-07-12", status: "Approved", color: "bg-blue-500/12 text-blue-600" },
  { id: "ag-2", name: "Made Wirawan", type: "Individual", location: "Ubud", activities: 4, submitted: "2026-07-10", status: "Pending", color: "bg-violet-500/12 text-violet-600" },
  { id: "ag-3", name: "Lombok Explore", type: "Business", location: "Lombok", activities: 7, submitted: "2026-07-08", status: "Approved", color: "bg-emerald-500/12 text-emerald-600" },
  { id: "ag-4", name: "Ketut Suardana", type: "Individual", location: "Seminyak", activities: 2, submitted: "2026-07-05", status: "Revision Requested", color: "bg-orange-500/12 text-orange-600" },
  { id: "ag-5", name: "Island Vibes Tours", type: "Business", location: "Gili Islands", activities: 5, submitted: "2026-07-01", status: "Suspended", color: "bg-cyan-500/12 text-cyan-600" },
  { id: "ag-6", name: "Wayan Satria", type: "Individual", location: "Kuta", activities: 3, submitted: "2026-06-28", status: "Rejected", color: "bg-pink-500/12 text-pink-600" },
]

type SortKey = "name" | "type" | "location" | "activities" | "submitted" | "status"

export function AgentsPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { sortKey, sortDir, toggleSort } = useTableSort<SortKey>("name")

  const filteredAgents = useMemo(() => {
    const tabMap: Partial<Record<string, AgentStatus>> = {
      "Pending Verification": "Pending",
      "Revision Requested": "Revision Requested",
      "Approved": "Approved",
      "Rejected": "Rejected",
      "Suspended": "Suspended",
    }
    let rows = AGENTS.filter((ag) => {
      if (activeTab === "All") return true
      return ag.status === tabMap[activeTab]
    })
    rows = sortByKey(rows as unknown as Record<string, unknown>[], sortKey, sortDir, ["activities"]) as unknown as Agent[]
    return rows
  }, [activeTab, sortKey, sortDir])

  const allVisibleSelected =
    filteredAgents.length > 0 && filteredAgents.every((a) => selectedIds.has(a.id))

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) filteredAgents.forEach((a) => next.delete(a.id))
      else filteredAgents.forEach((a) => next.add(a.id))
      return next
    })
  }

  const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <PageShell
      title="Agents"
      description="All supplier applications, verifications, and approved operators."
      action={<Button><Plus />Add agent</Button>}
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
            <SortableHead column="name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Agent</SortableHead>
            <SortableHead column="type" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Type</SortableHead>
            <SortableHead column="location" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Location</SortableHead>
            <SortableHead column="activities" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Activities</SortableHead>
            <SortableHead column="submitted" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Submitted</SortableHead>
            <SortableHead column="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Status</SortableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAgents.map((agent) => {
            const isSelected = selectedIds.has(agent.id)
            const Icon = agent.type === "Business" ? Building2 : UserRound
            return (
              <TableRow key={agent.id} className={cn(isSelected && "bg-primary/5")}>
                <TableCell className="px-4">
                  <input type="checkbox" aria-label={`Select ${agent.name}`} checked={isSelected}
                    onChange={() => setSelectedIds((p) => { const n = new Set(p); n.has(agent.id) ? n.delete(agent.id) : n.add(agent.id); return n })}
                    className="size-4 rounded border-border accent-primary" />
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-[var(--radius-button)] ${agent.color}`}><Icon className="size-3.5" /></span>
                    <span className="font-medium text-foreground">{agent.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-full font-normal text-muted-foreground">{agent.type}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{agent.location}</TableCell>
                <TableCell className="font-medium tabular-nums">{agent.activities}</TableCell>
                <TableCell className="text-muted-foreground">{fmt.format(new Date(agent.submitted))}</TableCell>
                <TableCell><StatusBadge status={agent.status} /></TableCell>
                <TableCell className="pr-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm" aria-label={`Actions for ${agent.name}`}><MoreHorizontal /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>View activities</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-danger">
                        {agent.status === "Suspended" ? "Reinstate" : "Suspend"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span>Showing {filteredAgents.length} of {AGENTS.length} agents</span>
        <span>Updated a few minutes ago</span>
      </div>
    </PageShell>
  )
}
