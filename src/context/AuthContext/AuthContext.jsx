import { getUserProfile } from '@/api/auth/auth';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUserData = localStorage.getItem('userData');

    if (storedToken && storedRole && storedUserData) {
      setToken(storedToken);
      setRole(storedRole);
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        setUser(null);
        localStorage.removeItem('userData');
      }
    } else {
      setToken(null);
      setRole(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userData');
    }
  }, []);
  

  const login = (newToken, newRole, userData) => {
    setToken(newToken);
    setRole(newRole || 'user');
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole || 'user');
    localStorage.setItem('userData', JSON.stringify(userData));
  };


  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userData');
  };

  const refreshUser = async (token) => {
    try {
      const response = await getUserProfile(token);
      const updatedUserData = {
        name: response.user?.name || response.name || '',
        email: response.user?.email || response.email || '',
        phone: response.user?.phone || response.phone || '',
        address: response.user?.address || response.address || '',
        imageUrl: response.user?.imageUrl || response.imageUrl || response.image || response.profileImage || '',
      };
      setUser(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
