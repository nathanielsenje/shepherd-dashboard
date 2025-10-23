import apiClient from './client';

export const authAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  changePassword: async (passwords) => {
    const response = await apiClient.patch('/auth/password/change', passwords);
    return response.data;
  },

  setupMFA: async () => {
    const response = await apiClient.post('/auth/mfa/setup');
    return response.data;
  },

  verifyMFA: async (token) => {
    const response = await apiClient.post('/auth/mfa/verify', { token });
    return response.data;
  },
};
