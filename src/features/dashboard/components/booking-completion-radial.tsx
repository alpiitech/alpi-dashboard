import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Caption, H3, Strong, Text } from "@/components/ui/typography"
import type { BookingCompletionMix } from "@/features/dashboard/dashboard.types"
import { formatNumber } from "@/features/dashboard/components/travel-performance-chart"

type BookingCompletionRadialProps = {
  data: BookingCompletionMix
}

const segmentMeta = [
  { key: "completed", label: "Completed", color: "var(--chart-1)" },
  { key: "upcoming", label: "Upcoming", color: "var(--chart-2)" },
  { key: "pending", label: "Pending", color: "var(--chart-3)" },
  { key: "cancelled", label: "Cancelled", color: "var(--danger)" },
] as const

export function BookingCompletionRadial({
  data,
}: BookingCompletionRadialProps) {
  const total = data.completed + data.upcoming + data.pending + data.cancelled
  const chartData = segmentMeta.map((segment) => ({
    name: segment.label,
    value: data[segment.key],
    fill: segment.color,
  }))

  return (
    <section className="min-w-0 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[0_1px_1px_oklch(0_0_0/0.03)] sm:p-5">
      <div>
        <H3 as="h2">Booking mix</H3>
        <Text className="mt-1 text-muted-foreground">
          Completion health across active travel operations.
        </Text>
      </div>

      <div className="relative mt-5 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            innerRadius="54%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            barSize={14}
          >
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null

                const item = payload[0]

                return (
                  <div className="rounded-md border border-border bg-surface px-3 py-2 shadow-[var(--shadow-soft)]">
                    <Caption className="font-medium text-foreground">
                      {String(item.name)}
                    </Caption>
                    <Strong as="p" className="mt-1 text-xs">
                      {formatNumber(Number(item.value ?? 0))} bookings
                    </Strong>
                  </div>
                )
              }}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "var(--surface-muted)" }}
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <H3 as="p">{formatNumber(total)}</H3>
            <Caption>Total</Caption>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {segmentMeta.map((segment) => (
          <div
            key={segment.key}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <Caption>{segment.label}</Caption>
            </span>
            <Strong as="span" className="text-xs">
              {formatNumber(data[segment.key])}
            </Strong>
          </div>
        ))}
      </div>
    </section>
  )
}
