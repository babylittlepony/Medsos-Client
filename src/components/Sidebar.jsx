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
          <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
            Dashboard
          </button>
          <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
            Laporan
          </button>
          <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
            Mars
          </button>
          <button className="flex h-11 w-full border-b-2 outline-none transition-colors duration-200">
            Pengaturan
          </button>
        </main>
      </div>
    </div>
  )
}
