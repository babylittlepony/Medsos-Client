import { useState } from "react"

import { AssetsForm } from "./AssetsForm"

const Settings = () => {
  const [showForm, setShowForm] = useState(false)

  const handleCreateClick = () => {
    setShowForm(true)
  }

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <div>
        <h1 className="text-xl font-bold">Assets List</h1>
        <div>
          <button onClick={handleCreateClick}>Create</button>
          <button>Delete</button>
        </div>
      </div>
      {showForm && <AssetsForm setShowForm={setShowForm} />}
      <div>Asset</div>
    </div>
  )
}

export default Settings
