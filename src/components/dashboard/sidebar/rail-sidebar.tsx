import { useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { appConfig } from "@/core/config/app-config"
import { sidebarGroups, sidebarSections, type SidebarSection } from "@/core/config/navigation"
import { useUiStore } from "@/stores/ui-store"
import { cn } from "@/shared/utils/cn"
import { FlyoutMenuTree } from "./flyout-menu-tree"
import { sectionHasActiveRoute } from "./sidebar-utils"

export function RailSidebar({ mobile = false }: { mobile?: boolean }) {
  const setMobileOpen = useUiStore((state) => state.setMobileSidebarOpen)
  const location = useLocation()
  const navigate = useNavigate()
  const defaultSection = useMemo(
    () =>
      sidebarSections.find((section) =>
        section.items.length > 0 && sectionHasActiveRoute(section, location.pathname),
      )?.id,
    [location.pathname],
  )
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    defaultSection ?? null,
  )
  const [selectedMenuKey, setSelectedMenuKey] = useState<string | null>(null)
  const activeSection = sidebarSections.find(
    (section) => section.id === activeSectionId && section.items.length > 0,
  )
  const activeSectionIndex = activeSection
    ? Math.max(
        sidebarSections.findIndex((section) => section.id === activeSection.id),
        0,
      )
    : 0
  const flyoutTop =
    activeSectionIndex <= 4
      ? `calc(4rem + ${activeSectionIndex} * 3.2rem)`
      : `clamp(4.5rem, calc(4rem + ${activeSectionIndex} * 3.2rem - 9rem), calc(100dvh - 34rem))`

  function handleRailClick(section: SidebarSection) {
    if (section.href && section.items.length === 0) {
      navigate(section.href)
      setActiveSectionId(null)
      if (mobile) setMobileOpen(false)
      return
    }
    setActiveSectionId((current) =>
      current === section.id ? null : section.id,
    )
  }

  function handleRailHover(section: SidebarSection) {
    if (!mobile && section.items.length > 0) {
      setActiveSectionId(section.id)
    }
  }

  function handleNavigate() {
    setActiveSectionId(null)
    if (mobile) setMobileOpen(false)
  }

  // Mobile: grouped nav with labels, full height scrollable
  if (mobile) {
    return (
      <div className="flex h-full w-full flex-col overflow-y-auto bg-slate-950 font-sans text-white">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-4">
          <button
            className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-button)] bg-white/8 text-white outline-none transition-colors duration-150 hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-primary/35"
            aria-label={appConfig.name}
            onClick={() => setActiveSectionId(null)}
          >
            <img
              src="/alpi-logo.webp"
              alt={appConfig.name}
              className="size-7 rounded-full object-cover"
            />
          </button>
          <span className="text-sm font-semibold text-white">
            {appConfig.name}
          </span>
        </div>

        {/* Nav sections grouped */}
        <nav className="flex flex-1 flex-col p-3">
          {sidebarGroups.map((group, groupIndex) => (
            <div key={group.id} className={groupIndex > 0 ? "mt-4" : undefined}>
              <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </div>
              {group.sections.map((section) => {
                const isSelected = activeSectionId === section.id
                const isRouteActive = sectionHasActiveRoute(section, location.pathname)
                const Icon = section.icon
                const hasItems = section.items.length > 0

                return (
                  <div key={section.id}>
                    <button
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-[var(--radius-button)] px-2 py-2 text-sm text-slate-400 outline-none transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/35",
                        (isSelected || isRouteActive) &&
                          "bg-primary font-medium text-primary-foreground",
                      )}
                      onClick={() => handleRailClick(section)}
                      aria-label={section.label}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="min-w-0 flex-1 truncate text-left text-[13px]">
                        {section.label}
                      </span>
                      {hasItems && (
                        <svg
                          className={cn(
                            "size-4 shrink-0 text-slate-500 transition-transform duration-150",
                            isSelected && "rotate-90",
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </button>

                    {isSelected && hasItems && (
                      <div className="ml-4 mt-px border-l border-border pl-3 pb-1">
                        {section.items.map((item) => (
                          <FlyoutMenuTree
                            key={item.label}
                            item={item}
                            itemKey={`${section.id}/${item.label}`}
                            onNavigate={handleNavigate}
                            selectedKey={selectedMenuKey}
                            onSelect={setSelectedMenuKey}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>
      </div>
    )
  }

  // Desktop: icon rail with group separators + flyout
  return (
    <aside
      onMouseLeave={() => setActiveSectionId(null)}
      className="relative z-40 flex h-dvh w-16 shrink-0 overflow-visible border-r border-white/10 bg-slate-950 font-sans text-white sticky top-0 hidden lg:flex"
    >
      <div className="flex w-16 shrink-0 flex-col items-center overflow-y-auto">
        <div className="flex h-16 w-full shrink-0 items-center justify-center border-b border-white/10 px-2">
          <button
            className="grid size-9 place-items-center rounded-[var(--radius-button)] bg-white/8 text-white outline-none transition-colors duration-150 hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-primary/35"
            aria-label={appConfig.name}
            onClick={() => setActiveSectionId(null)}
          >
            <img
              src="/alpi-logo.webp"
              alt={appConfig.name}
              className="size-7 rounded-full object-cover"
            />
          </button>
        </div>

        <nav className="mt-2 flex flex-1 flex-col items-center gap-0 w-full px-2 pb-3">
          {sidebarGroups.map((group, groupIndex) => (
            <div key={group.id} className={cn("flex w-full flex-col items-center gap-0.5", groupIndex > 0 && "mt-1 pt-1 border-t border-white/8")}>
              {group.sections.map((section) => {
                const isSelected = activeSectionId === section.id
                const isRouteActive = sectionHasActiveRoute(section, location.pathname)
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    className={cn(
                      "grid size-10 place-items-center rounded-[var(--radius-button)] text-slate-400 outline-none transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/35",
                      (isSelected || isRouteActive) && "bg-primary text-primary-foreground",
                    )}
                    onMouseEnter={() => handleRailHover(section)}
                    onFocus={() => handleRailHover(section)}
                    onClick={() => handleRailClick(section)}
                    aria-label={section.label}
                    title={section.label}
                  >
                    <Icon size={17} strokeWidth={1.9} />
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Flyout panel */}
      {activeSection ? (
        <div
          key={activeSection.id}
          style={{ top: flyoutTop }}
          className="absolute left-full z-50 ml-3 w-[15rem] overflow-hidden rounded-[var(--radius-dialog)] border border-border bg-surface text-foreground shadow-[var(--shadow-soft)]"
        >
          <div className="flex max-h-[calc(100dvh-8rem)] flex-col">
            <div className="flex h-9 items-center px-3">
              <div className="truncate font-sans text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {activeSection.label}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-2">
              <div className="space-y-px">
                {activeSection.items.map((item) => (
                  <FlyoutMenuTree
                    key={item.label}
                    item={item}
                    itemKey={`${activeSection.id}/${item.label}`}
                    onNavigate={handleNavigate}
                    selectedKey={selectedMenuKey}
                    onSelect={setSelectedMenuKey}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  )
}
