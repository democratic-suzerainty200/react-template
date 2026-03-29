import { errorLog } from "@/lib/log"
import { useFirestore } from "@/hooks/useFirestore"
import { useTranslation } from "react-i18next"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SimpleTemplate } from "@/components/mine/templates/simple"

function Terms() {
  const { t } = useTranslation()

  const { value, loading, error } = useFirestore("public", "privacy")
  const privacyData = value?.data()

  if (loading) return null

  if (error) {
    errorLog(error)
    return <p>{t("main.error")}</p>
  }

  if (!privacyData) {
    return <p>{t("main.noData")}</p>
  }

  return (
    <Alert className="flex flex-col gap-2">
      <AlertTitle>
        {t("components.policy.writeDate")} - {privacyData.date.toDate().toLocaleDateString() || t("main.noData")}
      </AlertTitle>

      <AlertDescription>{privacyData.content || t("main.noData")}</AlertDescription>
    </Alert>
  )
}

export default function App() {
  const { t } = useTranslation()

  return (
    <SimpleTemplate description={t("pages.privacy.description")}>
      <Terms />
    </SimpleTemplate>
  )
}
