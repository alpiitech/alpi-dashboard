import { type ReactNode, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { isApiError } from "@/core/api/api-error"
import { radiusPresets } from "@/core/config/app-config"
import { useUiStore } from "@/stores/ui-store"
import { AuthProvider } from "@/app/providers/auth-provider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (isApiError(error) && [401, 403, 404, 422].includes(error.status ?? 0)) {
          return false
        }

        return failureCount < 1
      },
      staleTime: 30_000,
    },
    mutations: {
      retry: false,
    },
  },
})

function ThemeRuntime() {
  const themeMode = useUiStore((state) => state.themeMode)
  const radiusPreset = useUiStore((state) => state.radiusPreset)
  const [systemDark, setSystemDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)

    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const shouldUseDark = themeMode === "dark" || (themeMode === "system" && systemDark)

    root.classList.toggle("dark", shouldUseDark)
  }, [systemDark, themeMode])

  useEffect(() => {
    const preset = radiusPresets.find((p) => p.id === radiusPreset)
    const value = preset?.value ?? "6px"
    const root = document.documentElement
    const radiusTokens = {
      "--radius-sm": `calc(${value} * 0.75)`,
      "--radius-md": value,
      "--radius-lg": `calc(${value} * 1.5)`,
      "--radius-xl": `calc(${value} * 2)`,
      "--radius-card": `calc(${value} * 1.5)`,
      "--radius-input": value,
      "--radius-button": value,
      "--radius-dialog": `calc(${value} * 2)`,
    }

    for (const [token, tokenValue] of Object.entries(radiusTokens)) {
      root.style.setProperty(token, tokenValue)
    }
  }, [radiusPreset])

  return null
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRuntime />
      <AuthProvider>
        {children}
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  )
}
