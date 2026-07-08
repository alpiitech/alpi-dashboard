import type { StatusBadgeConfig, StatusTone } from "@/components/dashboard/status-badge"
import type { ActivityStatus } from "@/features/activities/activities.types"

export const activityStatusConfig = {
  published: { label: "Published", tone: "success" },
  pending_review: { label: "Pending review", tone: "warning" },
  revision_requested: { label: "Revision requested", tone: "danger" },
  draft: { label: "Draft", tone: "neutral" },
  archived: { label: "Archived", tone: "neutral" },
} satisfies Record<ActivityStatus, StatusBadgeConfig>

export const activityStatusLabels: Record<ActivityStatus, string> = Object.fromEntries(
  Object.entries(activityStatusConfig).map(([status, config]) => [status, config.label]),
) as Record<ActivityStatus, string>

export const activityStatusTones: Record<ActivityStatus, StatusTone> = Object.fromEntries(
  Object.entries(activityStatusConfig).map(([status, config]) => [status, config.tone]),
) as Record<ActivityStatus, StatusTone>
