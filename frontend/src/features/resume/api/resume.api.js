// src/features/resume/api/resume.api.js
import { api } from "../../../lib/api/axios";
import { endpoints } from "../../../lib/api/endpoints";

export const resumeApi = {
  getMyResumes: async () => {
    const response = await api.get(endpoints.resumes.listMine);
    return response.data;
  },

  createResume: async (payload) => {
    const response = await api.post(endpoints.resumes.create, payload);
    return response.data;
  },

  uploadResume: async (formData) => {
    const response = await api.post(endpoints.resumes.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getResumeById: async (id) => {
    const response = await api.get(endpoints.resumes.byId(id));
    return response.data;
  },

  updateResume: async ({ id, payload }) => {
    const response = await api.patch(endpoints.resumes.byId(id), payload);
    return response.data;
  },

  deleteResume: async (id) => {
    const response = await api.delete(endpoints.resumes.byId(id));
    return response.data;
  },
};
