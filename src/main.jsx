import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import "./index.css"
import HomePage from "./App"
import LoginPage from "./components/Login"
import RegisterPage from "./components/Register"
import EmailVerificationPage from "./components/Verification"
import SettingsPage from "./components/Dashboard/LayoutDashboard"
import store, { persistor } from "./app/store"

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
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/verification/:code",
    element: <EmailVerificationPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </>
)
