import { Link, useRouteError } from 'react-router-dom'
import { AlertOctagon, ArrowLeft, RefreshCw } from 'lucide-react'

function ErrorPage() {
  const error = useRouteError()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 text-center transition-colors duration-300">
      <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 rounded-3xl flex items-center justify-center mb-6 border border-rose-100 dark:border-rose-900 shadow-sm animate-bounce">
        <AlertOctagon className="w-10 h-10" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Something went wrong!
      </h1>
      
      <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-md text-sm">
        An unexpected error occurred. Our team has been notified and we are working to resolve it.
      </p>

      {error && (
        <div className="mt-6 bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/50 rounded-2xl p-4 max-w-md w-full text-left">
          <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
            Error Details
          </p>
          <p className="mt-1 text-sm font-semibold text-red-800 dark:text-red-300 font-mono break-all">
            {error.statusText || error.message || 'Unknown Route or Server Error'}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 dark:border-gray-700 text-sm font-bold rounded-xl text-gray-750 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload Page</span>
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
