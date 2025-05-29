import { motion } from "framer-motion"
import JobPositionCard from "./JobPositionCard"

function DepartmentDetail({ department, onBack }) {
  // Sample job positions for the department
  const jobPositions = [
    {
      title: `Senior ${department.title} Engineer`,
      location: "Remote",
      type: "Full-time",
      salary: "$120K - $150K",
    },
    {
      title: `${department.title} Team Lead`,
      location: "New York, NY",
      type: "Full-time",
      salary: "$140K - $170K",
    },
    {
      title: `Junior ${department.title} Associate`,
      location: "Remote",
      type: "Full-time",
      salary: "$80K - $100K",
    },
    {
      title: `${department.title} Intern`,
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$30/hr",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl animate-fadeIn">
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
        Back to all departments
      </button>

      <div className="mb-12">
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">{department.title} Department</h2>
          <p className="text-lg text-gray-600">{department.description}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">About the Department</h3>
            <p className="mb-4 text-gray-600">
              Our {department.title} department is at the heart of what we do. We're a team of passionate professionals
              dedicated to delivering exceptional results for our clients.
            </p>
            <p className="mb-4 text-gray-600">
              With a team of {department.teamSize} professionals, we work collaboratively to solve complex challenges
              and drive innovation in our field.
            </p>
            <p className="text-gray-600">
              We're always looking for talented individuals to join our team. Check out our current openings below.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-semibold">Department Benefits</h3>
            <ul className="space-y-3">
              {department.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-[#519444]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-semibold">Current Openings</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {jobPositions.map((position, index) => (
            <JobPositionCard key={index} {...position} />
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-gray-100 p-8 text-center">
        <h3 className="mb-4 text-2xl font-semibold">Join Our Team</h3>
        <p className="mb-6 text-gray-600">
          Don't see the right position? Send us your resume and we'll keep you in mind for future opportunities.
        </p>
        <button className="rounded-md bg-[#519444] px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-black active:scale-[0.98]">
          Submit Your Application
        </button>
      </div>
    </div>
  )
}

export default DepartmentDetail
