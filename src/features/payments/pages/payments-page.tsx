import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["All", "Pending", "Succeeded", "Failed", "Expired", "Partially Refunded", "Fully Refunded"]

const CARDS: StatCard[] = [
  { label: "Total Payments", value: "892" },
  { label: "Succeeded", value: "834", sub: "this month" },
  { label: "Pending", value: "22" },
  { label: "Failed / Expired", value: "36" },
]

const COLUMNS = [
  { key: "paymentId", label: "Payment ID" },
  { key: "booking", label: "Booking Ref" },
  { key: "customer", label: "Customer" },
  { key: "amount", label: "Amount" },
  { key: "provider", label: "Provider" },
  { key: "paidAt", label: "Paid At" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { paymentId: "PAY-8821", booking: "BK-10042", customer: "Sarah Chen", amount: "Rp 850,000", provider: "Midtrans", paidAt: "12 Jul 2026", status: <StatusBadge status="Succeeded" /> },
  { paymentId: "PAY-8820", booking: "BK-10041", customer: "James Whitfield", amount: "Rp 1,200,000", provider: "Midtrans", paidAt: "12 Jul 2026", status: <StatusBadge status="Succeeded" /> },
  { paymentId: "PAY-8819", booking: "BK-10040", customer: "Ayu Lestari", amount: "Rp 650,000", provider: "Midtrans", paidAt: "—", status: <StatusBadge status="Pending" /> },
  { paymentId: "PAY-8818", booking: "BK-10039", customer: "Tom Ramirez", amount: "Rp 2,100,000", provider: "Midtrans", paidAt: "11 Jul 2026", status: <StatusBadge status="Succeeded" /> },
  { paymentId: "PAY-8817", booking: "BK-10038", customer: "Nina Okonkwo", amount: "Rp 980,000", provider: "Midtrans", paidAt: "—", status: <StatusBadge status="Failed" /> },
  { paymentId: "PAY-8816", booking: "BK-10037", customer: "David Park", amount: "Rp 750,000", provider: "Midtrans", paidAt: "10 Jul 2026", status: <StatusBadge status="Fully Refunded" /> },
]

export function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("All")
  return (
    <PageShell
      title="Payments"
      description="All customer payment transactions from the payment provider."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
