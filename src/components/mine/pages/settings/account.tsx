// This file is account settings block.

import { useTranslation } from "react-i18next"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useSignout, useDeleteAccount, useGoogleUpgrade } from "@/hooks/sign"
import { useAuthStore } from "@/store/auth"

// Components
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/mine/buttons/copy"
import { ParentParts } from "@/components/mine/parts/parent"
import { ChildParts } from "@/components/mine/parts/child"


export function AccountSettingsBlock() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  
  // Hooks
  const signout = useSignout()
  const deleteAccount = useDeleteAccount()
  const googleUpgrade = useGoogleUpgrade()

  if (!user) return null

  return (
    <ParentParts>
      <p className="text-xl">{t("pages.settings.account.title")}</p>

      <ChildParts>
        <p>{t("pages.settings.account.uid")}</p>
        <CopyButton text={user?.uid} />
      </ChildParts>

      {user?.isAnonymous && (
        <ChildParts>
          <p>{t("pages.settings.account.connect.title")}</p>
          <Button onClick={async () => {
            await googleUpgrade()
          }} variant="outline" className="w-fit">{t("pages.settings.account.connect.button")}</Button>
        </ChildParts>
      )}

      <ChildParts>
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
      </ChildParts>

      <ChildParts>
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
      </ChildParts>
    </ParentParts>
  )
}
