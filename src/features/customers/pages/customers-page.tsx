import { useMemo, useState } from "react"
import { MoreHorizontal, Plus, ShoppingBag, UserPlus, UsersRound, WalletCards } from "lucide-react"
import { PageShell, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"
import { SortableHead, sortByKey, useTableSort } from "@/components/dashboard/sortable-table"
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

const TABS = ["All", "Active", "New Customers", "With Bookings", "With Refunds", "Suspended"]

const CARDS: StatCard[] = [
  { label: "Total Customers", value: "1,284", sub: "All registered travelers", icon: UsersRound, tone: "info" },
  { label: "New This Month", value: "142", sub: "Up 12% from last month", icon: UserPlus, tone: "success" },
  { label: "With Bookings", value: "876", sub: "68% booking conversion", icon: ShoppingBag, tone: "warning" },
  { label: "Total Spend", value: "Rp 2.4B", sub: "Customer lifetime spend", icon: WalletCards, tone: "danger" },
]

type CustomerStatus = "Active" | "Suspended"

type Customer = {
  id: string
  name: string
  email: string
  bookings: number
  spend: string
  lastBooking: string
  status: CustomerStatus
  color: string
  isNew: boolean
  hasRefunds: boolean
}

const CUSTOMERS: Customer[] = [
  { id: "cus-1", name: "Sarah Chen", email: "s.chen@email.com", bookings: 8, spend: "Rp 4.2M", lastBooking: "12 Jul 2026", status: "Active", color: "bg-blue-500/12 text-blue-600", isNew: false, hasRefunds: false },
  { id: "cus-2", name: "James Whitfield", email: "j.white@email.com", bookings: 3, spend: "Rp 1.8M", lastBooking: "9 Jul 2026", status: "Active", color: "bg-violet-500/12 text-violet-600", isNew: true, hasRefunds: false },
  { id: "cus-3", name: "Ayu Lestari", email: "ayu.l@email.com", bookings: 12, spend: "Rp 7.6M", lastBooking: "11 Jul 2026", status: "Active", color: "bg-emerald-500/12 text-emerald-600", isNew: false, hasRefunds: true },
  { id: "cus-4", name: "Tom Ramirez", email: "t.ramirez@email.com", bookings: 1, spend: "Rp 850K", lastBooking: "3 Jul 2026", status: "Active", color: "bg-orange-500/12 text-orange-600", isNew: true, hasRefunds: false },
  { id: "cus-5", name: "Nina Okonkwo", email: "nina.o@email.com", bookings: 5, spend: "Rp 3.1M", lastBooking: "7 Jul 2026", status: "Active", color: "bg-pink-500/12 text-pink-600", isNew: false, hasRefunds: true },
  { id: "cus-6", name: "David Park", email: "d.park@email.com", bookings: 0, spend: "Rp 0", lastBooking: "—", status: "Suspended", color: "bg-slate-500/12 text-slate-500", isNew: false, hasRefunds: false },
]

type SortKey = "name" | "email" | "bookings" | "spend" | "lastBooking" | "status"

export function CustomersPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const { sortKey, sortDir, toggleSort } = useTableSort<SortKey>("name")

  const filteredCustomers = useMemo(() => {
    let rows = CUSTOMERS.filter((c) => {
      if (activeTab === "Active") return c.status === "Active"
      if (activeTab === "Suspended") return c.status === "Suspended"
      if (activeTab === "New Customers") return c.isNew
      if (activeTab === "With Bookings") return c.bookings > 0
      if (activeTab === "With Refunds") return c.hasRefunds
      return true
    })
    rows = sortByKey(rows as unknown as Record<string, unknown>[], sortKey, sortDir, ["bookings"]) as unknown as Customer[]
    return rows
  }, [activeTab, sortKey, sortDir])

  const allVisibleSelected =
    filteredCustomers.length > 0 && filteredCustomers.every((c) => selectedIds.has(c.id))

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) filteredCustomers.forEach((c) => next.delete(c.id))
      else filteredCustomers.forEach((c) => next.add(c.id))
      return next
    })
  }

  return (
    <PageShell
      title="Customers"
      description="All registered travelers and their booking history."
      action={<Button><Plus />Add customer</Button>}
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
            <SortableHead column="name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Customer</SortableHead>
            <SortableHead column="email" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Email</SortableHead>
            <SortableHead column="bookings" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Bookings</SortableHead>
            <SortableHead column="spend" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Total Spend</SortableHead>
            <SortableHead column="lastBooking" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Last Booking</SortableHead>
            <SortableHead column="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}>Status</SortableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => {
            const isSelected = selectedIds.has(customer.id)
            const initials = customer.name.split(" ").map((p) => p[0]).join("").slice(0, 2)
            return (
              <TableRow key={customer.id} className={cn(isSelected && "bg-primary/5")}>
                <TableCell className="px-4">
                  <input type="checkbox" aria-label={`Select ${customer.name}`} checked={isSelected}
                    onChange={() => setSelectedIds((p) => { const n = new Set(p); n.has(customer.id) ? n.delete(customer.id) : n.add(customer.id); return n })}
                    className="size-4 rounded border-border accent-primary" />
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${customer.color}`}>{initials}</span>
                    <span className="font-medium text-foreground">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell className="font-medium tabular-nums">{customer.bookings}</TableCell>
                <TableCell className="tabular-nums">{customer.spend}</TableCell>
                <TableCell className="text-muted-foreground">{customer.lastBooking}</TableCell>
                <TableCell><StatusBadge status={customer.status} /></TableCell>
                <TableCell className="pr-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="iconSm" aria-label={`Actions for ${customer.name}`}><MoreHorizontal /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>View bookings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-danger">
                        {customer.status === "Suspended" ? "Reinstate" : "Suspend"}
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
        <span>Showing {filteredCustomers.length} of {CUSTOMERS.length} customers</span>
        <span>Updated a few minutes ago</span>
      </div>
    </PageShell>
  )
}
