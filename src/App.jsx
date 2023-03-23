import { useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { navigation } from "./helper/navigateRoute"
import SettingsPage from "./components/Dashboard/LayoutDashboard"

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
    <Router>
      <div>
        <div>
          <Navbar />
          <Sidebar />
        </div>
        <main className="main-content w-full pb-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/mars" element={<Mars />} />
            <Route path="/pengaturan" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
