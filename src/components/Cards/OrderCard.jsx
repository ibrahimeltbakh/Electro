import React from "react";
import { Link } from "react-router-dom";

export default function OrderCard({ order }) {
  const {
    totalOrderPrice,
    isPaid,
    isDelivered,
    paymentMethod,
    shoppingAddress,
    createdAt,
    orderItems,
  } = order;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-all duration-300 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">
          Order #{order._id.slice(-6).toUpperCase()}
        </h2>
        <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Products:</span> {orderItems.length}
        </p>
        <p>
          <span className="font-medium">Total Price:</span> $
          {totalOrderPrice.toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Payment Method:</span> {paymentMethod}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className={`${isPaid ? "text-green-600" : "text-red-500"}`}>
            {isPaid ? "Paid" : "Not Paid"}
          </span>
          {" / "}
          <span
            className={`${isDelivered ? "text-green-600" : "text-yellow-600"}`}>
            {isDelivered ? "Delivered" : "Not Delivered"}
          </span>
        </p>
        <p>
          <span className="font-medium">Shipping Address:</span>{" "}
          {shoppingAddress.city}, {shoppingAddress.street},{" "}
          {shoppingAddress.phone}
        </p>
      </div>

      <div className="text-right">
        <Link to={`${order._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
