"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export const StickyScrollReveal = ({ content, contentClassName = "" }) => {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef(null)
  const [hasEnteredSection, setHasEnteredSection] = useState(false)

  const backgroundGradients = [
    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    "linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%)", 
    "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)",
    "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const scrollHeight = container.scrollHeight - containerHeight

      const scrollProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight))
      const cardIndex = Math.min(content.length - 1, Math.floor(scrollProgress * content.length))

      if (cardIndex !== activeCard) {
        setActiveCard(cardIndex)
        
        // Animate card transition
        gsap.fromTo(".content-card", 
          { scale: 0.95, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
        )
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)

      const syncScroll = () => {
        if (!container) return

        const containerRect = container.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const isInSection = containerRect.top <= 0 && containerRect.bottom >= viewportHeight

        if (isInSection) {
          if (!hasEnteredSection) {
            container.scrollTop = 0
            setHasEnteredSection(true)
            setActiveCard(0)
          } else {
            const containerHeight = containerRect.height
            const scrolledIntoSection = Math.abs(containerRect.top)
            const maxScroll = containerHeight - viewportHeight
            const progress = Math.max(0, Math.min(1, scrolledIntoSection / maxScroll))
            const targetScroll = progress * (container.scrollHeight - container.clientHeight)
            container.scrollTop = targetScroll
          }
        } else {
          if (hasEnteredSection) {
            setHasEnteredSection(false)
          }
        }
      }

      window.addEventListener("scroll", syncScroll)
      return () => {
        container.removeEventListener("scroll", handleScroll)
        window.removeEventListener("scroll", syncScroll)
      }
    }
  }, [content.length, hasEnteredSection, activeCard])

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-y-scroll scrollbar-hide"
      style={{
        background: backgroundGradients[activeCard % backgroundGradients.length],
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="flex flex-col lg:flex-row min-h-[400vh] relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#519444]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#519444]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="border border-[#519444]/20"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Left Column - Content */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-16 relative z-10">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="min-h-screen py-12 md:py-20 flex flex-col justify-center"
              data-section={index}
            >
              {/* Service Badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 transition-all duration-500 ${
                activeCard === index 
                  ? "bg-[#519444]/20 border border-[#519444]/30" 
                  : "bg-gray-100 border border-gray-200"
              }`}>
                <div className={`w-2 h-2 rounded-full mr-3 transition-colors duration-500 ${
                  activeCard === index ? "bg-[#519444] animate-pulse" : "bg-gray-400"
                }`}></div>
                <span className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-500 ${
                  activeCard === index ? "text-[#519444]" : "text-gray-500"
                }`}>
                  Service {index + 1}
                </span>
              </div>

              {/* Title */}
              <h2
                className={`text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight transition-all duration-500 ${
                  activeCard === index ? "opacity-100 transform translate-y-0" : "opacity-40 transform translate-y-4"
                }`}
              >
                {item.title}
              </h2>

              {/* Description */}
              <p
                className={`text-base md:text-lg text-slate-600 leading-relaxed transition-all duration-500 ${
                  activeCard === index ? "opacity-100 transform translate-y-0" : "opacity-30 transform translate-y-4"
                }`}
              >
                {item.description}
              </p>

              {/* Progress Indicator */}
              <div className="mt-8 flex space-x-2">
                {content.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeCard ? "w-12 bg-[#519444]" : "w-3 bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Sticky Image */}
        <div className="hidden lg:block w-1/2 relative">
          <div className="sticky top-20 p-6 md:p-10 lg:p-16 h-screen flex items-center">
            <div className="content-card w-full h-96 relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-3xl hover:scale-105">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#519444]/10 to-transparent"></div>
              
              {/* Content */}
              <div className={`w-full h-full transition-all duration-500 ${contentClassName}`}>
                {content[activeCard].content ?? null}
              </div>

              {/* Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Corner Accent */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/50 rounded-tl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/50 rounded-br-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
