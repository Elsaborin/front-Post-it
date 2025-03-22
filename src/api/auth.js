import axios from 'axios';

/* En su .env deben declarar EXPO_PUBLIC_API_URL=x.x.x.x
Reemplazar x.x.x.x por la dirección ip de su laptop y le agregan :3000 al final */
const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth/docente`;

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error de conexión' };
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error de conexión' };
    }
  }
};