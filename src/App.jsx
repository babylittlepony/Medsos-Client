import { useSelector } from "react-redux"
import { Navbar } from "./components/Navbar"

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const authState = useSelector((state) => state.auth)

  const username = currentUser ? currentUser.data?.username : null

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
