import axios from "axios";
import { useNavigate } from "react-router-dom";

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post("http://localhost:3500/api/users/login", {
    email,
    password,
  });

  // Return Promise
  return response.data;
};

export const registerAPI = async ({ username, email, password }) => {
  const response = await axios.post(
    "http://localhost:3500/api/users/register",
    {
      username,
      email,
      password,
    }
  );

  // Return Promise
  return response.data;
};

export const profileAPI = async (token) => {
  const response = await axios.get("http://localhost:3500/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Return Promise
  return response.data;
};

export const adminAPI = async (token) => {
  const response = await axios.get("http://localhost:3500/api/users/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Return Promise
  return response.data;
};
