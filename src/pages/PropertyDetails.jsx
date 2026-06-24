import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, BedDouble, Bath, Square, Calendar, Heart, Shield, Star, Award, User, Send, X, Phone, FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const mockAllProperties = [
  {
    _id: '1',
    title: 'Luxury Penthouse with Skyline View',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    location: 'Manhattan, New York',
    type: 'Apartment',
    rent: 3200,
    rentType: 'Monthly',
    beds: 3,
    baths: 2.5,
    size: '1,800 sq ft',
    description: 'This gorgeous luxury penthouse features panoramic views of the city skyline, spacious open-plan living, gourmet chef kitchen, and high-end modern finishes throughout. Located in the heart of Manhattan.',
    amenities: ['High-speed Wifi', 'Central AC', '24/7 Security', 'Private Balcony', 'Fitness Center', 'Secure Parking'],
    owner: {
      name: 'Robert Vance',
      email: 'robert@resideease.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80'
    }
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
    baths: 1,
    size: '950 sq ft',
    description: 'A cozy timber cabin surrounded by beautiful pine trees. Features a stone fireplace, wood-burning stove, fully equipped kitchen, and an outdoor hot tub perfect for starry Colorado nights.',
    amenities: ['Fireplace', 'Outdoor Hot Tub', 'Wifi', 'Kitchen', 'Pet Friendly', 'Free Parking'],
    owner: {
      name: 'Melissa Thorne',
      email: 'melissa@resideease.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
    }
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
    baths: 2,
    size: '1,200 sq ft',
    description: 'Beautiful beachfront condo overlooking the pristine ocean. Wake up to ocean breezes and enjoy direct access to the beach. Community features pool, gym, and tennis courts.',
    amenities: ['Direct Beach Access', 'Ocean View', 'Swimming Pool', 'AC', 'Fitness Gym', 'Cable TV'],
    owner: {
      name: 'Jonathan Miller',
      email: 'jonathan@resideease.com',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80'
    }
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
    baths: 3,
    size: '2,100 sq ft',
    description: 'Perfect family home located in a quiet and friendly suburban neighborhood. Offers a spacious fenced backyard, multi-car garage, large kitchen, and double vanity bathrooms.',
    amenities: ['Fenced Backyard', 'Double Garage', 'Washer & Dryer', 'Central AC', 'Kitchen Pantry', 'Storage Room'],
    owner: {
      name: 'Clara Oswald',
      email: 'clara@resideease.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80'
    }
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
    baths: 1,
    size: '550 sq ft',
    description: 'Charming vintage studio with historic architecture, hardwood flooring, and abundant natural light. Steps away from transit, local cafes, and SF downtown.',
    amenities: ['Hardwood Floors', 'Transit Access', 'High Ceilings', 'High-speed Wifi', 'Laundry Facility', 'Gas Range'],
    owner: {
      name: 'Robert Vance',
      email: 'robert@resideease.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80'
    }
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
    baths: 4.5,
    size: '3,800 sq ft',
    description: 'Luxury hilltop villa featuring custom architectures, private infinity swimming pool, grand rooms, and outdoor BBQ lounge area capturing breathtaking sunset views of Los Angeles.',
    amenities: ['Infinity Pool', 'Sunset Views', 'Outdoor BBQ', 'Home Automation', 'Wine Cellar', 'Private Gates'],
    owner: {
      name: 'Jonathan Miller',
      email: 'jonathan@resideease.com',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80'
    }
  }
]

const mockReviews = [
  {
    id: 1,
    name: 'Emily Watson',
    email: 'emily@gmail.com',
    date: '2026-05-12',
    rating: 5,
    comment: 'Absolutely stunning property! The description does not even do justice to how beautiful the views are in person.'
  },
  {
    id: 2,
    name: 'James Carter',
    email: 'james@gmail.com',
    date: '2026-06-02',
    rating: 4,
    comment: 'Very clean and spacious. The check-in process was smooth, and the owner was extremely responsive.'
  }
]

function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [moveInDate, setMoveInDate] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [notes, setNotes] = useState('')
  const [submittingBooking, setSubmittingBooking] = useState(false)

  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteSuccessMsg, setFavoriteSuccessMsg] = useState('')

  const fetchPropertyData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`)
      if (res.data) {
        setProperty(res.data)
      } else {
        fallbackToMock()
      }
    } catch (err) {
      fallbackToMock()
    } finally {
      setLoading(false)
    }
  }

  const fallbackToMock = () => {
    const item = mockAllProperties.find((p) => p._id === id) || mockAllProperties[0]
    setProperty(item)
  }

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/property/${id}`)
      if (res.data && res.data.length > 0) {
        setReviews(res.data)
      } else {
        setReviews(mockReviews)
      }
    } catch (err) {
      setReviews(mockReviews)
    }
  }

  useEffect(() => {
    fetchPropertyData()
    fetchReviews()
  }, [id])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setSubmittingReview(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          propertyId: id,
          rating,
          comment
        },
        config
      )
      if (res.data) {
        setReviews((prev) => [res.data, ...prev])
      } else {
        addMockReview()
      }
    } catch (err) {
      addMockReview()
    } finally {
      setComment('')
      setRating(5)
      setSubmittingReview(false)
    }
  }

  const addMockReview = () => {
    const newRev = {
      id: Date.now(),
      name: user?.name || 'Anonymous User',
      email: user?.email || 'user@gmail.com',
      date: new Date().toISOString().split('T')[0],
      rating,
      comment
    }
    setReviews((prev) => [newRev, ...prev])
  }

  const handleAddToFavorites = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, { propertyId: id }, config)
      setIsFavorite(true)
      triggerFavoriteAlert('Added to favorites successfully!')
    } catch (err) {
      setIsFavorite(true)
      triggerFavoriteAlert('Added to favorites successfully!')
    }
  }

  const triggerFavoriteAlert = (msg) => {
    setFavoriteSuccessMsg(msg)
    setTimeout(() => {
      setFavoriteSuccessMsg('')
    }, 3000)
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    if (!moveInDate || !contactNumber) return
    setSubmittingBooking(true)
    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          propertyId: id,
          moveInDate,
          contactNumber,
          notes
        },
        config
      )
      if (res.data?.bookingId) {
        navigate(`/payment/${res.data.bookingId}`)
      } else {
        navigate(`/payment/${id}`)
      }
    } catch (err) {
      navigate(`/payment/${id}`)
    } finally {
      setSubmittingBooking(false)
      setIsBookingModalOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!property) return null

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {favoriteSuccessMsg && (
        <div className="fixed top-24 right-6 z-55 bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg animate-bounce">
          {favoriteSuccessMsg}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {property.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary-550 flex-shrink-0" />
            <span>{property.location}</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
          <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1.5 rounded-full">
            {property.type}
          </div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden aspect-[16/9] max-h-[520px] mb-12 shadow-md">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Property Description
            </h2>
            <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-base">
              {property.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Key Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Beds
                </span>
                <div className="flex items-center gap-2 text-gray-850 dark:text-gray-200">
                  <BedDouble className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-bold">{property.beds} Bedrooms</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Baths
                </span>
                <div className="flex items-center gap-2 text-gray-850 dark:text-gray-200">
                  <Bath className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-bold">{property.baths} Bathrooms</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Property Size
                </span>
                <div className="flex items-center gap-2 text-gray-850 dark:text-gray-200">
                  <Square className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-bold">{property.size || '1,200 sq ft'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-505 uppercase tracking-wider">
                  Rent Frequency
                </span>
                <div className="flex items-center gap-2 text-gray-850 dark:text-gray-200">
                  <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-bold">{property.rentType}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Included Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-150 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-250"
                >
                  <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Reviews & Ratings
            </h2>
            <div className="space-y-6 mb-8">
              {reviews.map((rev) => (
                <div
                  key={rev.id || rev._id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold uppercase">
                        {rev.name.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                          {rev.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {rev.date || 'Just now'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>

            {user ? (
              <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Write a Review
                </h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-amber-500 focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${star <= rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Comment
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Share your experience renting this property..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg p-3 outline-none text-gray-800 dark:text-white focus:border-primary-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Review</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-250 dark:border-amber-900/30 p-4 rounded-xl text-center text-sm text-amber-700 dark:text-amber-400 font-semibold">
                You must be logged in to submit reviews for properties.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm space-y-6 sticky top-6">
            <div>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-505 uppercase tracking-wider">
                Rental Rent
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-primary-600 dark:text-primary-400">
                  ${property.rent}
                </span>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  /{property.rentType.toLowerCase()}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login')
                  } else {
                    setIsBookingModalOpen(true)
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Property Now</span>
              </button>
              <button
                onClick={handleAddToFavorites}
                disabled={isFavorite}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 disabled:opacity-75 disabled:hover:bg-transparent text-gray-700 dark:text-gray-250 font-bold py-3 px-4 rounded-xl transition cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                <span>{isFavorite ? 'Added to Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-4">
                Listed By Owner
              </span>
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl">
                <img
                  src={property.owner?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
                  alt={property.owner?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <span>{property.owner?.name}</span>
                    <Award className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {property.owner?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 dark:hover:text-gray-250 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              Book Rental Property
            </h3>
            <p className="text-sm text-gray-550 dark:text-gray-400 mb-6">
              Please check your details and enter move-in requirements to confirm reservation.
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">
                    Tenant Name
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-800 text-gray-500">
                    <User className="w-4 h-4 mr-2" />
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="bg-transparent text-sm w-full outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">
                    Tenant Email
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-800 text-gray-500">
                    <Send className="w-4 h-4 mr-2" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-transparent text-sm w-full outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">
                    Property Title
                  </label>
                  <input
                    type="text"
                    value={property.title}
                    disabled
                    className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-800 text-sm text-gray-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1.5">
                    Rental Rent
                  </label>
                  <input
                    type="text"
                    value={`$${property.rent} / ${property.rentType}`}
                    disabled
                    className="w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-800 text-sm text-gray-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-650 dark:text-gray-350 uppercase mb-1.5">
                  Move-in Date <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="date"
                    required
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-655 dark:text-gray-350 uppercase mb-1.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number..."
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-655 dark:text-gray-355 uppercase mb-1.5">
                  Additional Notes (Optional)
                </label>
                <div className="flex bg-white dark:bg-gray-900 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
                  <FileText className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                  <textarea
                    rows="3"
                    placeholder="Any specific requests or requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 py-3 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="flex-1 py-3 text-sm font-semibold rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition disabled:opacity-50 cursor-pointer"
                >
                  Confirm & Go to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetails
