import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const msg = error?.response?.data?.message || "Something went wrong";
    return Promise.reject({ ...error, friendlyMessage: msg });
  }
);