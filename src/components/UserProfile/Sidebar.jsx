import React from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ user, navigate, handleLogout }) => {
  return (
    <div className="w-20 md:w-64 bg-white shadow-xl py-8 px-4 flex flex-col items-center md:items-start">
      <div className="flex items-center space-x-2 mb-12">
        <FaUser className="text-blue-500 text-3xl" />
        <span className="hidden md:block text-xl font-semibold text-gray-800">{user.name || 'User'}</span>
      </div>
      <nav className="w-full flex flex-col gap-4">
        <button
          onClick={() => navigate('*')}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
        >
          <FaShoppingCart />
          <span className="hidden md:block">Orders</span>
        </button>
        <button
          className="flex items-center gap-3 w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          <FaUser />
          <span className="hidden md:block">Account</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
        >
          <FaSignOutAlt />
          <span className="hidden md:block">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;