import { DataTable } from "@/components/dashboard/data-table"
import { EmptyState } from "@/components/dashboard/empty-state"
import { ErrorState } from "@/components/dashboard/error-state"
import { Button } from "@/components/ui/button"
import { bookingColumns } from "@/features/bookings/components/bookings-columns"
import type { Booking } from "@/features/bookings/bookings.types"

export function BookingsTable({
  bookings,
  isLoading,
  isError,
  isFiltered,
  onRetry,
  onRowClick,
  onClearFilters,
}: {
  bookings: Booking[]
  isLoading?: boolean
  isError?: boolean
  isFiltered?: boolean
  onRetry: () => void
  onRowClick: (booking: Booking) => void
  onClearFilters: () => void
}) {
  return (
    <DataTable
      columns={bookingColumns}
      data={bookings}
      isLoading={isLoading}
      isError={isError}
      getRowId={(booking) => booking.id}
      onRowClick={onRowClick}
      emptyState={
        isFiltered ? (
          <EmptyState
            title="No bookings match these filters."
            description="Try changing the search term or clearing active filters."
            action={
              <Button variant="outline" onClick={onClearFilters}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <EmptyState
            title="No bookings have been created."
            description="New bookings will appear here once customers complete checkout."
          />
        )
      }
      errorState={
        <ErrorState
          title="We could not load bookings."
          description="Try again, or refresh the page if the issue continues."
          action={
            <Button variant="outline" onClick={onRetry}>
              Try again
            </Button>
          }
        />
      }
    />
  )
}
