"use client";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TiltingCard = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
};

const Cards = ({ src, title, description, buttonText, onClick }) => {
  return (
    <div className="relative size-full bg-white">
      <video src={src} loop muted autoPlay className="absolute top-0 left-0 size-full object-cover object-center" />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
        <div>
          <h1 className="uppercase md:text-4xl text-4xl font-black">{title}</h1>
          {description && <p className="mt-5 max-w-96 text-xs md:text-base">{description}</p>}
        </div>
        {buttonText && (
          <div className="mt-5">
            <button
              onClick={onClick}
              className="w-fit rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-[#519444] hover:text-white transition"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const navigate = useNavigate();

  const navigateToService = (serviceId) => {
    navigate(`/services#${serviceId}`);
  };

  return (
    <section className="bg-white pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="text-lg text-black">Your Trusted Partner in Delivering Results That Truly Matter</p>
          <p className="max-w-md text-lg text-gray-800 opacity-50">
            We focus on what makes a real difference—quality, consistency, and a client-first mindset. At TEKARSH, every
            project reflects our dedication to creating value that lasts long beyond the visible.
          </p>
        </div>

        <TiltingCard className="border border-white/20 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <Cards
            src="/card1.mp4"
            title="Software Development"
            description="Our Software Development services deliver cutting-edge solutions tailored to your unique business challenges. We combine technical expertise with industry knowledge to create custom applications that drive efficiency and growth."
            buttonText="Learn More"
            onClick={() => navigateToService("software-development")}
          />
        </TiltingCard>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 grid-rows-3 gap-7 auto-rows-fr">
          <TiltingCard className="relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out md:row-span-2">
            <Cards
              src="/card1.mp4"
              title="Quality Assurance"
              description="Our Quality Assurance services ensure your software meets the highest standards of reliability, performance, and security. We implement comprehensive testing strategies that identify issues early in the development cycle."
              buttonText="Learn More"
              onClick={() => navigateToService("quality-assurance")}
            />
          </TiltingCard>

          <TiltingCard className="relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
            <Cards
              src="/card1.mp4"
              title="Business Process Outsourcing"
              description="Our Business Process Outsourcing (BPO) services help you optimize operations, reduce costs, and focus on your core business activities. We take on your time-consuming processes and execute them with efficiency and precision."
              buttonText="Learn More"
              onClick={() => navigateToService("business-process-outsourcing")}
            />
          </TiltingCard>

          <TiltingCard className="relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
            <Cards
              src="/card1.mp4"
              title="Product Services"
              description="Our Product Services provide end-to-end support for your product development journey, from initial concept to market launch and beyond. We combine strategic thinking, design expertise, and technical capabilities."
              buttonText="Learn More"
              onClick={() => navigateToService("product-services")}
            />
          </TiltingCard>

          <div className="relative overflow-hidden rounded-md transition-transform duration-300 ease-out bg-violet-300 flex items-center justify-center p-5">
            <h1 className="uppercase md:text-6xl text-4xl font-black font-zentry max-w-64 text-black">
              More Services Coming soon
            </h1>
          </div>

          <TiltingCard className="relative overflow-hidden rounded-md transition-transform duration-300 ease-out">
            <video src="/card1.mp4" loop muted autoPlay className="size-full object-cover object-center" />
          </TiltingCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
