import { httpsCallable } from "firebase/functions"
import { functions } from "@/lib/firebase"

import type {
  SetAdminRole,
  SubscribeAll,
  SendNotice
} from "@/../projectSettings/types/functions"

// Admin
export const setAdminRole = httpsCallable<SetAdminRole["req"], SetAdminRole["res"]>(functions, "setAdminRole")
export const sendNotice = httpsCallable<SendNotice["req"], SendNotice["res"]>(functions, "sendNotice")

// Common
export const subscribeAll = httpsCallable<SubscribeAll["req"], SubscribeAll["res"]>(functions, "subscribeAll")
