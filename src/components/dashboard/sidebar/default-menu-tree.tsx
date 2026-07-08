import { NavLink, useLocation } from "react-router"
import type { SidebarMenuItem } from "@/core/config/navigation"
import { cn } from "@/shared/utils/cn"

// ─── Typography per depth ──────────────────────────────────────────────────
// depth 0 = Sub Menu Level 1  (direct children of a section)
// depth 1 = Sub Menu Level 2  (nested children)
const DEPTH_ROW: Record<number, string> = {
  0: "font-sans text-sm font-medium leading-5 min-h-8",
  1: "font-sans text-sm font-medium leading-5 min-h-8",
}
const depthRow = (depth: number) => DEPTH_ROW[depth] ?? DEPTH_ROW[1]

export function DefaultMenuTree({
  item,
  itemKey,
  depth = 0,
  onNavigate,
  selectedKey,
  onSelect,
  expandedKeys,
  onToggle,
}: {
  item: SidebarMenuItem
  itemKey: string
  depth?: number
  onNavigate: () => void
  selectedKey: string | null
  onSelect: (key: string) => void
  expandedKeys: Set<string>
  onToggle: (key: string) => void
}) {
  const location = useLocation()

  // ── Separator ──────────────────────────────────────────────────────────
  if (item.type === "separator") {
    return (
      <div className="pb-1.5 pt-3 text-sm font-semibold uppercase tracking-wide text-slate-500 truncate">
        {item.label}
      </div>
    )
  }

  const hasChildren = Boolean(item.children?.length)
  const isExpanded = expandedKeys.has(itemKey)
  const isActive = item.href === location.pathname || selectedKey === itemKey

  const rowClass = cn(
    "flex w-full items-center gap-2 rounded-[var(--radius-button)] px-2 text-left outline-none transition-colors",
    "font-sans text-slate-400 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/35",
    depthRow(depth),
    item.muted && "text-slate-500",
    isActive && "bg-primary text-primary-foreground",
  )

  const chevron = hasChildren ? (
    <svg
      className={cn("ml-auto size-3 shrink-0 text-slate-500 transition-transform duration-150", isExpanded && "rotate-180")}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : null

  const badge = item.badge ? (
    <span className="ml-auto rounded-[var(--radius-sm)] bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
      {item.badge}
    </span>
  ) : null

  return (
    <div>
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => { onToggle(itemKey) }}
          className={rowClass}
        >
          {item.label}
          {badge}
          {chevron}
        </button>
      ) : item.href ? (
        <NavLink
          to={item.href}
          onClick={() => { onSelect(itemKey); onNavigate() }}
          className={rowClass}
        >
          {item.label}
          {badge}
        </NavLink>
      ) : (
        <button
          type="button"
          onClick={() => { onSelect(itemKey); onNavigate() }}
          className={rowClass}
        >
          {item.label}
          {badge}
        </button>
      )}

      {hasChildren && isExpanded ? (
        <div className="relative ml-2 mt-1 space-y-1 pl-3 before:absolute before:left-0 before:top-1 before:bottom-2 before:w-px before:bg-white/10">
          {item.children?.map((child) => (
            <DefaultMenuTree
              key={`${item.label}-${child.label}`}
              item={child}
              itemKey={`${itemKey}/${child.label}`}
              depth={depth + 1}
              onNavigate={onNavigate}
              selectedKey={selectedKey}
              onSelect={onSelect}
              expandedKeys={expandedKeys}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
