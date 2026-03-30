// This file is the parent element of the page component.

// Components
import { LoadingParts } from "@/components/mine/parts/loading"
import { Outlet } from "react-router-dom"

// Setup hooks
import { useSigninSetup } from "@/setup/hooks/useSignSetup"
import { useAuthSetup } from "@/setup/hooks/useAuthSetup"
import { usePageSetup } from "@/setup/hooks/useTitleSetup"
import { useThemeSetup } from "@/setup/hooks/useThemeSetup"
import { useLoadingSetup } from "@/setup/hooks/useLoadingSetup"

export default function Layout() {
  // Run setup hooks
  useThemeSetup()
  useAuthSetup()
  const { loading } = useLoadingSetup()
  useSigninSetup()
  usePageSetup()

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-svh w-full flex items-center justify-center">
        <LoadingParts className="size-7 text-accent" />
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground min-h-svh w-full">
      <Outlet />
    </div>
  )
}
