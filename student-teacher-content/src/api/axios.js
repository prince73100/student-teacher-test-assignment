import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://student-teacher-test-assignment.onrender.com/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Received:", response);
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      }
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
