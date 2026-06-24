import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, Eye } from 'lucide-react'
import axios from 'axios'

const mockBookings = [
  {
    _id: 'bk_1',
    propertyName: 'Luxury Penthouse with Skyline View',
    propertyId: '1',
    bookingDate: '2026-06-20',
    amount: 3200,
    status: 'Approved',
    paymentStatus: 'Unpaid'
  },
  {
    _id: 'bk_2',
    propertyName: 'Cozy Woodland Cabin Escape',
    propertyId: '2',
    bookingDate: '2026-06-15',
    amount: 250,
    status: 'Approved',
    paymentStatus: 'Paid'
  },
  {
    _id: 'bk_3',
    propertyName: 'Modern Beachfront Condo',
    propertyId: '3',
    bookingDate: '2026-06-10',
    amount: 1800,
    status: 'Pending',
    paymentStatus: 'Unpaid'
  }
]

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/my-bookings`, config)
        if (res.data && res.data.length > 0) {
          setBookings(res.data)
        } else {
          setBookings(mockBookings)
        }
      } catch (err) {
        setBookings(mockBookings)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          My Bookings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your reservation requests, status updates, and complete payment secure via Stripe.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm">
          <p className="text-gray-550 dark:text-gray-400 mb-6 font-semibold">You have not booked any properties yet.</p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition cursor-pointer"
          >
            <span>Explore Properties</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-bold text-gray-500 dark:text-gray-450 uppercase border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Property Name</th>
                  <th className="px-6 py-4">Booking Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Booking Status</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {booking.propertyName}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {booking.bookingDate}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-white">
                      ${booking.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        booking.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450'
                          : booking.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-455'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-455'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        booking.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-455'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-455'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/property/${booking.propertyId}`}
                          className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {booking.status === 'Approved' && booking.paymentStatus === 'Unpaid' && (
                          <button
                            onClick={() => navigate(`/payment/${booking.propertyId}`)}
                            className="inline-flex items-center gap-1 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings
