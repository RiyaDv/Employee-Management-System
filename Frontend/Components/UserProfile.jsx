import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaUserCircle,
  FaEdit,
  FaLock,
  FaEnvelope,
  FaCalendarAlt,
  FaCogs,
  FaClock,
  FaBriefcase,
  FaDollarSign,
  FaBuilding,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { profileAPI } from "../services/userServices";
import AlertMessage from "./AlertMessage";

const UserProfile = () => {
  // Get user token from local storage
  const userData = useSelector((state) => state?.auth?.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileAPI(userData?.token),
  });

  const formatSalary = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Display Error Message */}
      {isLoading && <AlertMessage type="loading" message="Loading..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}

      <header className="bg-gray-800 py-6">
        <div className="container mx-auto px-4 flex items-center space-x-4">
          <FaUserCircle className="text-yellow-400 text-6xl" />
          <div>
            <h1 className="text-3xl font-bold">
              {data?.user?.username}'s Profile
            </h1>
            <p className="text-gray-400">
              {data?.user?.role || data?.user?.position}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-8">
        {/* Welcome Message */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Welcome, {data?.user?.username}!
          </h2>
          <p className="text-gray-400">
            We are glad to have you here. Below is your profile information.
          </p>
        </div>
        {/* Profile Information Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-400 text-xl" />
              <div>
                <h3 className="font-semibold">Email:</h3>
                <p>{data?.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-yellow-400 text-xl" />
              <div>
                <h3 className="font-semibold">Account Created:</h3>
                <p>{new Date(data?.user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaClock className="text-green-400 text-xl" />
              <div>
                <h3 className="font-semibold">Last Login:</h3>
                <p>{new Date(data?.user?.lastLogin).toLocaleDateString()}</p>
              </div>
            </div>
            {/* Employee Information Card */}
            {data?.user?.role !== "user" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaBuilding className="text-teal-400 text-xl" />
                  <div>
                    <h3 className="font-semibold">Position:</h3>
                    <p>{data?.user?.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaDollarSign className="text-green-400 text-xl" />
                  <div>
                    <h3 className="font-semibold">Salary:</h3>
                    <p>${formatSalary(data?.user?.salary)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaBuilding className="text-purple-400 text-xl" />
                  <div>
                    <h3 className="font-semibold">Department:</h3>
                    <p>{data?.user?.department}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserProfile;
