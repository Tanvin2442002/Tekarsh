"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, ShieldCheck, BarChart3, Package } from "lucide-react"

const ServiceCards = () => {
  const [activeService, setActiveService] = useState(null)

  // Function to scroll to detailed service section
  const scrollToServiceDetail = (serviceId) => {
    const serviceSection = document.getElementById(serviceId)
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    {
      id: "software-development",
      title: "Software Development",
      icon: <Code className="h-8 w-8 text-[#519444]" />,
      description:
        "Custom software solutions tailored to your business needs. From web applications to mobile apps, we deliver scalable and robust software that drives your business forward.",
      features: ["Custom Web Applications", "Mobile App Development", "API Integration", "Cloud Solutions"],
    },
    {
      id: "quality-assurance",
      title: "Quality Assurance",
      icon: <ShieldCheck className="h-8 w-8 text-[#519444]" />,
      description:
        "Comprehensive testing and quality assurance services to ensure your software performs flawlessly. We identify and eliminate issues before they impact your users.",
      features: ["Automated Testing", "Manual Testing", "Performance Testing", "Security Testing"],
    },
    {
      id: "business-process-outsourcing",
      title: "Business Process Outsourcing",
      icon: <BarChart3 className="h-8 w-8 text-[#519444]" />,
      description:
        "Streamline your operations and reduce costs with our BPO services. We handle your business processes so you can focus on growth and innovation.",
      features: ["Customer Support", "Data Processing", "Back Office Operations", "Process Optimization"],
    },
    {
      id: "product-services",
      title: "Product Services",
      icon: <Package className="h-8 w-8 text-[#519444]" />,
      description:
        "End-to-end product development services from ideation to launch. We help you build, refine, and scale your product to meet market demands.",
      features: ["Product Strategy", "UX/UI Design", "MVP Development", "Product Scaling"],
    },
  ]

  return (
    <section id="service-cards-section" className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Our <span className="text-[#519444]">Services</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
        >
          We deliver comprehensive technology solutions to help businesses thrive in the digital landscape
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              <motion.div
                className={`bg-white rounded-xl p-6 shadow-lg h-full border-2 transition-all duration-300 ${
                  activeService === service.id
                    ? "border-emerald-500 shadow-emerald-100"
                    : "border-transparent hover:border-emerald-200"
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-green-50">{service.icon}</div>
                  <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeService === service.id ? "auto" : 0,
                    opacity: activeService === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#519444] mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        scrollToServiceDetail(service.id)
                      }}
                      className="text-[#519444] font-medium hover:text-emerald-700 transition-colors flex items-center mx-auto"
                    >
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>

                {activeService !== service.id && (
                  <div className="mt-4 text-center">
                    <button className="text-[#519444] font-medium hover:text-emerald-700 transition-colors">
                      Click to expand
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards
