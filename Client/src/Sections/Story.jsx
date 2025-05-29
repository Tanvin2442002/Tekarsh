"use client"
import AnimatedTitle from "../Components/AnimatedTitle"
import { useRef } from "react"
import gsap from "gsap"
import { useNavigate } from "react-router-dom"

const Story = () => {
  const imgref = useRef(null)
  const navigate = useNavigate()

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const element = imgref.current

    if (!element) return

    const rect = element.getBoundingClientRect()
    const xPos = clientX - rect.left
    const yPos = clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((yPos - centerY) / centerY) * -10
    const rotateY = ((xPos - centerX) / centerX) * 10

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    })
  }

  const handleMouseLeave = () => {
    const element = imgref.current

    if (element) {
      gsap.to(element, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      })
    }
  }

  // Function to navigate to contact form section on the contact page
  const navigateToContactForm = () => {
    navigate("/contact#contact-form-section")

    // Add a small delay to ensure the navigation completes before scrolling
    setTimeout(() => {
      const contactFormSection = document.getElementById("contact-form-section")
      if (contactFormSection) {
        contactFormSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <section id="story" className="min-h-screen w-screen bg-white  text-black">
      <div className="flex size-full flex-col items-center justify-center py-10 pb-24">
        <p className="text-sm uppercase md:text-[10px]">From Idea to Reality</p>
        <div className="relative size-full">
          <AnimatedTitle
            title="Not Just What We Do—Why We Do It"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="relative md:h-[100dvh] h-[90vh] w-full" style={{ filter: "url('#flt_tag')" }}>
            <div
              className="relative left-0 top-0 w-full h-full overflow-hidden md:left-[20%] md:top-[-10%] md:w-4/5 md:h-4/5"
              style={{ clipPath: "polygon(4% 0, 83% 21%, 100% 73%, 0% 100%)" }}
            >
              <div
                className="absolute w-full md:h-[100dvh] h-[50dvh] opacity-100 left-10 top-16 md:left-0 md:top-10 lg:left-[-300px] lg:top-[-100px]"
                style={{
                  transform: "translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1)",
                }}
              >
                <img
                  ref={imgref}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/joinus.jpg"
                  alt="story"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 mr-0 md:mr-10 max-w-md text-right z-20">
            <p className="text-sm md:text-base leading-relaxed mb-4">
              Join us on a journey where innovation meets excellence. At Tekarsh, we don't just build software—we ensure
              quality through rigorous QA and empower businesses with trusted BPO services. Whether you're passionate
              about technology, precision, or support, there's a place for you here. Let's grow together and create
              lasting impact across industries.
            </p>
            <button
              onClick={navigateToContactForm}
              className="mt-2 bg-[#519444] px-5 py-2 text-white font-bold transition duration-300 hover:text-white hover:bg-black"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
