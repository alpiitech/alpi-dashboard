import { type ReactNode } from "react"
import { AppHeader } from "@/components/dashboard/app-header"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { MobileSidebarDrawer } from "@/components/dashboard/mobile-sidebar-drawer"

export function AppShell({
  children,
  fullBleed = false,
}: {
  children: ReactNode
  fullBleed?: boolean
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          {fullBleed ? (
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface-muted">
              {children}
            </main>
          ) : (
            <main className="min-w-0 flex-1 bg-surface-muted px-4 py-4 sm:px-5 md:px-6 md:py-6 lg:px-8">
              <div className="mx-auto w-full min-w-0 max-w-7xl">{children}</div>
            </main>
          )}
        </div>
      </div>
      <MobileSidebarDrawer />
    </div>
  )
}
