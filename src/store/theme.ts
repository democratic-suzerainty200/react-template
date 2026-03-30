// This file is a store manages theme states.

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useThemeStore = create<{
  dark: boolean
  setDark: (value: boolean) => void
}>()(
  persist(
    (set) => ({
      dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
      setDark: (value: boolean) => set({ dark: value })
    }),

    {
      name: "theme",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
