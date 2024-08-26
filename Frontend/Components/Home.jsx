import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaClipboardList,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-black text-white text-center py-20 flex-1 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to Employee Management System
        </h1>
        <p className="text-xl mb-12 max-w-2xl">
          Manage employee records and user access with our secure and efficient
          system. Sign up or log in to get started!
        </p>
        <div className="flex space-x-6">
          <Link to="/login">
            <button className="bg-gray-700 text-teal-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center space-x-3">
              <FaSignInAlt className="text-teal-400" />
              <span>Login</span>
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gray-700 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center space-x-3">
              <FaUserPlus className="text-blue-400" />
              <span>Sign Up</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center font-bold mb-16 text-gray-200">
            Our Features
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {/* Feature 1 */}
            <div className="text-center max-w-xs">
              <FaUserTie className="text-teal-400 mx-auto text-7xl mb-5" />
              <h3 className="text-2xl font-bold mb-2 text-gray-200">
                Admin Access
              </h3>
              <p className="text-gray-400">
                Full control over employee records, with secure authentication
                and authorization.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center max-w-xs">
              <FaClipboardList className="text-blue-400 mx-auto text-7xl mb-5" />
              <h3 className="text-2xl font-bold mb-2 text-gray-200">
                Comprehensive Records
              </h3>
              <p className="text-gray-400">
                Manage all employee details from a single, unified interface.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center max-w-xs">
              <FaUserPlus className="text-green-400 mx-auto text-7xl mb-5" />
              <h3 className="text-2xl font-bold mb-2 text-gray-200">
                Seamless Operations
              </h3>
              <p className="text-gray-400">
                Easily add, update, or remove employee records with a few
                clicks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
