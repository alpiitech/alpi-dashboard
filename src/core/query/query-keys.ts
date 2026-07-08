import type { ActivityListQuery } from "@/features/activities/activities.api"

export const queryKeys = {
  all: ["erp-dashboard"] as const,
  auth: {
    all: () => [...queryKeys.all, "auth"] as const,
    me: () => [...queryKeys.auth.all(), "me"] as const,
  },
  activities: {
    all: () => [...queryKeys.all, "activities"] as const,
    lists: () => [...queryKeys.activities.all(), "list"] as const,
    list: (filters: ActivityListQuery) =>
      [...queryKeys.activities.lists(), filters] as const,
    details: () => [...queryKeys.activities.all(), "detail"] as const,
    detail: (activityId: string) =>
      [...queryKeys.activities.details(), activityId] as const,
  },
  bookings: {
    all: () => [...queryKeys.all, "bookings"] as const,
    list: () => [...queryKeys.bookings.all(), "list"] as const,
  },
}
