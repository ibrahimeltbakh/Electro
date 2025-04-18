import React from 'react'
import { Link } from 'react-router-dom'
import useAddToCart from '@/Hooks/cart/useAddToCart'
import useAddToWishlist from '@/Hooks/wishList/useAddToWishlist'
import { FaHeart, FaExchangeAlt, FaEye } from 'react-icons/fa'

export default function ProductCard({ product }) {
    const { mutate } = useAddToCart()
    const mutation = useAddToWishlist()
    return (
        <>

            <div key={product._id} className="border rounded-lg p-4 shadow-md bg-white relative flex flex-col justify-between min-h-[400px]">

                {/* Badge */}
                <div className="absolute top-2 left-2">
                    {product.discount ? (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</span>
                    ) : (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                    )}
                </div>

                {/* صورة المنتج */}
                <img
                    src={product.imageCover.secure_url}
                    alt={product.title}
                    className="w-full h-48 object-contain rounded-lg mb-4"
                />

                {/* أيقونات */}
                <div className="flex justify-center gap-3 mb-2 text-gray-600">
                    <FaHeart onClick={() => mutation?.mutate({ productId: product._id })} className="cursor-pointer hover:text-red-500" />
                    <FaExchangeAlt className="cursor-pointer hover:text-blue-500" />
                    <Link to={`/product/${product._id}`}>
                        <FaEye className="cursor-pointer hover:text-green-500" />
                    </Link>
                </div>

                {/* عنوان وتقييم */}
                <h2 className="text-lg font-semibold mb-1 text-center">{product.title}</h2>
                <div className="flex justify-center text-yellow-400 mb-2">
                    {'★'.repeat(5)}
                </div>

                {/* السعر */}
                <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-green-600">${product.price}</span>
                    <span className="text-sm line-through text-gray-500">${product.oldPrice || 50.99}</span>
                </div>

                {/* زر السلة في الأسفل */}
                <button
                    onClick={() => mutate({ productId: product._id })}
                    className="mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    ADD TO CART
                </button>
            </div>


        </>
    )
}
