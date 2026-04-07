// This store is a loading store that manages user actions.

import { create } from "zustand"

export const useRootLoadingStore = create<{
  rootLoading: boolean
  setRootLoading: (value: boolean) => void
}>()(
  (set) => ({
    rootLoading: false,
    setRootLoading: (value: boolean) => set({ rootLoading: value })
  })
)
