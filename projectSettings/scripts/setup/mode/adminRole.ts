// This module is used to set admin role for a user.
// You will not be using it.

import admin from "firebase-admin"
import secretJson from "../../../../functions/src/secret.json" with { type: "json" }
import type { ServiceAccount } from "firebase-admin"

// Modules
import { log } from "../../../modules/log"
import { selectPrompts, inputPrompts } from "../../../modules/prompts"

async function chooseApp () {
  const whichUseApp = await selectPrompts("Which app do you want to use?", [
    {
      title: "Emulator",
      value: "emulator"
    },

    {
      title: "Production",
      value: "product"
    }
  ])

  switch (whichUseApp) {
    case "emulator":
      // Set environment variable for emulator
      process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099"

      const emulatorApp = admin.initializeApp(
        { credential: admin.credential.cert(secretJson as ServiceAccount) },
        "emulatorApp"
      )

      return emulatorApp.auth()
    default:
      const productApp = admin.initializeApp(
        { credential: admin.credential.cert(secretJson as ServiceAccount) },
        "productionApp"
      )

      return productApp.auth()
  }
}

export default async function code() {
  const auth = await chooseApp()
  const userId = await inputPrompts("Please enter the user id of the user you want to set as admin.")

  // Set custom claim
  await auth.setCustomUserClaims(userId, {
    role: "admin"
  })

  log.complete("Admin role has been set successfully!")
}
