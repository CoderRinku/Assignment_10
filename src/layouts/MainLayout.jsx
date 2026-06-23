import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ResideEase
          </div>
          <nav className="flex space-x-4">
            <span className="text-gray-500">Navigation Placeholder</span>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          &copy; 2026 ResideEase. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
