import React from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user, handleLogout }) => {
  const location = useLocation();
  const isOrders = location.pathname.includes("orders");
  const isAccount = location.pathname.includes("account");

  return (
    <div className="w-20 md:w-64 bg-white shadow-xl py-8 px-4 flex flex-col items-center md:items-start">
      <div className="flex items-center space-x-2 mb-12">
        <FaUser className="text-blue-500 text-3xl" />
        <span className="hidden md:block text-xl font-semibold text-gray-800">
          {user.name || "User"}
        </span>
      </div>
      <nav className="w-full flex flex-col gap-4">
        <Link to="orders">
          <button
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-md transition ${
              isOrders
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}>
            <FaShoppingCart />
            <span className="hidden md:block">Orders</span>
          </button>
        </Link>
        <Link to="account">
          <button
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-md transition ${
              isAccount
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}>
            <FaUser />
            <span className="hidden md:block">Account</span>
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition">
          <FaSignOutAlt />
          <span className="hidden md:block">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
