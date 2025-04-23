import React from 'react'
import { Link } from 'react-router-dom'
import CartToggleButton from '@/components/Cart/Buttons/CartToggleButton'
import WishlistHeartButton from '@/components/WishList/WishlistHeartButton'
import { FaEye, FaStar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductCard({ product }) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative group bg-white rounded-xl dark:bg-gray-800 dark:shadow-red-900 my-3 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        >
            <div className="absolute top-3 right-3 z-30">
                <WishlistHeartButton productId={product._id} />
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
                        {product.quantity > 5 ? 'In Stock' : product.quantity > 0 ? `Only ${product.quantity} left` : 'Out of Stock'}
                    </span>
                </div>
                
                <Link to={`/product/${product._id}`} className="group">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-400 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
                    
                    <CartToggleButton 
                        productId={product._id} 
                        iconOnly={true}
                        quantity={product.quantity}
                    />
                </div>
            </div>
        </motion.div>
    )
}