import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"

import store from "./app/store"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verification/:code",
    element: <EmailVerification />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      {/* <App /> */}
      <Toaster toastOptions={{ duration: 4000 }} />
      <RouterProvider router={router} />
    </Provider>
  </>
)
