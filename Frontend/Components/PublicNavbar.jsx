import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const PublicNavbar = () => {
  return (
    <nav className="bg-gray-900 text-gray-200 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center space-x-2 hover:text-teal-200"
        >
          <FaHome className="text-teal-400" />
          <span>Home</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="flex items-center space-x-2 hover:text-teal-400"
          >
            <FaSignInAlt />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaUserPlus />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
