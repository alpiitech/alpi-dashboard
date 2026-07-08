// =============================================================================
// CONVENTIONS — Alpii Dashboard
// =============================================================================
// This file is the single source of truth for coding conventions.
// Read this before adding any new feature, component, or page.
// =============================================================================

// -----------------------------------------------------------------------------
// ICONS
// -----------------------------------------------------------------------------
// - Use ONLY `lucide-react`. No other icon library.
// - Import directly: `import { Home, Settings } from "lucide-react"`
// - Do NOT create icon wrapper components.
// - Size via prop: `<Home size={16} />` or className: `<Home className="size-4" />`

// -----------------------------------------------------------------------------
// NAVIGATION / SIDEBAR
// -----------------------------------------------------------------------------
// See navigation.ts for the full convention comment block.
//
// Structure:
//   SidebarSection      — top level, always has `icon: LucideIcon`
//     SidebarMenuItem [depth=0]  — sub level 1, group OR direct link
//       SidebarMenuItem [depth=1]  — sub level 2, leaf only
//
// Rules:
//   - SidebarSection with `items` must NOT have `href`.
//   - SidebarMenuItem must NEVER have both `href` and `children`.
//   - Depth=1 items are always leaves (no children).

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------
// Naming:
//   - UI primitives: src/components/ui/<name>.tsx  (PascalCase file)
//   - Dashboard shell: src/components/dashboard/<name>.tsx
//   - Feature components: src/features/<feature>/components/<name>.tsx
//
// Rules:
//   - Prefer composition over configuration props.
//   - Do NOT use `React.FC` — use plain function declarations.
//   - Export named exports, not default exports.
//   - Use `cn()` from @/shared/utils/cn for class merging.

// -----------------------------------------------------------------------------
// PAGES
// -----------------------------------------------------------------------------
// - Each feature has: src/features/<feature>/pages/<name>-page.tsx
// - Pages use `<PageShell>` for standard layout (title + header + content).
// - Pages do NOT import motion components — use plain divs.
// - Lazy-loaded in src/app/router.tsx.

// -----------------------------------------------------------------------------
// DATA FETCHING
// -----------------------------------------------------------------------------
// Pattern:
//   src/features/<feature>/<feature>.api.ts      — API adapter (fetch/mock)
//   src/features/<feature>/<feature>.queries.ts  — useQuery hooks
//   src/features/<feature>/<feature>.mutations.ts — useMutation hooks
//   src/features/<feature>/<feature>.types.ts    — TypeScript types
//   src/features/<feature>/<feature>.format.ts   — formatters, filters, stats
//
// Rules:
//   - Query hooks return React Query result directly.
//   - Mutations handle toast + navigation in onSuccess/onError.
//   - Pages must NOT import mock data directly — use query hooks.
//   - Query keys live in src/core/query/query-keys.ts.

// -----------------------------------------------------------------------------
// FORMS
// -----------------------------------------------------------------------------
// - Use react-hook-form + zod for all forms.
// - Schema defined in <feature>.schema.ts or inline for small forms.
// - Form field components are in src/components/forms/.
// - Always use `noValidate` on <form> elements.

// -----------------------------------------------------------------------------
// STYLING
// -----------------------------------------------------------------------------
// - Tailwind v4 only. No inline styles except for dynamic values (e.g. CSS vars).
// - Design tokens from src/styles/tokens/semantic.css — use token names.
// - Border radius: use `var(--radius-button)`, `var(--radius-card)` etc.
//   NOT `rounded-md` directly, unless it maps to the token.
// - Dark mode: handled by `.dark` class on <html> via ThemeRuntime.
// - Two radius presets: `none` | `default` — controlled via UI store.

// -----------------------------------------------------------------------------
// STATE
// -----------------------------------------------------------------------------
// - Global UI state: src/stores/ui-store.ts (Zustand, persisted)
// - Auth state: src/stores/auth-store.ts (Zustand, persisted)
// - Local component state: useState / useReducer
// - Server state: React Query only — do NOT duplicate in Zustand.

// -----------------------------------------------------------------------------
// ROUTER
// -----------------------------------------------------------------------------
// - All routes in src/app/router.tsx — lazy loaded.
// - Protected routes wrapped in <RequireAuth />.
// - Route paths use kebab-case.

// -----------------------------------------------------------------------------
// API CONTRACT (Go backend)
// -----------------------------------------------------------------------------
// Base URL: process.env.VITE_API_URL (default: http://localhost:8080)
//
// Response shape:
//   { data: T, meta?: { page, pageSize, total } }
//
// Error shape:
//   { error: string, code?: string }
//
// Auth: Bearer token in Authorization header.
// All dates: ISO 8601 strings.
// All money: integer cents, display with formatCurrency().

export {}
