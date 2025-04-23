import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaShoppingBag, 
  FaHeart, 
  FaCreditCard, 
  FaAddressCard, 
  FaSignOutAlt, 
  FaChevronRight
} from "react-icons/fa";

const Sidebar = ({ user, handleLogout }) => {
  const location = useLocation();
  
  const sidebarLinks = [
    { 
      title: "My Profile", 
      icon: <FaUser />, 
      path: "/profile" 
    },
    { 
      title: "Orders", 
      icon: <FaShoppingBag />, 
      path: "/profile/orders" 
    },
    { 
      title: "Wishlist", 
      icon: <FaHeart />, 
      path: "/profile/wishlist" 
    },
    
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
        
        <div className="relative p-6 flex flex-col items-center text-center space-y-4">
          <div className="h-24 w-24 rounded-full border-4 border-white/20 overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm">
            {user?.image ? (
              <img 
                src={user.image} 
                alt={user?.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <span className="text-3xl font-bold">{user?.name?.charAt(0) || "U"}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1 text-white">
            <h3 className="text-xl font-bold tracking-tight">{user?.name || "User"}</h3>
            <p className="text-sm text-blue-100 font-medium truncate max-w-[200px]">{user?.email || "user@example.com"}</p>
          </div>
          
          
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <div className="space-y-1 px-3">
          {sidebarLinks.map((link) => {
            const isActive = 
              link.path === "/profile" 
                ? location.pathname === "/profile" 
                : location.pathname.startsWith(link.path);
                
            return (
              <motion.div
                key={link.path}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
                      {link.icon}
                    </span>
                    <span>{link.title}</span>
                  </div>
                  
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-blue-600 dark:text-blue-400"
                    >
                      <FaChevronRight size={12} />
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-colors"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
