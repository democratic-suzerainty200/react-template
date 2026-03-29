import { env } from "@/lib/env"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Components
import { SignLoadingButton } from "@/components/mine/pages/sign/loadingButton"
import { Link } from "@/router"
import { MineIcon } from "@/components/mine/parts/icon"
import { FadeinAnimation } from "@/components/mine/animations/fadein"
import { FaGoogle } from "react-icons/fa"
import { CircleUser } from "lucide-react"

// Hooks
import { useGoogleSignin, useGuestSignin } from "@/hooks/sign"
import { useTranslation } from "react-i18next"

export default function App() {
  const googleSignin = useGoogleSignin()
  const guestSignin = useGuestSignin()
  const { t } = useTranslation()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 overflow-hidden">
      <FadeinAnimation className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <form>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center px-6">
                <Link to="/introduce">
                  <MineIcon className="size-8" />
                </Link>

                <p className="text-xl font-bold">{t("pages.signup.title", { title: env.title })}</p>

                <FieldDescription>
                  {t("pages.signup.announce")} <Link to="/signin">{t("title.signin")}</Link>
                </FieldDescription>
              </div>

              <Field>
                <FieldLabel htmlFor="email">{t("components.sign.email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t("components.sign.pass")}</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </Field>

              <Field>
                <SignLoadingButton groupType="sign" type="submit" onClick={() => {
                  window.alert("clicked")
                }}>{t("pages.signup.submit")}</SignLoadingButton>
              </Field>

              <FieldSeparator>{t("components.sign.or")}</FieldSeparator>

              <Field className="grid gap-2 sm:grid-cols-2">
                <SignLoadingButton
                  variant="outline"
                  groupType="sign"
                  onClick={async () => {
                    await guestSignin()
                  }}
                >
                  <CircleUser />
                  {t("pages.signup.continue.guest")}
                </SignLoadingButton>

                <SignLoadingButton
                  variant="outline"
                  groupType="sign"
                  onClick={async () => {
                    await googleSignin()
                  }}>
                  <FaGoogle />
                  {t("pages.signup.continue.google")}
                </SignLoadingButton>
              </Field>
            </FieldGroup>
          </form>

          <FieldDescription className="px-6 text-center">
            {t("pages.signup.warn")} <Link to="/terms">{t("title.terms")}</Link> & <Link to="/privacy">{t("title.privacy")}</Link>
          </FieldDescription>
        </div>
      </FadeinAnimation>
    </div>
  )
}
