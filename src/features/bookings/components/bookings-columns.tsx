import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Caption, Strong, Text } from "@/components/ui/typography"
import type { Booking } from "@/features/bookings/bookings.types"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/features/bookings/components/booking-status-badge"

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

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <div>
        <Strong as="div">{row.original.code}</Strong>
        <Caption as="div">{formatDate(row.original.bookingDate)}</Caption>
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <Strong as="span">{row.original.customerName}</Strong>,
  },
  {
    accessorKey: "activityTitle",
    header: "Activity",
    cell: ({ row }) => (
      <div className="min-w-48">
        <Text as="div" className="truncate">{row.original.activityTitle}</Text>
        <Caption as="div" className="truncate">{row.original.destination}</Caption>
      </div>
    ),
  },
  {
    accessorKey: "agentName",
    header: "Agent",
    cell: ({ row }) => <Text as="span" className="text-muted-foreground">{row.original.agentName}</Text>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <BookingStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => <PaymentStatusBadge status={row.original.paymentStatus} />,
  },
  {
    accessorKey: "travelDate",
    header: "Travel date",
    cell: ({ row }) => <Text as="span" className="whitespace-nowrap">{formatDate(row.original.travelDate)}</Text>,
    sortingFn: "datetime",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => (
      <Strong as="span" className="whitespace-nowrap">
        {formatMoney(row.original.totalAmount, row.original.currency)}
      </Strong>
    ),
  },
]
