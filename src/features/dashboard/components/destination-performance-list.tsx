import { ArrowUpRight } from "lucide-react"
import { Caption, H3, Strong, Text } from "@/components/ui/typography"
import type { DestinationPerformance } from "@/features/dashboard/dashboard.types"
import { formatCurrency, formatNumber } from "@/features/dashboard/components/travel-performance-chart"

type DestinationPerformanceListProps = {
  destinations: DestinationPerformance[]
}

export function DestinationPerformanceList({ destinations }: DestinationPerformanceListProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[0_1px_1px_oklch(0_0_0/0.03)]">
      <div>
        <H3 as="h2">Top destinations</H3>
        <Text className="mt-1 text-muted-foreground">Revenue and booking volume by city.</Text>
      </div>

      <div className="mt-5 divide-y divide-border">
        {destinations.map((destination) => (
          <div
            key={destination.destination}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <Strong as="p" className="truncate text-sm">
                {destination.destination}
              </Strong>
              <Caption>{formatNumber(destination.bookings)} bookings</Caption>
            </div>
            <div className="text-right">
              <Strong as="p" className="text-sm">
                {formatCurrency(destination.revenue)}
              </Strong>
              <Caption className="inline-flex items-center justify-end gap-1 text-success">
                <ArrowUpRight className="size-3.5" />
                {destination.growth.toFixed(1)}%
              </Caption>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
