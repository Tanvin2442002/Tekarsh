function DepartmentCard({ title, description, icon, benefits, teamSize, location, onViewPositions }) {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] focus-within:ring-2 focus-within:ring-primary/50">
      <div className="p-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-1 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-600">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {benefits.map((benefit, index) => (
            <span
              key={index}
              className="inline-flex rounded-full bg-[#D0F0C0] px-3 py-1 text-xs font-medium text-gray-800"
            >
              {benefit}
            </span>
          ))}
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Team of {teamSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
      
      </div>
    </div>
  )
}

export default DepartmentCard