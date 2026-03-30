// src/lib/api/endpoints.js
export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    sendVerificationEmail: "/auth/send-verification-email",
    verifyEmail: "/auth/verify-email",
  },
  users: {
    me: "/users/me",
    changePassword: "/users/me/change-password",
    list: "/users",
    byId: (id) => `/users/${id}`,
    role: (id) => `/users/${id}/role`,
    status: (id) => `/users/${id}/status`,
  },
  resumes: {
    listMine: "/resume/my",
    create: "/resume",
    upload: "/resume/upload",
    byId: (id) => `/resume/${id}`,
  },
  jobDescriptions: {
    listMine: "/job-description/my",
    create: "/job-description",
    byId: (id) => `/job-description/${id}`,
  },
  ai: {
    interviewPack: "/ai/interview-pack",
    atsResume: "/ai/ats-resume",
    atsResumePdf: "/ai/ats-resume/pdf",
  },
  interviews: {
    generate: "/interview/generate",
    listMine: "/interview/my",
    byId: (id) => `/interview/${id}`,
  },
};
