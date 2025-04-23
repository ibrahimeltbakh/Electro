import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaSearch, FaBoxOpen, FaArrowRight } from "react-icons/fa";
import useGetuserOrders from "../Hooks/orders/useGetuserOrders";
import OrderCard from "./Cards/OrderCard";
import Loading from "./Loading/Loading";
import Error from "./Error/Error";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function UserOrder() {
  const { data, isLoading, isError } = useGetuserOrders();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loading />
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="max-w-lg mx-auto my-10">
        <Error />
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FaShoppingBag className="text-blue-600 dark:text-blue-400" />
            <span>Your Orders</span>
            <span className="ml-2 text-sm font-normal bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage your recent purchases
          </p>
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="Search orders..."
            className="w-full px-4 pl-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 max-w-lg mx-auto"
        >
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full mx-auto flex items-center justify-center mb-6">
            <FaBoxOpen className="text-blue-500 dark:text-blue-400 text-4xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Orders Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You haven't placed any orders yet. Start shopping and your orders will appear here.
          </p>
          <Link to="/shop">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Browse Products</span>
              <FaArrowRight className="text-sm" />
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {orders.map((order) => (
            <motion.div 
              key={order._id} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <OrderCard order={order} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
