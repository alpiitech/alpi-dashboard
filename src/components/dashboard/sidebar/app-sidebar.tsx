import { useUiStore } from "@/stores/ui-store"
import { DefaultSidebar } from "./default-sidebar"
import { RailSidebar } from "./rail-sidebar"

export function AppSidebar({ mobile = false }: { mobile?: boolean }) {
  const sidebarStyle = useUiStore((state) => state.sidebarStyle)

  if (sidebarStyle === "default") {
    return <DefaultSidebar mobile={mobile} />
  }

  return <RailSidebar mobile={mobile} />
}
