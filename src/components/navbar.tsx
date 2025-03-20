import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#121618] flex justify-between items-center py-4 px-8">
      <div className="flex items-center">
        <div className="mr-2">
          <img src="/assets/Logo.png" alt="Logo" className="h-12" />
        </div>
      </div>
      <div className="flex space-x-6 text-white mt-8 mr-6">
        <a href="#" className="hover:text-blue-500">
          HOME
        </a>
        <a href="#" className="hover:text-blue-300">
          MENU
        </a>
        <a href="#" className="hover:text-blue-500">
          MAKE A RESERVATION
        </a>
        <a href="#" className="hover:text-blue-500">
          CONTACT US
        </a>
      </div>
    </nav>
  );
};
