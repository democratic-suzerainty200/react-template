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
          <div>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center px-6">
                <Link to="/introduce">
                  <MineIcon className="size-8" />
                </Link>

                <p className="text-xl font-bold">{t("pages.o.signup.title", { title: env.title })}</p>

                <FieldDescription>
                  {t("pages.o.signup.main.announce")} <Link to="/o/signin">{t("pages.o.signin.title")}</Link>
                </FieldDescription>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </Field>

              <Field>
                <SignLoadingButton groupType="sign" type="submit" onClick={() => {
                  window.alert("clicked")
                }}>{t("pages.o.signup.title")}</SignLoadingButton>
              </Field>

              <FieldSeparator>{t("common.sign.or")}</FieldSeparator>

              <Field className="grid gap-2 sm:grid-cols-2">
                <SignLoadingButton
                  variant="outline"
                  groupType="sign"
                  onClick={guestSignin}
                >
                  <CircleUser />
                  {t("pages.o.signup.main.announce")}
                </SignLoadingButton>

                <SignLoadingButton
                  variant="outline"
                  groupType="sign"
                  onClick={googleSignin}
                >
                  <FaGoogle />
                  {t("common.sign.thirdparty.google")}
                </SignLoadingButton>
              </Field>
            </FieldGroup>
          </div>

          <FieldDescription className="px-6 text-center">
            {t("common.sign.warning")} <Link to="/terms">{t("pages.terms.title")}</Link> & <Link to="/privacy">{t("pages.privacy.title")}</Link>
          </FieldDescription>
        </div>
      </FadeinAnimation>
    </div>
  )
}
