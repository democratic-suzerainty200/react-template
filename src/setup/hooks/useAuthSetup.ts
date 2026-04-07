// This setup hooks manages initialization of authentication state.

import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuthStore } from "@/store/auth"

export function useAuthStoreSetup() {
  const { setUser, setUserLoading: setLoading } = useAuthStore()

  useEffect(() => {
    // Manage user state and loading state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    // Cleanup
    return unsubscribe
  }, [])
}
