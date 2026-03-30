// src/features/auth/api/auth.api.js
import { api } from "../../../lib/api/axios";
import { endpoints } from "../../../lib/api/endpoints";

export const authApi = {
  register: async (payload) => {
    const response = await api.post(endpoints.auth.register, payload);
    return response.data;
  },

  login: async (payload) => {
    const response = await api.post(endpoints.auth.login, payload);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(endpoints.auth.logout);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get(endpoints.auth.me);
    return response.data;
  },

  forgotPassword: async (payload) => {
    const response = await api.post(endpoints.auth.forgotPassword, payload);
    return response.data;
  },

  resetPassword: async (payload) => {
    const response = await api.post(endpoints.auth.resetPassword, payload);
    return response.data;
  },

  sendVerificationEmail: async (payload = {}) => {
    const response = await api.post(endpoints.auth.sendVerificationEmail, payload);
    return response.data;
  },

  verifyEmail: async (payload) => {
    const response = await api.post(endpoints.auth.verifyEmail, payload);
    return response.data;
  },
};
