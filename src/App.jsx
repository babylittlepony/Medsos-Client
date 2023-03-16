import { useSelector } from "react-redux"
import { Navbar } from "./components/Navbar"

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const authState = useSelector((state) => state.auth)

  const username = currentUser ? currentUser.data?.username : null

  console.log(authState)

  return (
    <div className="px-4 m-8 max-w-screen-lg mx-auto">
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
