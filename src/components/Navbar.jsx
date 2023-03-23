import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"

import { navigation } from "../helper/navigateRoute"
import { logout, logoutUser } from "../slices/authSlice"

export const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const token = useSelector((state) => state.auth.token)

  const dispatch = useDispatch()
  const { navigateLogin, navigateRegister } = navigation()

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
    <div className="sidebar">
      <nav className="header">
        <div className="header-container relative flex w-full justify-between bg-white dark:bg-navy-700 print:hidden">
          <button className="menu-toggle ml-0.5 flex h-7 w-7 flex-col justify-center space-y-1.5 text-primary outline-none focus:outline-none dark:text-accent-light/80"></button>
          <p className="invisible">Logo</p>
          <div className="inline-flex gap-4">{renderAuthButtons()}</div>
        </div>
      </nav>
    </div>
  )
}
