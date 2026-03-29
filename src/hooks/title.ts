// This file dynamically changes title.

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

export function useTitle() {
  const location = useLocation()
  const page = location.pathname.replace("/", "") || "index" // root is "index"
  const key = `title.${page}`
  const { t, i18n } = useTranslation()
  const [title, setTitle] = useState("")

  // Check translation existence
  useEffect(() => {
    if (i18n.exists(key as any)) {
      setTitle(t(key as any))
    } else {
      setTitle("404 Not Found")
    }
  }, [key, t, i18n])

  return { title }
}
