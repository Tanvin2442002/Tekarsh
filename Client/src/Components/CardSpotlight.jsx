
import { useState } from "react"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"
import { CanvasRevealEffect } from "./CanvasRevealEffect"
import "./CardSpotlight.css"

export const CardSpotlight = ({
  children,
  radius = 350, 
  color = "#000000", 
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div
      className={`group/spotlight py-5 rounded-md relative  bg-[#2d6421] ${className || ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-70" 
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 70%
            )
          `, 
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [34, 197, 94], // Light green (green-500)
              [21, 128, 61], // Dark green (green-700)
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      {children}
    </div>
  )
}
