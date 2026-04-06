import fs from "fs"
import admin from "firebase-admin"
import { createFirestore } from "../lib/createFirestore"
import type { ServiceAccount } from "firebase-admin"

// Modules
import { log } from "../../../modules/log"
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

  function updateTranslateFile(path: string) {
    const translateFile = JSON.parse(fs.readFileSync(path, "utf8"))

    // Update title in translate files
    translateFile.title.introduce = envData.VITE_DESCRIPTION
    fs.writeFileSync(path, JSON.stringify(translateFile, null, 2))
  }

  // Update translate files
  updateTranslateFile("./src/translate/en.json")
  updateTranslateFile("./src/translate/ja.json")

  // Create .firebaserc file
  fs.writeFileSync(".firebaserc", JSON.stringify({
    projects: {
      default: envData.VITE_FIREBASE_PROJECT_ID
    }
  }, null, 2))

  log.complete("The creation of the environment variables is complete!")

  // Init firestore
  const productFirestore = admin.initializeApp(
    { credential: admin.credential.cert(secretJson as ServiceAccount) },
    "product"
  ).firestore()

  await createFirestore(productFirestore)
}
