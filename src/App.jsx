import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom"

import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { navigation } from "./helper/navigateRoute"

function App() {
  const authState = useSelector((state) => state.auth)
  const currentUser = authState?.currentUser

  const { navigateLogin } = navigation()

  console.log(authState)

  useEffect(() => {
    if (currentUser === null) {
      navigateLogin()
    }
  }, [currentUser])

  return (
    <div>
      <div>
        <Navbar />
        <Sidebar />
      </div>
      <main className="main-content w-full pb-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
