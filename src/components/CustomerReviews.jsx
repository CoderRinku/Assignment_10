import { Star } from 'lucide-react'

const mockReviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Tenant',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    comment: 'ResideEase made finding my apartment so simple. The direct verification of properties and seamless Stripe payment process gave me peace of mind throughout the stay.'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Tenant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    comment: 'The booking dashboard is incredibly intuitive. I booked a cozy cabin for my weekend getaway and everything from check-in details to the invoice was readily available.'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    comment: 'As a property owner, managing rental requests has never been easier. The platform allows me to approve requests and track earnings effortlessly via interactive charts.'
  },
  {
    id: 4,
    name: 'Marcus Brody',
    role: 'Tenant',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    comment: 'Excellent service! The search filters helped me find a place within my exact price range and location in just minutes. Highly recommend to anyone seeking rentals.'
  }
]

function CustomerReviews() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-16 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Read stories of how ResideEase has helped tenants find their sanctuary and owners manage their properties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {review.name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
