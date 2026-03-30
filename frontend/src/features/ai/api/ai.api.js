// src/features/ai/api/ai.api.js
import { api } from "../../../lib/api/axios";
import { endpoints } from "../../../lib/api/endpoints";

export const aiApi = {
  generateInterviewPack: async (payload) => {
    const response = await api.post(endpoints.ai.interviewPack, payload);
    return response.data;
  },

  generateAtsResume: async (payload) => {
    const response = await api.post(endpoints.ai.atsResume, payload);
    return response.data;
  },

  generateAtsResumePdf: async (payload) => {
    const response = await api.post(endpoints.ai.atsResumePdf, payload, {
      responseType: "blob",
    });

    return response.data;
  },
};
