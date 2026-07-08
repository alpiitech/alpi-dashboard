import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  activityStatusLabels,
  activityStatusTones,
} from "@/features/activities/activities.constants"
import type { ActivityStatus } from "@/features/activities/activities.types"

export function ActivityStatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <StatusBadge
      label={activityStatusLabels[status]}
      tone={activityStatusTones[status]}
    />
  )
}
