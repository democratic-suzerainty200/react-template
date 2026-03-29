// This file is a part for creating a settings page.

export function ChildSettingsParts({ children, flex }: { children: React.ReactNode, flex?: boolean }) {
  return (
    <div className={`flex gap-1.5 ${flex ? "items-center" : "flex-col"}`}>
      {children}
    </div>
  )
}
