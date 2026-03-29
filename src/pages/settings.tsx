// This file is settings page.

import { useTranslation } from "react-i18next"

// Components
import { HeaderBlocks } from "@/components/mine/blocks/header"
import { FooterBlocks } from "@/components/mine/blocks/footer"
import { AccountSettingsBlock } from "@/components/mine/pages/settings/blocks/account"
import { AccessibilitySettingsBlock } from "@/components/mine/pages/settings/blocks/accessibility"

function Parent({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 flex flex-col gap-3">
      {children}
    </div>
  )
}

export default function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-svh flex flex-col gap-6">
      <HeaderBlocks />

      <Parent>
        <p className="font-bold text-2xl">{t("pages.settings.title.main")}</p>
        <AccountSettingsBlock />
        <AccessibilitySettingsBlock />
      </Parent>

      <FooterBlocks />
    </div>
  )
}
