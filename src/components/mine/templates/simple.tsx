// Components
import { FooterBlocks } from "@/components/mine/blocks/footer"
import { HeaderBlocks } from "@/components/mine/blocks/header"
import { BackButton } from "@/components/mine/buttons/back"
import { FadeinAnimation } from "@/components/mine/animations/fadein"

// Hooks
import { useTitle } from "@/hooks/title"

export function SimpleTemplate({ children, description }: { children?: React.ReactNode, description?: string }) {
  const { title } = useTitle()

  return (
    <>
      <HeaderBlocks />
      <div className="min-h-svh px-4 flex flex-col items-center justify-center overflow-hidden">
        <FadeinAnimation className="w-full max-w-2xl gap-4 flex flex-col">
          <p className="text-2xl font-bold">{title}</p>
          
          {description && (
            <p className="text-md">{description}</p>
          )}

          {children}
          <BackButton className="w-fit" />
        </FadeinAnimation>
      </div>
      <FooterBlocks />
    </>
  )
}
