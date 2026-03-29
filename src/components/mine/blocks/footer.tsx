// This file is main footer.

import { Link } from "@/router"
import { useTranslation } from "react-i18next"
import { useAuthState } from "react-firebase-hooks/auth"
import { env } from "@/lib/env"
import { auth } from "@/lib/firebase"

export function FooterBlocks() {
  const { t } = useTranslation()
  const [user, loading] = useAuthState(auth)

  return (
    <footer className="p-5 mt-auto w-full border-t flex flex-col gap-5">
      <Link className="w-fit font-mono text-foreground text-xl" to={
        user && !loading ? "/" : "/introduce"
      }>
        {env.title}
      </Link>

      <div className="flex gap-3 flex-col sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {env.title}. All rights reserved.</p>
        <div className="flex gap-3 sm:ml-auto">
          <Link to="/privacy">{t("title.privacy")}</Link>
          <Link to="/terms">{t("title.terms")}</Link>
        </div>
      </div>
    </footer>
  )
}
