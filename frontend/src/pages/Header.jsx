import { useState } from "react";
import DuoIcon from "@mui/icons-material/Duo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white flex items-center">
          <DuoIcon className="text-xl mr-2" /> EchoMeet
        </h1>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center text-white text-2xl  focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon className="" />}
        </button>

        {/* Nav Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex md:items-center md:space-x-4 p-4 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <button className="block md:inline-block w-full md:w-auto text-left md:text-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200 mb-2 md:mb-0">
            Join as Guest
          </button>
          <button className="block md:inline-block w-full md:w-auto text-left md:text-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200 mb-2 md:mb-0">
            Login
          </button>
          <button className="block md:inline-block w-full md:w-auto text-left md:text-center px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};