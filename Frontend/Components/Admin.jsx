import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaUsers,
  FaUserShield,
  FaUserCog,
  FaCrown,
  FaUserCircle,
  FaCalendarDay,
  FaMailBulk,
  FaUserTag,
  FaUserTie,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { adminAPI } from "../services/userServices";
import AlertMessage from "./AlertMessage";
import {
  deleteEmployeeAPI,
  getEmployeesAPI,
} from "../services/employeeServices";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("userInfo"));

  // Render unauthorized access state
  if (adminData?.role !== "admin") {
    return (
      <div className="min-h-screen min-w-screen p-6 bg-gray-800 pt-10 shadow-md rounded-md text-center">
        <AlertMessage
          type="error"
          message="You are not authorized to access this page. Admin Access Required"
        />
      </div>
    );
  }

  // Fetch admin data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin"],
    queryFn: () => adminAPI(adminData?.token),
  });

  console.log(data);

  // Fetch employees data
  const {
    data: employees,
    isLoading: employeesLoading,
    isError: employeesIsError,
    error: employeesError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployeesAPI(adminData?.token),
  });

  const queryClient = useQueryClient();

  // Mutation for deleting employee
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEmployeeAPI(id, adminData?.token),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]); // Redirect to employees list or another appropriate page
    },
    onError: () => {
      setUpdateMessage("Failed to delete profile.");
    },
  });

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter employees based on search term
  const filteredEmployees = employees?.filter((employee) =>
    employee.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentEmployees = filteredEmployees?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(filteredEmployees?.length / usersPerPage);

  // Render loading state
  if (employeesLoading) {
    return (
      <div className="min-h-screen min-w-screen p-6 bg-gray-800 pt-10 shadow-md rounded-md text-center">
        <AlertMessage type="loading" message="Loading..." />
      </div>
    );
  }

  const handleDeleteProfile = (employeeId) => {
    if (
      window.confirm(`Are you sure you want to delete this employee's profile?`)
    ) {
      deleteMutation.mutate(employeeId);
    }
  };

  // Render main dashboard content
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <FaCrown className="text-yellow-400 text-4xl" />
            <span>{data?.user?.username}'s Dashboard</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-10 space-y-8">
        {/* User Information Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaUserTag className="text-teal-400 text-xl" />
              <div>
                <h3 className="font-semibold">Username:</h3>
                <p>{data?.user?.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaMailBulk className="text-blue-400 text-xl" />
              <div>
                <h3 className="font-semibold">Email:</h3>
                <p>{data?.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaUserTie className="text-green-400 text-xl" />
              <div>
                <h3 className="font-semibold">Role:</h3>
                <p>{data?.user?.role || data?.user?.position}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendarDay className="text-yellow-400 text-xl" />
              <div>
                <h3 className="font-semibold">Last Login:</h3>
                <p>{new Date(data?.user?.lastLogin).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="mb-6 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by username..."
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/admin/addemployee">
              <button className="ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Add Employee
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            {currentEmployees?.length === 0 ? (
              <p className="text-center text-gray-400">No users found.</p>
            ) : (
              currentEmployees?.map((employee) => (
                <div
                  key={employee._id}
                  className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <FaUserShield className="text-green-400 text-3xl" />
                    <div>
                      <h3 className="text-xl font-semibold">
                        {employee.username}
                      </h3>
                      <p className="text-gray-300">Email: {employee.email}</p>
                      <p className="text-gray-300">
                        Role: {employee.role || employee.position}
                      </p>
                      <p className="text-gray-300">
                        Last Login:{" "}
                        {new Date(employee.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/updateemployee/${employee._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProfile(employee._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
