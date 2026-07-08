import { Star } from "lucide-react"
import { Caption, H3, Strong, Text } from "@/components/ui/typography"
import type { PartnerPerformance } from "@/features/dashboard/dashboard.types"
import { formatNumber } from "@/features/dashboard/components/travel-performance-chart"

type PartnerPerformanceListProps = {
  partners: PartnerPerformance[]
}

export function PartnerPerformanceList({ partners }: PartnerPerformanceListProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[0_1px_1px_oklch(0_0_0/0.03)]">
      <div>
        <H3 as="h2">Partner performance</H3>
        <Text className="mt-1 text-muted-foreground">Completed trips, rating, and SLA health.</Text>
      </div>

      <div className="mt-5 divide-y divide-border">
        {partners.map((partner) => (
          <div key={partner.partner} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Strong as="p" className="truncate text-sm">
                  {partner.partner}
                </Strong>
                <Caption>{partner.city}</Caption>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-1 text-xs font-semibold text-foreground">
                <Star className="size-3.5 fill-warning text-warning" />
                {partner.rating.toFixed(1)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <Caption>{formatNumber(partner.completedBookings)} completed</Caption>
              <Caption>{partner.sla.toFixed(1)}% SLA</Caption>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
