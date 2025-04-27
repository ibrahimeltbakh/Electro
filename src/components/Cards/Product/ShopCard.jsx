import WishlistHeartButton from "@/components/WishList/WishlistHeartButton";
import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaStar } from "react-icons/fa";
import CartToggleButton from "@/components/Cart/Buttons/CartToggleButton";

export default function ShopCard({ product, viewMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {viewMode === "grid" ? (
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
          <div className="absolute top-3 right-3 z-30">
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="w-9 h-9 rounded-full backdrop-blur-md bg-white/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all">
              <WishlistHeartButton productId={product._id} />
            </motion.button>
          </div>

          <div className="absolute top-3 left-3 z-20">
            {product.discount > 1 ? (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                -{product.discount}% OFF
              </span>
            ) : (
              <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                NEW
              </span>
            )}
          </div>

          <div className="relative overflow-hidden h-56">
            <img
              src={product.imageCover.secure_url}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Link
                to={`/product/${product._id}`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <FaEye />
                <span>Quick View</span>
              </Link>
            </motion.div>
          </div>

          <div className="flex flex-col flex-grow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-sm text-gray-600 font-medium">
                  {product.rateNum}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {product.stock > 5
                  ? "In Stock"
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : "Out of Stock"}
              </span>
            </div>

            <Link to={`/product/${product._id}`} className="group">
              <h2 className="text-lg font-bold text-gray-800 mb-2 dark:text-gray-400 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h2>
            </Link>

            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600">
                  {product.discount > 1
                    ? `$${product.priceAfterDiscount}`
                    : `$${product.price}`}
                </span>
                {product.discount > 1 && (
                  <span className="text-sm line-through text-gray-500">
                    ${product.price}
                  </span>
                )}
              </div>

              <CartToggleButton
                productId={product._id}
                iconOnly={true}
                stock={product.stock}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex">
          <Link
            to={`/product/${product._id}`}
            className="w-1/3 relative overflow-hidden">
            <div className="h-full flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700">
              <img
                src={product.imageCover.secure_url}
                alt={product.title}
                className="max-h-48 max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {product.discount > 1 ? (
              <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}% OFF
              </span>
            ) : (
              <span className="absolute top-2 left-2  bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                NEW
              </span>
            )}
          </Link>

          <div className="w-2/3 p-5 flex flex-col">
            <div className="flex items-center relative  text-yellow-400 text-xs mb-1">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(product.rateNum)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">
                  {product.reviews.length} reviews
                </span>
              </div>
              <div className="absolute top-0 right-3 z-30">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="w-9 h-9 rounded-full backdrop-blur-md bg-white/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                  <WishlistHeartButton productId={product._id} />
                </motion.button>
              </div>
            </div>

            <Link to={`/product/${product._id}`}>
              <h3 className="font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2">
                {product.title}
              </h3>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {product.description ||
                "Experience the future of technology with this amazing product."}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600">
                  {product.discount > 1
                    ? `$${product.priceAfterDiscount}`
                    : `$${product.price}`}
                </span>
                {product.discount > 1 && (
                  <span className="text-sm line-through text-gray-500">
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <CartToggleButton
                  productId={product._id}
                  iconOnly={false}
                  stock={product.stock}
                  className="px-4 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
