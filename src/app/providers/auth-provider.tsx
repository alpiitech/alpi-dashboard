import { type ReactNode, useEffect } from "react"
import { useCurrentUserQuery } from "@/features/auth/auth.queries"
import { useAuthStore } from "@/stores/auth-store"
import { isApiError } from "@/core/api/api-error"
import { LoadingState } from "@/components/dashboard/loading-state"

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useCurrentUserQuery()
  const setUser = useAuthStore((s) => s.setUser)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const setLoading = useAuthStore((s) => s.setLoading)

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
      return
    }

    if (error) {
      // 401 = not authenticated — expected, not an error
      if (isApiError(error) && error.status === 401) {
        clearAuth()
      } else {
        clearAuth()
      }
      return
    }

    if (data?.data) {
      setUser(data.data)
    }
  }, [isLoading, error, data, setUser, clearAuth, setLoading])

  // Show full-page loader only on first session check
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingState variant="page" />
      </div>
    )
  }

  return <>{children}</>
}
