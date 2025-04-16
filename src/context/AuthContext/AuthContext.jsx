import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const initializeAuth = async () => {
      if (token && role) {
        setUser({ role });
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      } else {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [token, role]);

  const login = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole || 'user');
    setUser({ role: newRole || 'user' });
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};