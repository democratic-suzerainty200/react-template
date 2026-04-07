// This module is used to create Firestore data.
// You will not be using it.

// Modules
import { log } from "../../../modules/log"
import { inputPrompts } from "../../../modules/prompts"

import type admin from "firebase-admin"

export async function createFirestore(firestore: admin.firestore.Firestore) {
  const noticeData = {
    title: await inputPrompts("Please enter the title of the first notice."),
    description: await inputPrompts("Please enter the description of the first notice."),
    createdAt: new Date()
  }

  const policyData = {
    content: "Sample",
    date: new Date()
  }

  // Create sample policy data
  await firestore.collection("public").doc("terms").set(policyData)
  await firestore.collection("public").doc("privacy").set(policyData)

  // Create flat notice data
  await firestore.collection("notice").doc().set(noticeData)

  log.complete("The creation of the Firestore data template is complete!")
}