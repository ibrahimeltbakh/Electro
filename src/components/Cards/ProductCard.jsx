import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAddToCart from '@/Hooks/cart/useAddToCart'
import useAddToWishlist from '@/Hooks/wishList/useAddToWishlist'
import useRemoveFromWishlist from '@/Hooks/wishList/useRemoveFromWishlist'
import useGetWishList from '@/Hooks/wishList/useGetWishList'
import { FaHeart, FaRegHeart, FaEye, FaShoppingCart, FaStar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductCard({ product }) {
    const { mutate: addToCart } = useAddToCart()
    const { mutate: addToWishlist } = useAddToWishlist()
    const { mutate: removeFromWishlist } = useRemoveFromWishlist()
    const { data: wishlistData } = useGetWishList()
    
    const [isInWishlist, setIsInWishlist] = useState(false)
    
    useEffect(() => {
        if (wishlistData?.wishlist?.products) {
            const inWishlist = wishlistData.wishlist.products.some(
                item => item._id === product._id
            )
            setIsInWishlist(inWishlist)
        }
    }, [wishlistData, product._id])
    
    const handleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist({ productId: product._id })
        } else {
            addToWishlist({ productId: product._id })
        }
    }
    
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative group bg-white rounded-xl dark:bg-gray-800 dark:shadow-red-900 my-3 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        >
            <div className="absolute top-3 right-3 z-30">
                <motion.button 
                    whileTap={{ scale: 0.85 }}
                    onClick={handleWishlist}
                    className="w-9 h-9 rounded-full backdrop-blur-md bg-white/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                    {isInWishlist ? (
                        <FaHeart className="text-red-500 text-lg" />
                    ) : (
                        <FaRegHeart className="text-gray-500 group-hover:text-red-500 transition-colors text-lg" />
                    )}
                </motion.button>
            </div>
            
            <div className="absolute top-3 left-3 z-20">
                {product.discount ? (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{product.discount}% OFF
                    </span>
                ) : (
                    <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        NEW
                    </span>
                )}
            </div>
            
            <div className="relative overflow-hidden h-56">
                <img
                    src={product.imageCover.secure_url}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <AnimatePresence>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <Link 
                            to={`/product/${product._id}`}
                            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <FaEye />
                            <span>Quick View</span>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="flex flex-col flex-grow p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600 font-medium">4.8</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                        {product.quantity > 5 ? 'In Stock' : `Only ${product.quantity} left`}
                    </span>
                </div>
                
                <Link to={`/product/${product._id}`} className="group">
                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </h2>
                </Link>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {product.description}
                </p>
                
                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-blue-600">
                                ${product.price}
                            </span>
                            {product.oldPrice && (
                                <span className="text-sm line-through text-gray-400">
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart({ productId: product._id })}
                        className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-blue-200 transition-all"
                    >
                        <FaShoppingCart className="text-lg" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}