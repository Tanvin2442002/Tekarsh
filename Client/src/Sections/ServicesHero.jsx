"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Simple utility function to replace the cn utility from Next.js
const cn = (...classes) => classes.filter(Boolean).join(" ")

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  const containerRef = useRef(null)
  const parentRef = useRef(null)

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
      className: "bg-green-500",
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
      className: "bg-emerald-500",
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 3,
      repeatDelay: 7,
      className: "h-6 bg-green-500",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
      className: "bg-teal-500",
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 7,
      repeatDelay: 2,
      className: "h-20 bg-emerald-500",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-9 bg-green-500",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 5,
      repeatDelay: 4,
      delay: 2,
      className: "h-6 bg-teal-500",
    },
  ]

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-96 md:h-[40rem] bg-white relative flex items-center w-full justify-center overflow-hidden",
        className,
      )}
    >
      {/* Ensure beams are rendered with proper z-index */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {beams.map((beam, index) => (
          <CollisionMechanism
            key={`beam-${index}-${beam.initialX}`}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
          />
        ))}
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-20">{children}</div>

      <div
        ref={containerRef}
        className="absolute bottom-0 bg-white w-full inset-x-0 pointer-events-none"
        style={{
          height: "0.5px", // Give the container a height
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  )
}

const CollisionMechanism = React.forwardRef(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef(null)
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  })
  const [beamKey, setBeamKey] = useState(0)
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false)

  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
        const beamRect = beamRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        const parentRect = parentRef.current.getBoundingClientRect()

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2
          const relativeY = beamRect.bottom - parentRect.top

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          })
          setCycleCollisionDetected(true)
        }
      }
    }

    const animationInterval = setInterval(checkCollision, 50)

    return () => clearInterval(animationInterval)
  }, [cycleCollisionDetected, containerRef])

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null })
        setCycleCollisionDetected(false)
      }, 2000)

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1)
      }, 2000)
    }
  }, [collision])

  // Determine beam color class based on beamOptions
  const beamColorClass = beamOptions.className?.includes("bg-") ? beamOptions.className : "bg-emerald-500"

  return (
    <>
      {/* Solid color beam instead of gradient for better visibility */}
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-0.5 rounded-full opacity-80",
          beamColorClass,
          beamOptions.className,
        )}
        style={{
          boxShadow: "0 0 8px 1px rgba(72, 187, 120, 0.3)",
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
})

CollisionMechanism.displayName = "CollisionMechanism"

const Explosion = (props) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }))

  return (
    <div {...props} className={cn("absolute z-55 h-2 w-2 backdrop-blur-sm", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-4 w-16 rounded-full bg-white/30 backdrop-blur-md"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.7) 0%, rgba(255, 255, 255, 0) 70%)",
          zIndex: 60,
        }}
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-green-500"
          style={{ zIndex: 65 }}
        />
      ))}
    </div>
  )
}
