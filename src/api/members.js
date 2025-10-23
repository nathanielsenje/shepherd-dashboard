import apiClient from './client';

export const membersAPI = {
  // Get all members with optional filters
  getAll: async (params = {}) => {
    const response = await apiClient.get('/members', { params });
    return response.data;
  },

  // Get single member by ID
  getById: async (id) => {
    const response = await apiClient.get(`/members/${id}`);
    return response.data;
  },

  // Get unconnected members
  getUnconnected: async () => {
    const response = await apiClient.get('/members/unconnected');
    return response.data;
  },

  // Get member engagement
  getEngagement: async (id) => {
    const response = await apiClient.get(`/members/${id}/engagement`);
    return response.data;
  },

  // Create new member
  create: async (data) => {
    const response = await apiClient.post('/members', data);
    return response.data;
  },

  // Update member
  update: async (id, data) => {
    const response = await apiClient.patch(`/members/${id}`, data);
    return response.data;
  },

  // Delete member
  delete: async (id) => {
    const response = await apiClient.delete(`/members/${id}`);
    return response.data;
  },
};
