// import axios from "axios";
// // import { apiURL } from 'config/env';
// import type { AxiosError, InternalAxiosRequestConfig } from "axios";
// // export const apiURL = import.meta.env.VITE_BASE_URL;

// const Axios = axios.create({
//   baseURL: "http://localhost:5000/api/",
// });

// Axios.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Check if the user is logged out
//     if (localStorage.getItem("isLogout") === "true") {
//       // Clear user-specific data if logged out
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       //window.location.href = "/auth/login"; // Redirect to login page
//     } else {
//       // Remove the 'isLogout' flag
//       localStorage.removeItem("isLogout");

//       // Get the token from localStorage
//       const token = localStorage.getItem("token");

//       if (token) {
//         config.headers.set("Authorization", `Bearer ${token}`);
//       }
//     }

//     return config;
//   },
//   (error: AxiosError) => Promise.reject(error)
// );

// Axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { status } = error.response || {};

//     if (status === 401 || status === 403) {
//       // Clear localStorage and redirect to login on unauthorized access
//       //   localStorage.removeItem("token");
//       //   localStorage.removeItem("user");
//       //   window.location.href = "/auth/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default Axios;

// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api/"; // Replace with your API's base URL

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Adjust this to how you store the token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axios;
