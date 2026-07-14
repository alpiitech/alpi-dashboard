import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["Profiles", "Promo Codes", "Commissions", "Payables", "Suspended"]

const CARDS: StatCard[] = [
  { label: "Total Affiliates", value: "12" },
  { label: "Active", value: "9" },
  { label: "Attributed Bookings", value: "186" },
  { label: "Total Commission", value: "Rp 8.4M" },
]

const COLUMNS = [
  { key: "name", label: "Affiliate" },
  { key: "email", label: "Email" },
  { key: "codes", label: "Promo Codes" },
  { key: "bookings", label: "Attributed Bookings" },
  { key: "commission", label: "Commission" },
  { key: "payable", label: "Payable" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { name: "Sarah Explores", email: "sarah@explore.com", codes: "2", bookings: "42", commission: "Rp 2.1M", payable: "Rp 450,000", status: <StatusBadge status="Active" /> },
  { name: "Bali Travel Blog", email: "hello@balitravelblog.com", codes: "1", bookings: "38", commission: "Rp 1.9M", payable: "Rp 380,000", status: <StatusBadge status="Active" /> },
  { name: "Wanderlust ID", email: "contact@wanderlust.id", codes: "3", bookings: "54", commission: "Rp 2.7M", payable: "Rp 540,000", status: <StatusBadge status="Active" /> },
  { name: "Asia Backpacker", email: "info@asiabackpacker.com", codes: "1", bookings: "18", commission: "Rp 900,000", payable: "Rp 0", status: <StatusBadge status="Suspended" /> },
  { name: "Tom Travels", email: "tom@tomtravels.com", codes: "1", bookings: "34", commission: "Rp 800,000", payable: "Rp 200,000", status: <StatusBadge status="Active" /> },
]

export function AffiliatesPage() {
  const [activeTab, setActiveTab] = useState("Profiles")
  return (
    <PageShell
      title="Affiliates"
      description="Manage affiliate partners, their promo codes, and commissions."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
