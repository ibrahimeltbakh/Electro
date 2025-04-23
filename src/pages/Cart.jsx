import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, 
  FaArrowLeft, 
  FaShoppingBag, 
  FaTruck, 
  FaLock, 
  FaStore, 
  FaCreditCard, 
  FaGift, 
  FaPercent, 
  FaShieldAlt,
  FaCreditCard as FaCreditCardAlt,
  FaBoxOpen,
  FaRegClock,
  FaHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useGetCart from "@/Hooks/cart/useGetCart";
import CartTable from "@/components/Cart/Table";
import Checkout from "@/components/Cart/Buttons/Checkout";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      duration: 0.7,
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-4xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-16 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-full mx-auto flex items-center justify-center mb-8 shadow-inner"
            >
              <FaShoppingBag className="text-blue-500 dark:text-blue-400 text-6xl" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Let's find something you'll love!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
                >
                  <FaStore className="text-xl" />
                  <span>Browse Our Shop</span>
                </motion.button>
              </Link>
              
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl text-lg font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-3 transition-all"
                >
                  <FaHeart className="text-red-500 dark:text-red-400 text-xl" />
                  <span>View Wishlist</span>
                </motion.button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10"
              >
                <div className="w-12 h-12 bg-blue-500/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaTruck className="text-2xl text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Free Shipping</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">On orders over $50</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10"
              >
                <div className="w-12 h-12 bg-green-500/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaLock className="text-2xl text-green-500 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Secure Payment</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">100% secure checkout</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10"
              >
                <div className="w-12 h-12 bg-purple-500/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-2xl text-purple-500 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Money-back Guarantee</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">30-day returns</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10"
              >
                <div className="w-12 h-12 bg-amber-500/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaBoxOpen className="text-2xl text-amber-500 dark:text-amber-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Fast Delivery</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">2-4 business days</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="container mx-auto px-4 max-w-7xl"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FaShoppingCart className="text-blue-600 dark:text-blue-400" />
                <span>Your Shopping Cart</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <motion.div 
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/shop" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <FaArrowLeft /> 
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          </div>
          
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-6 shadow-lg shadow-blue-500/20"></div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="lg:w-8/12">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-b border-blue-600">
                <h2 className="font-medium flex items-center gap-2">
                  <FaShoppingBag className="text-white/80" />
                  <span>Cart Summary</span>
                  <span className="text-sm text-blue-100 font-normal ml-2">
                    ({cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'})
                  </span>
                </h2>
              </div>
              
              <CartTable
                cartProducts={cartProducts}
                total={data?.cart?.totalCartPrice}
              />
            </motion.div>
            
            {/* Order Timeline */}
            <motion.div 
              className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-b border-green-600">
                <h2 className="font-medium flex items-center gap-2">
                  <FaRegClock className="text-white/80" />
                  <span>Delivery Timeline</span>
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="relative flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FaShoppingCart />
                    </div>
                    <div className="hidden md:block h-1 w-12 bg-gray-200 dark:bg-gray-700 ml-2"></div>
                    <div className="md:hidden h-16 w-1 bg-gray-200 dark:bg-gray-700 absolute top-12 left-6"></div>
                  </div>
                  <div className="relative flex items-center md:flex-1">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">
                      <FaCreditCardAlt />
                    </div>
                    <div className="hidden md:block h-1 w-full bg-gray-200 dark:bg-gray-700 mx-2"></div>
                    <div className="md:hidden h-16 w-1 bg-gray-200 dark:bg-gray-700 absolute top-12 left-6"></div>
                  </div>
                  <div className="relative flex items-center md:flex-1">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">
                      <FaTruck />
                    </div>
                    <div className="hidden md:block h-1 w-full bg-gray-200 dark:bg-gray-700 mx-2"></div>
                    <div className="md:hidden h-16 w-1 bg-gray-200 dark:bg-gray-700 absolute top-12 left-6"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">
                      <FaBoxOpen />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between mt-4 text-sm">
                  <div className="text-center md:text-left">
                    <p className="font-medium text-blue-600 dark:text-blue-400">Cart</p>
                    <p className="text-gray-500 dark:text-gray-400">In Progress</p>
                  </div>
                  <div className="text-center mt-4 md:mt-0">
                    <p className="font-medium text-gray-500 dark:text-gray-400">Payment</p>
                    <p className="text-gray-500 dark:text-gray-400">Pending</p>
                  </div>
                  <div className="text-center mt-4 md:mt-0">
                    <p className="font-medium text-gray-500 dark:text-gray-400">Shipping</p>
                    <p className="text-gray-500 dark:text-gray-400">Pending</p>
                  </div>
                  <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="font-medium text-gray-500 dark:text-gray-400">Delivery</p>
                    <p className="text-gray-500 dark:text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-4/12">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden sticky top-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-b border-blue-600">
                <h2 className="font-medium flex items-center gap-2">
                  <FaCreditCardAlt className="text-white/80" />
                  <span>Order Summary</span>
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${data?.cart?.totalCartPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                  
                  
                  
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-800 dark:text-white">Total</span>
                      <span className="text-blue-600 dark:text-blue-400">${data?.cart?.totalCartPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Including VAT
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Checkout />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FaTruck className="text-blue-500 dark:text-blue-400 text-sm" />
                    </div>
                    <span className="text-sm">Free shipping on orders over $50</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FaGift className="text-purple-500 dark:text-purple-400 text-sm" />
                    </div>
                    <span className="text-sm">Free gift wrapping on request</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <FaLock className="text-green-500 dark:text-green-400 text-sm" />
                    </div>
                    <span className="text-sm">Secure checkout with SSL encryption</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196559.png" alt="American Express" className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
