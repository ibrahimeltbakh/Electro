import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GetProductById } from '@/Hooks/products/productFunction'
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import useAddToCart from '@/Hooks/cart/useAddToCart'
import useAddToWishlist from '@/Hooks/wishList/useAddToWishlist'

import { motion } from 'framer-motion'

export default function ProductDetails() {
  const { mutate } = useAddToCart()
    const mutation = useAddToWishlist()
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => GetProductById(id)
  })

  if (!data?.product) return <div className="flex justify-center items-center h-screen">Loading...</div>

  const { product } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery Section */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]?.secure_url || product.imageCover.secure_url}
                  alt={product.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={image._id}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.secure_url}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${i < product.rateAvg ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rateNum} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-bold text-blue-600">${product.priceAfterDiscount}</span>
                  {product.discount > 0 && (
                    <span className="text-xl text-gray-500 line-through">${product.price}</span>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-semibold capitalize">{product.brand.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold capitalize">{product.category.name}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock} units
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
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {review.createdBy.profile ? (
                      <img
                        src={review.createdBy.profile.secure_url}
                        alt={review.createdBy.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xl font-semibold text-gray-600">
                          {review.createdBy.name[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{review.createdBy.name}</h3>
                      <p className="text-gray-500 text-sm">{review.createdBy.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
