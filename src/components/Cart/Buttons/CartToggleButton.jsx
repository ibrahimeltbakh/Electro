import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaTrashAlt, FaCheck } from "react-icons/fa";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import useRemoveFromCart from "@/Hooks/cart/useRemoveFromCart";
import useGetCart from "@/Hooks/cart/useGetCart";
import { toast } from "react-hot-toast";

const CartToggleButton = ({
  productId,
  className = "",
  iconOnly = false,
  stock,
}) => {
  const { data: cartData, refetch } = useGetCart();
  const { mutate: addToCart, isLoading: isAdding } = useAddToCart();
  const { mutate: removeFromCart, isLoading: isRemoving } = useRemoveFromCart();
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Check if the product is in the cart whenever cart data changes
  useEffect(() => {
    if (cartData?.cart?.products) {
      const foundItem = cartData.cart.products.find(
        (item) => item.productId?._id === productId
      );
      setIsInCart(!!foundItem);
    }
  }, [cartData, productId]);

  const handleCartToggle = () => {
    if (isLoading || isAdding || isRemoving) return;

    setIsLoading(true);
    if (isInCart) {
      removeFromCart(
        { productId },
        {
          onSuccess: () => {
            setIsLoading(false);
            // toast.success("Removed from cart");
            refetch();
          },
          onError: () => {
            setIsLoading(false);
            toast.error("Failed to remove from cart");
          },
        }
      );
    } else {
      addToCart(
        { productId },
        {
          onSuccess: () => {
            setIsLoading(false);
            setShowFeedback(true);
            // toast.success("Added to cart");
            setTimeout(() => setShowFeedback(false), 1500);
            refetch();
          },
          onError: () => {
            setIsLoading(false);
            toast.error("Failed to add to cart");
          },
        }
      );
    }
  };

  // Style based on state
  const getButtonStyle = () => {
    if (iconOnly) {
      return `p-3 rounded-xl ${
        isInCart
          ? "bg-green-600 hover:bg-red-600"
          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      } text-white shadow-md transition-all ${className}`;
    }

    return `py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all 
      ${
        isInCart
          ? "bg-green-600 hover:bg-red-600 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } shadow-md w-full ${className}`;
  };

  if (stock === 0) {
    // Disabled state for out of stock products
    return (
      <button
        disabled
        className={`${
          iconOnly
            ? "p-3 rounded-xl"
            : "py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 w-full"
        } 
          bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed shadow-md ${className}`}>
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
      disabled={isLoading || isAdding || isRemoving}
      className={`${getButtonStyle()} ${
        isLoading || isAdding || isRemoving ? "opacity-70 cursor-wait" : ""
      }`}
      aria-label={isInCart ? "Remove from cart" : "Add to cart"}>
      {iconOnly ? (
        isInCart ? (
          <FaCheck className="text-lg" />
        ) : (
          <FaShoppingCart className="text-lg" />
        )
      ) : (
        <>
          {isInCart ? (
            <>
              <FaTrashAlt />
              <span>Remove from Cart</span>
            </>
          ) : (
            <>
              <FaShoppingCart />
              <span>Add to Cart</span>
            </>
          )}
        </>
      )}

      {/* {showFeedback && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 flex items-center justify-center bg-green-600 rounded-xl text-white"
        >
          <FaCheck className="mr-2" /> Added!
        </motion.span>
      )} */}
    </motion.button>
  );
};

export default CartToggleButton;
