# Alpii Dashboard AI Implementation Guide

This is the only Markdown guide for this repository. Any AI or engineer must read this file before implementing dashboard changes or integrating Go backend code.

## Purpose

This project is a React dashboard foundation for Alpii travel operations. The dashboard is currently frontend-first with mock data, typed API contracts, reusable UI patterns, and a clean path for future Go REST API integration.

Primary product areas:

- Travel performance dashboard
- Activities and activity detail preview
- Bookings operational workflow
- Chat demo
- Internal design-system validation page
- Settings for minimal UI behavior
- Auth/session mock foundation

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Recharts
- Radix UI primitives
- shadcn-style local components
- Sonner toast
- lucide-react as the only icon library
- Zustand for lightweight local UI/auth state

Main commands:

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

Always run these before handing off implementation:

```bash
npm run typecheck
npm run lint
npm run build
```

## Project Structure

```txt
src/
  app/                 App shell, layouts, guards, providers, router
  components/
    dashboard/         Dashboard-level reusable patterns
    dashboard/sidebar/ Sidebar variants and menu trees
    forms/             Reusable form fields and form actions
    ui/                Base UI primitives (no motion wrappers)
  core/
    api/               API client, response/error contracts, pagination
    config/            App config, navigation config, conventions
    query/             Query client and query keys
    router/            Route helpers
  features/            Feature modules
  shared/              Shared utilities
  stores/              Zustand stores
  styles/              CSS tokens and global styles
```

## Current UI Rules

Keep the UI simple and stable. Do not add new user-facing theme knobs unless they are clearly needed by multiple screens.

Allowed Settings:

- Theme mode: light, dark, system
- Sidebar style: rail, default
- Border radius: none, default

Removed by product decision:

- Google font runtime customization
- Primary color hex customization
- Theme profiles
- Motion mood
- Sidebar density/hierarchy controls
- Runtime primary color override
- Runtime Google Fonts injection

Radius is global and semantic:

- Cards and panels: `rounded-[var(--radius-card)]`
- Buttons and action tiles: `rounded-[var(--radius-button)]`
- Inputs and selects: `rounded-[var(--radius-input)]`
- Dialogs, popovers, dropdown surfaces: `rounded-[var(--radius-dialog)]`
- Small badges: `rounded-[var(--radius-sm)]`
- Keep `rounded-full` for avatars, dots, pills, and circular indicators.

Colors must use semantic tokens:

- `bg-surface`
- `bg-background`
- `bg-surface-muted`
- `text-foreground`
- `text-muted-foreground`
- `border-border`
- `bg-primary`
- `text-primary`

Do not hardcode light/dark palettes in component code unless there is a documented exception.

## Sidebar Rules

Sidebar code is split under:

```txt
src/components/dashboard/sidebar/
  app-sidebar.tsx
  rail-sidebar.tsx
  default-sidebar.tsx
  flyout-menu-tree.tsx
  default-menu-tree.tsx
  sidebar-utils.ts
```

Rules:

- `app-sidebar.tsx` only chooses `rail` or `default`.
- Rail sidebar keeps hover-to-open flyout behavior.
- Default sidebar keeps visible icon + label and collapsible nested menus.
- Dashboard is a direct navigation item and must not open a submenu.
- Default sidebar hierarchy is fixed in code, not user configurable.
- Do not reintroduce density/hierarchy settings.
- Keep default sidebar clean: vertical tree line only, no horizontal submenu connector line.

Navigation data lives in:

```txt
src/core/config/navigation.ts
```

When adding a page:

1. Add route in `src/app/router.tsx`.
2. Add command/search route if needed in `navigationItems`.
3. Add sidebar entry in `sidebarSections`.
4. Add breadcrumb/label support if the header needs it.

## Reusable Dashboard Components

Prefer existing dashboard primitives before writing page-local card markup.

Use:

- `Surface` for panels/cards.
- `SurfaceHeader` for card headers.
- `IconSurface` for icon blocks.
- `PageShell` for standard pages with `PageHeader`.
- `SettingsOptionGrid` for settings option cards.
- `DataTable` for operational tables.
- `DetailDrawer` for detail panels.
- `ConfirmDialog` for confirmation actions.
- `StatusBadge` patterns for feature statuses.
- `EmptyState`, `ErrorState`, `LoadingState` for page states.

Do not create a global abstraction for every small visual pattern. Only extract when it removes real duplication.

## Feature Module Convention

Operational features should follow this layout:

```txt
src/features/{feature}/
  {feature}.types.ts
  {feature}.constants.ts
  {feature}.format.ts
  {feature}.mock.ts
  {feature}.api.ts
  {feature}.queries.ts
  {feature}.schema.ts       # only if forms exist
  components/
  pages/
```

Reference modules:

- Activities: good example for API/query/detail page flow.
- Bookings: good example for forms, drawer workflow, local preview mutations, and table.

Page files should focus on composition and user workflow. Data fetching, formatting, constants, and schemas belong in feature-local files.

## API Contract For Go Backend

The frontend is prepared for Go REST APIs through `src/core/api`.

Success response shape:

```json
{
  "data": {},
  "meta": {
    "requestId": "req_123",
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 120,
      "totalPages": 6
    }
  }
}
```

Error response shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request is invalid.",
    "fieldErrors": {
      "name": ["Name is required"]
    },
    "requestId": "req_123",
    "status": 422
  }
}
```

Supported frontend error codes are defined in:

```txt
src/core/api/api-types.ts
```

Important Go integration rules:

- Use cookie/session auth with `credentials: include`.
- Do not put JWT tokens in localStorage.
- Return JSON consistently with the response shapes above.
- Include `requestId` on success and error responses when possible.
- Use proper HTTP status codes:
  - `401` unauthenticated
  - `403` forbidden
  - `404` not found
  - `409` conflict
  - `413` file too large
  - `415` unsupported file type
  - `422` validation error
  - `429` rate limited
  - `500` internal error
  - `503` service unavailable
- Validation errors should use `fieldErrors`.
- Paginated list endpoints should fill `meta.pagination`.

Use `apiClient` from:

```txt
src/core/api/api-client.ts
```

Do not call `fetch` directly inside pages.

## Query Rules

Query setup lives in:

```txt
src/core/query/
```

Rules:

- Define query keys in `query-keys.ts`.
- Feature query hooks live in `{feature}.queries.ts`.
- Feature API calls live in `{feature}.api.ts`.
- Pages use query hooks, not mock arrays or raw API calls.
- Mock data can stay in `{feature}.mock.ts` until real Go endpoints exist.

Example flow:

```txt
page -> useFeatureQuery() -> feature.api.ts -> apiClient or mock adapter
```

## Forms

Use the existing form foundation:

```txt
src/components/forms/
```

Rules:

- Use React Hook Form.
- Use Zod schemas in `{feature}.schema.ts`.
- Keep create/update helpers close to schema when they transform form values into domain objects.
- Use `FormActions` for form footer actions.
- Use `DateField` for date selection. It uses `react-day-picker`.
- Do not build form validation ad hoc inside page files.

## Tables

Use:

```txt
src/components/dashboard/data-table.tsx
```

Rules:

- Columns belong in feature components, usually `{feature}-columns.tsx`.
- Table state can be local unless the data must be URL-driven.
- Loading, empty, error, and filtered states should use dashboard state components.
- Do not build one-off table markup for operational lists.

## Status Pattern

Use `StatusBadgeConfig` from:

```txt
src/components/dashboard/status-badge.tsx
```

Feature status constants should follow:

```ts
export const bookingStatusConfig = {
  pending_payment: {
    label: "Pending Payment",
    tone: "warning",
  },
} satisfies Record<BookingStatus, StatusBadgeConfig>
```

Keep feature-specific statuses in feature modules. Do not centralize every status into one global file.

## Upload And Attachment UI

Upload UI should use the shadcn Attachment component in:

```txt
src/components/ui/attachment.tsx
```

Until real Go upload endpoints are added:

- Keep upload behavior mock-only.
- Show states clearly: idle, uploading, processing, error, done.
- Do not implement production upload, CSV import, or file scanning without a dedicated backend sprint.

## Chat UI

Chat UI uses shadcn-style:

- `Message`
- `MessageScroller`
- `Bubble`

The chat page uses full-bleed layout. Keep scroll isolated:

- Chat list scrolls inside its own sidebar area.
- Message content scrolls inside message viewport.
- Message input stays sticky at the bottom of the chat panel.
- Do not let chat content scroll the whole app page.

## Icons

HugeIcons is the default visual icon system.

Use:

```tsx
import { SomeIcon } from "@hugeicons/core-free-icons"
import { HugeIcon } from "@/components/ui/huge-icon"
```

Lucide is still present for older utility icons. Prefer HugeIcons for new dashboard-facing navigation and product UI.

## Authentication

Auth is a mock foundation, not production auth.

Rules:

- Do not store JWT in localStorage.
- Keep future Go auth session/cookie-based.
- Auth UI and guards are placeholders for integration.
- Real RBAC, permission enforcement, and secure session validation must be implemented with the Go backend later.

## What Not To Do

Do not reintroduce:

- Theme profiles
- Google Font settings
- Runtime primary color picker
- Motion mood settings
- Sidebar density/hierarchy settings
- Large global style engines
- Page-specific raw tables
- Direct `fetch` in pages
- Direct mock data imports in pages when a query hook exists
- New dependencies unless clearly justified

Do not modularize prematurely:

- Do not turn charts into a generic chart framework yet.
- Do not split chat into too many abstractions yet.
- Do not create a global status registry for every feature.
- Do not convert every single class to a token if it is not structural.

## Implementation Checklist For AI

Before coding:

1. Read this README.
2. Inspect the target feature folder.
3. Reuse existing components before creating new ones.
4. Check whether the feature already has `.types`, `.constants`, `.format`, `.api`, `.queries`, `.schema`.
5. Keep changes scoped.

While coding:

1. Keep pages composition-focused.
2. Put API/query logic in feature modules.
3. Use semantic tokens for color and radius.
4. Use HugeIcons for new visible dashboard icons.
5. Keep settings minimal.
6. Do not add new theme customization.

Before final response:

```bash
npm run typecheck
npm run lint
npm run build
```

Report clearly if any command could not be run.

## Current Routes

Core routes include:

- `/dashboard`
- `/activities`
- `/activities/:activityId`
- `/bookings`
- `/employees`
- `/settings`
- `/design-system`
- `/chat`
- `/login`

Use router and navigation config together so routes, command menu, breadcrumbs, and sidebar stay aligned.

## Environment

Important environment variables:

```txt
VITE_APP_NAME
VITE_APP_ENV
VITE_API_BASE_URL
```

Default API base URL:

```txt
http://localhost:8080/api/v1
```

Future Go backend should expose endpoints under that base URL unless environment config says otherwise.
