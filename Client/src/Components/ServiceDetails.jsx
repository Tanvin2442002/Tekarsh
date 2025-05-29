"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const ServiceDetails = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Function to scroll to specific service section
  const scrollToServiceDetail = (serviceId) => {
    const serviceSection = document.getElementById(serviceId)
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    {
      id: "software-development",
      title: "Software Development",
      icon: "💻",
      color: "bg-[#519444]",
      description: `Our Software Development services deliver cutting-edge solutions tailored to your unique business challenges. We combine technical expertise with industry knowledge to create custom applications that drive efficiency and growth. Our development process begins with a thorough understanding of your requirements, followed by strategic planning and architecture design.

      We specialize in building scalable web applications, mobile solutions, enterprise software, and cloud-based systems using the latest technologies and frameworks. Our agile development approach ensures transparency, flexibility, and continuous delivery of value throughout the project lifecycle.

      Our developers are proficient in a wide range of programming languages and platforms, allowing us to select the optimal technology stack for your specific needs. We prioritize clean code, performance optimization, and security best practices to deliver robust, maintainable solutions that stand the test of time.

      Beyond development, we provide comprehensive documentation, knowledge transfer, and ongoing support to ensure your software continues to evolve with your business needs.`,
      image: "/SWD.jpg",
      features: [
        "Custom Web Applications",
        "Mobile App Development",
        "Enterprise Software Solutions",
        "API Development & Integration",
        "Cloud-Native Applications",
        "DevOps & CI/CD Implementation",
      ],
    },
    {
      id: "quality-assurance",
      title: "Quality Assurance",
      icon: "🛡️",
      color: "bg-[#519444]",
      description: `Our Quality Assurance services ensure your software meets the highest standards of reliability, performance, and security. We implement comprehensive testing strategies that identify issues early in the development cycle, reducing costs and preventing problems before they reach your users.

      Our QA approach combines automated and manual testing methodologies to achieve maximum coverage and efficiency. We develop custom test frameworks and scripts tailored to your specific application, enabling thorough validation of functionality, usability, compatibility, and security.

      Our testing process begins with detailed test planning and continues through execution, defect management, and reporting. We employ various testing techniques including functional testing, regression testing, performance testing, security testing, and user acceptance testing to ensure all aspects of your application are thoroughly validated.

      We don't just find bugs – we provide actionable insights and recommendations to improve your software quality. Our QA team works closely with developers to resolve issues quickly and implement quality gates that prevent similar problems in the future. With our QA services, you can release software with confidence, knowing it has been rigorously tested and validated.`,
      image: "/QA.jpg",
      features: [
        "Functional & Regression Testing",
        "Automated Testing Solutions",
        "Performance & Load Testing",
        "Security Testing",
        "Mobile & Cross-Browser Testing",
        "Test Strategy & Planning",
      ],
    },
    {
      id: "business-process-outsourcing",
      title: "Business Process Outsourcing",
      icon: "🔄",
      color: "bg-[#519444]",
      description: `Our Business Process Outsourcing (BPO) services help you optimize operations, reduce costs, and focus on your core business activities. We take on your time-consuming processes and execute them with efficiency and precision, allowing your team to concentrate on strategic initiatives and growth opportunities.

      We offer a wide range of BPO services including customer support, data processing, back-office operations, and administrative tasks. Our team becomes an extension of your organization, adhering to your standards and procedures while bringing best practices and continuous improvement methodologies.

      Our BPO approach begins with a thorough analysis of your current processes to identify opportunities for optimization and automation. We then design a customized solution that aligns with your business objectives and implement it with minimal disruption to your operations.

      We maintain transparent communication through regular reporting and performance metrics, ensuring you have complete visibility into our operations. Our flexible engagement models allow you to scale resources up or down based on your business needs, providing cost efficiency and operational agility. With our BPO services, you can achieve operational excellence while reducing overhead costs and improving service quality.`,
      image: "/BPO.jpg",
      features: [
        "Customer Support Services",
        "Data Processing & Management",
        "Back Office Operations",
        "Administrative Support",
        "Process Optimization",
        "Scalable Resource Models",
      ],
    },
    {
      id: "product-services",
      title: "Product Services",
      icon: "📦",
      color: "bg-[#519444]",
      description: `Our Product Services provide end-to-end support for your product development journey, from initial concept to market launch and beyond. We combine strategic thinking, design expertise, and technical capabilities to help you build successful products that resonate with users and achieve business objectives.

      Our product development approach is user-centered and data-driven, ensuring that every feature and function serves a clear purpose and delivers value. We begin with market research and user analysis to validate your product concept, then move through iterative design and development phases to bring your vision to life.

      We specialize in creating minimum viable products (MVPs) that allow you to test your ideas in the market quickly and cost-effectively. As your product gains traction, we help you scale and evolve based on user feedback and changing market conditions. Our product management expertise ensures that development efforts remain aligned with your business goals and user needs.

      Beyond development, we provide ongoing product support, feature enhancement, and performance optimization to maximize your product's lifecycle value. Our product analytics capabilities help you understand user behavior and make data-informed decisions about future development priorities. With our Product Services, you can bring innovative ideas to market faster and with greater confidence in their success.`,
      image: "/PS.jpg",
      features: [
        "Product Strategy & Roadmapping",
        "UX/UI Design",
        "MVP Development",
        "Product Analytics",
        "Feature Enhancement",
        "Product Scaling & Optimization",
      ],
    },
  ]

  return (
    <section ref={containerRef} id="service-details-section" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-[#519444]">Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our comprehensive services can transform your business and drive innovation
          </p>
        </motion.div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <ServiceDetailItem key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ServiceDetailItem = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-150px" })

  const isEven = index % 2 === 0

  return (
    <div ref={ref} id={service.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch gap-12`}
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-5/12 flex"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-full min-h-[500px]">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 mix-blend-multiply`}></div>
            <img
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              className="object-cover w-full h-full absolute inset-0"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
              <span className="text-7xl mb-6">{service.icon}</span>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-md">
                <h4 className="text-2xl font-bold mb-3 text-white text-center">Why Choose Our {service.title}?</h4>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-center">
                  <span className="inline-block border-b border-white/70 text-white/90 text-sm">And much more...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-7/12"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full">
            <div
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r ${service.color} text-white`}
            >
              {service.title}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Transforming Businesses Through {service.title}</h3>

            <div className="prose prose-emerald max-w-none mb-6">
              {service.description.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Key Capabilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="flex items-center"
                  >
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${service.color} mr-2`}></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <button
                onClick={() => document.getElementById(service.id).scrollIntoView({ behavior: "smooth" })}
                className={`bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                Learn More About {service.title}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ServiceDetails
