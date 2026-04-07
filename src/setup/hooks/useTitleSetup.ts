// This setup hooks manages title.

import { useEffect } from "react"
import { env } from "@/lib/env"
import { useTitle } from "@/hooks/title"

export function useTitleSetup() {
  const { title } = useTitle()

  // Change the title when the title state changes.
  useEffect(() => {
    document.title = title + " - " + env.title
  }, [title])
}
