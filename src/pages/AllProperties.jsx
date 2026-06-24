import { useEffect, useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MapPin, BedDouble, Bath, ArrowRight, Search, SlidersHorizontal } from 'lucide-react'
import axios from 'axios'

const mockAllProperties = [
  {
    _id: '1',
    title: 'Luxury Penthouse with Skyline View',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    location: 'New York',
    type: 'Apartment',
    rent: 3200,
    rentType: 'Monthly',
    beds: 3,
    baths: 2.5
  },
  {
    _id: '2',
    title: 'Cozy Woodland Cabin Escape',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    location: 'Colorado',
    type: 'House',
    rent: 250,
    rentType: 'Daily',
    beds: 2,
    baths: 1
  },
  {
    _id: '3',
    title: 'Modern Beachfront Condo',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    location: 'Miami',
    type: 'Condo',
    rent: 1800,
    rentType: 'Monthly',
    beds: 2,
    baths: 2
  },
  {
    _id: '4',
    title: 'Elegant Suburban Townhouse',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    location: 'Austin',
    type: 'Townhouse',
    rent: 2100,
    rentType: 'Monthly',
    beds: 4,
    baths: 3
  },
  {
    _id: '5',
    title: 'Charming Vintage Studio',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    location: 'San Francisco',
    type: 'Apartment',
    rent: 1500,
    rentType: 'Monthly',
    beds: 1,
    baths: 1
  },
  {
    _id: '6',
    title: 'Panoramic Hilltop Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    location: 'Los Angeles',
    type: 'House',
    rent: 4500,
    rentType: 'Monthly',
    beds: 5,
    baths: 4.5
  },
  {
    _id: '7',
    title: 'Downtown Modern Loft',
    image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
    location: 'Chicago',
    type: 'Apartment',
    rent: 2200,
    rentType: 'Monthly',
    beds: 2,
    baths: 1.5
  },
  {
    _id: '8',
    title: 'Rustic Forest Lodge',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80',
    location: 'Seattle',
    type: 'House',
    rent: 300,
    rentType: 'Daily',
    beds: 3,
    baths: 2
  },
  {
    _id: '9',
    title: 'High-Rise Luxury Condo',
    image: 'https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&w=800&q=80',
    location: 'Seattle',
    type: 'Condo',
    rent: 2900,
    rentType: 'Monthly',
    beds: 2,
    baths: 2
  },
  {
    _id: '10',
    title: 'Sunset Boulevard Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    location: 'Los Angeles',
    type: 'House',
    rent: 5500,
    rentType: 'Monthly',
    beds: 6,
    baths: 5
  },
  {
    _id: '11',
    title: 'Minimalist Tiny House',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
    location: 'Austin',
    type: 'House',
    rent: 120,
    rentType: 'Daily',
    beds: 1,
    baths: 1
  },
  {
    _id: '12',
    title: 'Spacious Brick Townhouse',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    location: 'Boston',
    type: 'Townhouse',
    rent: 2600,
    rentType: 'Monthly',
    beds: 3,
    baths: 2.5
  }
]

function AllProperties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)

  const [search, setSearch] = useState(searchParams.get('location') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [sort, setSort] = useState('')

  const searchInputRef = useRef(null)

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', '6')
      if (search) params.append('search', search)
      if (type) params.append('type', type)
      if (minPrice) params.append('minPrice', minPrice)
      if (maxPrice) params.append('maxPrice', maxPrice)
      if (sort) params.append('sort', sort)

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties?${params.toString()}`)
      if (res.data?.properties && res.data.properties.length > 0) {
        setProperties(res.data.properties)
        setTotalPages(res.data.totalPages || 2)
      } else {
        applyClientSideFallback()
      }
    } catch (err) {
      applyClientSideFallback()
    } finally {
      setLoading(false)
    }
  }

  const applyClientSideFallback = () => {
    let filtered = [...mockAllProperties]

    if (search) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (type) {
      filtered = filtered.filter((p) => p.type === type)
    }
    if (minPrice) {
      filtered = filtered.filter((p) => p.rent >= parseFloat(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.rent <= parseFloat(maxPrice))
    }

    if (sort === 'lowToHigh') {
      filtered.sort((a, b) => a.rent - b.rent)
    } else if (sort === 'highToLow') {
      filtered.sort((a, b) => b.rent - a.rent)
    }

    const startIndex = (page - 1) * 6
    const endIndex = startIndex + 6
    setProperties(filtered.slice(startIndex, endIndex))
    setTotalPages(Math.ceil(filtered.length / 6) || 1)
  }

  useEffect(() => {
    fetchProperties()
  }, [page, type, sort])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchProperties()
  }

  const handleReset = () => {
    setSearch('')
    setType('')
    setMinPrice('')
    setMaxPrice('')
    setSort('')
    setPage(1)
    setSearchParams({})
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          All Properties
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our certified listings and narrow down your search using the filter options below.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm mb-12">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Location Search
            </label>
            <div className="relative flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2.5">
              <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="e.g. New York..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Property Type
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setPage(1)
              }}
              className="w-full bg-gray-50 dark:bg-gray-700 border-none text-sm rounded-lg px-3 py-2.5 outline-none text-gray-805 dark:text-white cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-405 uppercase mb-2">
              Sort By Price
            </label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                setPage(1)
              }}
              className="w-full bg-gray-55 dark:bg-gray-700 border-none text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white cursor-pointer"
            >
              <option value="">Default</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          <div className="flex gap-2 lg:col-span-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <>
          {properties.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No approved properties found matching the selected search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {property.type}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {property.title}
                    </h3>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-primary-500" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4 text-gray-400" />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-gray-400" />
                        <span>{property.baths} Baths</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                          ${property.rent}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          /{property.rentType.toLowerCase()}
                        </span>
                      </div>

                      <Link
                        to={`/property/${property._id}`}
                        className="flex items-center gap-1.5 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/30 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 font-semibold text-sm px-4 py-2.5 rounded-xl transition cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {properties.length > 0 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Previous
              </button>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AllProperties
