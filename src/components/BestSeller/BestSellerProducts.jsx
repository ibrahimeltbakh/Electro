import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaEye, FaArrowLeft, FaArrowRight, FaFire } from "react-icons/fa";
import useProducts from "@/Hooks/products/useProducts";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import useAddToWishlist from "@/Hooks/wishList/useAddToWishlist";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components for the slider
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:text-white transition-all -ml-5"
      onClick={onClick}
    >
      <FaArrowLeft className="text-blue-600 group-hover:text-white" />
    </motion.div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
      whileTap={{ scale: 0.9 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:text-white transition-all -mr-5"
      onClick={onClick}
    >
      <FaArrowRight className="text-blue-600 group-hover:text-white" />
    </motion.div>
  );
};

const BestSellerProducts = () => {
  const { data, isLoading, isError } = useProducts();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const [hoveredItem, setHoveredItem] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  // Get first 8 products for bestsellers
  const bestSellerProducts = data?.products?.slice(0, 8) || [];

  // Format price with commas
  const formatPrice = (price) => {
    return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  // Calculate discount percentage
  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  return (
    <div className="py-16 overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <FaFire className="text-3xl text-red-500" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bestselling Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Our most popular products based on sales</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/shop" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors dark:text-blue-400 dark:hover:text-blue-300">
              <span>View All Products</span>
              <FaArrowRight className="ml-2 text-sm" />
            </Link>
          </motion.div>
        </div>
        
        <div className="relative px-6">
          <Slider {...settings} className="bestseller-slider">
            {bestSellerProducts.map((product, index) => (
              <div key={product._id} className="px-3 py-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col group"
                >
                  <div className="absolute top-3 right-3 z-30">
                    <motion.button 
                      whileTap={{ scale: 0.85 }}
                      onClick={() => addToWishlist({ productId: product._id })}
                      className="w-9 h-9 rounded-full backdrop-blur-md bg-white/70 dark:bg-gray-800/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                    >
                      <FaHeart className="text-gray-500 group-hover:text-red-500 transition-colors text-lg" />
                    </motion.button>
                  </div>
                  
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      BEST SELLER
                    </span>
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
                        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <Link 
                          to={`/product/${product._id}`}
                          className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className={i < Math.floor(4 + Math.random()) ? "text-yellow-400" : "text-gray-300"}>★</span>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {product.quantity > 5 ? 'In Stock' : `Only ${product.quantity} left`}
                      </span>
                    </div>
                    
                    <Link to={`/product/${product._id}`} className="group">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    
                    {product.brand && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">By {product.brand.name}</div>
                    )}
                    
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {formatPrice(product.price)}
                          </span>
                          {product.oldPrice && product.oldPrice > product.price && (
                            <span className="text-sm line-through text-gray-400">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart({ productId: product._id })}
                        className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-blue-200 dark:hover:shadow-blue-900 transition-all"
                        aria-label="Add to cart"
                      >
                        <FaShoppingCart className="text-lg" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProducts; 