import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaShoppingBag, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-32 h-32 mx-auto mb-8 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-xl">
              <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
            </div>
          </motion.div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <motion.div 
            className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Here are some helpful links:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <FaHome className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-800">Home</span>
              </Link>
              <Link
                to="/shop"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <FaShoppingBag className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-800">Shop</span>
              </Link>
              <Link
                to="/categories"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <FaSearch className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-800">Categories</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Go back to homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
