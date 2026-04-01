// This setup hooks manages notice permissions.

import { useEffect } from "react"
import { toast } from "sonner"
import { useNoticeStore } from "@/store/notice"

// Hooks
import { useLoading } from "@/hooks/loading"
import { useTranslation } from "react-i18next"

export function useNoticeSetup() {
	const { noticeMode, setNoticeMode } = useNoticeStore()
	const { loading } = useLoading()
	const { t } = useTranslation()

	useEffect(() => {
		const id = "notice-permission"

		if (!noticeMode) {
			toast.dismiss(id)
			return
		}

		void (async () => {
			// Check notice permission
			const permission = await Notification.requestPermission()
			if (permission === "denied") {
				toast.error(t("toast.notice.denied.title"), {
					description: t("toast.notice.denied.description"),
					id: id,
					action: {
						label: t("toast.notice.denied.off"),
						onClick: () => { setNoticeMode(false) }
					}
				})
			}
		})()
	}, [noticeMode, loading, setNoticeMode])
}
