// This file is the parent element of the page component.

import { Outlet } from "react-router-dom"

// Setup hooks
import { useSigninSetup } from "@/setup/hooks/useSignSetup"
import { usePageSetup } from "@/setup/hooks/useTitleSetup"
import { useThemeSetup } from "@/setup/hooks/useThemeSetup"

export default function Layout() {
  // Run setup hooks
  useSigninSetup()
  usePageSetup()
  useThemeSetup()

  return (
    <div className="bg-background text-foreground">
      <Outlet />
    </div>
  )
}
