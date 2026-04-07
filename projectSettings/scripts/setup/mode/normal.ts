// This module is used to set up the normal mode.
// You will not be using it.

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

function normalizeDeployDomain(domain: string) {
  const trimmed = domain.trim().replace(/\/+$/, "")
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}

function updateRobotsFile(path: string, deployDomain: string) {
  const robotsContent = fs.readFileSync(path, "utf8")
  const updatedContent = robotsContent.replace(
    /^(Sitemap:\s*)https?:\/\/[^\s]+\/sitemap\.xml$/m,
    `$1${deployDomain}/sitemap.xml`
  )

  fs.writeFileSync(path, updatedContent)
}

function updateSitemapFile(path: string, deployDomain: string) {
  const sitemapContent = fs.readFileSync(path, "utf8")
  const updatedContent = sitemapContent.replace(/<loc>(https?:\/\/[^<]+)<\/loc>/g, (_, rawUrl: string) => {
    const url = new URL(rawUrl)
    return `<loc>${deployDomain}${url.pathname}${url.search}${url.hash}</loc>`
  })

  fs.writeFileSync(path, updatedContent)
}

function updateTranslateFile(path: string, description: string) {
  const translateFile = JSON.parse(fs.readFileSync(path, "utf8"))

  // Update title in translate files
  translateFile.title.introduce = description
  fs.writeFileSync(path, JSON.stringify(translateFile, null, 2))
}

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

  // Update CEO files
  const deployDomain = normalizeDeployDomain(envData.VITE_DEPLOY_DOMAIN)
  updateRobotsFile("./public/robots.txt", deployDomain)
  updateSitemapFile("./public/sitemap.xml", deployDomain)

  // Update translate files
  updateTranslateFile("./src/translate/en.json", envData.VITE_DESCRIPTION)
  updateTranslateFile("./src/translate/ja.json", envData.VITE_DESCRIPTION)

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
