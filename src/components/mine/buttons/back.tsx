// This file is a back button navigates back.

import { useTranslation } from "react-i18next"
import { useNavigate } from "@/router"
import { Button } from "@/components/ui/button"

export function BackButton({ ...props }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const canGoBackInApp = window.history.state.idx > 0

  if (canGoBackInApp) {
    return (
      <Button onClick={() => navigate(-1)} {...props}>
        {t("main.goBack")}
      </Button>
    )
  } else {
    return (
      <Button onClick={() => navigate("/")} {...props}>
        {t("main.goHome")}
      </Button>
    )
  }
}
