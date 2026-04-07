// This module is used to set up the emulator mode.
// You will not be using it.

import admin from "firebase-admin"
import { createFirestore } from "../lib/createFirestore"
import type { ServiceAccount } from "firebase-admin"
import secretJson from "../../../../functions/src/secret.json" with { type: "json" }

// Modules
import { confirmPrompts } from "../../../modules/prompts"
import { log } from "../../../modules/log"

async function connectFirestore (num: number): Promise<admin.firestore.Firestore> {
  log.info("Connecting firebase emulator...")

  // Init emulator app
  const emulatorFirestore = admin.initializeApp({
    credential: admin.credential.cert(secretJson as ServiceAccount) },
    `emulatorApp-${num}`
  ).firestore()

  emulatorFirestore.settings({ host: "localhost:8080", ssl: false })

  // Set timeout for 5 seconds
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), 5000)
  )

  try {
    // Try to get data from emulator with timeout
    await Promise.race([
      emulatorFirestore.collection("test").get(),
      timeout
    ])

    log.complete("Connected firebase emulator!")
    return emulatorFirestore
  } catch(error) {
    if (error instanceof Error && error.message === "timeout") {
      log.error("Could not connect to emulator.")
      const answer = await confirmPrompts("Do you want to connect to the emulator again?")

      if (answer) {
        const result = await connectFirestore(num + 1)
        return result
      } else {
        log.error("You canceled connecting emulator")
        process.exit(1)
      }
    } else {
      throw error
    }
  }
}

export default async function code() {
  const emulatorFirestore = await connectFirestore(0)
  await createFirestore(emulatorFirestore)
}
