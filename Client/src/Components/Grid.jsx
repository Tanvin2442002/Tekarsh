import "./styles.css"

const Icons = {
  ClipboardCopy: () => <span className="icon">📋</span>,
  FileBroken: () => <span className="icon">📄</span>,
  Signature: () => <span className="icon">✍️</span>,
  TableColumn: () => <span className="icon">📊</span>,
  ArrowWaveRightUp: () => <span className="icon">📈</span>,
  BoxAlignTopLeft: () => <span className="icon">📦</span>,
  BoxAlignRightFilled: () => <span className="icon">🧩</span>,
}

const cn = (...classes) => classes.filter(Boolean).join(" ")

const Skeleton = ({ src, alt }) => (
  <div className="skeleton">
     {src && (
      <img
        src={src || "/placeholder.svg"}
        alt={alt || ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "inherit",
          objectFit: "cover",
        }}
      />
    )}
  </div>
)

const items = [
  {
    title: "Collaborative Culture",
    description: "At Tekarsh, we thrive in a culture of teamwork, transparency, and mutual respect.",
    header: <Skeleton src="tek1.jpg" alt="Team collaboration" />,
    icon: <Icons.ClipboardCopy />,
  },
  {
    title: "Modern Workspaces",
    description: "Our open, well-equipped offices foster creativity and comfort.",
    header: <Skeleton src="tek2.jpg" />,
    icon: <Icons.BoxAlignTopLeft />,
  },
  {
    title: "Growth Opportunities",
    description: "We support your personal and professional growth through mentorship and learning.",
    header: <Skeleton src="tek3.jpg" />,
    icon: <Icons.ArrowWaveRightUp />,
  },
  {
    title: "Celebrations & Events",
    description: "From festive events to team outings, we celebrate every milestone together.",
    header: <Skeleton src="Join.jpg" alt="Team celebrations" />,
    icon: <Icons.TableColumn />,
  },
  {
    title: "Innovation Driven",
    description: "Tekarsh encourages experimentation, new ideas, and product innovation.",
    header: <Skeleton src="joinus.jpg" />,
    icon: <Icons.FileBroken />,
  },
  {
    title: "Diversity & Inclusion",
    description: "We believe in building an inclusive workplace for all backgrounds.",
    header: <Skeleton src="last.jpg" alt="Diverse team" />,
    icon: <Icons.Signature />,
  },
  {
    title: "Flexible Work-Life Balance",
    description: "Enjoy hybrid work options, wellness benefits, and time to recharge.",
    header: <Skeleton src="para.jpg" alt="Work-life balance" />,
    icon: <Icons.BoxAlignRightFilled />,
  },
]

function Grid() {
  return (
    <div className="app">
      <h1 className="heading">Life At Tekarsh</h1>
      <div className="grid-container">
        {items.map((item, i) => (
          <div 
            key={i} 
            className={`grid-item ${i === 3 || i === 6 ? "grid-span-two" : ""}`}
          >
            {item.header}
            <div className="grid-content">
              {item.icon}
              <div className="grid-title">{item.title}</div>
              <div className="grid-description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid
