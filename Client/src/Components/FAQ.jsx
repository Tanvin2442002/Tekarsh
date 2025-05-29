"use client"

import { useState, useRef, useEffect } from "react"

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [animatedText, setAnimatedText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef(null)

  const faqs = [
    {
      question: "What is the hiring process like at Tekarsh?",
      answer:
        "Our hiring process typically consists of 4 stages: an initial application review, a screening call with HR, a technical or role-specific interview, and a final interview with the team you'll be working with. We aim to make decisions within 2 weeks of your final interview.",
    },
    {
      question: "Do you offer remote work opportunities?",
      answer:
        "Yes! We're a remote-first company with team members across the globe. While some roles may require occasional in-office presence, most positions offer flexible remote work options. We provide the tools and support needed to succeed from anywhere.",
    },
    {
      question: "What benefits do you offer to employees?",
      answer:
        "We offer competitive compensation, health insurance, retirement plans, generous PTO, professional development budgets, home office stipends, wellness programs, and regular team retreats. We believe in supporting our team members both professionally and personally.",
    },
    {
      question: "How would you describe the company culture?",
      answer:
        "Our culture is built on collaboration, innovation, and respect. We value diverse perspectives, encourage experimentation, and celebrate both successes and failures as learning opportunities. We maintain a healthy work-life balance and foster an inclusive environment where everyone can thrive.",
    },
    {
      question: "What opportunities are there for career growth?",
      answer:
        "We're committed to helping our team members grow. We offer clear career progression paths, regular performance reviews, mentorship programs, learning stipends, and opportunities to work on cross-functional projects. Many of our leaders have been promoted from within the company.",
    },
  ]

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [])

  const toggleFAQ = (index) => {
    // If clicking on the same FAQ that's already open, close it
    if (activeIndex === index) {
      setActiveIndex(null)
      setAnimatedText("")
      setIsAnimating(false)
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
      return
    }

    // If animation is in progress, cancel it
    if (isAnimating && animationRef.current) {
      clearTimeout(animationRef.current)
    }

    // Set the new active index and reset the animated text
    setActiveIndex(index)
    setAnimatedText("")
    setIsAnimating(true)

    // Animate the text letter by letter
    const answer = faqs[index].answer
    let currentIndex = 0

    const animateText = () => {
      if (currentIndex < answer.length) {
        setAnimatedText((prev) => prev + answer[currentIndex])
        currentIndex++
        animationRef.current = setTimeout(animateText, 15) // Speed of animation (lower = faster)
      } else {
        setIsAnimating(false)
      }
    }

    animateText()
  }

  return (
    <section className="py-16 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#519444]">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-5 text-left font-medium focus:outline-none"
                >
                  <span className="text-lg">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 border-t border-gray-200 text-gray-600">
                    {activeIndex === index && (
                      <p className="leading-relaxed">
                        {animatedText}
                        {isAnimating && <span className="inline-block w-1 h-4 ml-1 bg-[#519444] animate-pulse"></span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
