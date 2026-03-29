import { SimpleTemplate } from "@/components/mine/templates/simple"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { errorLog } from "@/lib/log"
import { useTranslation } from "react-i18next"
import { useFirestore } from "@/hooks/useFirestore"

function Updates() {
  const { t } = useTranslation()

  const { value, loading, error } = useFirestore("public", "updates")
  const updateData = value?.data()

  if (loading) return null

  if (error) {
    errorLog(error)
    return <p>{t("main.error")}</p>
  }

  if (!updateData?.contents) {
    return <p>{t("main.noData")}</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {updateData.contents.map((item: any) => (
        <Alert key={item.date}>
          <AlertTitle>
            {item.title || t("main.unknown")} - {item.date.toDate().toLocaleDateString() || t("main.unknown")}
          </AlertTitle>
          <AlertDescription>
            {item.description || t("main.unknown")}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <SimpleTemplate>
      <Updates />
    </SimpleTemplate>
  )
}
