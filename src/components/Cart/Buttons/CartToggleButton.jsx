import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import useAddToCart from '@/Hooks/cart/useAddToCart';
import useRemoveFromCart from '@/Hooks/cart/useRemoveFromCart';
import useGetCart from '@/Hooks/cart/useGetCart';

const CartToggleButton = ({ productId, className = '', iconOnly = false, quantity = null }) => {
  const { data: cartData } = useGetCart();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const [isInCart, setIsInCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    if (cartData?.cart?.products) {
      const foundItem = cartData.cart.products.find(
        item => item.productId?._id === productId
      );
      setIsInCart(!!foundItem);
      setCartItem(foundItem);
    }
  }, [cartData, productId]);

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart({ productId });
    } else {
      addToCart({ productId });
    }
  };

  // Style based on state
  const getButtonStyle = () => {
    if (iconOnly) {
      return `p-3 rounded-xl ${isInCart 
        ? 'bg-green-600 hover:bg-green-700' 
        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} 
        text-white shadow-md transition-all ${className}`;
    }
    
    return `py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all 
      ${isInCart 
        ? 'bg-green-600 hover:bg-green-700 text-white' 
        : 'bg-blue-600 hover:bg-blue-700 text-white'
      } shadow-md w-full ${className}`;
  };

  if (quantity !== null && quantity <= 0) {
    // Disabled state for out of stock products
    return (
      <button 
        disabled
        className={`${iconOnly ? 'p-3 rounded-xl' : 'py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 w-full'} 
          bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed shadow-md ${className}`}
      >
        {iconOnly ? (
          <FaShoppingCart className="text-lg" />
        ) : (
          <>
            <FaShoppingCart />
            <span>Out of Stock</span>
          </>
        )}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleCartToggle}
      className={getButtonStyle()}
      aria-label={isInCart ? "Remove from cart" : "Add to cart"}
    >
      {iconOnly ? (
        isInCart ? <FaCheckCircle className="text-lg" /> : <FaShoppingCart className="text-lg" />
      ) : (
        <>
          {isInCart ? <FaTrashAlt /> : <FaShoppingCart />}
          <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
        </>
      )}
    </motion.button>
  );
};

export default CartToggleButton; 