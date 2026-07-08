import type { StatusTone } from "@/components/dashboard/status-badge"

export type DashboardTimeRange = "90d" | "30d" | "7d"

export type TravelPerformancePoint = {
  date: string
  totalBookings: number
  completedBookings: number
  cancelledBookings: number
  revenue: number
}

export type TravelKpi = {
  label: string
  value: string
  caption: string
  trend: string
  tone: StatusTone
}

export type DestinationPerformance = {
  destination: string
  bookings: number
  revenue: number
  growth: number
}

export type PartnerPerformance = {
  partner: string
  city: string
  completedBookings: number
  rating: number
  sla: number
}

export type OperationalAlert = {
  label: string
  count: number
  description: string
  tone: StatusTone
}

export type BookingCompletionMix = {
  completed: number
  upcoming: number
  pending: number
  cancelled: number
}
