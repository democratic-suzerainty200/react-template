// This components is main layout page.
// It uses for setup hooks.

// Hooks
import { useRootLoadingStore } from "@/store/rootLoading"
import { useAuthStore } from "@/store/auth"

// Components
import { Outlet } from "react-router-dom"
import { LoadingParts } from "@/components/mine/parts/loading"
import { Toaster } from "@/components/ui/sonner"

// Setup hooks
import { useAuthRedirectSetup } from "@/setup/hooks/useAuthRedirectSetup"
import { useAuthStoreSetup } from "@/setup/hooks/useAuthSetup"
import { useTitleSetup } from "@/setup/hooks/useTitleSetup"
import { useThemeSetup } from "@/setup/hooks/useThemeSetup"
import { useNoticeSetup } from "@/setup/hooks/useNoticeSetup"

function useLoading() {
  const { userLoading: allLoading } = useAuthStore()
  return { allLoading }
}

function LoadingFade() {
  const { rootLoading } = useRootLoadingStore()

  if (rootLoading) {
    return (
      <div className="fixed inset-0 bg-background/70 backdrop-blur flex items-center justify-center z-100">
        <LoadingParts />
      </div>
    )
  }
}

export default function Layout() {
  // Setup hooks
  useThemeSetup()
  useAuthStoreSetup()
  useAuthRedirectSetup()
  useTitleSetup()
  useNoticeSetup()

  // Hooks
  const { allLoading } = useLoading()

  // Display loading
  if (allLoading) return (
    <div className="fixed inset-0 bg-background backdrop-blur flex items-center justify-center z-100">
        <LoadingParts />
    </div>
  )

  return (
    <div className="bg-background text-foreground min-h-svh w-full wrap-break-word">
      <Outlet />
      <Toaster />
      <LoadingFade />
    </div>
  )
}
