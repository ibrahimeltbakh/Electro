import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaCreditCard, FaArrowRight, FaShieldAlt } from "react-icons/fa";

export default function Checkout() {
  return (
    <div className="w-full">
      <Link to="/order">
        <motion.button
          whileHover={{ 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <FaCreditCard className="text-xl" />
          <span className="font-medium text-base">Proceed to Checkout</span>
          <motion.div
            animate={{ 
              x: [0, 5, 0],
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            <FaArrowRight className="text-sm" />
          </motion.div>
        </motion.button>
      </Link>
      
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <FaLock className="text-blue-500 dark:text-blue-400" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <FaShieldAlt className="text-blue-500 dark:text-blue-400" />
          <span>Your payment information is protected</span>
        </div>
      </div>
    </div>
  );
}
