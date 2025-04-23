import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useAddToWishlist from '@/Hooks/wishList/useAddToWishlist';
import useRemoveFromWishlist from '@/Hooks/wishList/useRemoveFromWishlist';
import useGetWishList from '@/Hooks/wishList/useGetWishList';

const WishlistHeartButton = ({ productId, className = '' }) => {
  const { data: wishlistData } = useGetWishList();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistData?.wishlist?.products) {
      const inWishlist = wishlistData.wishlist.products.some(
        item => item._id === productId
      );
      setIsInWishlist(inWishlist);
    }
  }, [wishlistData, productId]);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist({ productId });
    } else {
      addToWishlist({ productId });
    }
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWishlistToggle}
      className={`w-9 h-9 rounded-full backdrop-blur-md bg-white/70 dark:bg-gray-800/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? (
        <FaHeart className="text-red-500 text-lg" />
      ) : (
        <FaRegHeart className="text-gray-500 hover:text-red-500 transition-colors text-lg" />
      )}
    </motion.button>
  );
};

export default WishlistHeartButton; 