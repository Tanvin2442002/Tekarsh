import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import CareerPage from "./Pages/Career";
import Landing from "./Pages/Landing";
import ContactPage from "./Pages/ContactUs";
import Service from "./Pages/Service";
import { ToastProvider } from "./Components/toast";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <div className="relative min-h-screen w-screen overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<Service />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
