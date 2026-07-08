export type ActivityStatus =
  | "published"
  | "pending_review"
  | "revision_requested"
  | "draft"
  | "archived"

export type PartnerActivity = {
  id: string
  title: string
  slug: string
  description: string
  partnerName: string
  partnerEmail: string
  city: string
  category: string
  status: ActivityStatus
  price: number
  currency: "USD" | "IDR"
  updatedAt: string
  submittedAt: string
  duration: string
  groupSize: string
  language: string
  meetingPoint: string
  coverImage: string
  highlights: string[]
  itinerary: Array<{
    time: string
    title: string
    description: string
  }>
  included: string[]
  notIncluded: string[]
  reviewNotes: string[]
  operationalChecks: Array<{
    label: string
    status: "ready" | "needs_review"
  }>
}
