"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const ServiceStats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: 200, label: "Projects Completed", suffix: "+" },
    { value: 50, label: "Team Members", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
    { value: 12, label: "Years Experience", suffix: "+" },
  ]

  return (
    <section ref={ref} className="py-16 px-4 bg-gradient-to-r bg-[#519444] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <CountUp
                targetValue={stat.value}
                isInView={isInView}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl font-bold"
              />
              <p className="mt-2 text-green-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Simple CountUp component
const CountUp = ({ targetValue, isInView, suffix = "", className }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000 // 2 seconds
    const increment = targetValue / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= targetValue) {
        setCount(targetValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, targetValue])

  return (
    <div className={className}>
      {count}
      {suffix}
    </div>
  )
}

export default ServiceStats
