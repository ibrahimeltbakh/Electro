import React from "react";
import { FaStar } from "react-icons/fa";
import CartToggleButton from "@/components/Cart/Buttons/CartToggleButton";
import WishlistHeartButton from "@/components/WishList/WishlistHeartButton";

export default function ProductInfo({ product, mutate, mutation }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
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
          <span className="text-gray-600 dark:text-gray-400">({product.rateNum} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline space-x-4">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${product?.priceAfterDiscount}
          </span>
          {product.discount > 1 && (
            <span className="text-xl text-gray-500 line-through">
              ${product?.price}
            </span>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed dark:text-gray-300">{product?.description}</p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400">Brand:</span>
            <span className="font-semibold capitalize text-blue-600 dark:text-blue-400">
              {product?.brand?.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400">Category:</span>
            <span className="font-semibold capitalize text-blue-600 dark:text-blue-400">
              {product?.category?.name}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400">Stock:</span>
          <span
            className={`font-semibold ${
              product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
            {product?.stock} units
          </span>
        </div>

        <div className="flex space-x-4">
          <CartToggleButton 
            productId={product._id} 
            quantity={product.stock} 
            className="flex-1"
          />
          <WishlistHeartButton 
            productId={product._id} 
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 w-14 h-14"
          />
        </div>
      </div>
    </div>
  );
}
