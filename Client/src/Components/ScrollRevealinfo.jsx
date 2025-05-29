"use client"

import { StickyScrollReveal } from "./StickyScrollReveal"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { Star, CheckCircle, Clock, Users } from 'lucide-react'

const ScrollRevealinfo = () => {
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  const content = [
    {
      title: "End-to-End Software Development",
      description:
        "Tekarsh is redefining digital transformation in Bangladesh with custom-built software solutions that empower businesses to scale, adapt, and lead. Our team of expert engineers, UX designers, and product managers work hand-in-hand with clients from ideation to launch. We specialize in building high-performance web and mobile applications, cloud-native solutions, and enterprise-grade platforms using modern technologies like Node.js, React, Python, and Kubernetes. Every solution is tailored to solve real business problems — with agility, security, and scalability built in by default.",
      metrics: [
        { icon: <CheckCircle className="w-5 h-5" />, label: "100% Project Success", value: "Delivered on time" },
        { icon: <Users className="w-5 h-5" />, label: "Expert Team", value: "15+ Developers" },
        { icon: <Star className="w-5 h-5" />, label: "Client Rating", value: "4.9/5 Stars" },
      ],
      content: (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#519444]/20 to-[#519444]/5 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
          <img
            src="/tek1.jpg"
            className="h-full w-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
            alt="Software Development"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
          
          {/* Floating Stats */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800">Live Development</span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-[#519444] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Active Projects: 12+
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h3 className="font-bold text-gray-800 text-lg mb-2">Custom Software Solutions</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#519444]">150+</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#519444]">99%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#519444]">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Quality Engineering & Assurance",
      description:
        "At Tekarsh, software quality isn't an afterthought — it's a foundation. Our dedicated QA engineers integrate seamlessly with development teams to run rigorous, continuous testing cycles. We employ modern CI/CD pipelines, automated test suites, and manual exploratory testing to ensure every line of code meets our high standards. From early-stage MVPs to enterprise platforms, we guarantee reliability, performance, and zero-compromise security. Every product we deliver is thoroughly tested for real-world performance under real-world conditions.",
      metrics: [
        { icon: <CheckCircle className="w-5 h-5" />, label: "Bug Detection", value: "99.9% Accuracy" },
        { icon: <Clock className="w-5 h-5" />, label: "Testing Speed", value: "50% Faster" },
        { icon: <Star className="w-5 h-5" />, label: "Quality Score", value: "A+ Grade" },
      ],
      content: (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
          <img 
            src="/tek1.jpg" 
            className="h-full w-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105" 
            alt="Quality Engineering" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
          
          {/* Quality Indicators */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              99.9% Uptime
            </div>
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Zero Critical Bugs
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">A+</div>
              <div className="text-xs text-gray-600">Quality Grade</div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Quality Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Test Coverage</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                      <div className="w-[95%] h-full bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                      <div className="w-[98%] h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Collaborative Client Partnerships",
      description:
        "We don't just build software — we build relationships. Tekarsh believes in transparent, long-term partnerships that drive mutual growth. Our process is deeply collaborative: clients are involved from the first design sprint to the final deployment and beyond. We offer continuous communication via dedicated project managers, regular progress updates, and direct access to the engineering team. Whether you're a startup with an idea or an enterprise scaling globally, you'll always feel heard, valued, and in control with Tekarsh by your side.",
      metrics: [
        { icon: <Users className="w-5 h-5" />, label: "Client Retention", value: "95% Rate" },
        { icon: <Star className="w-5 h-5" />, label: "Satisfaction", value: "4.9/5 Stars" },
        { icon: <Clock className="w-5 h-5" />, label: "Response Time", value: "< 2 Hours" },
      ],
      content: (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
          <img 
            src="/tek2.jpg" 
            className="h-full w-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105" 
            alt="Client Partnerships" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
          
          {/* Partnership Indicators */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-800">Live Collaboration</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">12 Active Projects</div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              95% Retention Rate
            </div>
            <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              4.9★ Rating
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Client Success</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-500">50+</div>
                  <div className="text-xs text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-pink-500">200+</div>
                  <div className="text-xs text-gray-600">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data Engineering & Analytics",
      description:
        "In today's digital world, data is power — and Tekarsh helps you harness it. We specialize in building efficient data pipelines, real-time dashboards, and analytics platforms that transform raw data into actionable insights. From predictive analytics for e-commerce to operational intelligence for logistics, our solutions help clients make faster, smarter decisions. We integrate cutting-edge tools like Apache Spark, Power BI, and cloud-native data warehouses to ensure seamless data flow, accurate reporting, and scalable intelligence — all designed with your business goals in mind.",
      metrics: [
        { icon: <CheckCircle className="w-5 h-5" />, label: "Data Accuracy", value: "99.8%" },
        { icon: <Clock className="w-5 h-5" />, label: "Processing Speed", value: "Real-time" },
        { icon: <Star className="w-5 h-5" />, label: "Insights Generated", value: "1000+" },
      ],
      content: (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
          <img 
            src="/tek3.jpg" 
            className="h-full w-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105" 
            alt="Data Engineering" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
          
          {/* Data Indicators */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Real-time Processing
            </div>
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              99.8% Accuracy
            </div>
          </div>
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-600">1TB+</div>
              <div className="text-xs text-gray-600">Data Processed</div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Analytics Dashboard</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-cyan-500">1000+</div>
                  <div className="text-xs text-gray-600">Insights</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-500">24/7</div>
                  <div className="text-xs text-gray-600">Monitoring</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-500">Real-time</div>
                  <div className="text-xs text-gray-600">Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full relative">
      {/* Enhanced Section Header */}
      <div className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            ref={headerRef}
            className="inline-flex items-center px-8 py-4 bg-[#519444]/10 border border-[#519444]/20 rounded-full backdrop-blur-sm mb-8 shadow-lg"
          >
            <div className="w-3 h-3 bg-[#519444] rounded-full mr-4 animate-pulse"></div>
            <span className="text-base uppercase tracking-wider font-bold text-[#519444]">
              Our Expertise
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-8 leading-tight">
            Your Partner in{" "}
            <span className="text-[#519444] relative">
              Digital Transformation
              <div className="absolute -bottom-3 left-0 right-0 h-2 bg-[#519444]/20 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover how we transform ideas into powerful digital solutions that drive growth, innovation, and lasting success for businesses worldwide.
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-[#519444] to-emerald-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">150+ successful projects delivered</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">15+ skilled professionals</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Top Rated</h3>
              <p className="text-sm text-gray-600">4.9/5 client satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      <StickyScrollReveal content={content} />
    </div>
  )
}

export default ScrollRevealinfo
