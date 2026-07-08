import { format } from "date-fns"
import { AlertTriangle, CalendarDays, CreditCard, MapPinned, UserRound } from "lucide-react"
import { DetailDrawer } from "@/components/dashboard/detail-drawer"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Caption, H5, Strong, Text } from "@/components/ui/typography"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/features/bookings/components/booking-status-badge"
import type { Booking } from "@/features/bookings/bookings.types"

function formatMoney(value: number, currency: Booking["currency"]) {
  return new Intl.NumberFormat(currency === "IDR" ? "id-ID" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 0,
  }).format(value)
}

function formatDate(value: string) {
  return format(new Date(value), "dd MMM yyyy")
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-3 rounded-[var(--radius-button)] bg-surface-muted px-3 py-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <Caption as="div">{label}</Caption>
        <Strong as="div" className="mt-1 text-sm">{value}</Strong>
      </div>
    </div>
  )
}

export function BookingDetailDrawer({
  booking,
  open,
  onOpenChange,
  onCancelBooking,
  onEditBooking,
}: {
  booking: Booking | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancelBooking: (booking: Booking) => void
  onEditBooking: (booking: Booking) => void
}) {
  if (!booking) {
    return null
  }

  const canCancel = booking.status !== "cancelled" && booking.status !== "finished"

  return (
    <DetailDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={booking.code}
      description={`${booking.customerName} - ${booking.activityTitle}`}
      status={<BookingStatusBadge status={booking.status} />}
      actions={
        <>
          <Button variant="outline" size="lg" onClick={() => onEditBooking(booking)}>
            Edit booking
          </Button>
          <Button
            variant="destructiveSubtle"
            size="lg"
            disabled={!canCancel}
            onClick={() => onCancelBooking(booking)}
          >
            <AlertTriangle />
            Cancel booking
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <section className="space-y-3">
          <H5 as="h3">Booking summary</H5>
          <div className="grid gap-3">
            <DetailItem icon={UserRound} label="Customer" value={booking.customerName} />
            <DetailItem icon={MapPinned} label="Destination" value={booking.destination} />
            <DetailItem icon={CalendarDays} label="Travel date" value={formatDate(booking.travelDate)} />
            <DetailItem icon={CreditCard} label="Total amount" value={formatMoney(booking.totalAmount, booking.currency)} />
          </div>
        </section>

        <section className="space-y-3">
          <H5 as="h3">Operations</H5>
          <div className="rounded-[var(--radius-card)] border border-border">
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3">
              <Text as="span" className="text-muted-foreground">Agent</Text>
              <Strong as="span" className="text-right text-sm">{booking.agentName}</Strong>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3">
              <Text as="span" className="text-muted-foreground">Payment</Text>
              <PaymentStatusBadge status={booking.paymentStatus} />
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-3">
              <Text as="span" className="text-muted-foreground">Review state</Text>
              <StatusBadge label="Audit placeholder" tone="neutral" />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <H5 as="h3">Timeline</H5>
          <div className="space-y-3 border-l border-border pl-4">
            {[
              ["Booking created", formatDate(booking.bookingDate)],
              ["Payment checked", booking.paymentStatus === "paid" ? "Completed" : "Needs attention"],
              ["Travel scheduled", formatDate(booking.travelDate)],
            ].map(([title, meta]) => (
              <div key={title} className="relative">
                <span className="absolute -left-[1.18rem] top-1.5 size-2 rounded-full bg-primary" />
                <Strong as="div" className="text-sm">{title}</Strong>
                <Caption as="div">{meta}</Caption>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DetailDrawer>
  )
}
