"use client"

import { useEffect, useState, useRef } from "react"
import { useWindowScroll } from "react-use"
import gsap from "gsap"

const Navbar = () => {
  const navbarref = useRef(null)
  const mobileMenuRef = useRef(null)

  const items = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/career" },
  ]

  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { y: currentScrollY } = useWindowScroll()

  useEffect(() => {
    const handleScroll = () => {
      if (currentScrollY === 0) {
        setIsVisible(true)
        setIsScrolled(false)
        navbarref.current?.classList.remove(
          "backdrop-blur-md",
          "bg-white/30",
          "border",
          "border-white/20",
          "shadow-md",
          "rounded-lg"
        )
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
        setIsScrolled(true)
        setIsMobileMenuOpen(false)
        navbarref.current?.classList.add(
          "backdrop-blur-md",
          "bg-white/30",
          "border",
          "border-white/20",
          "shadow-md",
          "rounded-lg"
        )
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
        setIsScrolled(true)
        navbarref.current?.classList.add(
          "backdrop-blur-md",
          "bg-white/30",
          "border",
          "border-white/20",
          "shadow-md",
          "rounded-lg"
        )
      }
      setLastScrollY(currentScrollY)
    }

    handleScroll()
    // only run on scroll updates
  }, [currentScrollY]) // ✅ removed lastScrollY from dependency array

  useEffect(() => {
    gsap.to(navbarref.current, {
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isVisible])

  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: isMobileMenuOpen ? "auto" : 0,
        opacity: isMobileMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isMobileMenuOpen])

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false)
    window.location.href = path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <div
        ref={navbarref}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <img
                src="https://tekarsh.com/wp-content/uploads/2022/07/site-logo-2.png"
                className="w-28 cursor-pointer"
                onClick={() => handleNavigation("/")}
                alt="Tekarsh Logo"
              />
            </div>

            <div className="flex h-full items-center">
              {/* Desktop Menu */}
              <div className="hidden md:block">
                {items.map((item, index) => (
                  <a
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className="relative ms-10 text-[15px] font-bold uppercase text-black
                    after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 
                    after:bg-black hover:after:bg-black 
                    after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                    hover:after:origin-bottom-left hover:after:scale-x-100 cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-x-0 top-20 z-40 md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="mx-4 sm:mx-6 bg-white/90 backdrop-blur-md border border-white/20 shadow-lg rounded-lg">
          <div className="py-4">
            {items.map((item, index) => (
              <a
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="block px-6 py-3 text-base font-bold uppercase text-black hover:bg-black/5 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar
