import apiClient from './client';

export const usersAPI = {
  // Get all users
  getAll: async (params = {}) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  // Get single user by ID
  getById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  create: async (data) => {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  // Update user
  update: async (id, data) => {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  delete: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },

  // Update user status (activate/deactivate)
  updateStatus: async (id, isActive) => {
    const response = await apiClient.patch(`/users/${id}/status`, { isActive });
    return response.data;
  },

  // Reset user password
  resetPassword: async (id) => {
    const response = await apiClient.post(`/users/${id}/reset-password`);
    return response.data;
  },
};
