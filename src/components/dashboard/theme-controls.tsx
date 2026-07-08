import { Moon, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUiStore } from "@/stores/ui-store"

export function ThemeControls() {
  const themeMode = useUiStore((state) => state.themeMode)
  const setThemeMode = useUiStore((state) => state.setThemeMode)
  const sidebarStyle = useUiStore((state) => state.sidebarStyle)
  const setSidebarStyle = useUiStore((state) => state.setSidebarStyle)
  const radiusPreset = useUiStore((state) => state.radiusPreset)
  const setRadiusPreset = useUiStore((state) => state.setRadiusPreset)

  const isDark = themeMode === "dark"
  const isRail = sidebarStyle === "rail"
  const isRound = radiusPreset === "default"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Appearance settings">
          <Palette size={17} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 p-3 flex flex-col gap-3">

        {/* Dark mode */}
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Moon size={15} className="text-muted-foreground" />
            <span className="text-sm">Dark</span>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setThemeMode(checked ? "dark" : "light")}
          />
        </label>

        {/* Rail sidebar */}
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm">Rail Sidebar</span>
          <Switch
            checked={isRail}
            onCheckedChange={(checked) => setSidebarStyle(checked ? "rail" : "default")}
          />
        </label>

        {/* Round radius */}
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm">Round</span>
          <Switch
            checked={isRound}
            onCheckedChange={(checked) => setRadiusPreset(checked ? "default" : "none")}
          />
        </label>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
