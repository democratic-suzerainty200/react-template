// This file is a part for creating a settings page.

export function ParentParts({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-3 p-4 bg-background border dark:border-0 dark:bg-muted/30 rounded-xl"
      {...props}
    >
      {children}
    </div>
  )
}
