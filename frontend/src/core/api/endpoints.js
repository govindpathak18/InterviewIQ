export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AUTH = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/auth/me",
  refresh: "/auth/refresh",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  sendVerificationEmail: "/auth/send-verification-email",
  verifyEmail: "/auth/verify-email",
};
