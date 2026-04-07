// This store manages notice mode state of settings.
// It uses storage features of Zustand middleware.

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useNoticeStore = create<{
  noticeMode: boolean
  setNoticeMode: (value: boolean) => void
}>()(
  persist(
    (set) => ({
      noticeMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      setNoticeMode: (value: boolean) => set({ noticeMode: value })
    }),

    {
      name: "noticeAllow",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
