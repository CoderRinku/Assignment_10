import { ShieldCheck, CreditCard, Headphones, Zap } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description: 'Every property on our platform is fully verified and inspected by our admin team to ensure authentic information.'
  },
  {
    icon: CreditCard,
    title: 'Secure Online Payments',
    description: 'Pay securely using Stripe. Your payment is held safely and only processed upon successful booking verification.'
  },
  {
    icon: Headphones,
    title: '24/7 Support & Care',
    description: 'Our customer success team is available round the clock to help resolve any booking queries or rental issues.'
  },
  {
    icon: Zap,
    title: 'Direct Fast Booking',
    description: 'Book properties instantly. Directly interact with owners, schedule check-ins, and manage rentals seamlessly.'
  }
]

function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Why Choose ResideEase
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We provide a seamless and highly secure rental experience for both tenants and property owners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-150 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 flex-shrink-0">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WhyChooseUs
