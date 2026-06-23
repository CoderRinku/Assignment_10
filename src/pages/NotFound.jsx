import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 text-center">
      <h1 className="text-9xl font-black text-primary-500">404</h1>
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition"
      >
        Go back Home
      </Link>
    </div>
  )
}

export default NotFound
