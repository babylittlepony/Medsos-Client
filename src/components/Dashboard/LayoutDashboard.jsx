import { useState } from "react"

import { navigation } from "../../helper/navigateRoute"
import Settings from "./Settings/LayoutSettings"

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false)
  const { navigateHome } = navigation()

  const handleOpenSettings = () => {
    setShowSettings(true)
  }

  return (
    <div className="p-4">
      <div>
        <div>
          <button onClick={handleOpenSettings}>Pengaturan</button>
        </div>
        {showSettings && <Settings setShowSettings={setShowSettings} />}
      </div>
    </div>
  )
}

export default Dashboard
