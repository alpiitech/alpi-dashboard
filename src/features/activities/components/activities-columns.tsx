import type { ColumnDef } from "@tanstack/react-table"
import { Caption, Strong, Text } from "@/components/ui/typography"
import { ActivityStatusBadge } from "@/features/activities/components/activity-status-badge"
import {
  formatActivityDate,
  formatActivityMoney,
} from "@/features/activities/activities.format"
import type { PartnerActivity } from "@/features/activities/activities.types"

export const activityColumns: ColumnDef<PartnerActivity>[] = [
  {
    accessorKey: "title",
    header: "Activity",
    cell: ({ row }) => (
      <div className="min-w-80">
        <Strong as="div" className="text-sm leading-5">
          {row.original.title}
        </Strong>
        <Caption as="div" className="truncate">
          {row.original.slug}
        </Caption>
      </div>
    ),
  },
  {
    accessorKey: "partnerName",
    header: "Partner",
    cell: ({ row }) => (
      <Text as="span" className="whitespace-nowrap leading-5">
        {row.original.partnerName}
      </Text>
    ),
  },
  {
    accessorKey: "city",
    header: "City / Category",
    cell: ({ row }) => (
      <div className="min-w-40">
        <Text as="div" className="leading-5">
          {row.original.city}
        </Text>
        <Caption as="div">{row.original.category}</Caption>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ActivityStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <Strong as="span" className="whitespace-nowrap text-sm">
        {formatActivityMoney(row.original.price, row.original.currency)}
      </Strong>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <Text as="span" className="whitespace-nowrap leading-5">
        {formatActivityDate(row.original.updatedAt)}
      </Text>
    ),
    sortingFn: "datetime",
  },
]
