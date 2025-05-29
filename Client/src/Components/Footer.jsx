import react from "react";
import  { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { Toast, useToast } from "./toast";

const url = import.meta.env.VITE_API_URL

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      const response = await fetch(`${url}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Subscription Successful", 
          description: "Thank you for subscribing to our newsletter!",
          type: "success",
        });
      } else {
         toast({
          title: "Subscription Failed", 
          description: "An error occurred while subscribing. Please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <footer className="bg-gradient-to-r from-green-50 to-green-100 border-t border-green-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 w-18">
              <img
                src="https://tekarsh.com/wp-content/uploads/2022/07/site-logo-2.png"
                alt="Tekarsh"
              />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Empowering tech-driven solutions and pioneering innovation to
              build a smarter, more connected tomorrow.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Software Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Quality Assurance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Business Process Outsourcing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Product Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Consulting Services
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Giving Back
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-sm">
                    House# 259, Level - 2, Road# 19
                    <br />
                    Mohakhali DOHS, Dhaka-1206
                    <br />
                    Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                <a
                  href="tel:+880 1790-009585"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  +880 1790-009585
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                <a
                  href="mailto:info@tekarsh.com"
                  className="text-gray-700 hover:text-green-600 transition-colors text-sm"
                >
                  info@tekarsh.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-green-200">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Subscribe to our newsletter for the latest tech insights and
              innovations.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button onClick={handleSubscribe} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-green-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} TEKARSH. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-green-600 transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
