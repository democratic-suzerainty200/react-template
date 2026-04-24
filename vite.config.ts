import path from "path"
import { log } from "./projectSettings/modules/log"
import { defineConfig, loadEnv } from "vite"

import settingsJson from "./src/settings.json"

// Plugin
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import generouted from "@generouted/react-router/plugin"
import changeHtml from "./projectSettings/plugins/changeHtml"
import changeSettingFiles from "./projectSettings/plugins/changeSettingFiles"

function confirmEnv(env: Record<string, string>) {
  const missingNum: string[] = []

  for (const key of settingsJson.requireEnv) {
    if (!env[key.name]) {
      missingNum.push(key.name)
    }
  }

  if (missingNum.length > 0) {
    // Alert missing env
    log.error("Missing env")
    log.error("Please check if the following environment variables are set.")
    missingNum.forEach(missingEnv => log.error(missingEnv))

    return true
  }

  return false
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isMissingEnv = confirmEnv(env)

  if (isMissingEnv) {
    process.exit(1)
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      generouted(),
      changeSettingFiles(),
      changeHtml()
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  }
})
