import type { StatusBadgeConfig, StatusTone } from "@/components/dashboard/status-badge"
import type { BookingStatus, PaymentStatus } from "@/features/bookings/bookings.types"

export const bookingStatusConfig = {
  pending_payment: { label: "Pending payment", tone: "warning" },
  paid_upcoming: { label: "Paid & upcoming", tone: "info" },
  ongoing: { label: "Ongoing", tone: "success" },
  finished: { label: "Finished", tone: "neutral" },
  cancelled: { label: "Cancelled", tone: "danger" },
  expired: { label: "Expired", tone: "neutral" },
} satisfies Record<BookingStatus, StatusBadgeConfig>

export const paymentStatusConfig = {
  pending: { label: "Pending", tone: "warning" },
  paid: { label: "Paid", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  refunded: { label: "Refunded", tone: "info" },
} satisfies Record<PaymentStatus, StatusBadgeConfig>

export const bookingStatusLabels: Record<BookingStatus, string> = Object.fromEntries(
  Object.entries(bookingStatusConfig).map(([status, config]) => [status, config.label]),
) as Record<BookingStatus, string>

export const bookingStatusTones: Record<BookingStatus, StatusTone> = Object.fromEntries(
  Object.entries(bookingStatusConfig).map(([status, config]) => [status, config.tone]),
) as Record<BookingStatus, StatusTone>

export const paymentStatusLabels: Record<PaymentStatus, string> = Object.fromEntries(
  Object.entries(paymentStatusConfig).map(([status, config]) => [status, config.label]),
) as Record<PaymentStatus, string>

export const paymentStatusTones: Record<PaymentStatus, StatusTone> = Object.fromEntries(
  Object.entries(paymentStatusConfig).map(([status, config]) => [status, config.tone]),
) as Record<PaymentStatus, StatusTone>

export const bookingStatusOptions: Array<{ value: BookingStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "pending_payment", label: bookingStatusLabels.pending_payment },
  { value: "paid_upcoming", label: bookingStatusLabels.paid_upcoming },
  { value: "ongoing", label: bookingStatusLabels.ongoing },
  { value: "finished", label: bookingStatusLabels.finished },
  { value: "cancelled", label: bookingStatusLabels.cancelled },
  { value: "expired", label: bookingStatusLabels.expired },
]

export const paymentStatusOptions: Array<{ value: PaymentStatus | "all"; label: string }> = [
  { value: "all", label: "All payments" },
  { value: "pending", label: paymentStatusLabels.pending },
  { value: "paid", label: paymentStatusLabels.paid },
  { value: "failed", label: paymentStatusLabels.failed },
  { value: "refunded", label: paymentStatusLabels.refunded },
]
