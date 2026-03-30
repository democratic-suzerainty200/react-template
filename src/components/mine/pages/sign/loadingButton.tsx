import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useLoadingStore } from "@/store/loading"

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  onClick: () => Promise<void> | void,
  groupType: "sign"
}

export function SignLoadingButton({ onClick, children, groupType, ...props }: LoadingButtonProps) {
  const { signLoading, setSignLoading } = useLoadingStore()

  const handleClick = async () => {
    setSignLoading(true)
    try {
      await onClick()
    } finally {
      setSignLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={signLoading} {...props}>
      {signLoading ? (
        <>
          <Spinner data-icon="inline-start" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
