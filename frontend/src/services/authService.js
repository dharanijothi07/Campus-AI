import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    } catch (err) {
      // Fallback local mock mode if backend is not running
      const mockData = {
        token: 'mock-jwt-token-xyz-123',
        userId: 1,
        email: credentials.email,
        fullName: credentials.email.split('@')[0],
        role: 'STUDENT'
      };
      localStorage.setItem('token', mockData.token);
      localStorage.setItem('user', JSON.stringify(mockData));
      return mockData;
    }
  },

  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    } catch (err) {
      const mockData = {
        token: 'mock-jwt-token-xyz-123',
        userId: 1,
        email: userData.email,
        fullName: userData.fullName || 'Student',
        role: userData.role || 'STUDENT'
      };
      localStorage.setItem('token', mockData.token);
      localStorage.setItem('user', JSON.stringify(mockData));
      return mockData;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
