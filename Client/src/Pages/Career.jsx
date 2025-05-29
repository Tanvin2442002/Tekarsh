import Grid from "../Components/Grid"
import CareersSection from "../Components/CareersSection"
import FAQSection from "../Components/FAQ"

function CareerPage() {
  return (
    <div className="flex flex-col min-h-screen mt-20 ">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-auto md:h-[500px] bg-white px-10">
          <div className="relative inset-0 z-40 flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 gap-8 pt-24 md:pt-0">
            {/* Text Content */}
            <div className="md:w-1/2 z-20">
              <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Grow Your Career with Tekarsh
              </h1>
              <p className="text-black text-lg md:text-xl mb-6 max-w-xl">
                We're building more than Products — we're building futures
              </p>
              <button className="bg-[#519444] hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium">
                View Open Positions
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center md:justify-end items-center">
              <img
                src="/landingimg.jpg"
                alt="People working together"
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* What Makes Tekarsh Different */}
        <section className="py-16 container mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-12 px-10">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What Makes Tekarsh Different</h2>
              <p className="text-gray-700 mb-4">
                Join a team where innovation meets impact. We offer more than just a job — we offer an opportunity to
                shape the future of technology while growing personally and professionally.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <BenefitItem title="Flexible Work" description="Balance work and personal life" />
              <BenefitItem title="Remote First" description="Work from anywhere in the world" />
              <BenefitItem title="Great Culture" description="Collaborative and supportive environment" />
              <BenefitItem title="Real Impact" description="Your work matters from day one" />
              <BenefitItem title="Innovation" description="Push boundaries with cutting-edge tech" />
              <BenefitItem title="Benefits" description="Comprehensive benefits package" />
            </div>
          </div>
        </section>

        {/* Life at Tekarsh */}
        <section className="bg-gray-50">
          <Grid/>
        </section>
        {/* Current Openings */}
        <section className="py-16 container mx-auto px-4">
          <CareersSection />
        </section>

        {/* FAQ Section (replacing the CTA banner) */}
        <FAQSection />

        {/* Hiring Process */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Hiring Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ProcessStep number="01" title="Apply" description="Submit your application and resume" />
            <ProcessStep number="02" title="Interview" description="Meet the team and discuss your experience" />
            <ProcessStep number="03" title="Challenge" description="Show us your skills with a practical exercise" />
            <ProcessStep number="04" title="Offer" description="Join our team and start your journey" />
          </div>
        </section>
      </main>
    </div>
  )
}

function BenefitItem({ title, description }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-green-100 p-2 rounded-full text-[#519444]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-12 w-12 bg-[#519444] rounded-full flex items-center justify-center text-white font-bold mb-4">
        {number}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default CareerPage
