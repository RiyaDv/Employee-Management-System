import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaHome,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/Slices/authSlice";

const PrivateNavbar = () => {
  // Dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Logout Handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/");
  };

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
            to="/admin"
            className="flex items-center space-x-2 hover:text-teal-400"
          >
            <FaTachometerAlt />
            <span>Admin</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaUserCircle />
            <span>Profile</span>
          </Link>
          <button
            onClick={logoutHandler}
            className="flex items-center space-x-2 hover:text-red-400"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
