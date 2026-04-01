// This file is introduce page.

import { Info } from "lucide-react"
import { Link } from "@/router"
import { env } from "@/lib/env"
import { cn } from "@/lib/utils"
import { TypeAnimation } from "react-type-animation"
import { useTranslation } from "react-i18next"
import { useMediaWidth } from "@/hooks/useMediaWidth"

// Components
import { Button } from "@/components/ui/button"
import { FaHammer, FaRocket, FaStar } from "react-icons/fa"
import { HeaderBlocks } from "@/components/mine/blocks/header"
import { FooterBlocks } from "@/components/mine/blocks/footer"
import { FadeinAnimation } from "@/components/mine/animations/fadein"
import { SeeFadeinAnimation } from "@/components/mine/animations/seeFadein"

function Parent({ children, title, className }: { children: React.ReactNode, title: string, className?: string }) {
  return (
    <div className={cn(
      "flex flex-col gap-8 justify-center min-h-svh items-center",
      className
      )}>
      <SeeFadeinAnimation className="text-2xl sm:text-3xl md:text-4xl font-mono text-center">{title}</SeeFadeinAnimation>
      {children}
    </div>
  )
}

export default function App() {
  const { t } = useTranslation()
  const { isMobile } = useMediaWidth()

  type FeaturesData = {
    title: string
    description: string
  }

  const features = {
    data: t("pages.introduce.main.features.main", {
      returnObjects: true
    }) as FeaturesData[],

    icon: [FaHammer, FaStar, FaRocket],
    color: ["bg-blue-700", "bg-green-600", "bg-yellow-500"]
  }

  return (
    <>
      <HeaderBlocks fixed />
      <FadeinAnimation className="flex flex-col gap-8 justify-center min-h-svh items-center">
        <TypeAnimation
          className="text-2xl sm:text-3xl md:text-4xl font-mono text-center"
          sequence={[t("pages.introduce.title"), 4000, env.title, 4000]}
          speed={50}
          repeat={Infinity}
          wrapper="p"
          cursor={true}
        />

        <div className="flex gap-2 items-center">
          <Link to="/o/signin">
            <Button variant="outline">{t("pages.introduce.main.getStarted")}</Button>
          </Link>

          <Link to="/notice">
            <Button><Info /> {t("pages.introduce.main.viewUpdates")}</Button>
          </Link>
        </div>
      </FadeinAnimation>

      <Parent className="bg-muted/30" title={t("pages.introduce.main.features.title")}>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {features.data.map((feature, index) => {
            const Icon = features.icon[index] ?? FaHammer
            const color = features.color[index]
            const delay = index * 0.1

            return (
              <SeeFadeinAnimation delay={isMobile ? 0 : delay} key={feature.title} className="w-85 bg-muted/30 p-5 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 ${color} text-white w-fit rounded-sm`}>
                    <Icon className="size-6" />
                  </div>

                  <p className="text-lg">{feature.title}</p>
                </div>

                <p className="px-2">{feature.description}</p>
              </SeeFadeinAnimation>
            )
          })}
        </div>
      </Parent>

      <FooterBlocks />
    </>
  )
}
