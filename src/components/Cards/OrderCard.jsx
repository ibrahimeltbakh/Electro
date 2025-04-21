
import React from 'react';

export default function OrderCard({ order }) {
  console.log(order);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-4">
        <img
          src={order?.orderItems[0].productId.imageCover.secure_url}
          alt={order?.orderItems[0].productId.title}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">
            {order?.orderItems[0].productId.title}
          </h2>
          <p className="text-sm text-gray-500">: {order?.orderItems[0].productId.price} $</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Details</button>
      </div>
    </div>
  );
}
