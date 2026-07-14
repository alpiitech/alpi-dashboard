import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["Users", "Roles", "Invitations", "Suspended Accounts"]

const CARDS: StatCard[] = [
  { label: "Total Users", value: "18" },
  { label: "Admins", value: "3" },
  { label: "Editors", value: "4" },
  { label: "Finance", value: "2" },
]

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "lastLogin", label: "Last Login" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { name: "Rizky Pratama", email: "rizky@alpii.com", role: "Owner", lastLogin: "14 Jul 2026", status: <StatusBadge status="Active" /> },
  { name: "Dewi Sartika", email: "dewi@alpii.com", role: "Admin", lastLogin: "14 Jul 2026", status: <StatusBadge status="Active" /> },
  { name: "Bagas Nugroho", email: "bagas@alpii.com", role: "Admin", lastLogin: "13 Jul 2026", status: <StatusBadge status="Active" /> },
  { name: "Laras Puspita", email: "laras@alpii.com", role: "Editor", lastLogin: "12 Jul 2026", status: <StatusBadge status="Active" /> },
  { name: "Hendra Wijaya", email: "hendra@alpii.com", role: "Finance", lastLogin: "11 Jul 2026", status: <StatusBadge status="Active" /> },
  { name: "Demo User", email: "demo@alpii.com", role: "Admin", lastLogin: "14 Jul 2026", status: <StatusBadge status="Active" /> },
]

export function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("Users")
  return (
    <PageShell
      title="User Management"
      description="Manage internal users, roles, and access permissions."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
