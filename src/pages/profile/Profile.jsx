import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "@/components/UserProfile/Sidebar";
import { AuthContext } from "@/context/AuthContext/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 ml-4">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-6 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <Sidebar user={user} navigate={navigate} handleLogout={handleLogout} />
          
          <div className="flex-1 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
