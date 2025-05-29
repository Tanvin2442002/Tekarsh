"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const ServiceProcess = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      title: "Discovery",
      description: "We analyze your requirements and define the scope of your project.",
      icon: "🔍",
    },
    {
      title: "Planning",
      description: "We create a detailed roadmap and timeline for your project.",
      icon: "📝",
    },
    {
      title: "Development",
      description: "Our team builds your solution using the latest technologies.",
      icon: "💻",
    },
    {
      title: "Testing",
      description: "Rigorous quality assurance to ensure everything works perfectly.",
      icon: "✅",
    },
    {
      title: "Deployment",
      description: "We launch your solution and provide ongoing support.",
      icon: "🚀",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#519444]">Process</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a structured approach to deliver exceptional results for every project
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1  bg-[#519444] transform -translate-x-1/2 hidden md:block"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12 md:space-y-0 relative"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } mb-12`}
              >
                <div
                  className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} mb-6 md:mb-0`}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                <div className="md:w-0 relative flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="w-16 h-16 rounded-full bg-[#519444] flex items-center justify-center text-white text-2xl z-10 shadow-lg"
                  >
                    <span>{step.icon}</span>
                  </motion.div>
                </div>

                <div
                  className={`md:w-1/2 ${index % 2 === 0 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServiceProcess
