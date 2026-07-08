import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { queryKeys } from "@/core/query/query-keys"
import { loginUser, logoutUser } from "@/features/auth/auth.api"
import { useAuthStore } from "@/stores/auth-store"
import { getApiErrorMessage } from "@/core/api/api-error"
import type { LoginCredentials } from "@/features/auth/auth.types"

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: async (response) => {
      setUser(response.data)
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() })
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get("redirect") ?? "/dashboard"
      navigate(redirect, { replace: true })
    },
    onError: (error) => {
      const message = getApiErrorMessage(error, "Login failed. Please try again.")
      toast.error(message)
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: async () => {
      clearAuth()
      queryClient.clear()
      navigate("/login", { replace: true })
    },
    onError: () => {
      // Force logout even on error
      clearAuth()
      queryClient.clear()
      navigate("/login", { replace: true })
    },
  })
}
