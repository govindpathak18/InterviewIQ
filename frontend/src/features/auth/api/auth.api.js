import { api } from "../../../core/api/client";
import { ENDPOINTS } from "../../../core/api/endpoints";

export const authApi = {
  login: async (payload) => {
    const { data } = await api.post(ENDPOINTS.auth.login, payload);
    return data?.data;
  },
  register: async (payload) => {
    const { data } = await api.post(ENDPOINTS.auth.register, payload);
    return data?.data;
  },
  me: async () => {
    const { data } = await api.get(ENDPOINTS.auth.me);
    return data?.data;
  },
  logout: async () => {
    const { data } = await api.post(ENDPOINTS.auth.logout);
    return data;
  },
};