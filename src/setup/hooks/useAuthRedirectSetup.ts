// This setup hooks manage redirect logic based on authentication status.

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "@/router"
import { useAuthStore } from "@/store/auth"

export function useAuthRedirectSetup() {
  const { user, userLoading: loading } = useAuthStore()
  const navigate = useNavigate()
  const path = useLocation().pathname
  const pathKey = path === "/" ? "index" : path.split("/")[1] || "index"

  // Ignore paths
  const signoutIgnorePath = ["i", "index"]
  const signinIgnorePath = ["o"]

  // Redirect with sign status
  useEffect(() => {
    if (!loading) {
      if (!user && signoutIgnorePath.includes(pathKey)) {
        navigate("/introduce")
      } else if (user && signinIgnorePath.includes(pathKey)) {
        navigate("/")
      }
    }
  }, [user, loading, pathKey, navigate])
}
