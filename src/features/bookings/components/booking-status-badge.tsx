import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  bookingStatusLabels,
  bookingStatusTones,
  paymentStatusLabels,
  paymentStatusTones,
} from "@/features/bookings/bookings.constants"
import type { BookingStatus, PaymentStatus } from "@/features/bookings/bookings.types"

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <StatusBadge label={bookingStatusLabels[status]} tone={bookingStatusTones[status]} />
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <StatusBadge label={paymentStatusLabels[status]} tone={paymentStatusTones[status]} />
}
