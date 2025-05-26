import React, { useState } from "react";
import Logo from "../assets/logo.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-md">
        <div className="flex justify-between items-center px-4 py-3 md:px-8">
          
          <div className="flex items-center text-2xl">
            <img src={Logo} alt="SmartNotes Logo" className="h-10 mr-3" />
            <p>SmartNotes</p>
          </div>

          
          <nav className="hidden md:block space-x-6">
            <a href="#" className="hover:text-gray-300">
              Browse
            </a>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
            <a href="#" className="hover:text-gray-300">
              Price
            </a>
            <a href="#" className="hover:text-gray-300">
              Category
            </a>
            <a href="#" className="hover:text-gray-300">
              Cart
            </a>
            <a href="#" className="hover:text-gray-300">
              Profile
            </a>
          </nav>

          <button className="hidden md:block bg-white text-black rounded-2xl px-4 py-2 hover:bg-gray-200 transition">
            Get Started
          </button>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <a href="#" className="block hover:text-gray-300">
              Browse
            </a>
            <a href="#" className="block hover:text-gray-300">
              About
            </a>
            <a href="#" className="block hover:text-gray-300">
              Price
            </a>
            <a href="#" className="block hover:text-gray-300">
              Category
            </a>
            <a href="#" className="block hover:text-gray-300">
              Cart
            </a>
            <a href="#" className="block hover:text-gray-300">
              Profile
            </a>
            <button className="w-full mt-2 bg-white text-black rounded-2xl px-4 py-2 hover:bg-gray-200 transition">
              Get Started
            </button>
          </div>
        )}
      </div>

      
      <div className="h-20 md:h-24" />
    </header>
  );
}

export default Navbar;
