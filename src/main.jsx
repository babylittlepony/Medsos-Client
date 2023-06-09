import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import store, { persistor } from "./app/store"
import "./css/index.css"
import HomePage from "./App"
import LoginPage from "./components/Login"
import RegisterPage from "./components/Register"
import EmailVerificationPage from "./components/Verification"
import LayoutPengaturan from "./components/Dashboard/Settings/LayoutSettings"
import { Dashboard } from "./components/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/settings",
        element: <LayoutPengaturan />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
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
    element: <LayoutPengaturan />,
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
