import React from "react";
import TestimonialSlider from "./Testimonial";

const TestimonialData = () => {
  const testimonials = [
    {
      id: 1,
      name: "Brian Mills",
      role: "Co-founder & CTO",
      company: "MarginEdge",
      logo: "https://www.marginedge.com/hs-fs/hubfs/marginedge-logo-new.png?width=375&name=marginedge-logo-new.png",
      content:
        "Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative solutions helped us increase our conversion rate by 45%!",
      avatar: "https://tekarsh.com/wp-content/uploads/2022/08/Mills.jpg",
    },
    {
      id: 2,
      name: "Ashley Frausto",
      role: "Director, Operations",
      company: "GoTab",
      logo: "https://cdn.prod.website-files.com/63d0c7d22bb75d6179e260fe/63f8ec43aa0761ae48ae447a_GoTab_Logo_Orange_RBG.png",
      content:
        "I've worked with many development teams before, but none have delivered the level of quality and professionalism I experienced here. They exceed expectations.",
      avatar: "https://tekarsh.com/wp-content/uploads/2022/08/Ashley.png",
    },
    {
      id: 3,
      name: "Brian Penn",
      role: "VP, Operations",
      company: "MarginEdge",
      logo: "https://www.marginedge.com/hs-fs/hubfs/marginedge-logo-new.png?width=375&name=marginedge-logo-new.png",
      content:
        "From concept to execution, the entire process was seamless. Their team took the time to understand our unique challenges and delivered beyond expectations.",
      avatar: "https://tekarsh.com/wp-content/uploads/2022/08/Penn.jpg",
    },
    {
      id: 4,
      name: "Joshua Leaverton",
      role: "VP, Product Development",
      company: "MarginEdge",
      logo: "https://www.marginedge.com/hs-fs/hubfs/marginedge-logo-new.png?width=375&name=marginedge-logo-new.png",
      content:
        "The technical expertise of this team is unmatched. They solved complex integration issues that our previous developers couldn't figure out for months.",
      avatar: "https://tekarsh.com/wp-content/uploads/2022/08/Josh.jpg",
    }
  ];
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">What Our Clients Say</h1>
      <TestimonialSlider testimonials={testimonials} />
    </div>
  )
};

export default TestimonialData;
