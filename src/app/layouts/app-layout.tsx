import { Outlet } from "react-router"
import { AppShell } from "@/components/dashboard/app-shell"

export function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

export function AppLayoutFullBleed() {
  return (
    <AppShell fullBleed>
      <Outlet />
    </AppShell>
  )
}
