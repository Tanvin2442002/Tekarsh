function TestimonialCard({ quote, name, role, department, imageUrl }) {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary/50">
      <div className="p-6">
        <div className="mb-4 transform transition-transform duration-300 hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="mb-4 text-base italic text-gray-600">{quote}</p>
      </div>
      <div className="border-t bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={imageUrl || "/placeholder.svg"} alt={name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500">
              {role}, {department}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
