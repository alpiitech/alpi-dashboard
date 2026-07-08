import type {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "@/features/bookings/bookings.types"

export function filterBookings({
  bookings,
  search,
  status,
  paymentStatus,
}: {
  bookings: Booking[]
  search: string
  status: BookingStatus | "all"
  paymentStatus: PaymentStatus | "all"
}) {
  const term = search.trim().toLowerCase()

  return bookings.filter((booking) => {
    const matchesSearch =
      !term ||
      [
        booking.code,
        booking.customerName,
        booking.activityTitle,
        booking.destination,
        booking.agentName,
      ].some((value) => value.toLowerCase().includes(term))
    const matchesStatus = status === "all" || booking.status === status
    const matchesPayment = paymentStatus === "all" || booking.paymentStatus === paymentStatus

    return matchesSearch && matchesStatus && matchesPayment
  })
}

export function getBookingStats(bookings: Booking[]) {
  const pendingPayments = bookings.filter((booking) => booking.status === "pending_payment").length
  const upcoming = bookings.filter((booking) => booking.status === "paid_upcoming").length
  const attention = bookings.filter(
    (booking) =>
      booking.paymentStatus === "failed" ||
      booking.status === "expired" ||
      booking.status === "pending_payment",
  ).length

  return {
    total: bookings.length,
    pendingPayments,
    upcoming,
    attention,
  }
}

export function getNextBookingCode(bookings: Booking[]) {
  const maxNumber = bookings.reduce((max, booking) => {
    const parsed = Number.parseInt(booking.code.replace(/\D/g, ""), 10)
    return Number.isNaN(parsed) ? max : Math.max(max, parsed)
  }, 1000)

  return `ALP-BK-${maxNumber + 1}`
}
