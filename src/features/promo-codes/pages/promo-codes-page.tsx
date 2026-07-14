import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["All", "Draft", "Active", "Paused", "Expired", "Disabled"]

const CARDS: StatCard[] = [
  { label: "Total Codes", value: "18" },
  { label: "Active", value: "6" },
  { label: "Total Redemptions", value: "234" },
  { label: "Discount Given", value: "Rp 23.4M" },
]

const COLUMNS = [
  { key: "code", label: "Code" },
  { key: "owner", label: "Owner" },
  { key: "discount", label: "Discount" },
  { key: "used", label: "Used / Max" },
  { key: "expires", label: "Expires" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { code: "ALPII10", owner: "Admin", discount: "10%", used: "124 / 500", expires: "31 Dec 2026", status: <StatusBadge status="Active" /> },
  { code: "BALI50K", owner: "Admin", discount: "Rp 50,000", used: "58 / 100", expires: "31 Aug 2026", status: <StatusBadge status="Active" /> },
  { code: "SARAH15", owner: "Affiliate", discount: "15%", used: "22 / 50", expires: "30 Sep 2026", status: <StatusBadge status="Active" /> },
  { code: "NEWUSER", owner: "Admin", discount: "Rp 100,000", used: "500 / 500", expires: "30 Jun 2026", status: <StatusBadge status="Expired" /> },
  { code: "SUMMER20", owner: "Admin", discount: "20%", used: "0 / 200", expires: "31 Aug 2026", status: <StatusBadge status="Draft" /> },
  { code: "EXPLORE5", owner: "Affiliate", discount: "5%", used: "30 / 100", expires: "31 Dec 2026", status: <StatusBadge status="Paused" /> },
]

export function PromoCodesPage() {
  const [activeTab, setActiveTab] = useState("All")
  return (
    <PageShell
      title="Promo Codes"
      description="Manage all promotional codes and their usage limits."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
