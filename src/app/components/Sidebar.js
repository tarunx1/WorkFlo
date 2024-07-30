import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import {
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaUsers,
  FaChartBar,
  FaPlus,
  FaDownload,
  FaBell,
  FaRegClock,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="w-1/5 h-screen bg-white text-gray-900 flex flex-col border-r relative md:w-1/4 sm:w-1/2 xs:w-full">
      <div className="flex items-center justify-between h-20 p-4 pb-0 ">
        <div className="flex items-center">
          <Image
            className="rounded-full"
            src="/man.png"
            alt="Profile"
            width={30}
            height={30}
          />
          <div className="ml-3">
            <p className="text-xl font-semibold">
              {user && user.userName ? user.userName : "Guest"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start p-4 space-x-3 pl-6">
        <FaBell className="text-gray-500 hover:text-gray-700" />
        <FaRegClock className="text-gray-500 hover:text-gray-700" />
        <FaChevronRight className="text-gray-500 hover:text-gray-700" />
        <div className="absolute bg-gray-100 py-1 px-2 rounded-md right-2">
          <button className="text-gray-500 hover:text-gray-700" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div>
        <nav className="flex-grow px-4">
          <Link href="/" legacyBehavior>
            <a className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <FaHome className="mr-3" />
              Home
            </a>
          </Link>
          <Link href="/boards" legacyBehavior>
            <a className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <FaTachometerAlt className="mr-3" />
              Boards
            </a>
          </Link>
          <Link href="/settings" legacyBehavior>
            <a className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <FaCog className="mr-3" />
              Settings
            </a>
          </Link>
          <Link href="/teams" legacyBehavior>
            <a className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <FaUsers className="mr-3" />
              Teams
            </a>
          </Link>
          <Link href="/analytics" legacyBehavior>
            <a className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <FaChartBar className="mr-3" />
              Analytics
            </a>
          </Link>
        </nav>
        <div className="p-4">
          <button className="w-full py-2.5 px-4 big-button rounded transition duration-200 hover:bg-purple-700 flex items-center justify-center">
            Create new task
            <FaPlus className="ml-2 bg-white text-purple-900 rounded-full" />
          </button>
        </div>
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <button className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded transition duration-200 hover:bg-gray-200 flex items-center justify-center">
          <FaDownload className="mr-2" />
          <div className="flex flex-col justify-center items-start">
            Download the app
            <span className="text-xs">Get the full experience</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
