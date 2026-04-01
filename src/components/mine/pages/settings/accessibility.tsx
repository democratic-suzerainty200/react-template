// This file is accessibility settings block.

import { useTranslation } from "react-i18next"
import { messaging } from "@/lib/firebase"
import { getToken } from "firebase/messaging"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Store
import { useNoticeStore } from "@/store/notice"
import { useThemeStore } from "@/store/theme"
import { useAuthStore } from "@/store/auth"

// Components
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChildParts } from "@/components/mine/parts/child"
import { ParentParts } from "@/components/mine/parts/parent"
import { subscribeAll } from "@/lib/functions"

export function AccessibilitySettingsBlock() {
  const { t, i18n } = useTranslation()
  const { setDark, dark } = useThemeStore()
  const { noticeMode, setNoticeMode } = useNoticeStore()
  const { user } = useAuthStore()

  return (
    <ParentParts>
        <p className="text-xl">{t("pages.settings.main.block.accessibility.title")}</p>

        <ChildParts flex>
          <p>{t("pages.settings.main.block.accessibility.language.title")}</p>
          
          <Select defaultValue={i18n.language} onValueChange={i18n.changeLanguage}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={t("pages.settings.main.block.accessibility.language.select")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ChildParts>

        <ChildParts flex>
          <p>{t("pages.settings.main.block.accessibility.dark")}</p>
          <Switch checked={dark} onCheckedChange={setDark} />
        </ChildParts>

        <ChildParts flex>
          <p>{t("pages.settings.main.block.accessibility.notice")}</p>
          <Switch checked={noticeMode} onCheckedChange={async () => {
            setNoticeMode(!noticeMode)

            // Check notice permission
            const permission = await Notification.requestPermission()
            if (permission === "granted" && user?.uid) {
              // Get token
              const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAP_ID_KEY
              })
              
              // Subscribe to topic
              await subscribeAll({ token })

              // Set token to firestore
              await setDoc(
                doc(db, "private", user.uid),
                { fcmTokens: token },
                { merge: true }
              )

              // Notice
              new Notification(t("common.notice.on.title"), {
                body: t("common.notice.on.description")
              })
            }
          }} />
        </ChildParts>
      </ParentParts>
  )
}
