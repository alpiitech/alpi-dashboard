import { createBrowserRouter, Navigate } from "react-router"
import { lazy, Suspense, type ReactNode } from "react"
import { AppLayout, AppLayoutFullBleed } from "@/app/layouts/app-layout"
import { AppLayoutPublic } from "@/app/layouts/app-layout-public"
import { RequireAuth } from "@/app/guards/require-auth"
import { LoadingState } from "@/components/dashboard/loading-state"
import { RouteErrorBoundary } from "@/components/dashboard/route-error-boundary"

// ── Workspace ─────────────────────────────────────────────────────────────────
const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/dashboard-page").then((m) => ({ default: m.DashboardPage })),
)
const DestinationsPage = lazy(() =>
  import("@/features/destinations/pages/destinations-page").then((m) => ({ default: m.DestinationsPage })),
)
const CategoriesPage = lazy(() =>
  import("@/features/categories/pages/categories-page").then((m) => ({ default: m.CategoriesPage })),
)
const ActivitiesPage = lazy(() =>
  import("@/features/activities/pages/activities-page").then((m) => ({ default: m.ActivitiesPage })),
)
const ActivityDetailPage = lazy(() =>
  import("@/features/activities/pages/activity-detail-page").then((m) => ({ default: m.ActivityDetailPage })),
)
const AgentsPage = lazy(() =>
  import("@/features/agents/pages/agents-page").then((m) => ({ default: m.AgentsPage })),
)
const CustomersPage = lazy(() =>
  import("@/features/customers/pages/customers-page").then((m) => ({ default: m.CustomersPage })),
)

// ── Reservation ───────────────────────────────────────────────────────────────
const BookingsPage = lazy(() =>
  import("@/features/bookings/pages/bookings-page").then((m) => ({ default: m.BookingsPage })),
)
const ReschedulePage = lazy(() =>
  import("@/features/reschedule/pages/reschedule-page").then((m) => ({ default: m.ReschedulePage })),
)
const PaymentsPage = lazy(() =>
  import("@/features/payments/pages/payments-page").then((m) => ({ default: m.PaymentsPage })),
)
const RefundsPage = lazy(() =>
  import("@/features/refunds/pages/refunds-page").then((m) => ({ default: m.RefundsPage })),
)
const ReviewsPage = lazy(() =>
  import("@/features/reviews/pages/reviews-page").then((m) => ({ default: m.ReviewsPage })),
)

// ── Finance ───────────────────────────────────────────────────────────────────
const TransactionsPage = lazy(() =>
  import("@/features/transactions/pages/transactions-page").then((m) => ({ default: m.TransactionsPage })),
)
const PayoutsPage = lazy(() =>
  import("@/features/payouts/pages/payouts-page").then((m) => ({ default: m.PayoutsPage })),
)
const PromoCodesPage = lazy(() =>
  import("@/features/promo-codes/pages/promo-codes-page").then((m) => ({ default: m.PromoCodesPage })),
)
const AffiliatesPage = lazy(() =>
  import("@/features/affiliates/pages/affiliates-page").then((m) => ({ default: m.AffiliatesPage })),
)

// ── Settings ──────────────────────────────────────────────────────────────────
const PricingPage = lazy(() =>
  import("@/features/settings/pages/pricing-page").then((m) => ({ default: m.PricingPage })),
)
const UserManagementPage = lazy(() =>
  import("@/features/settings/pages/user-management-page").then((m) => ({ default: m.UserManagementPage })),
)
const GeneralSettingsPage = lazy(() =>
  import("@/features/settings/pages/general-settings-page").then((m) => ({ default: m.GeneralSettingsPage })),
)

// ── Misc ──────────────────────────────────────────────────────────────────────
const DesignSystemPage = lazy(() =>
  import("@/features/design-system/pages/design-system-page").then((m) => ({ default: m.DesignSystemPage })),
)
const ChatPage = lazy(() =>
  import("@/features/chat/pages/chat-page").then((m) => ({ default: m.ChatPage })),
)

// Public pages
const LoginPage = lazy(() =>
  import("@/features/auth/pages/login-page").then((m) => ({ default: m.LoginPage })),
)

function routeElement(element: ReactNode) {
  return (
    <Suspense fallback={<LoadingState variant="page" />}>
      {element}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  // Public routes
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

          // Workspace
          { path: "dashboard", element: routeElement(<DashboardPage />) },
          { path: "destinations", element: routeElement(<DestinationsPage />) },
          { path: "categories", element: routeElement(<CategoriesPage />) },
          { path: "activities", element: routeElement(<ActivitiesPage />) },
          { path: "activities/:activityId", element: routeElement(<ActivityDetailPage />) },
          { path: "agents", element: routeElement(<AgentsPage />) },
          { path: "customers", element: routeElement(<CustomersPage />) },

          // Reservation
          { path: "bookings", element: routeElement(<BookingsPage />) },
          { path: "reschedule", element: routeElement(<ReschedulePage />) },
          { path: "payments", element: routeElement(<PaymentsPage />) },
          { path: "refunds", element: routeElement(<RefundsPage />) },
          { path: "reviews", element: routeElement(<ReviewsPage />) },

          // Finance
          { path: "transactions", element: routeElement(<TransactionsPage />) },
          { path: "payouts", element: routeElement(<PayoutsPage />) },
          { path: "promo-codes", element: routeElement(<PromoCodesPage />) },
          { path: "affiliates", element: routeElement(<AffiliatesPage />) },

          // Settings
          { path: "settings/pricing", element: routeElement(<PricingPage />) },
          { path: "settings/users", element: routeElement(<UserManagementPage />) },
          { path: "settings/general", element: routeElement(<GeneralSettingsPage />) },

          // Misc
          { path: "design-system", element: routeElement(<DesignSystemPage />) },

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
