// This file is auth store.

import { create } from "zustand"

// Types
import type { User } from "firebase/auth"
type AuthState = {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading })
}))
