// This store manages sign-in loading state.

import { create } from "zustand"

export const useSignLoadingStore = create<{
  signinLoading: boolean
  setSigninLoading: (value: boolean) => void
}>()(
  (set) => ({
    signinLoading: false,
    setSigninLoading: (value: boolean) => set({ signinLoading: value })
  })
)
