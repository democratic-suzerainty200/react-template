import fs from "fs"
import { log } from "../modules/log"

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
  if (translateFile.pages?.introduce) {
    translateFile.pages.introduce.title = description
  }

  fs.writeFileSync(path, JSON.stringify(translateFile, null, 2))
}

export function changeSettingFiles(env: any) {
  // Update CEO files
  const deployDomain = normalizeDeployDomain(env.VITE_DEPLOY_DOMAIN)
  updateRobotsFile("./public/robots.txt", deployDomain)
  updateSitemapFile("./public/sitemap.xml", deployDomain)

  // Update translate files
  updateTranslateFile("./src/translate/en.json", env.VITE_DESCRIPTION)
  updateTranslateFile("./src/translate/ja.json", env.VITE_DESCRIPTION)

  // Create .firebaserc file
  fs.writeFileSync(".firebaserc", JSON.stringify({
    projects: {
      default: env.VITE_FIREBASE_PROJECT_ID
    }
  }, null, 2))

  log.complete("The creation of the environment variables is complete!")
}