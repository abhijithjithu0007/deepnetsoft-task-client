import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center z-30">
            <img
              src="/assets/Logo.png"
              alt="Logo"
              className="h-16  md:h-24 w-auto relative top-0 md:top-6 transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-200 hover:text-blue-500 px-3 py-2 text-sm font-medium tracking-wider "
            >
              HOME
            </a>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-500 px-3 py-2 text-sm font-medium tracking-wider "
            >
              MENU
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-blue-500 px-3 py-2 text-sm font-medium tracking-wider "
            >
              MAKE A RESERVATION
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-blue-500 px-3 py-2 text-sm font-medium tracking-wider "
            >
              CONTACT US
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden bg-gray-800 shadow-lg ${
          isOpen ? "max-h-64" : "max-h-0"
        } overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col space-y-2 px-4 pt-2 pb-4">
          <a
            href="#"
            className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium tracking-wider transition-all duration-300 flex items-center"
          >
            HOME
          </a>
          <a
            href="#"
            className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium tracking-wider transition-all duration-300 flex items-center"
          >
            MENU
          </a>
          <a
            href="#"
            className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium tracking-wider transition-all duration-300 flex items-center"
          >
            MAKE A RESERVATION
          </a>
          <a
            href="#"
            className="text-gray-200 hover:text-white hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium tracking-wider transition-all duration-300 flex items-center"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </nav>
  );
};
