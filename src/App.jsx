import Login from "./components/Login"
import Register from "./components/Register"
import EmailVerification from "./components/Verification"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./helper/PrivateRoute"

import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact element={<Login />} path="/login" />
        <Route exact element={<Register />} path="/register" />
        <Route
          exact
          element={<EmailVerification />}
          path="/verification/:code"
        />
        <Route element={<PrivateRoute component={Dashboard} />} path="/" />
      </Routes>
    </Router>
  )
}

export default App
