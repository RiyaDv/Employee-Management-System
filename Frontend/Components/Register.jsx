import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "./AlertMessage";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Register = () => {
  // Mutation
  const mutation = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  // Navigate
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Replace with actual submission logic
      mutation
        .mutateAsync(values)
        .then((data) => {
          // Redirect to login page
          navigate("/login");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">
          Create Your Account
        </h2>

        {/* Display Error Message */}
        {mutation.isPending && (
          <AlertMessage type={"loading"} message={"Logging in..."} />
        )}
        {mutation.isSuccess && (
          <AlertMessage type={"success"} message={"Login successful"} />
        )}
        {mutation.isError && (
          <AlertMessage type={"error"} message={"Login failed"} />
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
                onBlur={formik.handleBlur}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter your username"
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
                {...formik.getFieldProps("email")}
                onBlur={formik.handleBlur}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter your email"
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
                {...formik.getFieldProps("password")}
                onBlur={formik.handleBlur}
                className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-teal-400 hover:text-teal-500 transition-colors"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
