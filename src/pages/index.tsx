import { HeaderBlocks } from "@/components/mine/blocks/header"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { FadeinAnimation } from "@/components/mine/animations/fadein"

export default function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-svh px-4 flex flex-col items-center justify-center overflow-hidden">
      <HeaderBlocks fixed />
      <FadeinAnimation className="w-full max-w-2xl gap-4 flex flex-col">
        <p className="text-2xl font-bold">{t("pages.index.title")}</p>
        <p className="text-md">{t("pages.index.description")}</p>
        <Button onClick={() => location.href = "https://github.com/ya13ma64da/react-template"} className="w-fit">
          <FaGithub />
          {t("pages.index.viewProject")}
        </Button>
      </FadeinAnimation>
    </div>
  )
}
