import { useState } from "react"
import { motion } from "framer-motion"

import { useToast } from "./toast"



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const { toast } = useToast()

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, "")

    // Format the phone number as needed
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
    } else {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formattedPhone }))

    // Clear error when user types
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.phone
        return newErrors
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation (optional)
    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit message");
    }

    const result = await response.json();
    console.log("Server response:", result);

    if(result.message === "Message submitted successfully") { 
      setSubmitStatus("success");
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
        type: "success",
      });
    }
    else {
      setSubmitStatus("error");
      toast({
        title: "Submission Error",
        description: "There was an error submitting your message. Please try again.",
        type: "error",
      });
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 2000);
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">Send Us a Message</h3>

      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md bg-green-50 p-4 text-green-800"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Thank you for your message! We'll get back to you soon.</p>
            </div>
          </div>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md bg-red-50 p-4 text-red-800"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">There was an error sending your message. Please try again.</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } px-4 py-2 focus:border-[#519444] focus:outline-none focus:ring-2 focus:ring-[#519444]/20`}
            placeholder="Name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } px-4 py-2 focus:border-[#519444] focus:outline-none focus:ring-2 focus:ring-[#519444]/20`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`w-full rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } px-4 py-2 focus:border-[#519444] focus:outline-none focus:ring-2 focus:ring-[#519444]/20`}
            placeholder="+8801XXXXXXXXX"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full rounded-md border ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } px-4 py-2 focus:border-[#519444] focus:outline-none focus:ring-2 focus:ring-[#519444]/20`}
            placeholder="Project Inquiry"
          />
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className={`w-full rounded-md border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } px-4 py-2 focus:border-[#519444] focus:outline-none focus:ring-2 focus:ring-[#519444]/20`}
          placeholder="Tell us about your project or inquiry..."
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-md bg-[#519444] px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-[#3e7233] ${
          isSubmitting ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </motion.button>

      <p className="text-center text-xs text-gray-500">
        By submitting this form, you agree to our{" "}
        <a href="#" className="text-[#519444] hover:underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#519444] hover:underline">
          Terms of Service
        </a>
        .
      </p>
    </form>
  )
}

export default ContactForm
