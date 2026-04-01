import { httpsCallable } from "firebase/functions"
import { functions } from "@/lib/firebase"

// Admin
export const setAdminRole = httpsCallable(functions, "setAdminRole")
export const sendNotice = httpsCallable(functions, "sendNotice")

// Common
export const subscribeAll = httpsCallable(functions, "subscribeAll")
