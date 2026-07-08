import { Navigate, Outlet, useLocation } from "react-router"
import { useAuthStore } from "@/stores/auth-store"

export function RequireAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const location = useLocation()

  // Still checking session — AuthProvider shows loading, this won't render
  if (isLoading) return null

  if (!isAuthenticated) {
    const redirect = location.pathname !== "/" ? `?redirect=${encodeURIComponent(location.pathname)}` : ""
    return <Navigate to={`/login${redirect}`} replace />
  }

  return <Outlet />
}
