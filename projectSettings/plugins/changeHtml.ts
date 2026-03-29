// This file is vite plugin for changing html by env.

import { type Plugin, loadEnv } from "vite"
import translateFile from "../../src/translate/en.json"

export function changeHtml(): Plugin {
  return {
    name: "Change HTML",

    transformIndexHtml(html) {
      const env = loadEnv("", process.cwd())
      // Get env
      const title = env.VITE_TITLE
      const description = translateFile.title.introduce

      // Change
      return html.replace(
        /%TITLE%/g,
        title
      ).replace(
        /%DESCRIPTION%/g,
        description
      )
    }
  }
}
