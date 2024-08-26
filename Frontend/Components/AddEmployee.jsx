import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaDollarSign,
  FaBuilding,
  FaLock,
} from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addEmployeeAPI } from "../services/employeeServices";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  position: Yup.string().required("Position is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .required("Salary is required"),
  department: Yup.string().required("Department is required"),
  password: Yup.string().required("Password is required"),
});

const AddEmployee = () => {
  const adminData = JSON.parse(localStorage.getItem("userInfo"));

  // Navigation
  const navigate = useNavigate();

  // Mutation
  const mutation = useMutation({
    mutationFn: (values) => addEmployeeAPI({ token: adminData?.token, values }),
    mutationKey: ["addEmployee"],
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      position: "",
      salary: "",
      department: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      // Replace with actual submission logic
      mutation
        .mutateAsync(values)
        .then((data) => {
          // Redirect to admin page
          navigate("/admin");
        })
        .catch((e) => console.log(e));

      console.log(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Add New Employee
        </h2>

        {/* Alert Message */}
        {mutation.isPending && (
          <AlertMessage type="loading" message="Loading Please Wait..." />
        )}
        {mutation.isSuccess && (
          <AlertMessage type="success" message="Login Success" />
        )}
        {mutation.isError && (
          <AlertMessage
            type="error"
            message={mutation.error.response.data.message}
          />
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="off"
                {...formik.getFieldProps("username")}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="new-email"
                inputMode="email"
                {...formik.getFieldProps("email")}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Department Field */}
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="department"
            >
              Department
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBuilding className="text-gray-400" />
              </div>
              <input
                type="text"
                id="department"
                name="department"
                autoComplete="off"
                {...formik.getFieldProps("department")}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter department"
              />
            </div>
          </div>

          {/* Position Field */}
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="position"
            >
              Position
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBriefcase className="text-gray-400" />
              </div>
              <input
                type="text"
                id="position"
                name="position"
                autoComplete="off"
                {...formik.getFieldProps("position")}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter position"
              />
            </div>
          </div>

          {/* Salary Field */}
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="salary"
            >
              Salary
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDollarSign className="text-gray-400" />
              </div>
              <input
                type="number"
                id="salary"
                name="salary"
                autoComplete="off"
                {...formik.getFieldProps("salary")}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter salary"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                {...formik.getFieldProps("password")}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
