import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["All", "Requested", "Approved", "Rejected", "Refund Eligible"]

const CARDS: StatCard[] = [
  { label: "Total Requests", value: "24" },
  { label: "Pending", value: "7", sub: "awaiting decision" },
  { label: "Approved", value: "14" },
  { label: "Refund Eligible", value: "3" },
]

const COLUMNS = [
  { key: "requestId", label: "Request ID" },
  { key: "booking", label: "Booking Ref" },
  { key: "customer", label: "Customer" },
  { key: "currentDate", label: "Current Date" },
  { key: "requestedDate", label: "Requested Date" },
  { key: "created", label: "Submitted" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { requestId: "RSC-001", booking: "BK-10042", customer: "Sarah Chen", currentDate: "15 Jul 2026", requestedDate: "22 Jul 2026", created: "10 Jul 2026", status: <StatusBadge status="Requested" /> },
  { requestId: "RSC-002", booking: "BK-10038", customer: "James Whitfield", currentDate: "18 Jul 2026", requestedDate: "25 Jul 2026", created: "9 Jul 2026", status: <StatusBadge status="Approved" /> },
  { requestId: "RSC-003", booking: "BK-10031", customer: "Ayu Lestari", currentDate: "20 Jul 2026", requestedDate: "27 Jul 2026", created: "8 Jul 2026", status: <StatusBadge status="Rejected" /> },
  { requestId: "RSC-004", booking: "BK-10027", customer: "Tom Ramirez", currentDate: "16 Jul 2026", requestedDate: "23 Jul 2026", created: "7 Jul 2026", status: <StatusBadge status="Requested" /> },
  { requestId: "RSC-005", booking: "BK-10019", customer: "Nina Okonkwo", currentDate: "19 Jul 2026", requestedDate: "26 Jul 2026", created: "5 Jul 2026", status: <StatusBadge status="Refund Eligible" /> },
]

export function ReschedulePage() {
  const [activeTab, setActiveTab] = useState("All")
  return (
    <PageShell
      title="Reschedule"
      description="All booking reschedule requests and their approval status."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
