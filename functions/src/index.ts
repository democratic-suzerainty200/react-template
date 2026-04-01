import { setGlobalOptions } from "firebase-functions"
import * as admin from "firebase-admin"
import { onCall } from "firebase-functions/v2/https"
import secret from "./secret.json"

setGlobalOptions({
  maxInstances: 10
})

admin.initializeApp({
  credential: admin.credential.cert(secret as admin.ServiceAccount)
})

function confirm(req: any) {
  if (!req.auth) {
    throw new Error("Not authenticated")
  }
}

export const setAdminRole = onCall(async (req) => {
  confirm(req)
  const { uid } = req.data

  await admin.auth().setCustomUserClaims(uid, {
    role: "admin"
  })

  return { success: true }
})

export const subscribeAll = onCall(async (req) => {
  confirm(req)
  const { token } = req.data
  await admin.messaging().subscribeToTopic(token, "all-users")
  return { success: true }
})

export const sendNotice = onCall(async (req) => {
  confirm(req)
  const { title, body } = req.data

  await admin.messaging().send({
    topic: "all-users",
    notification: {
      title: title,
      body: body
    }
  })

  return { success: true }
})
