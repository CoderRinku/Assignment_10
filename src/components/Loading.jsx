import { RefreshCw } from 'lucide-react'

function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent text-center px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
        <RefreshCw className="absolute w-6 h-6 text-primary-600 dark:text-primary-400 animate-pulse" />
      </div>
      <h3 className="mt-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        Loading Content
      </h3>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
        Please wait a moment while we fetch the latest properties...
      </p>
    </div>
  )
}

export default Loading
