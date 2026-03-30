// src/features/admin/api/admin.api.js
import { api } from "../../../lib/api/axios";
import { endpoints } from "../../../lib/api/endpoints";

export const adminApi = {
  getUsers: async (params) => {
    const response = await api.get(endpoints.users.list, { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(endpoints.users.byId(id));
    return response.data;
  },

  updateUserRole: async ({ id, role }) => {
    const response = await api.patch(endpoints.users.role(id), { role });
    return response.data;
  },

  updateUserStatus: async ({ id, isActive }) => {
    const response = await api.patch(endpoints.users.status(id), { isActive });
    return response.data;
  },
};
