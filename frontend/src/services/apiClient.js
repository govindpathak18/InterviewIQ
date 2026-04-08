const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const request = async (path, options = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = {
    success: true,
    path: `${API_BASE}${path}`,
    ...options.mock,
  };

  return response;
};

export const apiClient = { request };
