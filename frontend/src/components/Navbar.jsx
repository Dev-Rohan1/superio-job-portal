import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Dialog } from "./ui/dialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = [
    { name: "Home", to: "/" },
    { name: "Find Jobs", to: "/find-jobs" },
    { name: "About", to: "/about" },
    { name: "Terms", to: "/terms" },
    { name: "FAQ", to: "/faq" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    <Dialog />;
  };

  return (
    <header className="relative border-b">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center">
            <img
              className="w-[120px] md:w-auto"
              src={logo}
              alt="Company Logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6 lg:gap-10">
          {menu.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-gray-700 transition-colors hover:text-blue-600 ${
                    isActive ? "text-blue-600 font-medium" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-2">
          <Link to={"/candidate-login"}>
            <Button
              className="rounded cursor-pointer text-gray-700 hover:bg-gray-100"
              variant="ghost"
            >
              Recruiter Login
            </Button>
          </Link>
          <Link to={"/candidate-signup"}>
            <Button
              variant="outline"
              className="rounded cursor-pointer text-gray-700 border-gray-300 hover:border-gray-400"
            >
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button - Only shown on mobile */}
        <button
          className="cursor-pointer lg:hidden text-gray-600 ml-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu Overlay and Sidebar */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "visible" : "invisible"
          }`}
          onClick={toggleMenu}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isMenuOpen ? "opacity-50" : "opacity-0"
            }`}
          ></div>

          {/* Sidebar */}
          <div
            className={`absolute top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Link
                  to={"/"}
                  className="flex items-center"
                  onClick={toggleMenu}
                >
                  <img className="w-[120px]" src={logo} alt="Company Logo" />
                </Link>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={toggleMenu}
                >
                  <X size={22} />
                </button>
              </div>

              <ul className="flex-1">
                {menu.map((item, index) => (
                  <li key={index} className="mb-2">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-gray-700 transition-colors hover:bg-gray-100 ${
                          isActive ? "bg-blue-50 text-blue-600 font-medium" : ""
                        }`
                      }
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-gray-200">
                <Button
                  className="w-full mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  variant="ghost"
                >
                  Recruiter Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-lg cursor-pointer text-gray-700 border-gray-300 hover:border-gray-400"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
