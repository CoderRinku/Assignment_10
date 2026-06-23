import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const renderNavLinks = () => {
    if (!user) return null

    if (user.role === 'Admin') {
      return (
        <>
          <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            Profile
          </Link>
          <Link to="/dashboard/users" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            All Users
          </Link>
          <Link to="/dashboard/all-properties" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            All Properties
          </Link>
          <Link to="/dashboard/all-bookings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            All Bookings
          </Link>
          <Link to="/dashboard/transactions" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            Transactions
          </Link>
        </>
      )
    }

    if (user.role === 'Owner') {
      return (
        <>
          <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            Profile
          </Link>
          <Link to="/dashboard/owner-analytics" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            Analytics
          </Link>
          <Link to="/dashboard/add-property" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            Add Property
          </Link>
          <Link to="/dashboard/my-properties" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            My Properties
          </Link>
          <Link to="/dashboard/booking-requests" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            Booking Requests
          </Link>
        </>
      )
    }

    return (
      <>
        <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
          Profile
        </Link>
        <Link to="/dashboard/bookings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
          My Bookings
        </Link>
        <Link to="/dashboard/favorites" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
          Favorites
        </Link>
      </>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between p-4">
        <div>
          <div className="text-xl font-black text-primary-600 dark:text-primary-400 mb-6 px-4">
            ResideEase
          </div>
          <nav className="space-y-1">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
              Home
            </Link>
            {renderNavLinks()}
          </nav>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-grow p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
