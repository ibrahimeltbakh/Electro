import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingBag, FaSignOutAlt, FaHeart, FaAddressCard } from "react-icons/fa";

const Sidebar = ({ user, handleLogout }) => {
  const location = useLocation();
  
  const navItems = [
    { to: "orders", label: "My Orders", icon: <FaShoppingBag /> },
    { to: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { to: "account", label: "Account Details", icon: <FaUser /> },
  ];
  
  // Animation variants
  const listVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  };
  
  return (
    <div className="w-full md:w-64 md:min-h-[600px] bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 md:border-r border-gray-100 dark:border-gray-700">
      <div className="p-6 flex flex-col h-full">
        {/* User Info */}
        <div className="text-center md:text-left mb-8">
          <div className="w-20 h-20 mx-auto md:mx-0 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3">
            {user?.profileImg?.secure_url ? (
              <img 
                src={user.profileImg.secure_url} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUser className="text-3xl" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user?.name || "User"}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user?.email}</p>
        </div>
        
        {/* Navigation */}
        <motion.nav 
          className="flex-1"
          variants={listVariants}
          initial="initial"
          animate="animate"
        >
          <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-4 tracking-wider">Account</h4>
          
          <motion.div className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.to);
              
              return (
                <motion.div key={item.to} variants={itemVariants}>
                  <Link to={item.to}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                    >
                      <span className={`${isActive ? "text-white" : "text-blue-500 dark:text-blue-400"}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                      
                      {isActive && (
                        <motion.div 
                          className="ml-auto h-2 w-2 rounded-full bg-white"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.nav>
        
        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
          <motion.button
            whileHover={{ backgroundColor: "#f44336", color: "#fff" }}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
