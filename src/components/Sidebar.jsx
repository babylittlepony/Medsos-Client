import { Link } from "react-router-dom"
import { navigation } from "../helper/navigateRoute"

export const Sidebar = () => {
  const { navigateDashboard } = navigation()

  return (
    <div className="main-sidebar">
      <div className="flex h-full w-full flex-col items-center border-r border-slate-150 bg-white dark:border-navy-700 dark:bg-navy-800">
        <div>
          <p>Logo</p>
        </div>
        <main className="is-scrollbar-hidden flex grow flex-col space-y-4 pt-6 text-left">
          <Link to="/dashboard">
            <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
              Dashboard
            </button>
          </Link>
          <Link to="/laporan">
            <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
              Laporan
            </button>
          </Link>
          <Link to="/mars">
            <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
              Mars
            </button>
          </Link>
          <Link to="/settings">
            <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
              Pengaturan
            </button>
          </Link>
        </main>
      </div>
    </div>
  )
}
