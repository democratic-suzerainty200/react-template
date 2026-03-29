// This file is a store manages loading states.

import { create } from "zustand"

export const useLoadingStore = create<{
  signLoading: boolean
  setSignLoading: (value: boolean) => void
}>()(
  (set) => ({
    signLoading: false,
    setSignLoading: (value: boolean) => set({ signLoading: value })
  })
)
