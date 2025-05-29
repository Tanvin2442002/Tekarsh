"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import OfficeCard from "../Components/OfficeCard"
import ContactForm from "../Components/CantactForm"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState({
    benefits: false,
    offices: false,
    map: false,
    form: false,
    cta: false,
  })

  const benefitsRef = useRef(null)
  const officesRef = useRef(null)
  const mapRef = useRef(null)
  const formRef = useRef(null)
  const ctaRef = useRef(null)

  // Office locations data
  const offices = [
    {
      id: 1,
      name: "Tekarsh Headquarters",
      address: "House# 259, Level - 2, Road# 19, Mohakhali Dohs, Dhaka 1206",
      phone: "+880 1234-567890",
      email: "info@tekarsh.com",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: [23.7795, 90.4068], // Dhaka coordinates
    },
    {
      id: 2,
      name: "Tekarsh Office 2",
      address: "House# 148, Level - 2, Road# 22, Mohakhali Dohs, Dhaka 1206",
      phone: "+880 1234-567891",
      email: "support@tekarsh.com",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: [23.7792, 90.4065], // Slightly offset for visibility
    },
    {
      id: 3,
      name: "Tekarsh Office 3",
      address: "House# 283, Level - 4, Road# 19C, Mohakhali Dohs, Dhaka 1206",
      phone: "+880 1234-567892",
      email: "careers@tekarsh.com",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: [23.7798, 90.4072], // Slightly offset for visibility
    },
  ]

  // Benefits data
  const benefits = [
    {
      title: "Expert Consultation",
      description: "Get personalized advice from our team of industry experts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Rapid Response",
      description: "We respond to all inquiries within 24 hours, guaranteed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Tailored Solutions",
      description: "Custom solutions designed specifically for your business needs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      ),
    },
    {
      title: "Ongoing Support",
      description: "Continuous assistance and support even after project completion",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ]

  // Intersection Observer to trigger animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === benefitsRef.current) {
            setIsVisible((prev) => ({ ...prev, benefits: true }))
          } else if (entry.target === officesRef.current) {
            setIsVisible((prev) => ({ ...prev, offices: true }))
          } else if (entry.target === mapRef.current) {
            setIsVisible((prev) => ({ ...prev, map: true }))
          } else if (entry.target === formRef.current) {
            setIsVisible((prev) => ({ ...prev, form: true }))
          } else if (entry.target === ctaRef.current) {
            setIsVisible((prev) => ({ ...prev, cta: true }))
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (benefitsRef.current) observer.observe(benefitsRef.current)
    if (officesRef.current) observer.observe(officesRef.current)
    if (mapRef.current) observer.observe(mapRef.current)
    if (formRef.current) observer.observe(formRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)

    return () => {
      if (benefitsRef.current) observer.unobserve(benefitsRef.current)
      if (officesRef.current) observer.unobserve(officesRef.current)
      if (mapRef.current) observer.unobserve(mapRef.current)
      if (formRef.current) observer.unobserve(formRef.current)
      if (ctaRef.current) observer.unobserve(ctaRef.current)
    }
  }, [])

  const scrollToContactForm = () => {
    document.getElementById("contact-form-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-50 to-white py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-green-300 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#519444] opacity-20 blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Let's Start a <span className="text-[#519444]">Conversation</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Have questions or ready to begin your next project? We're here to help you every step of the way.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContactForm}
              className="inline-block rounded-md bg-[#519444] px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-[#3e7233] cursor-pointer"
            >
              Get in Touch Today
            </motion.button>
          </motion.div>
        </div>

        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible.benefits ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative overflow-hidden rounded-lg"
            >
              <div className="relative h-full min-h-[400px] overflow-hidden rounded-lg">
                <img
                  src="Join.jpg"
                  alt="Tekarsh team collaboration"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="mb-2 text-2xl font-bold">Why Choose Tekarsh?</h3>
                  <p className="text-white/80">
                    We're committed to your success with innovative solutions and exceptional service.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right side - Benefits */}
            <div className="flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={isVisible.benefits ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-8 text-3xl font-bold text-gray-900"
              >
                Benefits of Reaching Out
              </motion.h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.benefits ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-[#519444]">
                      {benefit.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section ref={officesRef} className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.offices ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Offices in Dhaka</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Visit us at any of our offices in Mohakhali DOHS, Dhaka or reach out online. We're ready to serve you.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.offices ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <OfficeCard office={office} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.map ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Find Us on the Map</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Explore our office locations in Mohakhali DOHS, Dhaka and plan your visit. We're conveniently located and
              easy to find.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible.map ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-lg shadow-lg"
            style={{ height: "500px" }}
          >
            <MapContainer
              center={[23.7795, 90.4068]} // Dhaka coordinates
              zoom={16}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Add a satellite/aerial view layer for better building details */}
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              />
              {offices.map((office) => (
                <Marker key={office.id} position={office.coordinates}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{office.name}</h3>
                      <p className="text-sm">{office.address}</p>
                      <p className="mt-2 text-sm">
                        <a href={`tel:${office.phone}`} className="text-[#519444] hover:underline">
                          {office.phone}
                        </a>
                      </p>
                      <p className="text-sm">
                        <a href={`mailto:${office.email}`} className="text-[#519444] hover:underline">
                          {office.email}
                        </a>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </section>

      <section ref={formRef} id="contact-form-section" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible.form ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Get in Touch</h2>
              <p className="mb-8 text-lg text-gray-600">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer
                all your questions.
              </p>

              <div className="mb-8 space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-[#519444]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Phone</h3>
                    <a href="tel:+8801234567890" className="text-gray-600 hover:text-[#519444] hover:underline">
                      +880 1234-567890
                    </a>
                    <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-[#519444]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Email</h3>
                    <a href="mailto:info@tekarsh.com" className="text-gray-600 hover:text-[#519444] hover:underline">
                      info@tekarsh.com
                    </a>
                    <a
                      href="mailto:support@tekarsh.com"
                      className="block text-gray-600 hover:text-[#519444] hover:underline"
                    >
                      support@tekarsh.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-[#519444]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Headquarters</h3>
                    <p className="text-gray-600">House# 259, Level - 2, Road# 19</p>
                    <p className="text-gray-600">Mohakhali Dohs, Dhaka 1206</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/tekarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#519444] text-white transition-all hover:bg-[#3e7233]"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/tekarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#519444] text-white transition-all hover:bg-[#3e7233]"
                  aria-label="Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  // href="https://instagram.com/tekarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#519444] text-white transition-all hover:bg-[#3e7233]"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/tekarsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#519444] text-white transition-all hover:bg-[#3e7233]"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right side - Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible.form ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-lg bg-white p-6 shadow-lg sm:p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#519444] opacity-10"></div>
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-green-300 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl sm:p-10"
          >
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Transform Your Business?</h2>
              <p className="mb-8 text-lg text-gray-600">
                Schedule a consultation with our experts and discover how Tekarsh can help you achieve your goals.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContactForm}
                  className="w-full rounded-md bg-[#519444] px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-[#3e7233] sm:w-auto"
                >
                  Schedule a Consultation
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
