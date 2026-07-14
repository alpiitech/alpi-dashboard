import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router"
import { appConfig } from "@/core/config/app-config"
import { sidebarGroups, sidebarSections, type SidebarSection } from "@/core/config/navigation"
import { useUiStore } from "@/stores/ui-store"
import { cn } from "@/shared/utils/cn"
import { DefaultMenuTree } from "./default-menu-tree"
import { collectActiveMenuKeys, sectionHasActiveRoute } from "./sidebar-utils"

export function DefaultSidebar({ mobile = false }: { mobile?: boolean }) {
  const setMobileOpen = useUiStore((state) => state.setMobileSidebarOpen)
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed)
  const location = useLocation()
  const navigate = useNavigate()
  const [hoverExpanded, setHoverExpanded] = useState(false)
  const [selectedMenuKey, setSelectedMenuKey] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const active = sidebarSections.find((section) =>
      sectionHasActiveRoute(section, location.pathname),
    )
    return new Set(active?.items.length ? [active.id] : [])
  })
  const [expandedMenuKeys, setExpandedMenuKeys] = useState<Set<string>>(() => {
    const active = sidebarSections.find((section) =>
      sectionHasActiveRoute(section, location.pathname),
    )
    return active
      ? collectActiveMenuKeys(active.items, location.pathname, active.id)
      : new Set()
  })

  const isCollapsed = sidebarCollapsed && !mobile && !hoverExpanded

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleMenuKey(key: string) {
    setExpandedMenuKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function handleNavigate() {
    if (mobile) setMobileOpen(false)
  }

  function handleDirectNav(section: SidebarSection) {
    if (section.href && section.items.length === 0) {
      navigate(section.href)
      if (mobile) setMobileOpen(false)
      return
    }
    toggleSection(section.id)
  }

  function renderSection(section: SidebarSection) {
    const isRouteActive = sectionHasActiveRoute(section, location.pathname)
    const isExpanded = expandedSections.has(section.id)
    const hasItems = section.items.length > 0
    const Icon = section.icon

    if (!hasItems && section.href) {
      return (
        <NavLink
          key={section.id}
          to={section.href}
          onClick={handleNavigate}
          className={cn(
            "group mb-0.5 flex min-h-9 items-center gap-2.5 rounded-[var(--radius-button)] px-2 font-sans text-sm font-medium leading-5 text-slate-300 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/35",
            isRouteActive && "bg-primary text-primary-foreground",
          )}
        >
          <span
            className={cn(
              "grid size-7 shrink-0 place-items-center rounded-md transition-colors",
              isRouteActive
                ? "text-white"
                : "text-slate-400 group-hover:text-white",
            )}
          >
            <Icon size={16} strokeWidth={1.9} />
          </span>
          <span className="truncate text-[13px]">{section.label}</span>
        </NavLink>
      )
    }

    return (
      <div key={section.id} className="mb-0.5">
        <button
          type="button"
          onClick={() => handleDirectNav(section)}
          aria-expanded={isExpanded}
          className={cn(
            "group flex min-h-9 w-full items-center gap-2.5 rounded-[var(--radius-button)] px-2 font-sans text-sm font-medium leading-5 text-slate-300 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/35",
            isRouteActive && "bg-primary text-primary-foreground",
          )}
        >
          <span
            className={cn(
              "grid size-7 shrink-0 place-items-center rounded-md transition-colors",
              isRouteActive
                ? "text-white"
                : "text-slate-400 group-hover:text-white",
            )}
          >
            <Icon size={16} strokeWidth={1.9} />
          </span>
          <span className="flex-1 truncate text-left text-[13px]">
            {section.label}
          </span>
          {hasItems ? (
            <svg
              className={cn(
                "size-3 shrink-0 text-slate-500 transition-transform duration-150",
                isRouteActive && "text-primary-foreground/80",
                isExpanded && "rotate-180",
              )}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </button>

        {isExpanded && hasItems ? (
          <div className="relative ml-4 mt-1 space-y-px pl-3 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-white/10">
            {section.items.map((item) => (
              <DefaultMenuTree
                key={item.label}
                item={item}
                itemKey={`${section.id}/${item.label}`}
                onNavigate={handleNavigate}
                selectedKey={selectedMenuKey}
                onSelect={setSelectedMenuKey}
                expandedKeys={expandedMenuKeys}
                onToggle={toggleMenuKey}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <aside
      onMouseEnter={() => {
        if (sidebarCollapsed && !mobile) setHoverExpanded(true)
      }}
      onMouseLeave={() => {
        if (sidebarCollapsed && !mobile) setHoverExpanded(false)
      }}
      className={cn(
        "z-40 flex h-dvh shrink-0 flex-col border-r border-white/10 bg-slate-950 font-sans text-sm text-white",
        isCollapsed ? "w-16 items-center" : "w-52",
        mobile ? "w-full" : "sticky top-0 hidden lg:flex",
      )}
    >
      {/* Header */}
      {isCollapsed ? (
        <div className="flex h-16 w-full shrink-0 items-center justify-center border-b border-white/10">
          <div className="grid size-9 place-items-center rounded-[var(--radius-button)] bg-white/8 text-white">
            <img
              src="/alpi-logo.webp"
              alt={appConfig.name}
              className="size-7 rounded-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-white/8">
            <img
              src="/alpi-logo.webp"
              alt={appConfig.name}
              className="size-7 rounded-full object-cover"
            />
          </div>
          <span className="truncate text-sm font-semibold text-white">
            {appConfig.name}
          </span>
        </div>
      )}

      {/* Nav */}
      {isCollapsed ? (
        <nav className="mt-3 flex flex-col items-center gap-1">
          {sidebarSections.map((section) => {
            const isRouteActive = sectionHasActiveRoute(section, location.pathname)
            const Icon = section.icon
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleDirectNav(section)}
                className={cn(
                  "grid size-10 place-items-center rounded-[var(--radius-button)] text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white",
                  isRouteActive && "bg-primary text-primary-foreground",
                )}
                aria-label={section.label}
              >
                <Icon size={17} strokeWidth={1.9} />
              </button>
            )
          })}
        </nav>
      ) : (
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {sidebarGroups.map((group, groupIndex) => (
            <div key={group.id} className={groupIndex > 0 ? "mt-4" : undefined}>
              {/* Group label */}
              <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </div>
              {/* Sections in group */}
              {group.sections.map((section) => renderSection(section))}
            </div>
          ))}
        </nav>
      )}
    </aside>
  )
}
