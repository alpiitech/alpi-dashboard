import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { useUiStore } from "@/stores/ui-store"

export function MobileSidebarDrawer() {
  const open = useUiStore((state) => state.mobileSidebarOpen)
  const setOpen = useUiStore((state) => state.setMobileSidebarOpen)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[min(100vw,20rem)]">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Main dashboard navigation
        </SheetDescription>
        <AppSidebar mobile />
      </SheetContent>
    </Sheet>
  )
}
