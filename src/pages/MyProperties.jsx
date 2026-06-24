import { useEffect, useState } from 'react'
import { Eye, Edit, Trash2, X, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'
import axios from 'axios'

const mockProperties = [
  {
    _id: '1',
    title: 'Luxury Penthouse with Skyline View',
    location: 'Manhattan, New York',
    rent: 3200,
    rentType: 'Monthly',
    status: 'Approved'
  },
  {
    _id: '2',
    title: 'Cozy Woodland Cabin Escape',
    location: 'Aspen, Colorado',
    rent: 250,
    rentType: 'Daily',
    status: 'Rejected',
    rejectionFeedback: 'The location provided is too vague. Please specify the exact road/area in Aspen.'
  },
  {
    _id: '3',
    title: 'Modern Beachfront Condo',
    location: 'Miami, Florida',
    rent: 1800,
    rentType: 'Monthly',
    status: 'Pending'
  }
]

function MyProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeFeedback, setActiveFeedback] = useState('')
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  const [editingProperty, setEditingProperty] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editRent, setEditRent] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties/my-properties`, config)
      if (res.data && res.data.length > 0) {
        setProperties(res.data)
      } else {
        setProperties(mockProperties)
      }
    } catch (err) {
      setProperties(mockProperties)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.delete(`${import.meta.env.VITE_API_URL}/properties/${id}`, config)
      setProperties((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      setProperties((prev) => prev.filter((p) => p._id !== id))
    }
  }

  const handleEditOpen = (property) => {
    setEditingProperty(property)
    setEditTitle(property.title)
    setEditRent(property.rent)
    setEditDesc(property.description || '')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const updatedData = {
        title: editTitle,
        rent: parseFloat(editRent),
        description: editDesc,
        status: 'Pending'
      }
      await axios.patch(`${import.meta.env.VITE_API_URL}/properties/${editingProperty._id}`, updatedData, config)
      setProperties((prev) =>
        prev.map((p) =>
          p._id === editingProperty._id
            ? { ...p, ...updatedData }
            : p
        )
      )
      setEditingProperty(null)
    } catch (err) {
      setProperties((prev) =>
        prev.map((p) =>
          p._id === editingProperty._id
            ? { ...p, title: editTitle, rent: parseFloat(editRent), description: editDesc, status: 'Pending' }
            : p
        )
      )
      setEditingProperty(null)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          My Properties
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage all properties listed by you. View approval status, edit details, or delete listings.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-6 font-semibold">You have not listed any properties yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-bold text-gray-500 dark:text-gray-455 uppercase border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {properties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {property.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-white">
                      ${property.rent} <span className="text-xs font-normal text-gray-450">/{property.rentType ? property.rentType.toLowerCase() : 'monthly'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                          property.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450'
                            : property.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-455'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-455'
                        }`}>
                          {property.status}
                        </span>
                        {property.status === 'Rejected' && property.rejectionFeedback && (
                          <button
                            onClick={() => {
                              setActiveFeedback(property.rejectionFeedback)
                              setIsFeedbackModalOpen(true)
                            }}
                            className="p-1 text-gray-450 hover:text-primary-600 transition cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditOpen(property)}
                          className="p-2 text-gray-400 hover:text-primary-600 transition cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="p-2 text-gray-450 hover:text-red-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 rounded-2xl flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-800">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Rejection Feedback
            </h3>
            <p className="text-sm text-gray-650 dark:text-gray-350 leading-relaxed bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
              {activeFeedback}
            </p>

            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="w-full mt-6 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-200 transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setEditingProperty(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-655 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Update Property Details
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg px-3 py-2 outline-none text-gray-800 dark:text-white focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Rent Price
                </label>
                <input
                  type="number"
                  required
                  value={editRent}
                  onChange={(e) => setEditRent(e.target.value)}
                  className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-155 dark:border-gray-855 text-sm rounded-lg px-3 py-2 outline-none text-gray-800 dark:text-white focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg p-3 outline-none text-gray-800 dark:text-white focus:border-primary-500"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-250 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {updating ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProperties
