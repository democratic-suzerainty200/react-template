import { useTranslation } from "react-i18next"
import { SimpleTemplate } from "@/components/mine/templates/simple"

export default function App() {
  const { t } = useTranslation()

  return (
    <SimpleTemplate description={t("pages.notfound.message")} />
  )
}
