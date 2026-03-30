// src/lib/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");
        const newAccessToken = refreshResponse.data?.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
