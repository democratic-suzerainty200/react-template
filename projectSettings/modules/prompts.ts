import prompts from "prompts"
import { log } from "./log"

export async function inputPrompts(message: string) {
  const title = "value"

  const answer = await prompts(
    {
      type: "text",
      name: title,
      message
    },

    {
      onCancel: () => {
        log.error("You canceled")
        process.exit(1)
      }
    }
  )

  return answer[title]
}

export async function selectPrompts(
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
        log.error("You canceled")
        process.exit(1)
      }
    }
  )

  return answer[title]
}

export async function confirmPrompts(message: string) {
  const answer = await selectPrompts(message, [
    {
      title: "Yes",
      value: true
    },

    {
      title: "No",
      value: false
    }
  ])

  return answer
}
