import { Outlet, Navigate } from "react-router"
import { useAuthStore } from "@/stores/auth-store"

/**
 * Public layout — no AppShell, no sidebar.
 * Used for /login and other public routes.
 * Redirects to /dashboard if user is already authenticated.
 */
export function AppLayoutPublic() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (isLoading) return null

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
    </div>
  )
}
