import { NavLink } from "react-router"
import {
  Home,
  Lock,
  LogOut,
  Menu,
  UserPen,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CommandMenu } from "@/components/dashboard/command-menu"
import { appConfig } from "@/core/config/app-config"
import { useUiStore } from "@/stores/ui-store"
import { useAuthStore } from "@/stores/auth-store"
import { useLogoutMutation } from "@/features/auth/auth.mutations"

export function AppHeader() {
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen)
  const themeMode = useUiStore((state) => state.themeMode)
  const setThemeMode = useUiStore((state) => state.setThemeMode)
  const sidebarStyle = useUiStore((state) => state.sidebarStyle)
  const setSidebarStyle = useUiStore((state) => state.setSidebarStyle)
  const radiusPreset = useUiStore((state) => state.radiusPreset)
  const setRadiusPreset = useUiStore((state) => state.setRadiusPreset)
  const user = useAuthStore((s) => s.user)
  const logoutMutation = useLogoutMutation()
  const isDark = themeMode === "dark"
  const isRail = sidebarStyle === "rail"
  const isRound = radiusPreset === "default"

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-border bg-background px-4 sm:px-5 md:px-6 lg:px-8">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center gap-3">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </Button>

        {/* Logo — centered on mobile only */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
          <img
            src="/alpi-logo.webp"
            alt={appConfig.name}
            className="size-8 rounded-full object-cover"
          />
        </div>

        {/* Search — left-aligned, grows to fill space */}
        <div className="flex-1">
          <CommandMenu />
        </div>

        {/* Right — avatar/profile */}
        <div className="flex shrink-0 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-[var(--radius-button)] outline-none transition-opacity hover:opacity-80">
                <div className="hidden min-w-0 flex-col items-end md:flex">
                  {user && (
                    <>
                      <span className="max-w-36 truncate text-sm font-semibold leading-tight text-foreground">
                        {user.name}
                      </span>
                      <span className="max-w-36 truncate text-xs capitalize leading-tight text-muted-foreground">
                        {user.role}
                      </span>
                    </>
                  )}
                </div>
                <Avatar className="size-9 cursor-pointer">
                  <AvatarFallback className="text-xs font-semibold">
                    {user?.avatarInitials ?? "??"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-52">
              <div className="space-y-3 p-3">
                <label className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="text-sm text-foreground">Dark</span>
                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) =>
                      setThemeMode(checked ? "dark" : "light")
                    }
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="text-sm text-foreground">Rail</span>
                  <Switch
                    checked={isRail}
                    onCheckedChange={(checked) =>
                      setSidebarStyle(checked ? "rail" : "default")
                    }
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="text-sm text-foreground">Round</span>
                  <Switch
                    checked={isRound}
                    onCheckedChange={(checked) =>
                      setRadiusPreset(checked ? "default" : "none")
                    }
                  />
                </label>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/" className="flex items-center gap-2">
                  <Home size={14} />
                  Homepage
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/profile" className="flex items-center gap-2">
                  <UserPen size={14} />
                  Edit Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink
                  to="/change-password"
                  className="flex items-center gap-2"
                >
                  <Lock size={14} />
                  Change Password
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <LogOut size={14} />
                {logoutMutation.isPending ? "Signing out…" : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
