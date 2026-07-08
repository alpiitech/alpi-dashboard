import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { EmptyState } from "@/components/dashboard/empty-state"
import { Select } from "@/components/ui/select"
import { Caption, H2, H3, Strong, Text } from "@/components/ui/typography"
import type {
  DashboardTimeRange,
  TravelPerformancePoint,
} from "@/features/dashboard/dashboard.types"

type TravelPerformanceChartProps = {
  data: TravelPerformancePoint[]
  timeRange: DashboardTimeRange
  onTimeRangeChange: (range: DashboardTimeRange) => void
}

export type TravelPerformanceTotals = {
  totalBookings: number
  completedBookings: number
  revenue: number
}

const referenceDate = new Date("2026-06-30")

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value)
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

function rangeToDays(range: DashboardTimeRange) {
  if (range === "7d") return 7
  if (range === "30d") return 30
  return 90
}

export function filterTravelPerformanceData(
  data: TravelPerformancePoint[],
  timeRange: DashboardTimeRange,
) {
  const days = rangeToDays(timeRange)
  const startDate = new Date(referenceDate)
  startDate.setDate(referenceDate.getDate() - days + 1)

  return data.filter((item) => new Date(item.date) >= startDate)
}

export function summarizeTravelPerformance(
  data: TravelPerformancePoint[],
): TravelPerformanceTotals {
  return data.reduce(
    (accumulator, item) => ({
      totalBookings: accumulator.totalBookings + item.totalBookings,
      completedBookings: accumulator.completedBookings + item.completedBookings,
      revenue: accumulator.revenue + item.revenue,
    }),
    {
      totalBookings: 0,
      completedBookings: 0,
      revenue: 0,
    },
  )
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{
    color?: string
    dataKey?: string | number
    value?: number
  }>
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  const labels: Record<string, string> = {
    totalBookings: "Total bookings",
    completedBookings: "Completed bookings",
  }

  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 shadow-[var(--shadow-soft)]">
      <Caption className="font-medium text-foreground">
        {label ? formatShortDate(label) : ""}
      </Caption>
      <div className="mt-2 space-y-1">
        {payload.map((item) => (
          <div
            key={String(item.dataKey)}
            className="flex items-center justify-between gap-5"
          >
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {labels[String(item.dataKey)]}
            </span>
            <Strong as="span" className="text-xs">
              {formatNumber(Number(item.value ?? 0))}
            </Strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TravelPerformanceChart({
  data,
  timeRange,
  onTimeRangeChange,
}: TravelPerformanceChartProps) {
  const totals = summarizeTravelPerformance(data)

  return (
    <section className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[0_1px_1px_oklch(0_0_0/0.03)]">
      <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:px-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <H3 as="h2">Travel performance</H3>
          <Text className="mt-1 text-muted-foreground">
            Booking demand and completed trips across the travel marketplace.
          </Text>
        </div>
        <Select
          value={timeRange}
          onChange={(event) =>
            onTimeRangeChange(event.target.value as DashboardTimeRange)
          }
          className="w-full lg:w-40"
          aria-label="Select travel performance range"
        >
          <option value="90d">Last 90 days</option>
          <option value="30d">Last 30 days</option>
          <option value="7d">Last 7 days</option>
        </Select>
      </div>

      <div className="grid border-b border-border lg:grid-cols-3">
        <div className="border-b border-border px-4 py-4 sm:px-5 lg:border-b-0 lg:border-r">
          <Caption>Total bookings</Caption>
          <H2 className="mt-1">{formatNumber(totals.totalBookings)}</H2>
        </div>
        <div className="border-b border-border px-4 py-4 sm:px-5 lg:border-b-0 lg:border-r">
          <Caption>Completed bookings</Caption>
          <H2 className="mt-1">{formatNumber(totals.completedBookings)}</H2>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <Caption>Total revenue</Caption>
          <H2 className="mt-1">{formatCurrency(totals.revenue)}</H2>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="p-4 sm:p-6">
          <EmptyState
            title="No travel data"
            description="Booking performance will appear here when the selected period has data."
          />
        </div>
      ) : (
        <div className="h-[16rem] px-2 py-5 sm:h-[18rem] sm:px-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ left: 6, right: 8, top: 12, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="travelTotalBookingsFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
                <linearGradient
                  id="travelCompletedBookingsFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.24}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                minTickGap={28}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={formatShortDate}
              />
              <YAxis hide domain={["dataMin - 12", "dataMax + 16"]} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "var(--border-strong)" }}
              />
              <Area
                dataKey="completedBookings"
                type="monotone"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#travelCompletedBookingsFill)"
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Area
                dataKey="totalBookings"
                type="monotone"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#travelTotalBookingsFill)"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}
