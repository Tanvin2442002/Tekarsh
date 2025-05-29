import React from 'react'
import Hero from "../Sections/LandingHero";
import About from "../Sections/About";
import Features from "../Sections/Features";
import Story from "../Sections/Story";
import StatsSection from "../Components/Stats";
import { ThemeProvider } from "../Utils/ThemeContext";
import { WorldMap } from "../Components/WorldMap";
import WobbleCardDemo from '../Components/WobbleCardDemo';
import Newsletter from '../Components/Newsletter';
import TestimonialData from '../Components/TestimonialData';
const Landing = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <Hero />
        <About />
        <Features />
        <Story />
        <TestimonialData />
        <StatsSection />
        <WorldMap />
        <WobbleCardDemo /> 
      </div>
    </ThemeProvider>
  )
}

export default Landing
