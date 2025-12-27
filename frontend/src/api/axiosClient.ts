import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: apiUrl, 
  withCredentials: true, 
});

// Helper function to extract a cookie value by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  // Check if we actually found the cookie (parts.length will be 2)
  if (parts.length === 2) {
    const lastPart = parts.pop(); // This could still be undefined in TS's eyes
    if (lastPart) {
      return lastPart.split(';').shift() || null;
    }
  }
  return null;
};

// INTERCEPTOR: Runs before every request
axiosClient.interceptors.request.use(
  (config) => {
    // Manually extract the CSRF token from the browser's cookies
    const csrfToken = getCookie("csrf_access_token");

    // If it exists, attach it to the header Flask expects
    if (csrfToken) {
      config.headers["X-CSRF-TOKEN"] = csrfToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;