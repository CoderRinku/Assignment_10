import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, MapPin, DollarSign, Calendar, ShieldAlert } from 'lucide-react'
import axios from 'axios'

function AddProperty() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('Apartment')
  const [rent, setRent] = useState('')
  const [rentType, setRentType] = useState('Monthly')
  const [beds, setBeds] = useState('')
  const [baths, setBaths] = useState('')
  const [size, setSize] = useState('')
  const [image, setImage] = useState('')
  const [amenities, setAmenities] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const newProperty = {
      title,
      description,
      location,
      type,
      rent: parseFloat(rent),
      rentType,
      beds: parseInt(beds),
      baths: parseFloat(baths),
      size,
      image,
      amenities: amenities.split(',').map((item) => item.trim()).filter((item) => item !== ''),
      status: 'Pending',
      owner: {
        name: user?.name,
        email: user?.email,
        image: user?.photo
      }
    }

    try {
      const token = localStorage.getItem('token')
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      await axios.post(`${import.meta.env.VITE_API_URL}/properties`, newProperty, config)
      navigate('/dashboard/my-properties')
    } catch (err) {
      navigate('/dashboard/my-properties')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Add New Property
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400">
          List your rental unit on ResideEase. Complete the details below.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-gray-700 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Property Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Spacious 2-Bedroom Downtown Apartment"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Property Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white cursor-pointer"
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-450 uppercase mb-2">
              Description
            </label>
            <textarea
              rows="4"
              required
              placeholder="Provide a detailed overview of the property, neighborhood attractions, etc..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg p-3 outline-none text-gray-800 dark:text-white focus:border-primary-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Location
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-lg px-3 py-2.5">
                <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Austin, Texas"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Rent Price
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-lg px-3 py-2.5">
                <DollarSign className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                <input
                  type="number"
                  required
                  placeholder="Price"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Rent Type
              </label>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-lg px-3 py-2.5">
                <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <select
                  value={rentType}
                  onChange={(e) => setRentType(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-gray-800 dark:text-white cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Daily">Daily</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                required
                placeholder="Number of beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                step="0.5"
                required
                placeholder="Number of baths"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Property Size
              </label>
              <input
                type="text"
                placeholder="e.g. 1,400 sq ft"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-150 dark:border-gray-855 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Image URL
            </label>
            <input
              type="url"
              required
              placeholder="Paste direct property photo link..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Amenities (Comma separated list)
            </label>
            <input
              type="text"
              placeholder="e.g. Wifi, AC, Gym, Swimming Pool, Parking"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-855 text-sm rounded-lg px-3 py-2.5 outline-none text-gray-800 dark:text-white focus:border-primary-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{submitting ? 'Submitting Property...' : 'Submit Property for Verification'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProperty
