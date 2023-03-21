import { useSelector } from "react-redux"
import { Navbar } from "./components/Navbar"

function App() {
  const authState = useSelector((state) => state.auth)
  const currentUser = authState?.currentUser
  const username = currentUser?.data?.username

  console.log(authState)

  return (
    <div className="m-8 mx-auto max-w-screen-lg px-4">
      <Navbar />
      <div>
        {currentUser ? (
          <p>Hello, {username}💪</p>
        ) : (
          <p>Welcome to the homepage!</p>
        )}
      </div>
    </div>
  )
}

export default App
