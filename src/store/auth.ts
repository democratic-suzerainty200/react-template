// This store manages auth state.

import { create } from "zustand"
import type { User } from "firebase/auth"

export const useAuthStore = create<{
  user: User | null
  userLoading: boolean
  setUser: (user: User | null) => void
  setUserLoading: (loading: boolean) => void
}>((set) => ({
  user: null,
  userLoading: true,

  // Set status
  setUser: (user) => set({ user }),
  setUserLoading: (loading) => set({ userLoading: loading })
}))
