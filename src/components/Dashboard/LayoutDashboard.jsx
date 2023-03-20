import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Settings from "./Settings/LayoutSettings"

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setShowSettings(true)
  }

  const navigateHome = () => {
    navigate("/")
  }

  return (
    <div>
      <div>
        <div>
          <button onClick={navigateHome}>Logo</button>
        </div>
        <div>
          <button onClick={handleClick}>Pengaturan</button>
        </div>
        {showSettings && <Settings setShowSettings={setShowSettings} />}
      </div>
    </div>
  )
}

export default Dashboard
