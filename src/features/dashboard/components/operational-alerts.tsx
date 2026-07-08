import { StatusBadge } from "@/components/dashboard/status-badge"
import { Caption, H3, Strong, Text } from "@/components/ui/typography"
import type { OperationalAlert } from "@/features/dashboard/dashboard.types"

type OperationalAlertsProps = {
  alerts: OperationalAlert[]
}

export function OperationalAlerts({ alerts }: OperationalAlertsProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[0_1px_1px_oklch(0_0_0/0.03)]">
      <div>
        <H3 as="h2">Operational alerts</H3>
        <Text className="mt-1 text-muted-foreground">Work that needs marketplace follow-up.</Text>
      </div>

      <div className="mt-5 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.label}
            className="rounded-md border border-border bg-surface-muted px-3 py-3 transition-colors duration-150 hover:bg-secondary"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Strong as="p" className="text-sm">
                  {alert.label}
                </Strong>
                <Caption className="mt-0.5">{alert.description}</Caption>
              </div>
              <StatusBadge label={String(alert.count)} tone={alert.tone} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
