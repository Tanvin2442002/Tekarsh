"use client"

import { CardSpotlight } from "./CardSpotlight"
import { useState, useEffect, useRef } from "react"
import Modal from "./Modal"
import ApplicationForm from "./ApplicationForm"

function JobDetail({ job, onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const shareRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsShareOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const copyJobLink = () => {
    const jobUrl = `${window.location.origin}${window.location.pathname}#${job.id}`
    navigator.clipboard
      .writeText(jobUrl)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
        setIsShareOpen(false)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <div id={`job-${job.id}`} className="mx-auto max-w-6xl animate-fadeIn">
      <button
        onClick={onBack}
        className="group mb-8 flex items-center rounded-md px-3 py-2 text-sm font-medium bg-[#519444] text-white hover:bg-black transition-all duration-200 active:scale-[0.98]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to all positions
      </button>

      <div className="mb-8">
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">{job.title}</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-[#D0F0C0] px-3 py-1 text-xs font-medium text-gray-800">
              {job.department}
            </span>
            <span className="inline-flex rounded-full bg-[#D0F0C0] px-3 py-1 text-xs font-medium text-gray-800">
              {job.location}
            </span>
            <span className="inline-flex rounded-full bg-[#D0F0C0] px-3 py-1 text-xs font-medium text-gray-800">
              {job.type}
            </span>
            <span className="text-sm font-medium">{job.salary}</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-[#D0F0C0] p-4">
            <div className="text-sm text-gray-500">Department</div>
            <div className="text-lg font-semibold">{job.department}</div>
          </div>
          <div className="rounded-lg bg-[#D0F0C0] p-4">
            <div className="text-sm text-gray-500">Location</div>
            <div className="text-lg font-semibold">{job.location}</div>
          </div>
          <div className="rounded-lg bg-[#D0F0C0] p-4">
            <div className="text-sm text-gray-500">Employment Type</div>
            <div className="text-lg font-semibold">{job.type}</div>
          </div>
          <div className="rounded-lg bg-[#D0F0C0] p-4">
            <div className="text-sm text-gray-500">Posted</div>
            <div className="text-lg font-semibold">{job.postedDate}</div>
          </div>
        </div>
      </div>

      <hr className="mb-8 border-gray-200" />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h3 className="mb-4 text-2xl font-semibold">About the Role</h3>
            <p className="text-gray-600">{job.description}</p>
          </section>

          <section>
            <h3 className="mb-4 text-2xl font-semibold">Responsibilities</h3>
            <ul className="ml-6 list-disc space-y-2 text-gray-600">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="hover:text-gray-900 transition-colors duration-200">
                  {responsibility}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-4 text-2xl font-semibold">Requirements</h3>
            <ul className="ml-6 list-disc space-y-2 text-gray-600">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="hover:text-gray-900 transition-colors duration-200">
                  {requirement}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <CardSpotlight>
          <div className="sticky top-0 h-full rounded-lg bg-transparent p-6  transition-all duration-300 ">
            <h3 className="mb-4 text-xl text-white font-semibold">Benefits & Perks</h3>
            <ul className="space-y-3">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 text-white  "
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-white">{benefit}</span>
                </li>
              ))}
            </ul>

            <hr className="my-6 border-gray-200" />

            <div className="space-y-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-md bg-white px-4 py-3 text-center font-medium text-black transition-all duration-200 hover:bg-[#519444] hover:text-white active:scale-[0.98]"
              >
                Apply Now
              </button>
              <div className="relative" ref={shareRef}>
                <button
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className="w-full rounded-md bg-white px-4 py-3 text-center font-medium text-black transition-all duration-200 hover:bg-[#519444] hover:text-white active:scale-[0.98]"
                >
                  Share Job
                </button>

                {isShareOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        onClick={copyJobLink}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-3 h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy link
                      </button>

                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#1877F2"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this job opportunity: ${job.title} ${window.location.origin}${window.location.pathname}#${job.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#25D366"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>

                      {/* Twitter/X */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this job opportunity: ${job.title}`)}&url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#000000"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter/X
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#0A66C2"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>

                      {/* Instagram */}
                      <a
                        href={`https://www.instagram.com/?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#E4405F"
                        >
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                        </svg>
                        Instagram
                      </a>

                      {/* Pinterest */}
                      <a
                        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}&description=${encodeURIComponent(`Check out this job opportunity: ${job.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#E60023"
                        >
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                        </svg>
                        Pinterest
                      </a>

                      {/* Reddit */}
                      <a
                        href={`https://www.reddit.com/submit?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}&title=${encodeURIComponent(`Job Opportunity: ${job.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#FF4500"
                        >
                          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                        </svg>
                        Reddit
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:?subject=Job Opportunity: ${job.title}&body=Check out this job opportunity: ${window.location.origin}${window.location.pathname}#${job.id}`}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#EA4335"
                        >
                          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                        </svg>
                        Email
                      </a>

                      {/* Telegram */}
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#${job.id}`)}&text=${encodeURIComponent(`Check out this job opportunity: ${job.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#26A5E4"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        Telegram
                      </a>
                    </div>
                  </div>
                )}

                {copySuccess && (
                  <div className="absolute right-0 mt-2 w-64 rounded-md bg-green-50 p-2 text-sm text-green-800 shadow-lg">
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardSpotlight>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ApplicationForm jobid = {job.id} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default JobDetail
