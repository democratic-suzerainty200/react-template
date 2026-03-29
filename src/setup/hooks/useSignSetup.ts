// This file monitors the sign-in status and redirects the user to the appropriate page.

import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "@/router"
import { auth } from "@/lib/firebase"

export function useSigninSetup() {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const path = useLocation().pathname

  // Ignore paths
  const signoutIgnorePath = ["/", "/admin"]
  const signinIgnorePath = ["/signin", "/signup"]

  // Redirect based on sign-in status
  useEffect(() => {
    if (!loading) {
      if (!user && signoutIgnorePath.includes(path)) {
        navigate("/introduce")
      } else if (user && signinIgnorePath.includes(path)) {
        navigate("/")
      }
    }
  }, [user, loading, path, navigate])
}
