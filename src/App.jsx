import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navbar } from "./components/Navbar"

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const accessToken = useSelector((state) => state.auth.token)

  const authState = useSelector((state) => state.auth)
  console.log(authState)

  return (
    <div className="m-4 md:m-8 max-w-screen-lg mx-auto">
      <Navbar />
      <div>
        {currentUser ? (
          <p>Hello, {currentUser.username}!</p>
        ) : (
          <p>Welcome to the homepage!</p>
        )}
        {accessToken && <p>Your access token is: {accessToken}</p>}
      </div>
    </div>
  )
}

export default App
