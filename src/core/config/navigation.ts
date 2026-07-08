// =============================================================================
// NAVIGATION CONVENTION
// =============================================================================
//
// STRUCTURE
// ---------
// SidebarSection  (top level — has icon, shown as main menu row)
//   SidebarMenuItem depth=0  (sub menu level 1 — collapsible group OR direct link)
//     SidebarMenuItem depth=1  (sub menu level 2 — leaf link only)
//
// RULES
// -----
// 1. SidebarSection
//    - Always has `icon`.
//    - Use `href` ONLY if the section is a direct link with no children (e.g. Dashboard).
//    - If it has `items`, do NOT add `href` on the section itself.
//
// 2. SidebarMenuItem depth=0  (Sub Level 1)
//    - Can be a collapsible group (has `children`) OR a direct link (has `href`).
//    - NEVER have both `href` and `children` at the same time.
//      Reason: dual-role items break font hierarchy and render logic.
//    - If it is a group label (e.g. "Booking Queue"), omit `href`.
//    - If it is a direct link (e.g. "General Settings"), add `href`, no `children`.
//
// 3. SidebarMenuItem depth=1  (Sub Level 2)
//    - Always a leaf — has `href` if navigable, no `children`.
//    - Can have `badge` for counts/alerts (number or short string).
//    - Can have `muted: true` to de-emphasise placeholder items.
//
// FONT HIERARCHY  (do not override in navigation data)
// -----------------------------------------------------
// Section (main menu)   → text-sm   font-medium
// Sub Level 1 (depth=0) → text-xs   font-medium  (group) / font-normal (link)
// Sub Level 2 (depth=1) → text-11px font-normal
//
// =============================================================================

import type { LucideIcon } from "lucide-react"
import {
  BarChart2,
  Briefcase,
  CalendarDays,
  Compass,
  HandCoins,
  LayoutDashboard,
  Package,
  Settings2,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react"

export type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  permission?: string
  badge?: string | number
  children?: NavigationItem[]
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.view",
  },
  {
    label: "Activities",
    href: "/activities",
    icon: Package,
    permission: "activities.view",
  },
  {
    label: "Employees",
    href: "/employees",
    icon: Briefcase,
    permission: "employees.view",
    badge: "Preview",
  },
  {
    label: "Bookings",
    href: "/bookings",
    icon: CalendarDays,
    permission: "bookings.view",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings2,
    permission: "settings.manage",
  },
]

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

export const sidebarSections: SidebarSection[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    items: [],
  },
  {
    id: "activities",
    label: "Product",
    icon: Package,
    items: [
      {
        label: "Activities",
        children: [
          { label: "Active Activities", href: "/activities" },
          { label: "Pending Review", badge: 18 },
          { label: "Revision Requests" },
        ],
      },
      {
        label: "Management",
        children: [
          { label: "Destinations" },
          { label: "Categories" },
        ],
      },
    ],
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: CalendarDays,
    items: [
      {
        label: "Booking Queue",
        children: [
          { label: "All Bookings", href: "/bookings" },
          { label: "Pending Payment", badge: 22 },
          { label: "Paid & Upcoming" },
          { label: "Ongoing" },
          { label: "Finished" },
          { label: "Cancelled" },
          { label: "Expired" },
        ],
      },
      {
        label: "Change Requests",
        children: [
          { label: "Reschedule Requests" },
          { label: "Cancellation Requests" },
        ],
      },
      {
        label: "Reviews",
        children: [
          { label: "Pending Moderation" },
          { label: "Approved Reviews" },
          { label: "Hidden / Rejected Reviews" },
        ],
      },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    icon: UsersRound,
    items: [
      {
        label: "Applications",
        children: [
          { label: "All Applications", href: "/employees" },
          { label: "Pending Verification", badge: 9 },
          { label: "Revision Requested" },
          { label: "Approved Agents" },
          { label: "Rejected Applications" },
          { label: "Suspended Agents" },
        ],
      },
      { label: "Agent Performance" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: WalletCards,
    items: [
      {
        label: "Payments",
        children: [
          { label: "All Transactions" },
          { label: "Pending Payments", badge: 14 },
          { label: "Successful Payments" },
          { label: "Refunded Payments" },
        ],
      },
      {
        label: "Refund Cases",
        children: [
          { label: "New Requests" },
          { label: "In Review" },
          { label: "Approved" },
          { label: "Rejected" },
          { label: "Completed" },
        ],
      },
      {
        label: "Agent Payouts",
        children: [
          { label: "Agent Payables" },
          { label: "Pending Payouts" },
        ],
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: HandCoins,
    items: [
      {
        label: "Pricing & Profit Setup",
        children: [
          { label: "Pricing Components" },
          { label: "Profit & Margin Settings" },
          { label: "Pricing Preview" },
        ],
      },
      {
        label: "Promo Codes",
        children: [
          { label: "All Promo Codes" },
          { label: "Active Promo Codes" },
          { label: "Expired / Disabled" },
        ],
      },
      {
        label: "Affiliate Program",
        children: [
          { label: "Affiliate Profiles" },
          { label: "Affiliate Promo Codes" },
          { label: "Commission Settings" },
        ],
      },
      {
        label: "Currency & FX",
        children: [
          { label: "Enabled Currencies" },
          { label: "FX Rates" },
          { label: "FX Settings" },
        ],
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    shortLabel: "Admin",
    icon: ShieldCheck,
    items: [
      { label: "User Management" },
      { label: "Roles & Permissions" },
      { label: "Audit Logs" },
      { label: "Notifications" },
      {
        label: "Integrations",
        children: [
          { label: "Payment Provider" },
          { label: "Email Provider" },
          { label: "File Storage" },
          { label: "Webhooks" },
        ],
      },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: Settings2,
    items: [
      { label: "Design System", href: "/design-system" },
      { label: "Chat", href: "/chat" },
      { label: "Workspace Settings" },
      { label: "File & Storage Settings" },
      { label: "Security Settings" },
      { label: "Notification Settings" },
      { label: "Feature Availability" },
    ],
  },
]

export const favoriteSidebarItems = [
  { label: "Pinned workspace", icon: BarChart2 },
  { label: "Operations board", icon: Compass },
  { label: "Dashboard", icon: LayoutDashboard },
]
