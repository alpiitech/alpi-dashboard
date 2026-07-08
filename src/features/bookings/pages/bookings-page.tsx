import { useMemo, useState } from "react"
import {
  CalendarPlus,
  CircleAlert,
  CreditCard,
  Plane,
  TimerReset,
} from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { LoadingState } from "@/components/dashboard/loading-state"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { Button } from "@/components/ui/button"
import { BookingDetailDrawer } from "@/features/bookings/components/booking-detail-drawer"
import { BookingFormDrawer } from "@/features/bookings/components/booking-form-drawer"
import {
  BookingsFilters,
  type BookingsPreviewState,
} from "@/features/bookings/components/bookings-filters"
import { BookingsTable } from "@/features/bookings/components/bookings-table"
import {
  filterBookings,
  getBookingStats,
  getNextBookingCode,
} from "@/features/bookings/bookings.format"
import { useBookingsQuery } from "@/features/bookings/bookings.queries"
import {
  createBookingFromForm,
  updateBookingFromForm,
  type BookingFormValues,
} from "@/features/bookings/bookings.schema"
import type {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "@/features/bookings/bookings.types"

export function BookingsPage() {
  const bookingsQuery = useBookingsQuery()
  const [bookings, setBookings] = useState<Booking[]>(
    () => bookingsQuery.data.data,
  )
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<BookingStatus | "all">("all")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "all">(
    "all",
  )
  const [previewState, setPreviewState] =
    useState<BookingsPreviewState>("normal")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null)
  const [formState, setFormState] = useState<{
    open: boolean
    mode: "create" | "edit"
    booking: Booking | null
  }>({
    open: false,
    mode: "create",
    booking: null,
  })
  const [isConfirming, setIsConfirming] = useState(false)

  const activeFilterCount = [
    search.trim(),
    status !== "all",
    paymentStatus !== "all",
  ].filter(Boolean).length

  const filteredBookings = useMemo(
    () => filterBookings({ bookings, paymentStatus, search, status }),
    [bookings, paymentStatus, search, status],
  )

  const stats = useMemo(() => getBookingStats(bookings), [bookings])

  const tableData = previewState === "empty" ? [] : filteredBookings
  const selectedBookingFromState = selectedBooking
    ? (bookings.find((booking) => booking.id === selectedBooking.id) ??
      selectedBooking)
    : null

  function clearFilters() {
    setSearch("")
    setStatus("all")
    setPaymentStatus("all")
  }

  function retryLoad() {
    setPreviewState("normal")
    toast.success("Bookings preview restored.")
  }

  function confirmCancelBooking() {
    if (!bookingToCancel) {
      return
    }

    setIsConfirming(true)
    window.setTimeout(() => {
      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingToCancel.id
            ? { ...booking, status: "cancelled", paymentStatus: "refunded" }
            : booking,
        ),
      )
      setSelectedBooking((current) =>
        current?.id === bookingToCancel.id
          ? { ...current, status: "cancelled", paymentStatus: "refunded" }
          : current,
      )
      setIsConfirming(false)
      setBookingToCancel(null)
      toast.success(`${bookingToCancel.code} cancelled for preview.`)
    }, 350)
  }

  function openCreateForm() {
    setFormState({ open: true, mode: "create", booking: null })
  }

  function openEditForm(booking: Booking) {
    setSelectedBooking(null)
    setFormState({ open: true, mode: "edit", booking })
  }

  async function submitBookingForm(values: BookingFormValues) {
    await new Promise((resolve) => window.setTimeout(resolve, 350))

    if (formState.mode === "create") {
      const createdBooking = createBookingFromForm(
        values,
        getNextBookingCode(bookings),
      )
      setBookings((current) => [createdBooking, ...current])
      setFormState({ open: false, mode: "create", booking: null })
      toast.success("Booking created.")
      return
    }

    if (formState.booking) {
      const updatedBooking = updateBookingFromForm(formState.booking, values)
      setBookings((current) =>
        current.map((booking) =>
          booking.id === updatedBooking.id ? updatedBooking : booking,
        ),
      )
      setSelectedBooking((current) =>
        current?.id === updatedBooking.id ? updatedBooking : current,
      )
      setFormState({ open: false, mode: "edit", booking: null })
      toast.success("Booking updated.")
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Bookings"
        description="Review booking status, payments, schedules, and operational follow-up."
        actions={
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={openCreateForm}
          >
            <CalendarPlus />
            New booking
          </Button>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {bookingsQuery.isLoading ? (
          <LoadingState variant="stats" />
        ) : (
          <>
            <StatCard
              label="Total bookings"
              value={String(stats.total)}
              description="Mock operational queue"
              icon={Plane}
            />
            <StatCard
              label="Pending payment"
              value={String(stats.pendingPayments)}
              description="Need customer follow-up"
              icon={CreditCard}
            />
            <StatCard
              label="Upcoming trips"
              value={String(stats.upcoming)}
              description="Paid and scheduled"
              icon={TimerReset}
            />
            <StatCard
              label="Attention needed"
              value={String(stats.attention)}
              description="Payment or expiry review"
              icon={CircleAlert}
            />
          </>
        )}
      </section>

      <BookingsFilters
        search={search}
        status={status}
        paymentStatus={paymentStatus}
        previewState={previewState}
        activeFilterCount={activeFilterCount}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPaymentStatusChange={setPaymentStatus}
        onPreviewStateChange={setPreviewState}
        onClearFilters={clearFilters}
      />

      <BookingsTable
        bookings={tableData}
        isLoading={bookingsQuery.isLoading || previewState === "loading"}
        isError={bookingsQuery.isError || previewState === "error"}
        isFiltered={previewState !== "empty" && activeFilterCount > 0}
        onRetry={retryLoad}
        onClearFilters={clearFilters}
        onRowClick={(booking) => setSelectedBooking(booking)}
      />

      <BookingDetailDrawer
        booking={selectedBookingFromState}
        open={Boolean(selectedBooking)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBooking(null)
          }
        }}
        onCancelBooking={setBookingToCancel}
        onEditBooking={openEditForm}
      />

      <BookingFormDrawer
        open={formState.open}
        mode={formState.mode}
        booking={formState.booking}
        onOpenChange={(open) =>
          setFormState((current) => ({
            ...current,
            open,
            booking: open ? current.booking : null,
          }))
        }
        onSubmit={submitBookingForm}
      />

      <ConfirmDialog
        open={Boolean(bookingToCancel)}
        onOpenChange={(open) => {
          if (!open) {
            setBookingToCancel(null)
          }
        }}
        title={
          bookingToCancel
            ? `Cancel ${bookingToCancel.code}?`
            : "Cancel booking?"
        }
        description="This is a mock Sprint 2 action. The booking will be marked cancelled locally and a toast will confirm the preview update."
        confirmLabel="Cancel booking"
        tone="danger"
        isPending={isConfirming}
        onConfirm={confirmCancelBooking}
      />
    </div>
  )
}
