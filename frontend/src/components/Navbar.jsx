import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react"; // Added X icon for better close button

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/all-jobs/all" },
    { name: "About", path: "/about" },
    { name: "Terms", path: "/terms" },
  ];

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 mb-10">
      <nav className="h-[70px] relative flex items-center justify-between ">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="w-[120px] md:w-[140px]"
            src={assets.logo}
            alt="Lecruiter Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="text-gray-700 hidden lg:flex items-center gap-8">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer">
            Lecruiter Login
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        {/* Slide-in Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white p-6 z-40 transform transition-transform duration-300 ease-in-out shadow-sm border-r border-r-gray-200 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <img className="h-9" src={assets.logo} alt="Lecruiter Logo" />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col space-y-2">
            {menu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              className="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Lecruiter Login
            </button>
            <button
              type="button"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            onClick={toggleMenu}
            className="fixed inset-0  backdrop-blur-sm z-30 lg:hidden"
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
