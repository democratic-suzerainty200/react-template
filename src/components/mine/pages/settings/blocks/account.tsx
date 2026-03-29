// This file is account settings block.

import { useTranslation } from "react-i18next"
import { useAuthState } from "react-firebase-hooks/auth"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// Components
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/mine/buttons/copy"
import { ParentSettingsParts } from "@/components/mine/pages/settings/parts/parent"
import { ChildSettingsParts } from "@/components/mine/pages/settings/parts/child"

// Libraries
import { useSignout, useDeleteAccount, useGoogleUpgrade } from "@/hooks/sign"
import { auth } from "@/lib/firebase"

export function AccountSettingsBlock() {
  const { t } = useTranslation()
  const [user] = useAuthState(auth)
  
  // Hooks
  const signout = useSignout()
  const deleteAccount = useDeleteAccount()
  const googleUpgrade = useGoogleUpgrade()

  if (!user) return null

  return (
    <ParentSettingsParts>
      <p className="text-xl">{t("pages.settings.account.title")}</p>

      <ChildSettingsParts>
        <p>{t("pages.settings.account.uid")}</p>
        <CopyButton text={user?.uid} />
      </ChildSettingsParts>

      {user?.isAnonymous && (
        <ChildSettingsParts>
          <p>{t("pages.settings.account.connect.title")}</p>
          <Button onClick={async () => {
            await googleUpgrade()
          }} variant="outline" className="w-fit">{t("pages.settings.account.connect.button")}</Button>
        </ChildSettingsParts>
      )}

      <ChildSettingsParts>
        <p>{t("pages.settings.account.signout.title")}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" variant="destructive" className="w-fit">{t("pages.settings.account.signout.button")}</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("main.sure")}</AlertDialogTitle>
              <AlertDialogDescription>{t("pages.settings.account.signout.warn")}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>{t("main.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={async () => {
                await signout()
              }}>{t("main.continue")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ChildSettingsParts>

      <ChildSettingsParts>
        <p>{t("pages.settings.account.deleteAccount.title")}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" variant="destructive" className="w-fit">{t("pages.settings.account.deleteAccount.button")}</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("main.sure")}</AlertDialogTitle>
              <AlertDialogDescription>{t("pages.settings.account.deleteAccount.warn")}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>{t("main.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={async () => {
                await deleteAccount()
              }}>{t("main.continue")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ChildSettingsParts>
    </ParentSettingsParts>
  )
}
