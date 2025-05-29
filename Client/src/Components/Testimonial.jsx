"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [cardsToShow, setCardsToShow] = useState(3)
  const autoPlayRef = useRef(null)
  const intervalTime = 5000 // 5 seconds per slide

  // Sample testimonials if none provided
  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechVision",
      logo: "/placeholder.svg?height=60&width=120",
      content:
        "Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative solutions helped us increase our conversion rate by 45%!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthLabs",
      logo: "/placeholder.svg?height=60&width=120",
      content:
        "I've worked with many development teams before, but none have delivered the level of quality and professionalism I experienced here. They exceed expectations.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Founder",
      company: "Innovate AI",
      logo: "/placeholder.svg?height=60&width=120",
      content:
        "From concept to execution, the entire process was seamless. Their team took the time to understand our unique challenges and delivered beyond expectations.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "CTO",
      company: "FutureSoft",
      logo: "/placeholder.svg?height=60&width=120",
      content:
        "The technical expertise of this team is unmatched. They solved complex integration issues that our previous developers couldn't figure out for months.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Product Manager",
      company: "StartupHub",
      logo: "/placeholder.svg?height=60&width=120",
      content:
        "Outstanding work! They delivered our project on time and within budget. The communication throughout the process was excellent and professional.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "James Thompson",
      role: "Operations Director",
      company: "ScaleUp Inc",
      logo: "/placeholder.svg?height=60&width=120",
      content:
        "Their innovative approach to problem-solving and attention to detail made all the difference. We saw immediate improvements in our workflow efficiency.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const testimonialsToUse = testimonials || defaultTestimonials

  // Handle responsive cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonialsToUse.length - cardsToShow)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Handle auto-play
  useEffect(() => {
    if (isAutoPlaying && testimonialsToUse.length > cardsToShow) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, intervalTime)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentIndex, cardsToShow, maxIndex])

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const getVisibleTestimonials = () => {
    return testimonialsToUse.slice(currentIndex, currentIndex + cardsToShow)
  }

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-6 py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Testimonial Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleTestimonials().map((testimonial) => (
            <div key={testimonial.id} className="w-full">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Company Logo */}
                <div className="flex justify-center mb-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <img
                      src={testimonial.logo || "/placeholder.svg?height=40&width=80"}
                      alt={`${testimonial.company} logo`}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.7 25.4c-1.9 0-3.5-0.7-4.9-2-1.4-1.4-2-3-2-4.9s0.7-3.6 2-5c1.4-1.4 3-2.1 4.9-2.1 1.2 0 2.3 0.3 3.2 0.8 0-3.2-0.6-5.7-1.9-7.5-1.3-1.8-3.2-3.1-5.8-3.8l1.1-2.8c3.5 0.7 6.3 2.3 8.2 4.8s2.9 5.5 2.9 9.1v4.4c0 1.9-0.7 3.5-2 4.9-1.4 1.4-3 2-4.9 2zM25.1 25.4c-1.9 0-3.5-0.7-4.9-2-1.4-1.4-2-3-2-4.9s0.7-3.6 2-5c1.4-1.4 3-2.1 4.9-2.1 1.2 0 2.3 0.3 3.2 0.8 0-3.2-0.6-5.7-1.9-7.5-1.3-1.8-3.2-3.1-5.8-3.8l1.1-2.8c3.5 0.7 6.3 2.3 8.2 4.8s2.9 5.5 2.9 9.1v4.4c0 1.9-0.7 3.5-2 4.9-1.4 1.4-3 2-4.9 2z"></path>
                  </svg>
                </div>

                {/* Testimonial Content */}
                <div className="flex-grow text-center">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">{testimonial.content}</p>
                </div>

                {/* Author Info */}
                <div className="flex flex-col items-center mt-auto">
                  <img
                    src={testimonial.avatar || "/placeholder.svg?height=60&width=60"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mb-3"
                  />
                  <h4 className="text-gray-900 font-semibold text-lg mb-1">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs mt-1">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {testimonialsToUse.length > cardsToShow && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 rounded-full p-2 md:p-3 transition-all duration-200 z-10 shadow-md"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 rounded-full p-2 md:p-3 transition-all duration-200 z-10 shadow-md"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Indicator Dots */}
        {testimonialsToUse.length > cardsToShow && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-gray-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TestimonialSlider
