import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../redux/Slices/authSlice";
import { loginAPI } from "../services/userServices";
import AlertMessage from "./AlertMessage";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  // Mutation
  const mutation = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  // Dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "admin@123",
      password: "1234",
    },
    validationSchema,
    onSubmit: async (values) => {
      mutation
        .mutateAsync(values)
        .then((data) => {
          // Dispatch login action
          dispatch(loginAction(data));

          // Save the user in local storage
          localStorage.setItem("userInfo", JSON.stringify(data));

          // Redirect to Profile page
          navigate("/profile");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-8">
          Login to Your Account
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
          <div className="mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="new-email"
                onBlur={formik.handleBlur}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
            </div>
          </div>

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
                autoComplete="current-password"
                onBlur={formik.handleBlur}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/register"
            className="text-teal-300 hover:text-teal-400 transition-colors"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
