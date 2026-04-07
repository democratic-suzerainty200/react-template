// This code checks current domain is able to use.

import { env } from "@/lib/env"
const domain = window.location.hostname

if (!env.dev && env.domain !== domain) {
  window.location.hostname = env.domain
}
