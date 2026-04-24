// This module is used to set up the normal mode.
// You will not be using it.

import fs from "fs"
import admin from "firebase-admin"
import type { ServiceAccount } from "firebase-admin"

// Modules
import { changeSettingFiles } from "../../../modules/changeSettingFiles"
import { createFirestore } from "../lib/createFirestore"
import { inputPrompts } from "../../../modules/prompts"

// Project settings json
import settingsJson from "../../../../src/settings.json" with { type: "json" }
import secretJson from "../../../../functions/src/secret.json" with { type: "json" }

export default async function code() {
  const envData: Record<string, string> = {}
  for (const item of settingsJson.requireEnv) {
    const value = await inputPrompts(`Please enter your project ${item.message}`)
    const key = item.name

    // Set environment variable
    envData[key] = value
  }
  
  // Create .env file
  const envText = Object.entries(envData).map(([key, value]) => `${key}=${value}`).join("\n")
  fs.writeFileSync(".env", envText)

  // Change setting files with env
  changeSettingFiles(envData)

  // Init firestore
  const productFirestore = admin.initializeApp(
    { credential: admin.credential.cert(secretJson as ServiceAccount) },
    "product"
  ).firestore()

  await createFirestore(productFirestore)
}
