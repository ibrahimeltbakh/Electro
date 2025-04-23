import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaHeart, FaTrashAlt, FaArrowLeft, FaEye } from "react-icons/fa";
import useGetWishList from "@/Hooks/wishList/useGetWishList";
import useRemoveFromWishlist from "@/Hooks/wishList/useRemoveFromWishlist";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import CartToggleButton from "@/components/Cart/Buttons/CartToggleButton";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function WishList() {
  const { data, isLoading, isError, refetch } = useGetWishList();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();
  const location = useLocation();

  // Force refetch when component mounts or is accessed via routing
  useEffect(() => {
    refetch();
  }, [refetch, location]);

  // Format price with commas
  const formatPrice = (price) => {
    return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const products = data?.wishlist?.products || [];

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full mx-auto flex items-center justify-center mb-6">
            <FaHeart className="text-red-400 dark:text-red-300 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Explore our products and add your favorites to your wishlist.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>Continue Shopping</span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key="wishlist-content"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3"
            >
              <FaHeart className="text-red-500" />
              <span>My Wishlist</span>
              <span className="ml-2 text-sm font-normal bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-400 mt-2"
            >
              Items you've saved for later. Add them to your cart anytime.
            </motion.p>
          </div>
          
          <motion.div variants={itemVariants}>
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              <span>Continue Shopping</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div 
                key={product._id}
                variants={itemVariants}
                layout
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <Link to={`/product/${product._id}`} className="block">
                    <img
                      src={product.imageCover.secure_url}
                      alt={product.title}
                      className="w-full h-56 object-contain bg-gray-50 dark:bg-gray-700 transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist({ productId: product._id })}
                      className="w-9 h-9 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <FaTrashAlt className="text-red-500" />
                    </motion.button>
                    
                    <Link to={`/product/${product._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        aria-label="View product details"
                      >
                        <FaEye className="text-blue-500" />
                      </motion.button>
                    </Link>
                  </div>
                  
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{product.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h2>
                  </Link>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm line-through text-gray-400 ml-2">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <CartToggleButton productId={product._id} quantity={product.quantity || 1} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}