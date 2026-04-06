// This file is setup scripts.

import figlet from "figlet"
import chalk from "chalk"

// Mode
import normal from "./mode/normal"
import emulator from "./mode/emulator"
import adminRole from "./mode/adminRole"

// Modules
import { log } from "../../modules/log"
import { selectPrompts, confirmPrompts } from "../../modules/prompts"

(async () => {
  // Show logo
  console.log(chalk.blue(figlet.textSync("RT Setup", {
    font: "ANSI Shadow"
  })))

  // Confirm to start setup
  const isSetupConfirm = await confirmPrompts("If you proceed, existing data will be reset. Is that alright?")
  if (isSetupConfirm) {
    log.complete("Welcome to React Template Setup!")
  } else {
    log.error("Setup is cancelled")
    process.exit(1)
  }

  // Show setup types
  const setupMode = await selectPrompts("Please select the type of setup you would like.", [
    {
      title: "Normal setup",
      value: "normal"
    },

    {
      title: "Emulator setup",
      value: "emulator"
    },

    {
      title: "Admin role setup",
      value: "adminRole"
    }
  ])
  
  switch (setupMode) {
    case "normal":
      await normal()
      break
    case "emulator":
      await emulator()
      break
    case "adminRole":
      await adminRole()
      break
  }

  log.complete("The setup is complete!")
})()
