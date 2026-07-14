import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["All", "Booking Paid", "Platform Fee", "Tax", "Payment Fee", "Promo Discount", "Affiliate Commission", "Agent Payable", "Refund", "Payout", "FX Adjustment"]

const CARDS: StatCard[] = [
  { label: "Total Transactions", value: "4,821" },
  { label: "Revenue This Month", value: "Rp 148M" },
  { label: "Platform Fee", value: "Rp 14.8M" },
  { label: "Pending Payouts", value: "Rp 22.4M" },
]

const COLUMNS = [
  { key: "txId", label: "Transaction ID" },
  { key: "type", label: "Event Type" },
  { key: "booking", label: "Booking Ref" },
  { key: "amount", label: "Amount" },
  { key: "direction", label: "Direction" },
  { key: "description", label: "Description" },
  { key: "created", label: "Created" },
]

const ROWS = [
  { txId: "TX-48821", type: "Booking Paid", booking: "BK-10042", amount: "Rp 850,000", direction: <StatusBadge status="Credit" />, description: "Customer payment received", created: "12 Jul 2026" },
  { txId: "TX-48820", type: "Platform Fee", booking: "BK-10042", amount: "Rp 85,000", direction: <StatusBadge status="Debit" />, description: "10% platform fee", created: "12 Jul 2026" },
  { txId: "TX-48819", type: "Tax", booking: "BK-10042", amount: "Rp 17,000", direction: <StatusBadge status="Debit" />, description: "2% tax deduction", created: "12 Jul 2026" },
  { txId: "TX-48818", type: "Agent Payable", booking: "BK-10042", amount: "Rp 680,000", direction: <StatusBadge status="Debit" />, description: "Agent payable queued", created: "12 Jul 2026" },
  { txId: "TX-48817", type: "Promo Discount", booking: "BK-10041", amount: "Rp 100,000", direction: <StatusBadge status="Debit" />, description: "Code: ALPII10", created: "12 Jul 2026" },
  { txId: "TX-48816", type: "Refund", booking: "BK-10037", amount: "Rp 750,000", direction: <StatusBadge status="Debit" />, description: "Full refund processed", created: "10 Jul 2026" },
]

export function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("All")
  return (
    <PageShell
      title="Transactions"
      description="All financial events and money movements across the platform."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
