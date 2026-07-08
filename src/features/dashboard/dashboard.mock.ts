import type {
  BookingCompletionMix,
  DestinationPerformance,
  OperationalAlert,
  PartnerPerformance,
  TravelPerformancePoint,
} from "@/features/dashboard/dashboard.types"

const referenceDate = new Date("2026-06-30")

export const travelPerformanceData: TravelPerformancePoint[] = Array.from({ length: 90 }, (_, index) => {
  const date = new Date(referenceDate)
  date.setDate(referenceDate.getDate() - (89 - index))

  const weekday = date.getDay()
  const weekendLift = weekday === 5 || weekday === 6 ? 24 : weekday === 0 ? 14 : 0
  const seasonalLift = index > 62 ? 22 : index > 34 ? 12 : 4
  const eventLift = index % 17 === 0 ? 18 : index % 29 === 0 ? 12 : 0
  const wave = Math.round(Math.sin(index / 4.8) * 14 + Math.cos(index / 8.2) * 9)
  const totalBookings = Math.max(58, 104 + seasonalLift + weekendLift + eventLift + wave)
  const completionRate = Math.min(0.81, 0.64 + ((index % 10) / 100) + (weekday === 4 ? 0.035 : 0))
  const completedBookings = Math.round(totalBookings * completionRate)
  const cancelledBookings = Math.max(2, Math.round(totalBookings * (0.035 + ((index % 6) / 1000))))
  const averageTicket = 82 + ((index * 11) % 48) + (weekday === 5 ? 14 : 0)
  const revenue = completedBookings * averageTicket

  return {
    date: date.toISOString().slice(0, 10),
    totalBookings,
    completedBookings,
    cancelledBookings,
    revenue,
  }
})

export const bookingCompletionMix: BookingCompletionMix = {
  completed: 642,
  upcoming: 184,
  pending: 72,
  cancelled: 38,
}

export const destinationPerformance: DestinationPerformance[] = [
  { destination: "London", bookings: 428, revenue: 38420, growth: 12.4 },
  { destination: "Bali", bookings: 392, revenue: 31780, growth: 9.8 },
  { destination: "Tokyo", bookings: 356, revenue: 42110, growth: 15.2 },
  { destination: "Paris", bookings: 304, revenue: 29640, growth: 6.1 },
  { destination: "Singapore", bookings: 286, revenue: 24900, growth: 4.7 },
]

export const partnerPerformance: PartnerPerformance[] = [
  { partner: "London Local Moments", city: "London", completedBookings: 184, rating: 4.8, sla: 96.4 },
  { partner: "Ubud Field Collective", city: "Bali", completedBookings: 172, rating: 4.7, sla: 94.8 },
  { partner: "Tokyo Table Stories", city: "Tokyo", completedBookings: 151, rating: 4.9, sla: 97.2 },
  { partner: "Paris Frame Studio", city: "Paris", completedBookings: 136, rating: 4.6, sla: 92.5 },
  { partner: "Lion City Guides", city: "Singapore", completedBookings: 129, rating: 4.7, sla: 93.9 },
]

export const operationalAlerts: OperationalAlert[] = [
  {
    label: "Partner submissions pending review",
    count: 18,
    description: "Activity drafts need marketplace approval.",
    tone: "warning",
  },
  {
    label: "Payments needing attention",
    count: 14,
    description: "Failed or delayed payment confirmations.",
    tone: "danger",
  },
  {
    label: "Map metadata awaiting approval",
    count: 7,
    description: "Pins require visibility and SEO review.",
    tone: "info",
  },
  {
    label: "Cancellation requests",
    count: 6,
    description: "Customers are waiting for operations follow-up.",
    tone: "warning",
  },
  {
    label: "Expired booking holds",
    count: 11,
    description: "Inventory holds should be released or recovered.",
    tone: "neutral",
  },
]
