// This file outputs logs and errors.

export function errorLog(error: unknown) {
  console.error(error)
}

export function log(message: string) {
  console.log(message)
}
