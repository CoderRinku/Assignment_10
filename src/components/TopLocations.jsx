const locations = [
  {
    id: 1,
    name: 'New York City',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80',
    count: '42 Active Listings'
  },
  {
    id: 2,
    name: 'Miami, Florida',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=400&q=80',
    count: '28 Active Listings'
  },
  {
    id: 3,
    name: 'San Francisco',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
    count: '31 Active Listings'
  },
  {
    id: 4,
    name: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=400&q=80',
    count: '37 Active Listings'
  }
]

function TopLocations() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-16 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Explore Top Locations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find premium rental properties in some of the most sought-after cities across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-550"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">{loc.name}</h3>
                <span className="text-xs text-gray-200 font-medium">{loc.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopLocations
