import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaFire,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaGem,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartToggleButton from "@/components/Cart/Buttons/CartToggleButton";
import WishlistHeartButton from "@/components/WishList/WishlistHeartButton";

export default function FeaturedAndBestSellers({
  product,
  cardFor,
  index,
  isHovered,
  setHoveredProduct,
}) {
  // Render stars for rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className="text-yellow-400 dark:text-yellow-300"
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className="text-yellow-400 dark:text-yellow-300"
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className="text-gray-300 dark:text-gray-500"
        />
      );
    }

    return stars;
  };
  return (
    <div className="px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setHoveredProduct(product._id)}
        onHoverEnd={() => setHoveredProduct(null)}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col group">
        {/* Product badges and actions */}
        <div className="absolute top-3 right-3 z-30">
          <WishlistHeartButton productId={product._id} />
        </div>

        {product.discount > 1 && (
          <div className="absolute top-12 left-3 z-20">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <FaStar className="text-yellow-200 text-[10px]" />
              {product.discount}% OFF
            </span>
          </div>
        )}

        {cardFor === "bestSellers" && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <FaFire className="text-yellow-200" />
              BEST SELLER
            </span>
          </div>
        )}

        {cardFor === "featured" && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <FaGem className="text-white/80" />
              FEATURED
            </span>
          </div>
        )}

        {/* Product image */}
        <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900/50">
          <img
            src={product.imageCover.secure_url}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/90 dark:from-gray-800/90 to-transparent backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Link
                  to={`/product/${product._id}`}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  <FaEye />
                  <span>Quick View</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product details */}
        <div className="flex flex-col flex-grow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-0.5">
              {renderRatingStars(product.rateNum)}
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.title}
            </h3>
          </Link>

          {product.brand && (
            <div className="flex items-center gap-2 mt-1 mb-2">
              <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                {product.brand.name}
              </span>
              {product.category && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  in {product.category.name}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-end justify-between">
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
    </div>
  );
}
