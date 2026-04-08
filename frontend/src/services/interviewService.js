import { apiClient } from './apiClient';
import { mockInterviewResult, mockInterviews } from './mockData';

export const generateInterviewPlan = async (payload) =>
  apiClient.request('/generate-interview', {
    method: 'POST',
    mock: { data: { id: 'int-001', payload, status: 'generated' } },
  });

export const getInterviewById = async (id) =>
  apiClient.request(`/interview/${id}`, {
    method: 'GET',
    mock: { data: { ...mockInterviewResult, id } },
  });

export const getPastInterviews = async () =>
  apiClient.request('/interview/my', {
    method: 'GET',
    mock: { data: mockInterviews },
  });
