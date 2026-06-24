import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Shield, Image, CheckCircle, RefreshCw } from 'lucide-react'

function Profile() {
  const { user, updateUserProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [photo, setPhoto] = useState(user?.photo || '')
  const [updating, setUpdating] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setSuccessMsg('')
    setErrorMsg('')
    try {
      await updateUserProfile(name, photo)
      setSuccessMsg('Profile updated successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setErrorMsg('Failed to update profile. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and update your personal information and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm flex flex-col items-center text-center justify-center">
          <div className="relative mb-6">
            <img
              src={user?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
              alt={user?.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary-50 dark:border-primary-950/30 shadow-md"
            />
            <span className="absolute bottom-2 right-2 bg-primary-600 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-800">
              <Shield className="w-4 h-4" />
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {user?.name || 'User Account'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {user?.email}
          </p>

          <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold px-4 py-1.5 rounded-full inline-block">
            {user?.role || 'Tenant'}
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-gray-700">
            Account Details
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-450 uppercase mb-2">
                  Full Name
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2.5 border border-gray-150 dark:border-gray-800 focus-within:border-primary-500 transition">
                  <User className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent text-sm w-full outline-none text-gray-805 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-450 uppercase mb-2">
                  Email Address
                </label>
                <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2.5 border border-gray-100 dark:border-gray-800 text-gray-450">
                  <Mail className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="bg-transparent text-sm w-full outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-455 uppercase mb-2">
                Profile Photo URL
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2.5 border border-gray-150 dark:border-gray-800 focus-within:border-primary-500 transition">
                <Image className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="url"
                  placeholder="Paste direct image link..."
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-805 dark:text-white"
                />
              </div>
            </div>

            {successMsg && (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-450">
                <CheckCircle className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="text-sm font-semibold text-red-500">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={updating}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {updating ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              <span>{updating ? 'Saving Profile...' : 'Save Profile Details'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
