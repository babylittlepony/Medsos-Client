import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import { navigation } from "../helper/navigateRoute"
import { logout, logoutUser } from "../slices/authSlice"

export const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const token = useSelector((state) => state.auth.token)

  const dispatch = useDispatch()
  const { navigateLogin, navigateRegister, navigateDashboard } = navigation()

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(token))
    } catch (error) {
      console.log("handle logout err", error)

      if (error.data?.data?.message === "jwt expired") {
        const newToken = localStorage.getItem("new token")
        dispatch(logoutUser(newToken))
        toast.success("Logout sukses")
      }

      if (error.status === 401) {
        dispatch(logout())
        toast.success("Silahkan login kembali")
        navigateLogin()
      }
    }
  }

  const renderAuthButtons = () => {
    if (currentUser) {
      return (
        <>
          <button onClick={navigateDashboard}>Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )
    }

    return (
      <>
        <button onClick={navigateLogin}>Login</button>
        <button onClick={navigateRegister}>Register</button>
      </>
    )
  }

  return (
    <div className="flex justify-between gap-4">
      <p className="text-lg">Logo</p>

      <div className="inline-flex gap-4">{renderAuthButtons()}</div>
    </div>
  )
}
