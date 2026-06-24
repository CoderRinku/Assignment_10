import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Bath, ArrowRight } from 'lucide-react'
import axios from 'axios'

const mockFeatured = [
  {
    _id: '1',
    title: 'Luxury Penthouse with Skyline View',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    location: 'Manhattan, New York',
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
    location: 'Aspen, Colorado',
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
    location: 'Miami, Florida',
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
    location: 'Austin, Texas',
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
    location: 'San Francisco, California',
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
    location: 'Los Angeles, California',
    type: 'House',
    rent: 4500,
    rentType: 'Monthly',
    beds: 5,
    baths: 4.5
  }
]

function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties/featured`)
        if (res.data && res.data.length > 0) {
          setProperties(res.data.slice(0, 6))
        } else {
          setProperties(mockFeatured)
        }
      } catch (err) {
        setProperties(mockFeatured)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Featured Properties
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our top-rated, handpicked premium rental options selected just for you.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {properties.map((property) => (
          <motion.div
            key={property._id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-150 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default FeaturedProperties
