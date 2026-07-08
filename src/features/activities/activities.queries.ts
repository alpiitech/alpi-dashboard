import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/core/query/query-keys"
import {
  getActivity,
  listActivities,
  type ActivityListQuery,
} from "@/features/activities/activities.api"

export function useActivitiesQuery(query: ActivityListQuery = {}) {
  return useQuery({
    queryKey: queryKeys.activities.list(query),
    queryFn: ({ signal }) => listActivities(query, signal),
  })
}

export function useActivityQuery(activityId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.activities.detail(activityId ?? "missing"),
    queryFn: ({ signal }) => {
      if (!activityId) {
        throw new Error("Activity ID is required.")
      }

      return getActivity(activityId, signal)
    },
    enabled: Boolean(activityId),
  })
}
