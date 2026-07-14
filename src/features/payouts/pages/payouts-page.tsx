import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["Agent Payables", "Affiliate Payables", "Pending Payouts", "Paid Payouts", "Payout History"]

const CARDS: StatCard[] = [
  { label: "Pending Payouts", value: "Rp 22.4M" },
  { label: "Agent Payable", value: "Rp 18.2M" },
  { label: "Affiliate Payable", value: "Rp 4.2M" },
  { label: "Paid This Month", value: "Rp 65.1M" },
]

const COLUMNS = [
  { key: "payoutId", label: "Payout ID" },
  { key: "recipient", label: "Recipient" },
  { key: "type", label: "Type" },
  { key: "booking", label: "Booking Ref" },
  { key: "amount", label: "Amount" },
  { key: "created", label: "Created" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { payoutId: "PO-421", recipient: "Bali Adventure Co.", type: "Agent", booking: "BK-10042", amount: "Rp 680,000", created: "12 Jul 2026", status: <StatusBadge status="Pending" /> },
  { payoutId: "PO-420", recipient: "Made Wirawan", type: "Agent", booking: "BK-10040", amount: "Rp 520,000", created: "11 Jul 2026", status: <StatusBadge status="Pending" /> },
  { payoutId: "PO-419", recipient: "travel.with.sarah", type: "Affiliate", booking: "BK-10038", amount: "Rp 42,000", created: "10 Jul 2026", status: <StatusBadge status="Pending" /> },
  { payoutId: "PO-418", recipient: "Lombok Explore", type: "Agent", booking: "BK-10035", amount: "Rp 960,000", created: "9 Jul 2026", status: <StatusBadge status="Paid" /> },
  { payoutId: "PO-417", recipient: "Island Vibes Tours", type: "Agent", booking: "BK-10031", amount: "Rp 1,280,000", created: "8 Jul 2026", status: <StatusBadge status="Paid" /> },
]

export function PayoutsPage() {
  const [activeTab, setActiveTab] = useState("Pending Payouts")
  return (
    <PageShell
      title="Payouts"
      description="Manage agent and affiliate payout requests."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
