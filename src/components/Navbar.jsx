import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate("/login")
  }
  const navigateRegister = () => {
    navigate("/register")
  }

  return (
    <div className="flex justify-between">
      <p className="text-lg">Logo</p>
      <div className="inline-flex gap-4">
        <button onClick={navigateLogin} className="">
          Login
        </button>
        <button onClick={navigateRegister}>Register</button>
      </div>
    </div>
  )
}
