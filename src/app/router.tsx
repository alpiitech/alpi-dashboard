import { createBrowserRouter, Navigate } from "react-router"
import { lazy, Suspense, type ReactNode } from "react"
import { AppLayout, AppLayoutFullBleed } from "@/app/layouts/app-layout"
import { AppLayoutPublic } from "@/app/layouts/app-layout-public"
import { RequireAuth } from "@/app/guards/require-auth"
import { LoadingState } from "@/components/dashboard/loading-state"
import { RouteErrorBoundary } from "@/components/dashboard/route-error-boundary"

// Protected pages
const ActivityDetailPage = lazy(() =>
  import("@/features/activities/pages/activity-detail-page").then((module) => ({
    default: module.ActivityDetailPage,
  })),
)
const ActivitiesPage = lazy(() =>
  import("@/features/activities/pages/activities-page").then((module) => ({
    default: module.ActivitiesPage,
  })),
)
const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/dashboard-page").then((module) => ({
    default: module.DashboardPage,
  })),
)
const DesignSystemPage = lazy(() =>
  import("@/features/design-system/pages/design-system-page").then((module) => ({
    default: module.DesignSystemPage,
  })),
)
const EmployeesPage = lazy(() =>
  import("@/features/employees/pages/employees-page").then((module) => ({
    default: module.EmployeesPage,
  })),
)
const BookingsPage = lazy(() =>
  import("@/features/bookings/pages/bookings-page").then((module) => ({
    default: module.BookingsPage,
  })),
)
const ChatPage = lazy(() =>
  import("@/features/chat/pages/chat-page").then((module) => ({
    default: module.ChatPage,
  })),
)

// Public pages
const LoginPage = lazy(() =>
  import("@/features/auth/pages/login-page").then((module) => ({
    default: module.LoginPage,
  })),
)

function routeElement(element: ReactNode) {
  return (
    <Suspense fallback={<LoadingState variant="page" />}>
      {element}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  // Public routes — no AppShell, redirect to /dashboard if already authenticated
  {
    element: <AppLayoutPublic />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "login", element: routeElement(<LoginPage />) },
    ],
  },

  // Protected routes — standard layout with sidebar
  {
    element: <RequireAuth />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        errorElement: <RouteErrorBoundary />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: routeElement(<DashboardPage />) },
          { path: "design-system", element: routeElement(<DesignSystemPage />) },
          { path: "activities", element: routeElement(<ActivitiesPage />) },
          { path: "activities/:activityId", element: routeElement(<ActivityDetailPage />) },
          { path: "employees", element: routeElement(<EmployeesPage />) },
          { path: "bookings", element: routeElement(<BookingsPage />) },
          { path: "*", element: <Navigate to="/dashboard" replace /> },
        ],
      },
      {
        path: "/",
        element: <AppLayoutFullBleed />,
        errorElement: <RouteErrorBoundary />,
        children: [
          { path: "chat", element: routeElement(<ChatPage />) },
        ],
      },
    ],
  },
])
