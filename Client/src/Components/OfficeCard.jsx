"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const OfficeCard = ({ office }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={office.image || "/placeholder.svg"}
          alt={office.name}
          className="h-full w-full object-cover transition-transform duration-700"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{office.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4 space-y-2">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-[#519444]"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600">{office.address}</span>
          </div>
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-[#519444]"
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
            <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-[#519444] hover:underline">
              {office.phone}
            </a>
          </div>
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-[#519444]"
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
            <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-[#519444] hover:underline">
              {office.email}
            </a>
          </div>
        </div>
        <motion.a
          href={`https://www.openstreetmap.org/directions?from=&to=${office.coordinates[0]}%2C${office.coordinates[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block w-full rounded-md bg-[#519444] px-4 py-2 text-center font-medium text-white transition-all hover:bg-[#3e7233]"
          onClick={(e) => {
            // Track click event if needed
            console.log(`Directions requested for: ${office.name}`)
          }}
        >
          Get Directions
        </motion.a>
      </div>
    </motion.div>
  )
}

export default OfficeCard
