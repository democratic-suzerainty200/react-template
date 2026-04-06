// This module is used to output logs.
// You will not be using it.

import chalk from "chalk"

export const log = {
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
