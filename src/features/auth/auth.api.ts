import { mockApi } from "@/core/api/mock-api"
import type { ApiResponse } from "@/core/api/api-types"
import type { AuthUser, LoginCredentials } from "@/features/auth/auth.types"

export async function loginUser(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
  return mockApi.login(credentials)
}

export async function logoutUser(): Promise<ApiResponse<null>> {
  return mockApi.logout()
}

export async function getCurrentUser(): Promise<ApiResponse<AuthUser>> {
  return mockApi.getMe()
}
