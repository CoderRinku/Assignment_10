import Banner from '../components/Banner'
import WhyChooseUs from '../components/WhyChooseUs'
import FeaturedProperties from '../components/FeaturedProperties'
import TopLocations from '../components/TopLocations'
import CustomerReviews from '../components/CustomerReviews'
import TrustedOwners from '../components/TrustedOwners'

function Home() {
  return (
    <div className="w-full pb-16">
      <Banner />
      <WhyChooseUs />
      <FeaturedProperties />
      <TopLocations />
      <CustomerReviews />
      <TrustedOwners />
    </div>
  )
}

export default Home
