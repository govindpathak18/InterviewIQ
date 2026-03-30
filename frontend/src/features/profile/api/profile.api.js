// src/features/profile/api/profile.api.js
import { api } from "../../../lib/api/axios";
import { endpoints } from "../../../lib/api/endpoints";

export const profileApi = {
  getMyProfile: async () => {
    const response = await api.get(endpoints.users.me);
    return response.data;
  },

  updateMyProfile: async (payload) => {
    const response = await api.patch(endpoints.users.me, payload);
    return response.data;
  },

  changePassword: async (payload) => {
    const response = await api.patch(endpoints.users.changePassword, payload);
    return response.data;
  },
};
