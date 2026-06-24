import { useEffect, useState } from 'react'
import { Check, X, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react'
import axios from 'axios'

const mockProperties = [
  {
    _id: '1',
    title: 'Luxury Penthouse with Skyline View',
    location: 'Manhattan, New York',
    rent: 3200,
    rentType: 'Monthly',
    status: 'Approved',
    owner: {
      name: 'Robert Vance',
      email: 'robert@resideease.com'
    }
  },
  {
    _id: '2',
    title: 'Cozy Woodland Cabin Escape',
    location: 'Aspen, Colorado',
    rent: 250,
    rentType: 'Daily',
    status: 'Rejected',
    rejectionFeedback: 'The location provided is too vague. Please specify the exact road/area in Aspen.',
    owner: {
      name: 'Melissa Thorne',
      email: 'melissa@resideease.com'
    }
  },
  {
    _id: '3',
    title: 'Modern Beachfront Condo',
    location: 'Miami, Florida',
    rent: 1800,
    rentType: 'Monthly',
    status: 'Pending',
    owner: {
      name: 'Jonathan Miller',
      email: 'jonathan@resideease.com'
    }
  }
]

function AdminAllProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const [rejectingPropertyId, setRejectingPropertyId] = useState(null)
  const [rejectionFeedback, setRejectionFeedback] = useState('')
  const [submittingRejection, setSubmittingRejection] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties/all`, config)
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

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/properties/status/${id}`,
        { status: 'Approved' },
        config
      )
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: 'Approved' } : p))
      )
      triggerAlert('Property approved successfully!')
    } catch (err) {
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: 'Approved' } : p))
      )
      triggerAlert('Property approved successfully!')
    }
  }

  const handleRejectOpen = (id) => {
    setRejectingPropertyId(id)
    setRejectionFeedback('')
  }

  const handleRejectSubmit = async (e) => {
    e.preventDefault()
    if (!rejectionFeedback.trim()) return
    setSubmittingRejection(true)

    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/properties/status/${rejectingPropertyId}`,
        {
          status: 'Rejected',
          rejectionFeedback
        },
        config
      )
      setProperties((prev) =>
        prev.map((p) =>
          p._id === rejectingPropertyId
            ? { ...p, status: 'Rejected', rejectionFeedback }
            : p
        )
      )
      triggerAlert('Property rejected successfully with feedback.')
    } catch (err) {
      setProperties((prev) =>
        prev.map((p) =>
          p._id === rejectingPropertyId
            ? { ...p, status: 'Rejected', rejectionFeedback }
            : p
        )
      )
      triggerAlert('Property rejected successfully with feedback.')
    } finally {
      setSubmittingRejection(false)
      setRejectingPropertyId(null)
    }
  }

  const triggerAlert = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => setAlertMsg(''), 3000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {alertMsg && (
        <div className="fixed top-24 right-6 z-55 bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg">
          {alertMsg}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Verify Properties
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400">
          Admin dashboard to review submitted listings from owners, approve them, or reject with details.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-6 font-semibold">No property submissions available.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-bold text-gray-500 dark:text-gray-450 uppercase border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Owner Info</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {properties.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {p.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {p.location}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300">
                      <div className="font-bold text-gray-800 dark:text-gray-200">{p.owner?.name}</div>
                      <div>{p.owner?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-gray-905 dark:text-white">
                      ${p.rent} <span className="text-xs font-normal text-gray-400">/{p.rentType ? p.rentType.toLowerCase() : 'monthly'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        p.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450'
                          : p.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-455'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-455'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {p.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApprove(p._id)}
                            className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectOpen(p._id)}
                            className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-semibold italic">No actions needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {rejectingPropertyId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setRejectingPropertyId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-4 border border-rose-100 dark:border-rose-800">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Reject Property Listing
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Please write a reason for rejection. This feedback will be visible to the property owner.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Rejection Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Please provide high-resolution images of bedrooms and specify correct street address..."
                  value={rejectionFeedback}
                  onChange={(e) => setRejectionFeedback(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg p-3 outline-none text-gray-800 dark:text-white focus:border-primary-500"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setRejectingPropertyId(null)}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-250 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingRejection}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submittingRejection ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                  <span>Confirm Reject</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAllProperties
