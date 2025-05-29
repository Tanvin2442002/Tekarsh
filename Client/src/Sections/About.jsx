"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import AnimatedTitle from "../Components/AnimatedTitle";
import ScrollRevealinfo from "../Components/ScrollRevealinfo";
import { Users, Globe, Target, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Make sure GSAP plugins are registered outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

const About = () => {
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const techRef = useRef(null);
  const [draggedCount, setDraggedCount] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);

  // Technology data with proper representations
  const frontendTechnologies = [
    {
      name: "React",
      icon: "⚛️",
      color: "#61DAFB",
      category: "Frontend",
      description: "A JavaScript library for building user interfaces",
      experience: "5+ years",
    },
    {
      name: "Vue.js",
      icon: "🟢",
      color: "#4FC08D",
      category: "Frontend",
      description: "Progressive JavaScript framework",
      experience: "3+ years",
    },
    {
      name: "Angular",
      icon: "🅰️",
      color: "#DD0031",
      category: "Frontend",
      description: "Platform for building mobile and desktop web applications",
      experience: "4+ years",
    },
    {
      name: "Next.js",
      icon: "▲",
      color: "#000000",
      category: "Frontend",
      description: "React framework for production",
      experience: "3+ years",
    },
    {
      name: "Svelte",
      icon: "🔥",
      color: "#FF3E00",
      category: "Frontend",
      description: "Cybernetically enhanced web apps",
      experience: "2+ years",
    },
    {
      name: "TypeScript",
      icon: "TS",
      color: "#3178C6",
      category: "Frontend",
      description: "Typed superset of JavaScript",
      experience: "4+ years",
    },
    {
      name: "JavaScript",
      icon: "JS",
      color: "#F7DF1E",
      category: "Frontend",
      description: "High-level programming language",
      experience: "6+ years",
    },
    {
      name: "HTML5",
      icon: "🌐",
      color: "#E34F26",
      category: "Frontend",
      description: "Markup language for web pages",
      experience: "8+ years",
    },
    {
      name: "CSS3",
      icon: "🎨",
      color: "#1572B6",
      category: "Frontend",
      description: "Style sheet language",
      experience: "8+ years",
    },
    {
      name: "Sass",
      icon: "💅",
      color: "#CC6699",
      category: "Frontend",
      description: "CSS preprocessor",
      experience: "5+ years",
    },
    {
      name: "Tailwind",
      icon: "🌊",
      color: "#06B6D4",
      category: "Frontend",
      description: "Utility-first CSS framework",
      experience: "3+ years",
    },
  ];

  const backendTechnologies = [
    {
      name: "Node.js",
      icon: "🟢",
      color: "#68A063",
      category: "Backend",
      description: "JavaScript runtime built on Chrome's V8",
      experience: "5+ years",
    },
    {
      name: "Python",
      icon: "🐍",
      color: "#3776AB",
      category: "Backend",
      description: "High-level programming language",
      experience: "6+ years",
    },
    {
      name: "Java",
      icon: "☕",
      color: "#ED8B00",
      category: "Backend",
      description: "Object-oriented programming language",
      experience: "4+ years",
    },
    {
      name: "C#",
      icon: "C#",
      color: "#239120",
      category: "Backend",
      description: "Microsoft's programming language",
      experience: "3+ years",
    },
    {
      name: "PHP",
      icon: "🐘",
      color: "#777BB4",
      category: "Backend",
      description: "Server-side scripting language",
      experience: "4+ years",
    },
    {
      name: "Ruby",
      icon: "💎",
      color: "#CC342D",
      category: "Backend",
      description: "Dynamic programming language",
      experience: "2+ years",
    },
    {
      name: "Go",
      icon: "🐹",
      color: "#00ADD8",
      category: "Backend",
      description: "Open source programming language",
      experience: "2+ years",
    },
    {
      name: "Rust",
      icon: "🦀",
      color: "#000000",
      category: "Backend",
      description: "Systems programming language",
      experience: "1+ years",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fix stat counter animation
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      const targetValue = Number.parseInt(stat.getAttribute("data-value"));

      gsap.fromTo(
        stat,
        { textContent: 0 },
        {
          textContent: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Seamless infinite scroll setup
    const setupInfiniteScroll = (selector, direction = 1, duration = 20) => {
      const container = document.querySelector(selector);
      if (!container) return;

      const items = container.children;
      if (items.length === 0) return;

      // Calculate total width of one set of items
      const itemWidth = 104; // 80px + 24px gap
      const totalWidth = itemWidth * (items.length / 2); // Divide by 2 because we have duplicates

      // Set initial position
      gsap.set(container, { x: direction === 1 ? 0 : -totalWidth });

      // Create the infinite animation
      const tl = gsap.timeline({ repeat: -1 });

      if (direction === 1) {
        // Move from 0 to -totalWidth
        tl.to(container, {
          x: -totalWidth,
          duration: duration,
          ease: "none",
        });
        // Reset to 0 instantly
        tl.set(container, { x: 0 });
      } else {
        // Move from -totalWidth to 0
        tl.to(container, {
          x: 0,
          duration: duration,
          ease: "none",
        });
        // Reset to -totalWidth instantly
        tl.set(container, { x: -totalWidth });
      }

      return tl;
    };

    // Setup infinite scroll for both rows
    const frontendAnimation = setupInfiniteScroll(".frontend-scroll", 1, 25);
    const backendAnimation = setupInfiniteScroll(".backend-scroll", -1, 30);

    // Make tech icons draggable
    const draggables = Draggable.create(".tech-item", {
      type: "x,y",
      bounds: techRef.current,
      inertia: true,
      edgeResistance: 0.65,
      throwResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
      zIndexBoost: true,
      onDragStart: function () {
        gsap.to(this.target, {
          scale: 1.2,
          duration: 0.2,
          ease: "power1.out",
          zIndex: 1000,
        });
        setDraggedCount((prev) => prev + 1);
      },
      onDragEnd: function () {
        gsap.to(this.target, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      },
    });

    // Feature cards animation
    gsap.fromTo(
      ".feature-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Title entrance animation
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      if (draggables) {
        draggables.forEach((d) => d.kill());
      }
      if (frontendAnimation) frontendAnimation.kill();
      if (backendAnimation) backendAnimation.kill();
    };
  }, []);

  const stats = [
    { number: 150, label: "Projects Completed", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 99, label: "Success Rate", suffix: "%" },
    { number: 24, label: "Support Hours", suffix: "/7" },
  ];

  const navigate = useNavigate(); 

  const navigateToContactForm = () => {
    navigate("/contact#contact-form-section");
  };

  const features = [
    {
      icon: <div className="text-2xl">💻</div>,
      title: "Modern Technology Stack",
      description: "Cutting-edge tools and frameworks for scalable solutions",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Team",
      description: "Skilled developers, designers, and project managers",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <div className="text-2xl">⚡</div>,
      title: "Lightning Fast",
      description: "Optimized performance and rapid development cycles",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Serving clients worldwide with 24/7 support",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Oriented",
      description: "Focused on delivering results that matter to your business",
      color: "from-red-500 to-pink-500",
    },
  ];

  // Render tech item component
  const TechItem = ({ tech, index, prefix }) => (
    <div
      key={`${prefix}-${index}`}
      className="tech-item flex-shrink-0 group cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setHoveredTech(tech)}
      onMouseLeave={() => setHoveredTech(null)}
    >
      <div
        className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl border-2 backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40)`,
          borderColor: `${tech.color}60`,
        }}
      >
        <div className="text-2xl mb-1">{tech.icon}</div>
        <div className="text-xs font-bold text-gray-700">{tech.name}</div>

        {/* Glow Effect */}
        <div
          className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
          style={{ backgroundColor: tech.color }}
        ></div>
      </div>
    </div>
  );

  return (
    <div id="about" className="relative w-screen bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#519444]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-[#519444]/15 to-transparent rounded-full blur-3xl animate-pulse"></div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#519444]/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div ref={containerRef} className="relative z-10">
        {/* Header Section */}
        <div className="relative py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Badge */}
            <div className="flex justify-center mb-8">
              <div
                ref={subtitleRef}
                className="inline-flex items-center px-6 py-3 bg-[#519444]/10 border border-[#519444]/20 rounded-full backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-[#519444] rounded-full mr-3 animate-pulse"></div>
                <h2 className="text-sm uppercase tracking-wider font-semibold text-[#519444] md:text-base">
                  Welcome to Tekarsh
                </h2>
              </div>
            </div>

            {/* Main Title */}
            <div ref={titleRef} className="text-center max-w-6xl mx-auto mb-8">
              <AnimatedTitle
                title="Where Innovation Meets Imagination"
                containerClass="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase leading-tight text-black tracking-tight"
              />
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className="text-center max-w-4xl mx-auto space-y-6 mb-16"
            >
              <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed">
                Fueling creativity through code, design, and innovation, where
                your vision meets intelligent engineering.
              </p>
              <p className="text-lg md:text-xl text-[#519444] font-medium opacity-90">
                Turning ideas into reality, one breakthrough at a time.
              </p>
            </div>

            {/* Stats Section - FIXED */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm border border-[#519444]/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl md:text-4xl font-black text-[#519444] mb-2">
                      <span className="stat-number" data-value={stat.number}>
                        0
                      </span>
                      <span>{stat.suffix}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div
              ref={featuresRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
            >
              {features.map((feature, index) => (
                <div key={index} className="feature-card group">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#519444]/30">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technology Stack - 2 Rows Infinite Scroll */}
            <div ref={techRef} className="mb-20 relative overflow-hidden">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Our <span className="text-[#519444]">Technology Stack</span>
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                  Drag any technology to explore! Our expertise spans across
                  modern frontend and backend technologies.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    💡 Hover for details
                  </span>
                </div>
              </div>

              {/* Frontend Row */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
                  Frontend Technologies
                </h4>
                <div className="relative overflow-hidden">
                  <div className="frontend-scroll flex gap-6 will-change-transform">
                    {/* First set */}
                    {frontendTechnologies.map((tech, index) => (
                      <TechItem
                        key={`frontend-1-${index}`}
                        tech={tech}
                        index={index}
                        prefix="frontend-1"
                      />
                    ))}
                    {/* Second set for seamless loop */}
                    {frontendTechnologies.map((tech, index) => (
                      <TechItem
                        key={`frontend-2-${index}`}
                        tech={tech}
                        index={index}
                        prefix="frontend-2"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Backend Row */}
              <div>
                <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
                  Backend Technologies
                </h4>
                <div className="relative overflow-hidden">
                  <div className="backend-scroll flex gap-6 will-change-transform">
                    {/* First set */}
                    {backendTechnologies.map((tech, index) => (
                      <TechItem
                        key={`backend-1-${index}`}
                        tech={tech}
                        index={index}
                        prefix="backend-1"
                      />
                    ))}
                    {/* Second set for seamless loop */}
                    {backendTechnologies.map((tech, index) => (
                      <TechItem
                        key={`backend-2-${index}`}
                        tech={tech}
                        index={index}
                        prefix="backend-2"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Tooltip */}
              {hoveredTech && (
                <div
                  className="fixed z-50 pointer-events-none transition-all duration-200"
                  style={{
                    left: "50%",
                    top: "20%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-2xl max-w-sm border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 text-2xl"
                        style={{ backgroundColor: hoveredTech.color }}
                      >
                        {hoveredTech.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {hoveredTech.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {hoveredTech.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {hoveredTech.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                        Experience: {hoveredTech.experience}
                      </span>
                      <span className="text-xs text-gray-400">
                        🖱️ Drag me around!
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="text-center mb-16">
              <div className="bg-gradient-to-r from-[#519444]/10 to-transparent rounded-3xl p-8 md:p-12 border border-[#519444]/20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Ready to Transform Your Ideas?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Let's collaborate to bring your vision to life with innovative
                  solutions that drive growth and success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={navigateToContactForm}
                    className="px-8 py-4 bg-[#519444] text-white font-semibold rounded-xl hover:bg-black transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Start Your Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Reveal Section */}
        <ScrollRevealinfo />
      </div>
    </div>
  );
};

export default About;
