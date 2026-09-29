import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email, password) => {
  const response = await authAPI.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await authAPI.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};