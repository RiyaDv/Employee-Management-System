import React, { useEffect, useState } from "react";
import {
  FaUserTag,
  FaMailBulk,
  FaUserTie,
  FaCalendarDay,
  FaBuilding,
  FaDollarSign,
  FaTrash, // Import delete icon
} from "react-icons/fa";
import AlertMessage from "./AlertMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEmployeeAPI,
  findEmployeeAPI,
  updateEmployeeAPI,
} from "../services/employeeServices";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const adminData = JSON.parse(localStorage.getItem("userInfo"));

  const pid = useParams().id;
  const token = adminData?.token;
  const navigate = useNavigate(); // Use navigate to redirect after delete

  // Fetch user data
  const {
    data: user,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: ["update"],
    queryFn: () => findEmployeeAPI(pid, token),
  });

  console.log(user);

  // Mutation for updating employee
  const mutation = useMutation({
    mutationFn: (updatedData) =>
      updateEmployeeAPI({ id: pid, token, userData: updatedData }),
    onSuccess: () => {
      setUpdateMessage("Profile updated successfully!");
      setIsUpdating(false);
    },
  });

  // Mutation for deleting employee
  const deleteMutation = useMutation({
    mutationFn: () => deleteEmployeeAPI(pid, token),
    onSuccess: () => {
      navigate("/admin"); // Redirect to employees list or another appropriate page
    },
    onError: () => {
      setUpdateMessage("Failed to delete profile.");
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    department: "",
    salary: "",
    lastLogin: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || user.employee.username,
        email: user.email || user.employee.email,
        role: user.role || user.employee.position,
        department: user.employee?.department || "",
        salary: user.employee?.salary || "",
        lastLogin: user.lastLogin || user.employee.lastLogin,
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    setUpdateMessage(""); // Clear message during the update

    // Simulating update logic
    mutation.mutate(formData);
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
      <div className="relative bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-lg">
        <button
          onClick={handleDeleteProfile}
          className="absolute top-10 right-7 p-2 text-red-500 hover:text-red-700"
        >
          <FaTrash className="text-2xl" />
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center">User Profile</h2>
        {updateMessage && (
          <AlertMessage
            type="success"
            message={updateMessage}
            className="fade-in"
          />
        )}
        <div className="space-y-6">
          {/* Profile fields */}
          <div className="flex items-center space-x-4">
            <FaUserTag className="text-teal-400 text-2xl" />
            <div className="w-full">
              <h3 className="font-semibold mb-1">Username:</h3>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`bg-gray-700 text-gray-200 w-full p-3 rounded-lg transition-colors duration-200 ${
                  isUpdating ? "bg-gray-600" : ""
                }`}
                disabled={isUpdating}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMailBulk className="text-blue-400 text-2xl" />
            <div className="w-full">
              <h3 className="font-semibold mb-1">Email:</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-gray-700 text-gray-200 w-full p-3 rounded-lg transition-colors duration-200 ${
                  isUpdating ? "bg-gray-600" : ""
                }`}
                disabled={isUpdating}
              />
            </div>
          </div>
          {user?.role === "user" && (
            <div className="flex items-center space-x-4">
              <FaUserTie className="text-green-400 text-2xl" />
              <div className="w-full">
                <h3 className="font-semibold mb-1">Role:</h3>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`bg-gray-700 text-gray-200 w-full p-3 rounded-lg transition-colors duration-200 ${
                    isUpdating ? "bg-gray-600" : ""
                  }`}
                  disabled={isUpdating}
                />
              </div>
            </div>
          )}

          {user?.employee.role !== "user" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaBuilding className="text-teal-400 text-2xl" />
                <div className="w-full">
                  <h3 className="font-semibold mb-1">Department:</h3>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`bg-gray-700 text-gray-200 w-full p-3 rounded-lg transition-colors duration-200 ${
                      isUpdating ? "bg-gray-600" : ""
                    }`}
                    disabled={isUpdating}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaUserTie className="text-purple-400 text-2xl" />
                <div className="w-full">
                  <h3 className="font-semibold mb-1">Role:</h3>
                  <input
                    type="text"
                    name="position"
                    value={formData.role}
                    onChange={handleChange}
                    className={`bg-gray-700 text-gray-200 w-full p-3 rounded-lg transition-colors duration-200 ${
                      isUpdating ? "bg-gray-600" : ""
                    }`}
                    disabled={isUpdating}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaDollarSign className="text-green-400 text-2xl" />
                <div className="w-full">
                  <h3 className="font-semibold mb-1">Salary:</h3>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={`bg-gray-700 text-gray-200 w-full p-3 rounded-lg transition-colors duration-200 ${
                      isUpdating ? "bg-gray-600" : ""
                    }`}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <FaCalendarDay className="text-yellow-400 text-2xl" />
            <div className="w-full">
              <h3 className="font-semibold mb-1">Last Login:</h3>
              <p>{new Date(formData.lastLogin).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleUpdateProfile}
          className={`mt-8 w-full p-3 rounded-lg text-white flex items-center justify-center ${
            isUpdating
              ? "bg-teal-600 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
          disabled={isUpdating}
        >
          {isUpdating && (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 4V1l-4 4 4 4V5c3.9 0 7 3.1 7 7h3c0-5.5-4.5-10-10-10zm-1 15v-3h-2v2h-3v-6h3v2h2v-2h2v6h-2zm10-6v-2h-3v2h3zm-1 6h-2v-3h-2v-3h-3v2h3v2h2v-2h2v2h1zM6 8h2V6H6zm-3 4h3v2H3zm2 6v-2H3v2h2zm10-8h2v2h-2zm4-2h-2v2h2zM7 2h2V0H7zm11-1h-2v2h2z" />
            </svg>
          )}
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
