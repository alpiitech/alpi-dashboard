import { useState } from "react"
import { PageShell, DummyTable, StatusBadge, type StatCard } from "@/components/dashboard/page-shell"

const TABS = ["All", "Pending", "Approved", "Rejected", "Hidden"]

const CARDS: StatCard[] = [
  { label: "Total Reviews", value: "312" },
  { label: "Pending Moderation", value: "14" },
  { label: "Approved", value: "288" },
  { label: "Hidden / Rejected", value: "10" },
]

const COLUMNS = [
  { key: "reviewId", label: "Review ID" },
  { key: "customer", label: "Customer" },
  { key: "activity", label: "Activity" },
  { key: "rating", label: "Rating" },
  { key: "comment", label: "Comment" },
  { key: "submitted", label: "Submitted" },
  { key: "status", label: "Status" },
]

const ROWS = [
  { reviewId: "RVW-312", customer: "Sarah Chen", activity: "Mount Batur Sunrise Hike", rating: "⭐ 5.0", comment: "Absolutely incredible experience...", submitted: "13 Jul 2026", status: <StatusBadge status="Pending" /> },
  { reviewId: "RVW-311", customer: "James Whitfield", activity: "Ubud Rice Terrace Walk", rating: "⭐ 4.0", comment: "Great guide, beautiful scenery.", submitted: "12 Jul 2026", status: <StatusBadge status="Approved" /> },
  { reviewId: "RVW-310", customer: "Ayu Lestari", activity: "Seminyak Cooking Class", rating: "⭐ 5.0", comment: "Loved every minute of it!", submitted: "11 Jul 2026", status: <StatusBadge status="Approved" /> },
  { reviewId: "RVW-309", customer: "Tom Ramirez", activity: "Gili Island Snorkeling", rating: "⭐ 2.0", comment: "Quite disappointed with the equipment.", submitted: "10 Jul 2026", status: <StatusBadge status="Pending" /> },
  { reviewId: "RVW-308", customer: "Nina Okonkwo", activity: "Kecak Fire Dance", rating: "⭐ 1.0", comment: "Spam content removed.", submitted: "9 Jul 2026", status: <StatusBadge status="Hidden" /> },
]

export function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("All")
  return (
    <PageShell
      title="Reviews"
      description="Moderate verified reviews from customers with finished bookings."
      cards={CARDS}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <DummyTable columns={COLUMNS} rows={ROWS} />
    </PageShell>
  )
}
