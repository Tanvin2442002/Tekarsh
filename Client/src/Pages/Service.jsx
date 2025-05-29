import ServicesHero from "../Sections/Services-Hero"
import ServiceCards from "../Components/ServiceCards"
import ServiceDetails from "../Components/ServiceDetails"
import ServiceProcess from "../Components/ServiceProcess"
import ServiceStats from "../Components/ServiceStats"
import ServiceCTA from "../Components/ServiceCTA"

const Service = () => {
  return (
    <div className="bg-white py-10">
      <ServicesHero />
      <ServiceCards />
      <ServiceDetails />
      <ServiceProcess />
      <ServiceStats />
      <ServiceCTA />
    </div>
  )
}

export default Service
