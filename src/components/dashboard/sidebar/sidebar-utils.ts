import type { SidebarMenuItem, SidebarSection } from "@/core/config/navigation"

export function menuItemHasActiveRoute(item: SidebarMenuItem, pathname: string): boolean {
  if (item.href === pathname) {
    return true
  }
  return item.children?.some((child) => menuItemHasActiveRoute(child, pathname)) ?? false
}

export function sectionHasActiveRoute(section: SidebarSection, pathname: string): boolean {
  if (section.href === pathname) {
    return true
  }
  return section.items.some((item) => menuItemHasActiveRoute(item, pathname))
}

export function collectActiveMenuKeys(items: SidebarMenuItem[], pathname: string, prefix: string) {
  const keys = new Set<string>()

  function visit(item: SidebarMenuItem, key: string): boolean {
    if (item.type === "separator") {
      return false
    }
    const childHasActiveRoute = item.children?.some((child) => visit(child, `${key}/${child.label}`)) ?? false
    const isActive = item.href === pathname || childHasActiveRoute
    if (isActive && item.children?.length) {
      keys.add(key)
    }
    return isActive
  }

  for (const item of items) {
    visit(item, `${prefix}/${item.label}`)
  }

  return keys
}
