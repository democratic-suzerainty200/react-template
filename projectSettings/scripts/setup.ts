// This file is setup scripts.

import figlet from "figlet"
import admin from "firebase-admin"
import chalk from "chalk"
import fs from "fs"
import prompts from "prompts"
import type { ServiceAccount } from "firebase-admin"

// Files
import secretFile from "../../functions/src/secret.json" with { type: "json" }
import settingsFile from "../../src/settings.json" with { type: "json" }

const log = {
  info: (message: string) => {
    console.log(`${chalk.blue("√")} ${message}`)
  },

  complete: (message: string) => {
    console.log(`${chalk.green("√")} ${message}`)
  },

  warn: (message: string) => {
    console.log(`${chalk.yellow("×")} ${message}`)
  },

  error: (message: string) => {
    console.log(`${chalk.red("×")} ${message}`)
  }
}

async function inputPrompts(message: string) {
  const title = "value"
  const answer = await prompts(
    {
      type: "text",
      name: title,
      message
    },

    {
      onCancel: () => {
        log.error("Canceled")
        process.exit(0)
      }
    }
  )

  return answer[title]
}

async function selectPrompts(
  message: string,
  questions: { title: string, value: boolean | string }[]
) {
  const title = "value"
  const answer = await prompts(
    {
      type: "select",
      name: title,
      message: message,
      choices: questions
    },

    {
      onCancel: () => {
        log.error("Canceled")
        process.exit(0)
      }
    }
  )

  return answer[title]
}

async function confirmPrompts(message: string) {
  return await selectPrompts(message, [
    {
      title: "Yes",
      value: true
    },

    {
      title: "No",
      value: false
    }
  ])
}

async function startup() {
  const answer = await confirmPrompts("Do you want to start the setup?")

  // Confirm
  if (answer) {
    log.info("Welcome to React Template Setup!")
  } else {
    log.warn("Setup is cancelled.")
    process.exit(0)
  }
}

async function selectSetupTypes() {
  const answer: string = await selectPrompts("Please select the type of setup you would like.", [
    {
      title: "Normal setup",
      value: "normalSetup"
    },

    {
      title: "Only emulator",
      value: "onlyEmulator"
    }
  ])

  return answer
}

async function connectEmulator(num: number): Promise<admin.firestore.Firestore> {
  log.info("Connecting firebase emulator...")
  const emulatorDb = admin.initializeApp({ credential: admin.credential.cert(secretFile as ServiceAccount) }, `emulatorApp-${num}`).firestore()

  // Connect emulator
  emulatorDb.settings({ host: "localhost:8080", ssl: false })

  // Set timeout 5 seconds
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), 5000)
  )

  try {
    await Promise.race([
      emulatorDb.collection("test").get(),
      timeout
    ])

    log.complete("Connected firebase emulator!")
    return emulatorDb
  } catch {
    log.error("Could not connect to emulator.")
    const answer = await confirmPrompts("Do you want to connect to the emulator again?")

    if (answer) {
      const result = await connectEmulator(num + 1)
      return result
    } else {
      log.error("User canceled connecting emulator.")
      process.exit(0)
    }
  }
}

async function createEnv() {
  // Snnounce
  log.info("Now, let's set up the .env and .firebaserc file! & .firebaserc!")
  log.info("Please enter the following information.")

  // Get info
  const env: Record<string, string> = {}
  for (const item of settingsFile.requireEnv) {
    const value = await inputPrompts(`Please enter your project ${item.message}`)

    // Set
    env[item.name] = value
  }
  
  // Create env
  const envText = Object.entries(env).map(([key, value]) => `${key}=${value}`).join("\n")
  fs.writeFileSync(".env", envText)

  // Update translate files
  function updateTranslate(path: string) {
    const file = JSON.parse(fs.readFileSync(path, "utf8"))
    file.title.introduce = env.description
    fs.writeFileSync(path, JSON.stringify(file, null, 2))
  }

  updateTranslate("./src/translate/en.json")
  updateTranslate("./src/translate/ja.json")

  // Creating .firebaserc
  fs.writeFileSync(".firebaserc", JSON.stringify({
    projects: {
      default: env.firebase_project_id
    }
  }, null, 2))

  log.complete(".env, .firebaserc and translate files has been created successfully!")
}

async function createFirestore(database: admin.firestore.Firestore) {
  // Announce
  log.info("Now, let's create first firestore data!")
  log.info("Please enter the following information.")

  const title = await inputPrompts("Please enter your first update info title.")
  const description = await inputPrompts("Please enter your first update info description.")

  const updateData = {
    contents: [
      {
        title: title,
        description: description,
        date: new Date()
      }
    ]
  }

  const policyData = {
    content: "Sample",
    date: new Date()
  }

  // Set data
  await database.collection("public").doc("terms").set(policyData)
  await database.collection("public").doc("privacy").set(policyData)
  await database.collection("public").doc("updates").set(updateData)

  log.complete("Complete to create first firestore data!")
}

// Main
(async () => {
  // Show logo
  console.log(chalk.blue(figlet.textSync("rt setup", {
    font: "ansi shadow"
  })))

  // First questions
  await startup()
  const type = await selectSetupTypes()
  
  switch (type) {
    case "normalSetup":
      await createEnv()
      
      // Copy scripts/secret.json to functions/src/secret.json
      fs.writeFileSync("./functions/src/secret.json", JSON.stringify(secretFile, null, 2))

      const productDb = admin.initializeApp(
        {
          credential: admin.credential.cert(secretFile as ServiceAccount)
        },

        "product"
      ).firestore()

      await createFirestore(productDb)
      break
    case "onlyEmulator":
      const emulatorDb = await connectEmulator(0)
      await createFirestore(emulatorDb)
      break
  }
  
  // Finish
  log.complete("The setup is now complete!")
  log.complete("Thank you for your hard work!")
})()
