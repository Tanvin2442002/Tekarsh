"use client"

import { BackgroundBeamsWithCollision } from "./ServicesHero"

export default function BackgroundBeamsWithCollisionDemo() {
  // Function to scroll to the service cards section
  const scrollToServiceCards = () => {
    const serviceCardsSection = document.getElementById("service-cards-section")
    if (serviceCardsSection) {
      serviceCardsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-font-sans tracking-tight">
        Transforming Ideas Into{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] px-10">
          {/* <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-emerald-500 via-green-500 to-teal-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Digital Excellence</span>
          </div> */}
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-[#519444] py-4">
            <span className="">Digital Excellence</span>
          </div>
        </div>
        <div className="text-xl md:text-2xl mt-4 font-normal max-w-3xl mx-auto">
          Comprehensive solutions in Software Development, Quality Assurance, Business Process Outsourcing, and Product
          Services
        </div>
        <div className="mt-8">
          <button
            onClick={scrollToServiceCards}
            className="text-lg md:text-xl bg-[#519444] px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium tracking-wide hover:scale-105 transform"
          >
            Explore Our Services
          </button>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  )
}
