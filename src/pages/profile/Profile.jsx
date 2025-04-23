import React, { useContext } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/UserProfile/Sidebar";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { 
  FaUser, 
  FaCog, 
  FaRegQuestionCircle, 
  FaHeadset, 
  FaBell,
  FaShoppingBag
} from "react-icons/fa";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/profile") return "Account Overview";
    if (path.includes("/orders")) return "My Orders";
    if (path.includes("/wishlist")) return "My Wishlist";
    if (path.includes("/payment")) return "Payment Methods";
    if (path.includes("/addresses")) return "My Addresses";
    return "My Account";
  };
  
  // Get page icon based on current path
  const getPageIcon = () => {
    const path = location.pathname;
    if (path === "/profile") return <FaUser className="text-blue-600 dark:text-blue-400" />;
    if (path.includes("/orders")) return <FaShoppingBag className="text-blue-600 dark:text-blue-400" />;
    if (path.includes("/wishlist")) return <FaRegQuestionCircle className="text-blue-600 dark:text-blue-400" />;
    return <FaUser className="text-blue-600 dark:text-blue-400" />;
  };
  
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 md:py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col space-y-6">
          <motion.div 
            variants={contentVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-white">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  {getPageIcon()}
                  <span>{getPageTitle()}</span>
                </h1>
                <p className="mt-1 text-blue-100 font-medium">
                  Manage your account and preferences
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 p-2.5 rounded-full text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    <FaBell className="text-lg" />
                  </motion.button>
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white/20">
                    3
                  </span>
                </div>
                
                <Link 
                  to="/help"
                  className="bg-white/20 p-2.5 rounded-full text-white hover:bg-white/30 transition-colors backdrop-blur-sm hidden sm:flex"
                >
                  <FaRegQuestionCircle className="text-lg" />
                </Link>
                
                <Link 
                  to="/contact"
                  className="bg-white/20 p-2.5 rounded-full text-white hover:bg-white/30 transition-colors backdrop-blur-sm hidden sm:flex"
                >
                  <FaHeadset className="text-lg" />
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 p-2.5 rounded-full text-white hover:bg-white/30 transition-colors backdrop-blur-sm hidden sm:flex"
                >
                  <FaCog className="text-lg" />
                </motion.button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6">
              <Link to="/profile/orders" className="group">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                    <FaShoppingBag className="text-xl" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Orders</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track purchases</p>
                </motion.div>
              </Link>
              
              <Link to="/profile/wishlist" className="group">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-3 group-hover:scale-110 transition-transform">
                    <FaBell className="text-xl" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Notifications</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">3 unread</p>
                </motion.div>
              </Link>
              
              <Link to="/help" className="group">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition-transform">
                    <FaRegQuestionCircle className="text-xl" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Help Center</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Get support</p>
                </motion.div>
              </Link>
              
              <Link to="/contact" className="group">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                    <FaHeadset className="text-xl" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Support</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">24/7 assistance</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            variants={contentVariants}
            className="flex flex-col md:flex-row gap-6"
          >
            <div className="md:w-1/4 lg:w-1/5">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <Sidebar user={user} handleLogout={handleLogout} />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg min-h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full p-6 md:p-8"
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
