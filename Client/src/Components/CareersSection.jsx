import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import TestimonialCard from "./TestimonialCard";
import JobDetail from "./JobDetail";
import Modal from "./Modal";
import ApplicationForm from "./ApplicationForm";

function CareersSection() {
  const [activeTab, setActiveTab] = useState("openings");
  const [selectedJob, setSelectedJob] = useState(null);
  const [featuredjobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const[isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        // setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        // setLoading(false);
      });
  }, []);

  const departments = [
    {
      id: "engineering",
      title: "Engineering",
      description:
        "Build the future of enterprise software with cutting-edge technologies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      openPositions: 8,
      benefits: ["Remote-first", "Flexible hours", "Latest tech stack"],
      teamSize: 42,
      location: "Global",
    },
    {
      id: "design",
      title: "Design",
      description:
        "Create beautiful and intuitive experiences that delight our users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      openPositions: 5,
      benefits: ["Creative freedom", "User research", "Design systems"],
      teamSize: 18,
      location: "Hybrid",
    },
    {
      id: "product",
      title: "Product",
      description:
        "Shape our product strategy and roadmap to deliver customer value",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      openPositions: 3,
      benefits: ["Customer-focused", "Data-driven", "Agile environment"],
      teamSize: 12,
      location: "Hybrid",
    },
    {
      id: "marketing",
      title: "Marketing",
      description:
        "Tell our story to the world and drive growth through creative campaigns",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      openPositions: 4,
      benefits: ["Creative campaigns", "Growth focus", "Brand building"],
      teamSize: 15,
      location: "Hybrid",
    },
    {
      id: "people",
      title: "People",
      description:
        "Help us build our team culture and create an amazing place to work",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      openPositions: 2,
      benefits: ["Culture building", "Employee experience", "DEI initiatives"],
      teamSize: 8,
      location: "Hybrid",
    },
    {
      id: "sales",
      title: "Sales",
      description:
        "Drive growth and customer success through consultative selling",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      openPositions: 6,
      benefits: [
        "Competitive comp",
        "Growth opportunities",
        "Customer success",
      ],
      teamSize: 24,
      location: "Global",
    },
  ];
  const testimonials = [
    {
      quote:
        "Joining this company was one of the best decisions of my career. The engineering culture is incredible, and I've grown so much professionally in just a year.",
      name: "Alex Chen",
      role: "Senior Engineer",
      department: "Engineering",
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      quote:
        "I love the autonomy and trust we're given. As a designer, I can truly own my work from concept to execution, and see the impact it has on our users.",
      name: "Maya Johnson",
      role: "Product Designer",
      department: "Design",
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      quote:
        "The collaborative environment here is unlike anywhere I've worked before. Cross-functional teams truly respect each other's expertise and work together seamlessly.",
      name: "Raj Patel",
      role: "Product Manager",
      department: "Product",
      imageUrl: "https://via.placeholder.com/80",
    },
  ];

  const handleViewDepartment = (departmentId) => {
    const department = departments.find((dept) => dept.id === departmentId);
    setSelectedDepartment(department);
    setSelectedJob(null);
  };

  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
  };

  const handleViewJob = (jobId) => {
    const job = featuredjobs.find((job) => job.id === jobId);
    setSelectedJob(job);
    setSelectedDepartment(null);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (window.location.hash && featuredjobs.length > 0) {
      const jobId = window.location.hash.substring(1);
      const job = featuredjobs.find((job) => job.id === jobId);

      if (job) {
        setSelectedJob(job);
        setSelectedDepartment(null);

        setTimeout(() => {
          const element = document.getElementById("job-detail-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [featuredjobs]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl text-[#519444] font-bold tracking-tight sm:text-4xl md:text-5xl">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600">
            We're building the future of work with a team of exceptional people.
            Find your place and make an impact.
          </p>
        </div>

        {selectedJob ? (
          <div id="job-detail-section">
            <JobDetail job={selectedJob} onBack={handleBackToJobs} />
          </div>
        ) : (
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex justify-center">
              <div className="grid w-full max-w-md grid-cols-2 rounded-lg bg-[#D0F0C0] p-1">
                <button
                  onClick={() => setActiveTab("openings")}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === "openings"
                      ? "bg-[#519444] text-white shadow-sm"
                      : "text-black hover:bg-green-700 hover:text-white"
                  }`}
                >
                  Open Positions
                </button>
                <button
                  onClick={() => setActiveTab("stories")}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === "stories"
                      ? "bg-[#519444] text-white shadow-sm"
                      : "text-black hover:bg-green-700 hover:text-white"
                  }`}
                >
                  Team Stories
                </button>
              </div>
            </div>

            {activeTab === "openings" && (
              <div className="animate-fadeIn">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Featured Openings</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {featuredjobs.map((job) => (
                    <JobCard
                      key={job.id}
                      {...job}
                      onViewDetails={() => handleViewJob(job.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stories" && (
              <div className="animate-fadeIn">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Hear From Our Team</h3>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                  ))}
                </div>
              </div>
            )}

            <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-gray-100 p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold">
                Don't see the right fit?
              </h3>
              <p className="mb-6 text-gray-600">
                We're always looking for talented individuals to join our team.
                Send us your resume and we'll keep you in mind for future
                opportunities.
              </p>
              <button
                onClick={handleOpenModal}
                className="rounded-md bg-[#519444] px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-black active:scale-[0.98]"
              >
                Submit Your Application
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ApplicationForm
                  onClose={() => setIsModalOpen(false)}
                />
              </Modal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CareersSection;
