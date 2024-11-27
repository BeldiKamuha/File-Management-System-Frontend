// src/axios-instance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response if needed
// axiosInstance.interceptors.request.use(...);
// axiosInstance.interceptors.response.use(...);

export default axiosInstance;