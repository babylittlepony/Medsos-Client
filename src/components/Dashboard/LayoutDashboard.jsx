import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Settings from "./Settings/LayoutSettings"

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false)
  const navigate = useNavigate()

  const handleOpenSettings = () => {
    setShowSettings(true)
  }
  const navigateHome = () => {
    navigate("/")
  }

  return (
    <div className="p-4">
      <div>
        <div>
          <button onClick={navigateHome}>Logo</button>
        </div>
        <div>
          <button onClick={handleOpenSettings}>Pengaturan</button>
        </div>
        {showSettings && <Settings setShowSettings={setShowSettings} />}
      </div>
    </div>
  )
}

export default Dashboard
