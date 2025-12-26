import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: apiUrl, 
  withCredentials: true, // Required to send/receive cookies
  
  // Flask-JWT-Extended defaults:
  xsrfCookieName: "csrf_access_token", // The name of the cookie Flask sends
  xsrfHeaderName: "X-CSRF-TOKEN",      // The header name Flask expects
});

export default axiosClient;