import './aurora-effects.css'

// Simple utility for class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }) => {
  return (
    <main>
      <div className={classNames("aurora-background", className)} {...props}>
        <div className="aurora-container">
          {/* First aurora layer - base effect */}
          <div
            className={classNames("aurora-layer-1 animate-aurora", showRadialGradient && "aurora-radial-mask")}
          ></div>

          {/* Second aurora layer - adds depth and intensity */}
          <div className="aurora-layer-2 animate-aurora-slow"></div>
        </div>
        {children}
      </div>
    </main>
  )
}
