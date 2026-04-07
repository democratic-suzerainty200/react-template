import * as admin from "firebase-admin"
import secret from "./secret.json"
import { onCall, HttpsError, CallableRequest } from "firebase-functions/v2/https"
import { setGlobalOptions } from "firebase-functions"

// Functions types
import type {
  SetAdminRole,
  SubscribeAll,
  SendNotice
} from "../../projectSettings/types/functions"

setGlobalOptions({
  maxInstances: 10
})

function confirmUserState(req: CallableRequest<any>, type: "user" | "admin") {
  switch (type) {
    // Confrim user is authenticated
    case "user":
      if (!req.auth) {
        throw new HttpsError("unauthenticated", "User is not authenticated")
      }

      break

    // Confirm user is admin
    case "admin":
      confirmUserState(req, "user")
      const auth = req.auth

      if (!auth) {
        throw new HttpsError("unauthenticated", "User is not authenticated")
      }

      if (auth.token.role !== "admin") {
        throw new HttpsError("permission-denied", "User is not authorized")
      }

      break
  }
}

admin.initializeApp({
  credential: admin.credential.cert(secret as admin.ServiceAccount)
})

export const setAdminRole = onCall(async (req): Promise<SetAdminRole["res"]> => {
  confirmUserState(req, "admin")
  const { uid } = req.data as SetAdminRole["req"]

  // Set custom claim for admin role
  await admin.auth().setCustomUserClaims(uid, {
    role: "admin"
  })

  return { success: true }
})

export const subscribeAll = onCall(async (req): Promise<SubscribeAll["res"]> => {
  confirmUserState(req, "user")
  const { token } = req.data as SubscribeAll["req"]

  // Subscribe to topic for all users
  await admin.messaging().subscribeToTopic(token, "all-users")
  return { success: true }
})

export const sendNotice = onCall(async (req): Promise<SendNotice["res"]> => {
  confirmUserState(req, "admin")
  const { title, body } = req.data as SendNotice["req"]

  // Send notice
  await admin.messaging().send({
    topic: "all-users",
    notification: {
      title: title,
      body: body
    }
  })

  return { success: true }
})
