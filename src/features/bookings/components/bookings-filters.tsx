import { FilterBar } from "@/components/dashboard/filter-bar"
import { Text } from "@/components/ui/typography"
import {
  bookingStatusOptions,
  paymentStatusOptions,
} from "@/features/bookings/bookings.constants"
import type {
  BookingStatus,
  PaymentStatus,
} from "@/features/bookings/bookings.types"

export type BookingsPreviewState = "normal" | "loading" | "empty" | "error"

function SelectControl({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <Text as="label" className="flex items-center gap-2 text-muted-foreground">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full min-w-0 rounded-[var(--radius-input)] border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 sm:min-w-36"
      >
        {children}
      </select>
    </Text>
  )
}

export function BookingsFilters({
  search,
  status,
  paymentStatus,
  previewState,
  activeFilterCount,
  onSearchChange,
  onStatusChange,
  onPaymentStatusChange,
  onPreviewStateChange,
  onClearFilters,
}: {
  search: string
  status: BookingStatus | "all"
  paymentStatus: PaymentStatus | "all"
  previewState: BookingsPreviewState
  activeFilterCount: number
  onSearchChange: (value: string) => void
  onStatusChange: (value: BookingStatus | "all") => void
  onPaymentStatusChange: (value: PaymentStatus | "all") => void
  onPreviewStateChange: (value: BookingsPreviewState) => void
  onClearFilters: () => void
}) {
  return (
    <FilterBar
      searchValue={search}
      searchPlaceholder="Search bookings, customers, activities..."
      onSearchChange={onSearchChange}
      activeFilterCount={activeFilterCount}
      onClearFilters={onClearFilters}
    >
      <SelectControl
        label="Booking status"
        value={status}
        onChange={(value) => onStatusChange(value as BookingStatus | "all")}
      >
        {bookingStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectControl>

      <SelectControl
        label="Payment status"
        value={paymentStatus}
        onChange={(value) =>
          onPaymentStatusChange(value as PaymentStatus | "all")
        }
      >
        {paymentStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectControl>

      <SelectControl
        label="Preview state"
        value={previewState}
        onChange={(value) =>
          onPreviewStateChange(value as BookingsPreviewState)
        }
      >
        <option value="normal">Normal state</option>
        <option value="loading">Loading state</option>
        <option value="empty">Empty state</option>
        <option value="error">Error state</option>
      </SelectControl>
    </FilterBar>
  )
}
