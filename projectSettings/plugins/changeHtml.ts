// This plugin is used to change the HTML file.
// You will not be using it.

import { type Plugin, loadEnv } from "vite"

export default function plugin(): Plugin {
  return {
    name: "Change HTML",

    transformIndexHtml(html) {
      const env = loadEnv("", process.cwd())

      // Get env
      const title = env.VITE_TITLE
      const description = env.VITE_DESCRIPTION

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
