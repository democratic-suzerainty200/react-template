import { useAuthStore } from "@/store/auth"

export function useLoadingSetup() {
  const { loading } = useAuthStore()

  return { loading }
}
