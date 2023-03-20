import { useState } from "react"
import { AssetsForm } from "./AssetsForm"

const Assets = () => {
  const [showForm, setShowForm] = useState(false)

  const handleCreateClick = () => {
    setShowForm(true)
  }

  return (
    <div>
      <div className="my-8 flex justify-between">
        <h1 className="text-xl font-bold">Assets List</h1>
        <div className="flex gap-4">
          <button onClick={handleCreateClick}>Create</button>
          <button>Delete</button>
        </div>
      </div>
      {showForm && <AssetsForm setShowForm={setShowForm} />}
      <div>Asset</div>
    </div>
  )
}

export default Assets
