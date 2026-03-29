import { defineConfig, loadEnv } from "vite"
import path from "path"
import chalk from "chalk"
import settingsFile from "./src/settings.json"

// Plugin
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import generouted from "@generouted/react-router/plugin"
import { changeHtml } from "./projectSettings/plugins/changeHtml"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // Confirm env
  const missingNum: string[] = []
  for (const key of settingsFile.requireEnv) {
    if (!env[key.name]) {
      missingNum.push(key.name)
    }
  }

  // Alert missing env
  if (missingNum.length > 0) {
    console.log(`${chalk.red("×")} Missing env`)
    console.log(`${chalk.red("×")} Please check if the following environment variables are set.`)
    missingNum.forEach(v => console.error(v))
    process.exit(1)
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      generouted(),
      changeHtml()
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  }
})
