import { useNavigate } from "react-router-dom"

export const navigation = () => {
  const navigate = useNavigate()

  const navigateHome = () => navigate("/")
  const navigateLogin = () => navigate("/login")
  const navigateRegister = () => navigate("/register")
  const navigateDashboard = () => navigate("/dashboard")

  return { navigateHome, navigateLogin, navigateRegister, navigateDashboard }
}
