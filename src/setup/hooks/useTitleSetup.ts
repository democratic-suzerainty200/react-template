// This file changes the title from useTitle.

import { useEffect } from "react"
import { env } from "@/lib/env"
import { useTitle } from "@/hooks/title"

export function usePageSetup() {
  const { title } = useTitle()

  // Change the title when the title changes.
  useEffect(() => {
    document.title = title + " - " + env.title
  }, [title])
}
