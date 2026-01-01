import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler } from "./errorhandler";
import { responseHandler } from "./responseHandler";

const api = axios.create({
  baseURL: "https://nodejs.nrislawfirm.com",
  headers: { "Content-Type": "application/json" },
});

// Automatically add admin token to every request
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidHlwZSI6ImFkbWluIiwiaWF0IjoxNzY3MjQ5NzcxLCJleHAiOjE3Njk4NDE3NzF9.MmTy-zfosA_3EB36KhYs2Qph4TS-PjC-7KaeWLhJeKU'
  console.log("token",token);
  
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // admin token

  console.log("Token before request:", token); // ✅ add this to check token
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

  

export default api;
