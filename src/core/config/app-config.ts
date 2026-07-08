export const appConfig = {
  name: import.meta.env.VITE_APP_NAME ?? "Alpii Dashboard",
  env: import.meta.env.VITE_APP_ENV ?? "development",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1",
} as const

export type ThemeMode = "light" | "dark" | "system"
export type SidebarStyle = "rail" | "default"
export type RadiusPreset = "none" | "default"

export const sidebarStyles: Array<{
  id: SidebarStyle
  label: string
  description: string
}> = [
  {
    id: "rail",
    label: "Rail",
    description: "Icon rail with flyout menu — compact and space-efficient.",
  },
  {
    id: "default",
    label: "Default",
    description: "Full sidebar with menu items always visible.",
  },
]

export const radiusPresets: Array<{
  id: RadiusPreset
  label: string
  value: string
}> = [
  { id: "none", label: "None", value: "0px" },
  { id: "default", label: "Default", value: "6px" },
]
