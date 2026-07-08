import { apiClient } from "@/core/api/api-client"
import { mockApi } from "@/core/api/mock-api"
import type { ApiResponse } from "@/core/api/api-types"
import type {
  ActivityStatus,
  PartnerActivity,
} from "@/features/activities/activities.types"

const USE_MOCK_API = true

export type ActivityListQuery = {
  search?: string
  status?: ActivityStatus | "all"
  page?: number
  pageSize?: number
}

export function listActivities(
  query: ActivityListQuery = {},
  signal?: AbortSignal,
): Promise<ApiResponse<PartnerActivity[]>> {
  if (USE_MOCK_API) {
    return mockApi.listActivities(query)
  }

  return apiClient.get<PartnerActivity[]>("/activities", {
    query,
    signal,
  })
}

export function getActivity(
  activityId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<PartnerActivity>> {
  if (USE_MOCK_API) {
    return mockApi.getActivity(activityId)
  }

  return apiClient.get<PartnerActivity>(`/activities/${activityId}`, {
    signal,
  })
}
