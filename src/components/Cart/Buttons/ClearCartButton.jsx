import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useClearCart from "@/Hooks/cart/useClearCart";

export default function ClearCartButton() {
  const { mutate } = useClearCart();
  
  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Your Cart?',
      text: 'All items will be removed from your cart',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it',
      cancelButtonText: 'No, keep my items',
      backdrop: `rgba(0,0,30,0.4)`,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
        Swal.fire({
          title: 'Cleared!',
          text: 'Your cart has been cleared.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClearCart}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
    >
      <FaTrash />
      <span>Clear Cart</span>
    </motion.button>
  );
}
