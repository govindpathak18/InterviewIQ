import { apiClient } from './apiClient';
import { mockResumeAnalysis } from './mockData';

export const analyzeResume = async () =>
  apiClient.request('/analyze-resume', {
    method: 'POST',
    mock: { data: mockResumeAnalysis },
  });
