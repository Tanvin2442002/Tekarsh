import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef, useState } from "react"
import { AuroraBackground } from "../Components/AuroraBackground"

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const typewriterRef = useRef(null)
  const cursorRef = useRef(null)
  const buttonRef = useRef(null)
  const imageRef = useRef(null)
  const circleRef = useRef(null)
  const linesRef = useRef(null)

  // For Next.js, we'll use useRouter instead of useNavigate
  const navigateToContactForm = () => {
    // For Next.js, we would use router.push('/contact#contact-form-section')
    // But for this example, we'll use a simple scroll function
    const contactFormSection = document.getElementById("contact-form-section")
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Base phrase and rotating words
  const basePhrase = "WE DESIGN DIGITAL"
  const rotatingWords = ["EXPERIENCES", "SOLUTIONS", "PRODUCTS", "FUTURES", "INNOVATIONS"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBaseComplete, setIsBaseComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [letterElements, setLetterElements] = useState([])

  // Mouse tracking for subtle effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Subtle parallax effect based on mouse
  useEffect(() => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        x: mousePosition.x * 20,
        y: mousePosition.y * 20,
        duration: 1,
        ease: "power2.out",
      })
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: mousePosition.x * -15,
        y: mousePosition.y * -15,
        duration: 1.2,
        ease: "power2.out",
      })
    }

    // Subtle text movement
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: mousePosition.x * 5,
        y: mousePosition.y * 5,
        duration: 1.5,
        ease: "power2.out",
      })
    }
  }, [mousePosition])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Typewriter effect
  useEffect(() => {
    let timeout

    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseBeforeDelete = 3000
    const pauseBeforeNextWord = 400

    if (!isBaseComplete) {
      if (displayText.length < basePhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(basePhrase.slice(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        setIsBaseComplete(true)
        timeout = setTimeout(() => {
          setDisplayText(basePhrase + " ")
        }, pauseBeforeNextWord)
      }
    } else {
      const currentWord = rotatingWords[currentWordIndex]
      const fullText = basePhrase + " " + currentWord

      if (isDeleting) {
        if (displayText.length > basePhrase.length + 1) {
          timeout = setTimeout(() => {
            setDisplayText(fullText.slice(0, displayText.length - 1))
          }, deletingSpeed)
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length)
          timeout = setTimeout(() => {}, pauseBeforeNextWord)
        }
      } else {
        if (displayText.length < fullText.length) {
          timeout = setTimeout(() => {
            setDisplayText(fullText.slice(0, displayText.length + 1))
          }, typingSpeed)
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true)
          }, pauseBeforeDelete)
        }
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex, isBaseComplete, rotatingWords])

  // Handle letter animations after DOM update
  useEffect(() => {
    // Wait for the DOM to update with new letters
    const animateNewLetter = () => {
      const letters = document.querySelectorAll(".letter")
      if (letters.length > 0) {
        const lastLetter = letters[letters.length - 1]
        if (lastLetter) {
          gsap.fromTo(lastLetter, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
        }
      }
    }

    animateNewLetter()
  }, [displayText])

  // Initial animations
  useEffect(() => {
    // Cursor animation
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }

    // Circle animation
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none",
      })
    }

    // Lines animation
    const lineElements = document.querySelectorAll(".line-element")
    if (lineElements.length > 0) {
      gsap.fromTo(
        lineElements,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
        },
      )
    }

    // Image reveal
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(100% at 50% 50%)",
          duration: 1.8,
          delay: 0.5,
          ease: "power3.inOut",
        },
      )
    }

    // Button animation
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 2,
          ease: "power3.out",
        },
      )
    }
  }, [])

  // Subtitle animation
  useEffect(() => {
    const subtitleWords = document.querySelectorAll(".subtitle-word")
    if (subtitleWords.length > 0) {
      gsap.fromTo(
        subtitleWords,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          delay: 1.5,
          ease: "power3.out",
        },
      )
    }
  }, [])

  const lines = [
    "Crafting tomorrow's digital landscape where innovation meets imagination, one breakthrough at a time.",
  ]

  const renderTypewriterText = () => {
    const words = displayText.split(" ")
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block mr-2 last:mr-0">
        {word.split("").map((char, charIndex) => {
          const isRotatingWord = wordIndex > 2 // After "WE DESIGN DIGITAL"
          return (
            <span
              key={`${wordIndex}-${charIndex}`}
              className={`letter inline-block transition-all duration-300 ${
                isRotatingWord ? "text-[#519444]" : "text-black"
              }`}
            >
              {char}
            </span>
          )
        })}
      </span>
    ))
  }

  const renderSubtitleWords = () => {
    return lines[0].split(" ").map((word, index) => (
      <span key={index} className="subtitle-word inline-block mr-1 transition-all duration-300">
        {word}
      </span>
    ))
  }

  return (
    <AuroraBackground>
      <div className="relative min-h-screen w-screen overflow-hidden">
        {/* Navbar spacer - ensures no overlap with navbar */}
        <div className="h-16 md:h-20"></div>

        {/* Main hero container */}
        <div ref={containerRef} className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] w-full">
          {/* Decorative circle */}
          <div
            ref={circleRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] pointer-events-none"
          >
            <div className="w-full h-full rounded-full border border-[#519444]/10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-[#519444]/10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-[#519444]/10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full border border-[#519444]/10"></div>
          </div>

          {/* Decorative lines */}
          <div ref={linesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={`line-${i}`}
                className="line-element absolute h-px bg-gradient-to-r from-transparent via-[#519444]/20 to-transparent origin-left"
                style={{
                  top: `${10 + i * 8}%`,
                  left: 0,
                  width: "100%",
                  transformOrigin: "left",
                }}
              ></div>
            ))}
          </div>

          {/* Content container */}
          <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 md:py-8">
            {/* Left content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center z-10 lg:pr-8 mb-6 lg:mb-0">
              {/* Main heading with typewriter */}
              <div ref={textRef} className="mb-4 md:mb-6 text-center lg:text-left">
                <h1 className="special-font uppercase font-black text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black leading-tight max-w-full">
                  <span ref={typewriterRef} className="inline-block">
                    {renderTypewriterText()}
                  </span>
                  <span
                    ref={cursorRef}
                    className="inline-block w-[0.05em] h-[1.1em] bg-[#519444] ml-1 align-text-top"
                  ></span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="mb-6 md:mb-8 text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl text-center lg:text-left">
                {renderSubtitleWords()}
              </div>

              {/* CTA Button */}
              <button
                ref={buttonRef}
                onClick={navigateToContactForm}
                className="group relative overflow-hidden rounded-lg bg-[#519444] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-white font-semibold shadow-lg hover:bg-black hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base"
              >
                <span className="relative z-10">Start your journey</span>
              </button>
            </div>

            {/* Right content - Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                {/* Image with mask */}
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
                  <div ref={imageRef} className="w-full h-full">
                    <img
                      src="/landingimg.jpg"
                      alt="Hero Visual"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#519444]/20 to-transparent"></div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-16 md:h-16 bg-[#519444]/10 rounded-full blur-lg"></div>
                <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-12 h-12 md:w-24 md:h-24 bg-[#519444]/10 rounded-full blur-lg"></div>

                {/* Floating accent */}
                <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-12 h-12 md:w-24 md:h-24 rounded-full border-2 border-[#519444]/20"></div>
                <div className="absolute top-1/2 -left-2 md:-left-3 transform -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#519444] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-[#519444]/30 rounded-full flex justify-center">
              <div className="w-1 h-2 md:w-1.5 md:h-3 bg-[#519444] rounded-full mt-1 md:mt-2 animate-bounce"></div>
            </div>
            <p className="mt-2 text-[#519444]/70 text-xs md:text-sm">Scroll to explore</p>
          </div>
        </div>
      </div>
    </AuroraBackground>
  )
}

export default Hero
