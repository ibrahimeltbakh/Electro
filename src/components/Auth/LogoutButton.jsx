import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userToken');
    
    logout();
    
    toast.success('Logged out successfully!');
    
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors duration-200"
    >
      <FaSignOutAlt className="text-lg" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton; 