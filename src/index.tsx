import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "@generouted/react-router"

// Run
import "@/index.css"
import "@/setup/i18next"

const router = createBrowserRouter(routes)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
