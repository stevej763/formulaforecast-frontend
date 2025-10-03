import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_HOSTNAME;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This sends cookies and credentials with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
