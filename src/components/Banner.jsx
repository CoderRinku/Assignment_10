import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Home as HomeIcon, DollarSign } from 'lucide-react'
import bannerImg from '../assets/banner.png'

function Banner() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (type) params.append('type', type)
    if (minPrice) params.append('minPrice', minPrice)
    if (maxPrice) params.append('maxPrice', maxPrice)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="relative h-[600px] lg:h-[680px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="Modern Home Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/75 transition-colors duration-300"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
        >
          Find Your Perfect Cozy Sanctuary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-gray-250 max-w-2xl mx-auto mb-10"
        >
          Explore the finest properties curated in premium locations. Hassle-free booking, verified owners, secure online payments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transition"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 text-left mb-1 uppercase tracking-wider">
                Location
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700/55 rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. New York"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 text-left mb-1 uppercase tracking-wider">
                Property Type
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700/55 rounded-lg px-3 py-2">
                <HomeIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="" className="dark:bg-gray-800">All Types</option>
                  <option value="Apartment" className="dark:bg-gray-800">Apartment</option>
                  <option value="House" className="dark:bg-gray-800">House</option>
                  <option value="Condo" className="dark:bg-gray-800">Condo</option>
                  <option value="Townhouse" className="dark:bg-gray-800">Townhouse</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 text-left mb-1 uppercase tracking-wider">
                Min Price
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700/55 rounded-lg px-3 py-2">
                <DollarSign className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 text-left mb-1 uppercase tracking-wider">
                Max Price
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700/55 rounded-lg px-3 py-2">
                <DollarSign className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div className="relative pt-5">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Banner
