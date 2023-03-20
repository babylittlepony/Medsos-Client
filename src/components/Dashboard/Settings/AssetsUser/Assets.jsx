import { useState } from "react"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"

import { AssetsForm } from "./AssetsForm"
import "./custom-modal.css"

const Assets = () => {
  const [open, setOpen] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    <div>
      <div className="my-8 flex justify-between">
        <h1 className="text-xl font-bold">Assets List</h1>
        <div className="flex gap-4">
          <button onClick={onOpenModal}>Create</button>
          <button>Delete</button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{ modal: "customModal" }}
      >
        <AssetsForm />
      </Modal>
      <div>Asset</div>
    </div>
  )
}

export default Assets
