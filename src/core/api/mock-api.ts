import { createApiError } from "@/core/api/api-error"
import type { ApiResponse } from "@/core/api/api-types"
import { defaultPagination, normalizePagination } from "@/core/api/pagination"
import { mockPartnerActivities } from "@/features/activities/activities.mock"
import type { ActivityListQuery } from "@/features/activities/activities.api"
import type { PartnerActivity } from "@/features/activities/activities.types"
import type { AuthUser, LoginCredentials } from "@/features/auth/auth.types"

let requestCounter = 0

function createRequestId() {
  requestCounter += 1
  return `req_mock_${String(requestCounter).padStart(4, "0")}`
}

function delay<TData>(response: TData) {
  return new Promise<TData>((resolve) => {
    window.setTimeout(() => resolve(response), 180)
  })
}

function paginate<TData>(items: TData[], query: ActivityListQuery) {
  const pagination = normalizePagination({
    page: query.page ?? defaultPagination.page,
    pageSize: query.pageSize ?? defaultPagination.pageSize,
  })
  const start = (pagination.page - 1) * pagination.pageSize
  const data = items.slice(start, start + pagination.pageSize)
  const totalPages = Math.max(1, Math.ceil(items.length / pagination.pageSize))

  return {
    data,
    pagination: {
      ...pagination,
      total: items.length,
      totalPages,
    },
  }
}

// ---------- Mock auth state ----------
const MOCK_USER: AuthUser = {
  id: "usr_mock_001",
  name: "Pasqa Demo",
  email: "demo@alpii.com",
  role: "admin",
  permissions: ["dashboard.view", "activities.view", "bookings.view", "settings.manage"],
  avatarInitials: "PD",
}

// Session flag stored in memory — simulates HttpOnly cookie session
let mockSessionActive = false

// Pre-authenticated for convenience in development when VITE_MOCK_AUTH=true
if (import.meta.env.VITE_MOCK_AUTH === "true") {
  mockSessionActive = true
}

export const mockApi = {
  // ---------- Auth ----------
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    await delay(null)
    if (
      credentials.email === "demo@alpii.com" &&
      credentials.password === "demo1234"
    ) {
      mockSessionActive = true
      return {
        data: MOCK_USER,
        meta: { requestId: createRequestId() },
      }
    }
    throw createApiError({
      code: "UNAUTHENTICATED",
      message: "Invalid email or password.",
      requestId: createRequestId(),
      status: 401,
    })
  },

  async logout(): Promise<ApiResponse<null>> {
    mockSessionActive = false
    return delay({ data: null, meta: { requestId: createRequestId() } })
  },

  async getMe(): Promise<ApiResponse<AuthUser>> {
    await delay(null)
    if (!mockSessionActive) {
      throw createApiError({
        code: "UNAUTHENTICATED",
        message: "Session expired or not authenticated.",
        requestId: createRequestId(),
        status: 401,
      })
    }
    return {
      data: MOCK_USER,
      meta: { requestId: createRequestId() },
    }
  },

  // ---------- Activities ----------
  async listActivities(query: ActivityListQuery = {}): Promise<ApiResponse<PartnerActivity[]>> {
    const term = query.search?.trim().toLowerCase()
    const filtered = mockPartnerActivities.filter((activity) => {
      const matchesSearch =
        !term ||
        [
          activity.title,
          activity.slug,
          activity.partnerName,
          activity.city,
          activity.category,
        ].some((value) => value.toLowerCase().includes(term))
      const matchesStatus =
        !query.status || query.status === "all" || activity.status === query.status

      return matchesSearch && matchesStatus
    })
    const { data, pagination } = paginate(filtered, query)

    return delay({
      data,
      meta: {
        requestId: createRequestId(),
        pagination,
      },
    })
  },

  async getActivity(activityId: string): Promise<ApiResponse<PartnerActivity>> {
    const activity = mockPartnerActivities.find((item) => item.id === activityId)

    if (!activity) {
      throw createApiError({
        code: "NOT_FOUND",
        message: "We could not find this activity.",
        requestId: createRequestId(),
        status: 404,
      })
    }

    return delay({
      data: activity,
      meta: {
        requestId: createRequestId(),
      },
    })
  },
}
