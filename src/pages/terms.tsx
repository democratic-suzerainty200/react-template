// This page is privacy page.

import { errorLog } from "@/lib/log"
import { useFirestore } from "@/hooks/firestore"
import { useTranslation } from "react-i18next"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SimpleTemplate } from "@/components/mine/templates/simple"

function Terms() {
  const { t } = useTranslation()

  const { firestoreResult, firestoreLoading, firestoreError } = useFirestore("public", "terms")
  const termsData = firestoreResult?.data()

  if (firestoreLoading) return null

  if (firestoreError) {
    errorLog(firestoreError)
    return <p>{t("common.error.main")}</p>
  }

  if (!termsData) {
    return <p>{t("common.error.noData")}</p>
  }

  return (
    <Alert>
      <AlertTitle>
        {termsData.content}
      </AlertTitle>

      <AlertDescription>
        {termsData.date.toDate().toLocaleDateString()}
      </AlertDescription>
    </Alert>
  )
}

export default function App() {
  const { t } = useTranslation()

  return (
    <SimpleTemplate description={t("pages.terms.description")}>
      <Terms />
    </SimpleTemplate>
  )
}
