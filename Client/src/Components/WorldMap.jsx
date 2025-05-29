import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "../Utils/ThemeContext";
import { useState } from "react";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import { tr } from "motion/react-client";

gsap.registerPlugin(ScrollTrigger);

export function WorldMap({ dots = [], lineColor = "#228B22" }) {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const { theme } = useTheme();

  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Fallback example dots for debugging if dots prop is empty or undefined
  const exampleDots = [
    {
      start: { lat: 60.1695, lng: 24.9354 },
      end: { lat: -33.9249, lng: 18.4241 },
    }, // Helsinki → Cape Town (Europe → Africa)
    {
      start: { lat: 64.2008, lng: -149.4937 },
      end: { lat: -36.8485, lng: 174.7633 },
    }, // Alaska → Auckland (North America → Oceania)
    {
      start: { lat: 19.4333, lng: -99.1333 },
      end: { lat: 35.6895, lng: 139.6917 },
    }, // Mexico City → Tokyo (North America → Asia East)
    {
      start: { lat: 55.7558, lng: 37.6173 },
      end: { lat: -15.7942, lng: -47.8822 },
    }, // Moscow → Brasília (Europe → South America)
    {
      start: { lat: 37.7749, lng: -122.4194 },
      end: { lat: 59.3293, lng: 18.0686 },
    }, // San Francisco → Stockholm (North America → Northern Europe)
    {
      start: { lat: 1.3521, lng: 103.8198 },
      end: { lat: -22.9068, lng: -43.1729 },
    }, // Singapore → Rio de Janeiro (Asia → South America)
    {
      start: { lat: 30.0444, lng: 31.2357 },
      end: { lat: 50.1109, lng: 8.6821 },
    }, // Cairo → Frankfurt (Africa → Europe)
    {
      start: { lat: -41.2865, lng: 174.7762 },
      end: { lat: 25.276987, lng: 55.296249 },
    }, // Wellington → Dubai (Oceania → Middle East)
    {
      start: { lat: 48.8566, lng: 2.3522 },
      end: { lat: 35.6762, lng: 139.6503 },
    }, // Paris → Tokyo (Europe → Asia East)
    {
      start: { lat: 40.7128, lng: -74.006 },
      end: { lat: 19.4326, lng: -99.1332 },
    }, // New York → Mexico City (North America East → North America South)
  ];

  // Use passed dots if available, else use exampleDots
  const dotsToRender = dots.length > 0 ? dots : exampleDots;

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };
  const AnimatedPulseDot = ({ cx, cy }) => (
    <motion.circle
      cx={cx}
      cy={cy}
      fill={lineColor}
      initial={{ r: 2, opacity: 0.5 }}
      animate={{
        r: [2, 8, 2], // animate radius up and back
        opacity: [0.5, 0, 0.5], // animate opacity fade and restore
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut",
      }}
    />
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top+=100 bottom",
        onEnter: () => setShouldAnimate(true),
        once: true,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      <h1 className="justify-items-center  font-bold text-center text-[#519444]  md:text-[4rem]">
        {" "}
        Our Partners - All Across The Globe
      </h1>
      <div
        className="w-full aspect-[2/1] dark:bg-black bg-white relative font-sans"
        ref={wrapperRef}
      >
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
          alt="world map"
          height="495"
          width="1056"
          draggable={false}
        />

        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="w-full h-full absolute inset-0 pointer-events-none select-none will-change-transform"
        >
          <defs>
            <linearGradient
              id="path-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {dotsToRender.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);

            return (
              <g key={`line-${i}`}>
                <motion.path
                  d={createCurvedPath(startPoint, endPoint)}
                  fill="none"
                  stroke="url(#path-gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={
                    shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }
                  }
                  transition={{
                    duration: 1,
                    delay: 0.5 * i,
                    ease: "easeOut",
                  }}
                />
              </g>
            );
          })}

          {dotsToRender.map((dot, i) => {
            const start = projectPoint(dot.start.lat, dot.start.lng);
            const end = projectPoint(dot.end.lat, dot.end.lng);

            return (
              <g key={`points-${i}`}>
                {/* Start dot */}
                <circle cx={start.x} cy={start.y} r="2" fill={lineColor} />
                <AnimatedPulseDot cx={start.x} cy={start.y} />

                {/* End dot */}
                <circle cx={end.x} cy={end.y} r="2" fill={lineColor} />
                <AnimatedPulseDot cx={end.x} cy={end.y} />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
