import { useEffect } from "react"
import { useSelector } from "react-redux"

import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { navigation } from "./helper/navigateRoute"
import Dashboard from "./components/Dashboard/LayoutDashboard"

function App() {
  const authState = useSelector((state) => state.auth)
  const currentUser = authState?.currentUser
  const username = currentUser?.data?.username
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
        <Dashboard />
        {/* Some Page */}
        {/* Some Page */}
        {/* Some Page */}
      </main>
    </div>
  )
}

export default App
