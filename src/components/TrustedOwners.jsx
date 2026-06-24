import { CheckCircle2 } from 'lucide-react'

const owners = [
  {
    id: 1,
    name: 'Robert Vance',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80',
    properties: '12 Properties Listed',
    rating: '4.9/5 Agent Score'
  },
  {
    id: 2,
    name: 'Melissa Thorne',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    properties: '9 Properties Listed',
    rating: '4.8/5 Agent Score'
  },
  {
    id: 3,
    name: 'Jonathan Miller',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80',
    properties: '15 Properties Listed',
    rating: '5.0/5 Agent Score'
  },
  {
    id: 4,
    name: 'Clara Oswald',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    properties: '7 Properties Listed',
    rating: '4.7/5 Agent Score'
  }
]

function TrustedOwners() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Meet Our Trusted Owners
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We partner with certified owners and agents who maintain high standards of hospitality and property quality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {owners.map((owner) => (
          <div
            key={owner.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center"
          >
            <div className="relative mb-5">
              <img
                src={owner.image}
                alt={owner.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900/50"
              />
              <div className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-1 border-2 border-white dark:border-gray-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {owner.name}
            </h3>

            <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {owner.rating}
            </div>

            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {owner.properties}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustedOwners
