import { create } from "zustand"
import type { AuthUser } from "@/features/auth/auth.types"

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // true on startup — session check pending
  setUser: (user) => set({ user, isAuthenticated: user !== null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}))
