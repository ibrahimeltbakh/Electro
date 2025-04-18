import axios from 'axios';

const API_URL = 'https://e-commerce-node-seven.vercel.app/api/v1';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const resetPassword = async (resetData) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, resetData);
  return response.data;
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`, { 
      headers: {
        token,
      },
    });
    console.log('User profile response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers,
    });
    throw error;
  }
};


export const changePassword = async (token, passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/users/change-password`, passwordData, {
      headers: { token }
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};


export const updateUser = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/update-account`, userData, {
      headers: { token }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

export const uploadProfileImage = async (token, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axios.post(`${API_URL}/users/upload-image`, formData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};