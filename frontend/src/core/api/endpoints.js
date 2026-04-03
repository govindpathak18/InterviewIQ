export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  resume: {
    base: "/resume",
    my: "/resume/my",
    byId: (id) => `/resume/${id}`,
    upload: "/resume/upload",
  },
};
