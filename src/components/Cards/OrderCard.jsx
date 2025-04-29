import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaClock,
  FaCreditCard,
  FaMapMarkerAlt,
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { Button } from "../ui/button";
import useRemoveOrder from "@/Hooks/orders/useRemoveOrder";

export default function OrderCard({ order }) {
  const {
    _id,
    totalOrderPrice,
    isPaid,
    isDelivered,
    paymentMethod,
    shoppingAddress,
    createdAt,
    orderItems,
    status,
  } = order;
  const { mutate: removeOrder } = useRemoveOrder();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const getStatusColor = () => {
    if (status === "delivered")
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    if (status === "processing")
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    if (status === "shipped")
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    if (status === "cancelled")
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
  };

  const getStatusText = () => {
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : "Pending";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FaBox className="text-sm" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            #{_id.slice(-6).toUpperCase()}
            <span
              className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaClock className="text-blue-500 dark:text-blue-400" />
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Products
            </span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800 dark:text-white">
                {orderItems.length}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                items
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Amount
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {formatPrice(totalOrderPrice)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Payment
            </span>
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-blue-500 dark:text-blue-400 text-sm" />
              <span className="text-gray-800 dark:text-white font-medium text-sm">
                {paymentMethod}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Payment Status
            </span>
            <div className="flex items-center gap-2">
              {isPaid ? (
                <>
                  <FaCheckCircle className="text-green-500 dark:text-green-400 text-sm" />
                  <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                    Paid
                  </span>
                </>
              ) : (
                <>
                  <FaTimesCircle className="text-red-500 dark:text-red-400 text-sm" />
                  <span className="text-red-600 dark:text-red-400 font-medium text-sm">
                    Unpaid
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 text-sm mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                Shipping Address
              </span>
              <span className="text-sm text-gray-800 dark:text-white">
                {shoppingAddress.city}, {shoppingAddress.street},{" "}
                {shoppingAddress.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <FaTruck className="text-blue-500 dark:text-blue-400" />
            <span
              className={
                isDelivered
                  ? "text-green-600 dark:text-green-400 font-medium"
                  : "text-yellow-600 dark:text-yellow-400 font-medium"
              }>
              {isDelivered ? "Delivered" : "In Transit"}
            </span>
          </div>

          <Link to={`${_id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <FaEye />
              <span>View Details</span>
            </motion.button>
          </Link>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
            onClick={() => removeOrder({ orderId: _id })}>
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
}
