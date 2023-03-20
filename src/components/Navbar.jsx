import { useDispatch, useSelector } from "react-redux"

import { navigation } from "../helper/navigateRoute"
import { logoutUser } from "../slices/authSlice"

export const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  const { navigateLogin, navigateRegister, navigateDashboard } = navigation()

  const handleLogout = () => {
    dispatch(logoutUser(token))
  }

  return (
    <div className="flex justify-between gap-4">
      <p className="text-lg">Logo</p>
      {currentUser ? (
        <div className="inline-flex gap-4">
          <button onClick={navigateDashboard}>Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="inline-flex gap-4">
          <button onClick={navigateLogin} className="">
            Login
          </button>
          <button onClick={navigateRegister}>Register</button>
        </div>
      )}
    </div>
  )
}
