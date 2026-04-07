import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoadingParts({ className, ...props }: { className?: string }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn(
        "size-7 text-foreground/30 animate-spin", className
      )}

      {...props}
    />
  )
}
