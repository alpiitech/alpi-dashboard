import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  RadiusPreset,
  SidebarStyle,
  ThemeMode,
} from "@/core/config/app-config"

type UiState = {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
  themeMode: ThemeMode
  sidebarStyle: SidebarStyle
  radiusPreset: RadiusPreset
  setSidebarCollapsed: (collapsed: boolean) => void
  setMobileSidebarOpen: (open: boolean) => void
  setThemeMode: (mode: ThemeMode) => void
  setSidebarStyle: (style: SidebarStyle) => void
  setRadiusPreset: (preset: RadiusPreset) => void
}

function isRadiusPreset(value: unknown): value is RadiusPreset {
  return value === "none" || value === "default"
}

function isSidebarStyle(value: unknown): value is SidebarStyle {
  return value === "rail" || value === "default"
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system"
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      themeMode: "system",
      sidebarStyle: "rail",
      radiusPreset: "default",
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setSidebarStyle: (sidebarStyle) => set({ sidebarStyle }),
      setRadiusPreset: (radiusPreset) => set({ radiusPreset }),
    }),
    {
      name: "erp-dashboard-ui",
      version: 2,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return persistedState
        }

        const state = persistedState as Partial<UiState>
        return {
          ...state,
          themeMode: isThemeMode(state.themeMode) ? state.themeMode : "system",
          sidebarStyle: isSidebarStyle(state.sidebarStyle) ? state.sidebarStyle : "rail",
          radiusPreset: isRadiusPreset(state.radiusPreset) ? state.radiusPreset : "default",
        }
      },
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        themeMode: state.themeMode,
        sidebarStyle: state.sidebarStyle,
        radiusPreset: state.radiusPreset,
      }),
    },
  ),
)
