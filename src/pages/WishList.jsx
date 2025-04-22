import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import useGetWishList from "@/Hooks/wishList/useGetWishList";
import useRemoveFromWishlist from "@/Hooks/wishList/useRemoveFromWishlist";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";

export default function WishList() {
  const { data, isLoading, isError } = useGetWishList();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const products = data?.wishlist?.products || [];

  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 bg-red-50 rounded-full mx-auto flex items-center justify-center mb-6">
            <FaHeart className="text-red-400 text-4xl" />
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
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Wishlist <span className="text-blue-600">({products.length})</span>
          </h1>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={product.imageCover.secure_url}
                  alt={product.title}
                  className="w-full h-56 object-contain bg-gray-50 dark:bg-gray-700"
                />
                <div className="absolute top-3 right-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist({ productId: product._id })}
                    className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <FaTrashAlt className="text-red-500" />
                  </motion.button>
                </div>
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      -{product.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm line-through text-gray-400">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart({ productId: product._id })}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}