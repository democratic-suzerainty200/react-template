import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Link } from "@/router"
import { env } from "@/lib/env"
import { TypeAnimation } from "react-type-animation"
import { useTranslation } from "react-i18next"
import { HeaderBlocks } from "@/components/mine/blocks/header"
import { FooterBlocks } from "@/components/mine/blocks/footer"
import { FadeinAnimation } from "@/components/mine/animations/fadein"

export default function App() {
  const { t } = useTranslation()

  return (
    <>
      <HeaderBlocks fixed />
      <div className="min-h-svh overflow-hidden px-4">
        <FadeinAnimation className="flex flex-col gap-8 justify-center min-h-svh items-center">
          <TypeAnimation
            className="text-4xl font-mono text-center"
            sequence={[t("title.introduce"), 4000, env.title, 4000]}
            speed={50}
            repeat={Infinity}
            wrapper="p"
            cursor={true}
          />

          <div className="flex gap-2 items-center">
            <Link to="/signin">
              <Button variant="outline">{t("pages.introduce.getStarted")}</Button>
            </Link>

            <Link to="/notice">
              <Button><Info /> {t("pages.introduce.viewUpdates")}</Button>
            </Link>
          </div>
        </FadeinAnimation>
      </div>
      <FooterBlocks />
    </>
  )
}
