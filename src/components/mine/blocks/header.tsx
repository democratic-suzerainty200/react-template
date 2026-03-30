// This file is main header.

import { Link } from "@/router"
import { LogIn, Settings } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { env } from "@/lib/env"
import { useAuthStore } from "@/store/auth"

// Components
import { Button } from "@/components/ui/button"
import { MineIcon } from "@/components/mine/parts/icon"

// Types
type Header = {
  fixed?: boolean
}

function Signin({ fixed }: Header) {
  const { t } = useTranslation()

  return (
    <div className={cn(
      "p-4 top-0 items-center flex gap-4 w-full bg-background border-b",
      fixed ? "fixed" : "sticky"
    )}>
      <Link to="/" className="flex gap-2 items-center">
        <MineIcon className="size-6" />
        <p className="font-mono text-primary hidden sm:block">{env.title}</p>
      </Link>

      <div className="ml-auto flex gap-2 items-center">
        <Link to="/settings">
          <Button><Settings /> {t("title.settings")}</Button>
        </Link>
      </div>
    </div>
  )
}

function Signout({ fixed }: Header) {
  const { t } = useTranslation()

  return (
    <div className={cn(
      "top-0 w-full p-4 pb-0",
      fixed ? "fixed" : "sticky"
    )}>
      <div className="w-auto px-4 py-3 items-center flex gap-4 bg-muted/30 rounded-2xl backdrop-blur border-border border">
        <Link to="/introduce" className="flex gap-2 items-center">
          <MineIcon className="size-6" />
          <p className="font-mono text-primary tracking-tighter">{env.title}</p>
        </Link>

        <div className="ml-auto hidden sm:flex gap-2 items-center">
          <Link to="/signin">
            <Button><LogIn /> {t("title.signin")}</Button>
          </Link>

          <Link to="/settings">
            <Button><Settings /> {t("title.settings")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function HeaderBlocks(props: Header) {
  const { user, loading } = useAuthStore()

  if (!loading) {
    if (user) {
      return <Signin {...props} />
    } else {
      return <Signout {...props} />
    }
  }
}