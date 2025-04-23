import React from "react";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function ProductInfo({ product, mutate, mutation }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {product.title}
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rateAvg)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">({product.rateNum} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline space-x-4">
          <span className="text-3xl font-bold text-blue-600">
            ${product?.priceAfterDiscount}
          </span>
          {product.discount > 1 && (
            <span className="text-xl text-gray-500 line-through">
              ${product?.price}
            </span>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed dark:text-white">{product?.description}</p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Brand:</span>
            <span className="font-semibold  capitalize text-blue-600">
              {product?.brand?.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Category:</span>
            <span className="font-semibold capitalize text-blue-600">
              {product?.category?.name}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Stock:</span>
          <span
            className={`font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}>
            {product?.stock} units
          </span>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => mutate({ productId: product._id })}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={() => mutation?.mutate({ productId: product._id })}
            className="p-3 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
