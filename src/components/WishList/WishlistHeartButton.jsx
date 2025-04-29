import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAddToWishlist from "@/Hooks/wishList/useAddToWishlist";
import useRemoveFromWishlist from "@/Hooks/wishList/useRemoveFromWishlist";
import useGetWishList from "@/Hooks/wishList/useGetWishList";

const WishlistHeartButton = ({ productId, size = "md", className = "" }) => {
  const { data: wishlistData } = useGetWishList();
  const { mutate: addToWishlist, isLoading: isAdding } = useAddToWishlist();
  const { mutate: removeFromWishlist, isLoading: isRemoving } =
    useRemoveFromWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const products = wishlistData?.wishlist?.products || [];
    const inWishlist = products.some((item) => item._id === productId);
    setIsInWishlist(inWishlist);
  }, [wishlistData, productId]);

  const finishAnimation = () => setTimeout(() => setIsAnimating(false), 300);

  const handleWishlistToggle = () => {
    if (isAdding || isRemoving) return;

    setIsAnimating(true);

    if (isInWishlist) {
      removeFromWishlist(
        { productId },
        { onSuccess: finishAnimation, onError: () => setIsAnimating(false) }
      );
    } else {
      addToWishlist(
        { productId },
        { onSuccess: finishAnimation, onError: () => setIsAnimating(false) }
      );
    }
  };

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const getTextSize = (size) => {
    if (size === "sm") return "text-sm";
    if (size === "lg") return "text-xl";
    return "text-base";
  };

  return (
    <motion.button
      className={`${
        sizeClasses[size] || sizeClasses.md
      } flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300 dark:bg-gray-800/80 ${className}`}
      onClick={handleWishlistToggle}
      disabled={isAdding || isRemoving}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}>
      <AnimatePresence mode="wait">
        {isInWishlist ? (
          <motion.div
            key="heart-filled"
            initial={{ scale: isAnimating ? 0.5 : 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <FaHeart
              className={`${getTextSize(size)} text-red-500 dark:text-red-400`}
            />
          </motion.div>
        ) : (
          <motion.div
            key="heart-outline"
            initial={{ scale: isAnimating ? 0.5 : 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <FaRegHeart
              className={`${getTextSize(
                size
              )} text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default WishlistHeartButton;
