import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function OwnerRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (user && user.role === 'Owner') {
    return children
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />
}

export default OwnerRoute
