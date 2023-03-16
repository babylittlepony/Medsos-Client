import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import "./index.css"
import HomePage from "./App"
import LoginPage from "./components/Login"
import RegisterPage from "./components/Register"
import EmailVerificationPage from "./components/Verification"

import store from "./app/store"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verification/:code",
    element: <EmailVerificationPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <Toaster toastOptions={{ duration: 4000 }} />
      <RouterProvider router={router} />
    </Provider>
  </>
)
