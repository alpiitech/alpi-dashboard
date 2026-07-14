// =============================================================================
// NAVIGATION CONVENTION
// =============================================================================
//
// STRUCTURE
// ---------
// SidebarSection  (top level — has icon, shown as main menu row)
//   SidebarMenuItem depth=0  (sub menu level 1 — direct link only, no dropdowns)
//
// RULES
// -----
// 1. SidebarSection
//    - Always has `icon`.
//    - Use `href` ONLY if the section is a direct link with no children (e.g. Dashboard).
//    - If it has `items`, do NOT add `href` on the section itself.
//
// 2. SidebarMenuItem depth=0
//    - Always a direct link — has `href`, no `children`.
//    - Can have `badge` for counts/alerts (number or short string).
//
// GROUPS
// ------
// WORKSPACE   → Dashboard, Destinations, Categories, Activities, Agents, Customers
// RESERVATION → Bookings, Reschedule, Payments, Refunds, Reviews
// FINANCE     → Transactions, Payouts, Promo Codes, Affiliates
// SETTINGS    → Pricing, User Management, General Settings
//
// =============================================================================

import type { LucideIcon } from "lucide-react"
import {
  BadgePercent,
  CalendarClock,
  CalendarDays,
  CreditCard,
  Globe,
  HandCoins,
  LayoutDashboard,
  LayoutGrid,
  MapPin,
  Package,
  RefreshCcw,
  Settings2,
  ShieldCheck,
  Star,
  Tag,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react"

export type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  permission?: string
  badge?: string | number
  children?: NavigationItem[]
}

export type SidebarMenuItem = {
  label: string
  type?: "item" | "separator"
  href?: string
  badge?: string | number
  muted?: boolean
  children?: SidebarMenuItem[]
}

export type SidebarSection = {
  id: string
  label: string
  shortLabel?: string
  icon: LucideIcon
  href?: string
  items: SidebarMenuItem[]
}

export type SidebarGroup = {
  id: string
  label: string
  sections: SidebarSection[]
}

export const sidebarGroups: SidebarGroup[] = [
  {
    id: "workspace",
    label: "Workspace",
    sections: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        items: [],
      },
      {
        id: "destinations",
        label: "Destinations",
        icon: MapPin,
        href: "/destinations",
        items: [],
      },
      {
        id: "categories",
        label: "Categories",
        icon: LayoutGrid,
        href: "/categories",
        items: [],
      },
      {
        id: "activities",
        label: "Activities",
        icon: Package,
        href: "/activities",
        items: [],
      },
      {
        id: "agents",
        label: "Agents",
        icon: UsersRound,
        href: "/agents",
        items: [],
      },
      {
        id: "customers",
        label: "Customers",
        icon: Users,
        href: "/customers",
        items: [],
      },
    ],
  },
  {
    id: "reservation",
    label: "Reservation",
    sections: [
      {
        id: "bookings",
        label: "Bookings",
        icon: CalendarDays,
        href: "/bookings",
        items: [],
      },
      {
        id: "reschedule",
        label: "Reschedule",
        icon: CalendarClock,
        href: "/reschedule",
        items: [],
      },
      {
        id: "payments",
        label: "Payments",
        icon: CreditCard,
        href: "/payments",
        items: [],
      },
      {
        id: "refunds",
        label: "Refunds",
        icon: RefreshCcw,
        href: "/refunds",
        items: [],
      },
      {
        id: "reviews",
        label: "Reviews",
        icon: Star,
        href: "/reviews",
        items: [],
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    sections: [
      {
        id: "transactions",
        label: "Transactions",
        icon: Wallet,
        href: "/transactions",
        items: [],
      },
      {
        id: "payouts",
        label: "Payouts",
        icon: HandCoins,
        href: "/payouts",
        items: [],
      },
      {
        id: "promo-codes",
        label: "Promo Codes",
        icon: BadgePercent,
        href: "/promo-codes",
        items: [],
      },
      {
        id: "affiliates",
        label: "Affiliates",
        icon: Globe,
        href: "/affiliates",
        items: [],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    sections: [
      {
        id: "pricing",
        label: "Pricing",
        icon: Tag,
        href: "/settings/pricing",
        items: [],
      },
      {
        id: "user-management",
        label: "User Management",
        icon: ShieldCheck,
        href: "/settings/users",
        items: [],
      },
      {
        id: "general-settings",
        label: "General Settings",
        icon: Settings2,
        href: "/settings/general",
        items: [],
      },
    ],
  },
]

// Flat list of all sections — used by sidebar components that iterate sections directly
export const sidebarSections: SidebarSection[] = sidebarGroups.flatMap(
  (group) => group.sections,
)

export const favoriteSidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Bookings", icon: CalendarDays },
  { label: "Activities", icon: Package },
]
