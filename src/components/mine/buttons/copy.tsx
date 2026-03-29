// This file is a copy button.

import { Copy, CopyCheck } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CopyButton({ text, className, ...props }: { text?: string; className?: string }) {
  const [isClicked, setIsClicked] = useState(false)

  const handleCopy = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 5000)
  }

  if (!text) {
    return (
      <Button className={cn("w-50", className)} variant="outline" {...props}>
        <p className="w-40 overflow-hidden truncate text-left">Loading...</p>
        <Copy className="cursor-pointer w-10" />
      </Button>
    )
  }

  return (
    <Button className={cn("w-50", className)} onClick={handleCopy} variant="outline" {...props}>
      <p className="w-40 overflow-hidden truncate text-left">{text}</p>
      {isClicked ? (
        <CopyCheck className="cursor-pointer w-10" />
      ) : (
        <Copy className="cursor-pointer w-10" />
      )}
    </Button>
  )
}
