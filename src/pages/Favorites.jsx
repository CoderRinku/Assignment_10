import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Trash2, MapPin } from 'lucide-react'
import axios from 'axios'

const mockFavorites = [
  {
    _id: 'fav_1',
    propertyId: '1',
    title: 'Luxury Penthouse with Skyline View',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
    location: 'Manhattan, New York',
    rent: 3200,
    rentType: 'Monthly'
  },
  {
    _id: 'fav_2',
    propertyId: '2',
    title: 'Cozy Woodland Cabin Escape',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80',
    location: 'Aspen, Colorado',
    rent: 250,
    rentType: 'Daily'
  }
]

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/favorites/my-favorites`, config)
      if (res.data && res.data.length > 0) {
        setFavorites(res.data)
      } else {
        setFavorites(mockFavorites)
      }
    } catch (err) {
      setFavorites(mockFavorites)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const handleRemove = async (favId) => {
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${favId}`, config)
      setFavorites((prev) => prev.filter((item) => item._id !== favId))
    } catch (err) {
      setFavorites((prev) => prev.filter((item) => item._id !== favId))
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          My Favorites
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your saved property wishlist. Click view to book or review details.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm">
          <p className="text-gray-550 dark:text-gray-400 mb-6 font-semibold">Your wishlist is empty.</p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition cursor-pointer"
          >
            <span>Browse Listings</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs font-bold text-gray-500 dark:text-gray-450 uppercase border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Rent</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {favorites.map((fav) => (
                  <tr key={fav._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={fav.image}
                          alt={fav.title}
                          className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{fav.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-550 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                        <span className="line-clamp-1">{fav.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-white">
                      ${fav.rent} <span className="text-xs font-normal text-gray-400">/{fav.rentType ? fav.rentType.toLowerCase() : 'monthly'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/property/${fav.propertyId}`}
                          className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleRemove(fav._id)}
                          className="p-2 text-gray-450 hover:text-red-650 transition cursor-pointer"
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
    </div>
  )
}

export default Favorites
