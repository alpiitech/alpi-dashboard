import { useMemo, useState } from "react"
import { Link } from "react-router"
import {
  BadgeDollarSign,
  CalendarCheck,
  CheckCircle,
  ChevronRight,
  Handshake,
} from "lucide-react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { Caption, H2, Text } from "@/components/ui/typography"
import {
  bookingCompletionMix,
  destinationPerformance,
  operationalAlerts,
  partnerPerformance,
  travelPerformanceData,
} from "@/features/dashboard/dashboard.mock"
import type { DashboardTimeRange } from "@/features/dashboard/dashboard.types"
import { BookingCompletionRadial } from "@/features/dashboard/components/booking-completion-radial"
import { DestinationPerformanceList } from "@/features/dashboard/components/destination-performance-list"
import { OperationalAlerts } from "@/features/dashboard/components/operational-alerts"
import { PartnerPerformanceList } from "@/features/dashboard/components/partner-performance-list"
import {
  filterTravelPerformanceData,
  formatCurrency,
  formatNumber,
  summarizeTravelPerformance,
  TravelPerformanceChart,
} from "@/features/dashboard/components/travel-performance-chart"

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState<DashboardTimeRange>("90d")

  const filteredPerformanceData = useMemo(
    () => filterTravelPerformanceData(travelPerformanceData, timeRange),
    [timeRange],
  )

  const totals = useMemo(
    () => summarizeTravelPerformance(filteredPerformanceData),
    [filteredPerformanceData],
  )

  const kpis = [
    {
      label: "Total bookings",
      value: formatNumber(totals.totalBookings),
      caption: "Demand across selected period",
      trend: "+12.4%",
      icon: CalendarCheck,
    },
    {
      label: "Completed bookings",
      value: formatNumber(totals.completedBookings),
      caption: "Finished trips and fulfilled experiences",
      trend: "+8.7%",
      icon: CheckCircle,
    },
    {
      label: "Total revenue",
      value: formatCurrency(totals.revenue),
      caption: "Gross marketplace revenue",
      trend: "+15.1%",
      icon: BadgeDollarSign,
    },
    {
      label: "Partner SLA",
      value: formatNumber(totals.completedBookings),
      caption: "Service consistency benchmark",
      trend: "+4.2%",
      icon: Handshake,
    },
  ]

  return (
    <div className="min-w-0 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Operational overview of marketplace performance."
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/bookings">
              View bookings
              <ChevronRight size={14} />
            </Link>
          </Button>
        }
      />

      <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((metric) => {
          const Icon = metric.icon
          return (
            <section
              key={metric.label}
              className="flex min-w-0 flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4"
            >
              <div className="flex items-center justify-between">
                <Caption className="font-medium text-muted-foreground">
                  {metric.label}
                </Caption>
                <div className="grid size-8 place-items-center rounded-[var(--radius-button)] bg-surface-muted">
                  <Icon size={16} className="text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-end justify-between gap-2">
                <H2
                  as="div"
                  className="min-w-0 break-words text-2xl font-bold leading-none"
                >
                  {metric.value}
                </H2>
                <span className="shrink-0 rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                  {metric.trend}
                </span>
              </div>
              <Text className="text-xs text-muted-foreground">
                {metric.caption}
              </Text>
            </section>
          )
        })}
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(20rem,0.8fr)]">
        <TravelPerformanceChart
          data={filteredPerformanceData}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
        <BookingCompletionRadial data={bookingCompletionMix} />
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <DestinationPerformanceList destinations={destinationPerformance} />
        <PartnerPerformanceList partners={partnerPerformance} />
        <OperationalAlerts alerts={operationalAlerts} />
      </div>
    </div>
  )
}
