import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["All", "Requested", "Approved Full", "Approved Partial", "Rejected", "Ongoing", "Refunded"]

const CARDS: StatCard[] = [
  { label: "Total Refunds", value: "38" },
  { label: "Requested", value: "5", sub: "awaiting review" },
  { label: "Ongoing", value: "3" },
  { label: "Refunded", value: "28", sub: "completed" },
]

const COLUMNS = [
  { key: "caseId", label: "Case ID" },
  { key: "booking", label: "Booking Ref" },
  { key: "customer", label: "Customer" },
  { key: "requested", label: "Requested" },
  { key: "approved", label: "Approved" },
  { key: "policy", label: "Policy" },
  { key: "created", label: "Created" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { caseId: "REF-038", booking: "BK-10037", customer: "David Park", requested: "Rp 750,000", approved: "Rp 750,000", policy: "100%", created: "10 Jul 2026", status: <StatusBadge status="Refunded" /> },
  { caseId: "REF-037", booking: "BK-10031", customer: "Ayu Lestari", requested: "Rp 1,200,000", approved: "Rp 600,000", policy: "50%", created: "8 Jul 2026", status: <StatusBadge status="Approved Partial" /> },
  { caseId: "REF-036", booking: "BK-10025", customer: "Sarah Chen", requested: "Rp 850,000", approved: "—", policy: "0%", created: "6 Jul 2026", status: <StatusBadge status="Rejected" /> },
  { caseId: "REF-035", booking: "BK-10019", customer: "Nina Okonkwo", requested: "Rp 980,000", approved: "Rp 980,000", policy: "100%", created: "5 Jul 2026", status: <StatusBadge status="Ongoing" /> },
  { caseId: "REF-034", booking: "BK-10012", customer: "James Whitfield", requested: "Rp 2,100,000", approved: "—", policy: "Pending", created: "3 Jul 2026", status: <StatusBadge status="Requested" /> },
]

export function RefundsPage() {
  const [activeTab, setActiveTab] = useState("All")
  return (
    <PageShell
      title="Refunds"
      description="All refund cases, policy results, and approval status."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
