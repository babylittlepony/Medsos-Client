import { useState } from "react"
import { Modal } from "react-responsive-modal"

import { AssetsForm } from "./AssetsForm"
import { AssetsTable } from "./AssetsTable"
import "react-responsive-modal/styles.css"
import "./custom-modal.css"

const Assets = () => {
  const [open, setOpen] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    <div className="rounded-md bg-white p-4">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-xl font-bold">Assets List</h1>
        <div className="flex gap-4">
          <button
            onClick={onOpenModal}
            class="btn border border-success font-medium text-success hover:bg-success hover:text-white focus:bg-success focus:text-white active:bg-success/90"
          >
            Create
          </button>
          <button class="btn space-x-2 rounded-full bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <Modal
            open={open}
            onClose={onCloseModal}
            classNames={{ modal: "customModal" }}
          >
            <AssetsForm />
          </Modal>
        </div>
      </div>
      <AssetsTable />
    </div>
  )
}

export default Assets
