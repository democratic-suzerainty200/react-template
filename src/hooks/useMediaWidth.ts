// This file provides reusable media query hooks.

import { useEffect, useState } from "react"

const media = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)"
} as const

function getMatch(query: string) {
  if (typeof window === "undefined") return false
  return window.matchMedia(query).matches
}

function useMedia(query: string, initialValue = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return initialValue
    return getMatch(query)
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", onChange)

    return () => {
      mediaQuery.removeEventListener("change", onChange)
    }
  }, [query])

  return matches
}

export function useMediaWidth() {
  const isSm = useMedia(media.sm)
  const isMd = useMedia(media.md)
  const isLg = useMedia(media.lg)

  return {
    isSm,
    isMd,
    isLg,
    isMobile: !isSm,
  }
}
