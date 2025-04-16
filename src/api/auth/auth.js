import axios from 'axios';
const API_URL = 'https://e-commerce-node-seven.vercel.app/api/v1/auth';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const resetPassword = async (resetData) => {
  const response = await axios.post(`${API_URL}/reset-password`, resetData);
  return response.data;
};