import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useGetuserOrders from "@/Hooks/orders/useGetuserOrders";
import React from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { data, isLoading, isError } = useGetuserOrders();
  const id = useParams();
  const getSpacificOrder = data?.orders?.find((order) => order._id === id.id);

  if (isLoading)
    return (
      <div className="text-center mt-10 text-blue-500 font-semibold">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        <Error />
      </div>
    );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>

      {getSpacificOrder?.orderItems?.map((item) => (
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
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Order Summary</h2>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-600">
              ${getSpacificOrder?.totalOrderPrice}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-600">Shipping:</span>
            <span className="font-semibold text-gray-600">
              ${getSpacificOrder?.shippingPrice}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-600">Tax:</span>
            <span className="font-semibold text-gray-600">
              ${getSpacificOrder?.taxPrice}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-600">Total:</span>
            <span className="font-semibold text-gray-600">
              ${getSpacificOrder?.totalOrderPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
