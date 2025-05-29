"use client"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const ServiceCTA = () => {
  const navigate = useNavigate()

  // Function to navigate to contact page
  const goToContactPage = () => {
    navigate("/contact")
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto bg-gradient-to-r bg-[#519444] rounded-2xl overflow-hidden shadow-xl">
        <div className="relative p-8 md:p-12">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Ready to transform your business?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-green-100 text-lg"
              >
                Let's discuss how our services can help you achieve your goals.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <button
                onClick={goToContactPage}
                className="bg-white text-[#519444] px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Schedule a Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceCTA
