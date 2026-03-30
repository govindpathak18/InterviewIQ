// src/features/interview/api/interview.api.js
import { api } from "../../../lib/api/axios";
import { endpoints } from "../../../lib/api/endpoints";

export const interviewApi = {
  generateInterviewPlan: async (payload) => {
    const response = await api.post(endpoints.interviews.generate, payload);
    return response.data;
  },

  getMyInterviews: async () => {
    const response = await api.get(endpoints.interviews.listMine);
    return response.data;
  },

  getInterviewById: async (id) => {
    const response = await api.get(endpoints.interviews.byId(id));
    return response.data;
  },

  updateInterview: async ({ id, payload }) => {
    const response = await api.patch(endpoints.interviews.byId(id), payload);
    return response.data;
  },

  deleteInterview: async (id) => {
    const response = await api.delete(endpoints.interviews.byId(id));
    return response.data;
  },
};
