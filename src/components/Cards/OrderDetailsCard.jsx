import React from "react";

export default function OrderDetailsCard({ order }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>

      {order?.orderItems?.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <img
              src={item.productId.imageCover.secure_url}
              alt={item.productId.title}
              className="w-20 h-20 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {item.productId.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Unit Price: <span className="font-medium">${item.price}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total:{" "}
                <span className="font-bold text-blue-600">
                  ${item.quantity * item.price}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
