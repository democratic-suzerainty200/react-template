import { SimpleTemplate } from "@/components/mine/templates/simple"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendNotice, setAdminRole } from "@/lib/functions"
import { useAuthStore } from "@/store/auth"

export default function App() {
  const { user } = useAuthStore()

  if (!user) return

  return (
    <div className="min-h-svh">
      <SimpleTemplate>
        <Input className="w-full" placeholder="Type something..." />
        <Button onClick={async () => {
          const result = await sendNotice({
            title: "Hello",
            body: "This is a test notice."
          })

          if ((result?.data as { success?: boolean })?.success) {
            alert("Notice sent successfully!")
          }
        }} className="w-fit" variant="outline">Send notice</Button>

        <Button onClick={async () => {
          const result = await setAdminRole({ uid: user.uid })
          if ((result?.data as { success?: boolean })?.success) {
            alert("Admin role set successfully!")
          }
        }}>Set admin</Button>
      </SimpleTemplate>
    </div>
  )
}
