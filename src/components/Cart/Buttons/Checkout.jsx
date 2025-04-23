import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaCreditCard } from "react-icons/fa";

export default function Checkout() {
  return (
    <div className="w-full md:w-auto">
      <Link to="/order">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
        >
          <FaCreditCard className="text-xl" />
          <span className="font-medium">Proceed to Checkout</span>
          <FaLock className="text-sm opacity-70" />
        </motion.button>
      </Link>
      <p className="text-xs text-gray-500 mt-2 text-center md:text-right">
        Secure checkout process. All your data is protected.
      </p>
    </div>
  );
}
