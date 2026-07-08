import { NavLink, useLocation } from "react-router"
import type { SidebarMenuItem } from "@/core/config/navigation"
import { cn } from "@/shared/utils/cn"

export function FlyoutMenuTree({
  item,
  itemKey,
  depth = 0,
  onNavigate,
  selectedKey,
  onSelect,
}: {
  item: SidebarMenuItem
  itemKey: string
  depth?: number
  onNavigate: () => void
  selectedKey: string | null
  onSelect: (key: string) => void
}) {
  const location = useLocation()
  if (item.type === "separator") {
    return (
      <div className="pb-1 pt-4">
        <div className="truncate font-sans text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {item.label}
        </div>
      </div>
    )
  }

  const hasChildren = Boolean(item.children?.length)
  const isActive = item.href === location.pathname || selectedKey === itemKey
  const textClassName =
    depth > 0
      ? "text-sm font-normal leading-5 text-foreground"
      : "text-sm font-medium leading-5 text-foreground"
  const rowClassName = cn(
    "group flex min-h-7 items-center gap-1.5 rounded-[var(--radius-button)] font-sans outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/25",
    depth > 0
      ? "relative pl-3 pr-1 before:absolute before:-left-2 before:top-1/2 before:h-px before:w-2.5 before:bg-border-strong after:absolute after:inset-y-0.5 after:left-2.5 after:right-0.5 after:rounded after:transition-colors after:duration-150 hover:after:bg-surface-muted"
      : "min-h-7 px-0 hover:text-primary",
    depth > 0 && isActive && "after:bg-secondary hover:after:bg-secondary",
  )
  const content = (
    <>
      <span
        className={cn(
          "relative z-10 truncate",
          textClassName,
          depth > 0 && "group-hover:font-medium group-hover:text-foreground",
          item.muted && "text-muted-foreground",
        )}
      >
        {item.label}
      </span>
      {item.badge ? (
        <span className="relative z-10 ml-auto rounded-[var(--radius-sm)] bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
          {item.badge}
        </span>
      ) : null}
    </>
  )

  return (
    <div>
      {item.href ? (
        <NavLink
          to={item.href}
          onClick={() => {
            onSelect(itemKey)
            onNavigate()
          }}
          className={cn(rowClassName, isActive && depth === 0 ? "text-primary" : "text-foreground")}
        >
          {content}
        </NavLink>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (!hasChildren) {
              onSelect(itemKey)
              onNavigate()
            }
          }}
          disabled={hasChildren}
          className={cn(
            rowClassName,
            "w-full text-left text-foreground disabled:cursor-default disabled:opacity-100",
          )}
        >
          {content}
        </button>
      )}

      {hasChildren ? (
        <div className="relative ml-1.5 mt-0.5 space-y-px pl-2 before:absolute before:-top-0.5 before:bottom-3 before:left-0 before:w-px before:bg-border-strong">
          {item.children?.map((child) => (
            <FlyoutMenuTree
              key={`${item.label}-${child.label}`}
              item={child}
              itemKey={`${itemKey}/${child.label}`}
              depth={depth + 1}
              onNavigate={onNavigate}
              selectedKey={selectedKey}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
