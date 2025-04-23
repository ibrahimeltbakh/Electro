import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowLeft, FaShoppingBag, FaTimes, FaTruck, FaLock, FaStore, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useGetCart from "@/Hooks/cart/useGetCart";
import CartTable from "@/components/Cart/Table";
import Checkout from "@/components/Cart/Buttons/Checkout";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Cart() {
  const { data, isLoading, isError, error } = useGetCart();
  const cartProducts = data?.cart?.products || [];

  if (isError) {
    return <Error error={error} />;
  }
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (data?.count === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-4xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-16 text-center">
            <div className="w-28 h-28 bg-blue-50 dark:bg-blue-900/20 rounded-full mx-auto flex items-center justify-center mb-8">
              <FaShoppingBag className="text-blue-500 dark:text-blue-400 text-5xl" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Let's find something you'll love!
            </p>
            
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-3 mx-auto transition-all"
              >
                <FaStore className="text-xl" />
                <span>Browse Our Shop</span>
              </motion.button>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <FaTruck className="text-blue-500 dark:text-blue-400" /> 
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <FaLock className="text-blue-500 dark:text-blue-400" /> 
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <FaCreditCard className="text-blue-500 dark:text-blue-400" /> 
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 max-w-7xl"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3"
          >
            <FaShoppingCart className="text-blue-600 dark:text-blue-400" />
            <span>Your Shopping Cart</span>
          </motion.h1>
          
          <motion.div variants={itemVariants}>
            <Link to="/shop" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 transition-colors">
              <FaArrowLeft /> 
              <span>Continue Shopping</span>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="lg:w-8/12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="font-medium text-gray-800 dark:text-white">
                  Cart Summary <span className="text-sm text-blue-600 dark:text-blue-400 font-normal ml-2">({cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'})</span>
                </h2>
              </div>
              
              <CartTable
                cartProducts={cartProducts}
                total={data?.cart?.totalCartPrice}
              />
            </div>
          </div>
          
          <div className="lg:w-4/12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-medium text-gray-800 dark:text-white">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${data?.cart?.totalCartPrice}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                  
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-800 dark:text-white">Total</span>
                      <span className="text-blue-600 dark:text-blue-400">${data?.cart?.totalCartPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Including VAT
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Checkout />
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
                  <FaLock className="text-sm" />
                  <span className="text-xs">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
