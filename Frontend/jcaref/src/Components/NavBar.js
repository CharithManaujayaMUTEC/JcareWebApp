import React, { useState } from "react";
import logo from "./logo/Logo.png";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-purple-100 py-2 px-10 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <a href="/">
            <img src={logo} alt="Jcare" className="w-28" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="text-black" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10">
          <li>
            <a href="/#hero" className="text-black font-bold font-Montserrat">
              Home
            </a>
          </li>
          <li>
            <a href="/#visit" className="text-black font-bold font-Montserrat">
              About
            </a>
          </li>
          <li>
            <a href="/login" className="text-black font-bold font-Montserrat">
              Login
            </a>
          </li>
          <li>
            <a href="/#footer" className="text-black font-bold font-Montserrat">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <ul className="md:hidden space-y-3 mt-3">
          <li>
            <a href="/#hero" className="text-black font-bold font-Montserrat">
              Home
            </a>
          </li>
          <li>
            <a href="/#visit" className="text-black font-bold font-Montserrat">
              About
            </a>
          </li>
          <li>
            <a href="/login" className="text-black font-bold font-Montserrat">
            Login
            </a>
          </li>
          <li>
            <a href="/#footer" className="text-black font-bold font-Montserrat">
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;