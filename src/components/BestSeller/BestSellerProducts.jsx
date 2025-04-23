import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaEye, FaArrowLeft, FaArrowRight, FaFire, FaStar, FaTrophy, FaCheckCircle, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import useProducts from "@/Hooks/products/useProducts";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import useAddToWishlist from "@/Hooks/wishList/useAddToWishlist";
import useGetCart from "@/Hooks/cart/useGetCart";
import useGetWishList from "@/Hooks/wishList/useGetWishList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartToggleButton from '@/components/Cart/Buttons/CartToggleButton';
import WishlistHeartButton from '@/components/WishList/WishlistHeartButton';

// Custom arrow components for the slider
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:text-white transition-all -ml-5 md:ml-0"
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
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:text-white transition-all -mr-5 md:mr-0"
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
  const { data: cartData } = useGetCart();
  const { data: wishlistData } = useGetWishList();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Check if product is in cart or wishlist
  const isInCart = (productId) => {
    return cartData?.cart?.products?.some(item => item.productId?._id === productId);
  };
  
  const isInWishlist = (productId) => {
    return wishlistData?.wishlist?.products?.some(item => item._id === productId);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: dots => (
      <div className="custom-dots">
        <ul className="flex justify-center gap-1 mt-6"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-blue-500 dark:hover:bg-blue-400 cursor-pointer transition-colors"></div>
    ),
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
          arrows: false,
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
    if (!oldPrice || oldPrice <= price) return null;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  // Generate random rating for demo purposes
  const generateRating = (productId) => {
    // Use product ID to generate consistent rating per product
    const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 3.5 + (seed % 15) / 10; // Rating between 3.5 and 5.0
  };

  // Render stars for rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 dark:text-yellow-300" />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 dark:text-yellow-300" />);
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 dark:text-gray-500" />);
    }
    
    return stars;
  };

  return (
    <div className="py-20 overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white dark:from-gray-800 dark:via-indigo-900/10 dark:to-gray-900">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center gap-5"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full transform -rotate-6"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-4 rounded-xl rotate-3 shadow-lg">
                <FaFire className="text-3xl" />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Best Sellers
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Our most popular products based on sales
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <Link to="/shop" className="inline-flex items-center group">
              <span className="relative overflow-hidden">
                <span className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                  View All Products
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
              <FaArrowRight className="ml-2 text-sm text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        <div className="relative px-6">
          <Slider {...settings} className="best-seller-slider -mx-4">
            {bestSellerProducts.map((product, index) => {
              const rating = generateRating(product._id);
              const discount = calculateDiscount(product.price, product.oldPrice);
              const isHovered = hoveredProduct === product._id;
              
              return (
                <div key={product._id} className="px-4 py-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredProduct(product._id)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col group"
                  >
                    {/* Product badges and actions */}
                    <div className="absolute top-3 right-3 z-30">
                      <WishlistHeartButton productId={product._id} />
                    </div>
                    
                    {discount && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <FaStar className="text-yellow-200 text-[10px]" />
                          {discount}% OFF
                        </span>
                      </div>
                    )}
                    
                    {index < 3 && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <FaFire className="text-yellow-200" />
                          BEST SELLER
                        </span>
                      </div>
                    )}
                    
                    {/* Product image */}
                    <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900/50">
                      <img
                        src={product.imageCover.secure_url}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/90 dark:from-gray-800/90 to-transparent backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                          >
                            <Link 
                              to={`/product/${product._id}`}
                              className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                              <FaEye />
                              <span>Quick View</span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Product details */}
                    <div className="flex flex-col flex-grow p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-0.5">
                          {renderRatingStars(rating)}
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
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                            {product.brand.name}
                          </span>
                          {product.category && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              in {product.category.name}
                            </span>
                          )}
                        </div>
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
                        
                        <CartToggleButton 
                          productId={product._id}
                          iconOnly={true}
                          quantity={product.quantity}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </Slider>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex justify-center md:hidden"
          >
            <Link to="/shop" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all font-medium">
              <span>View All Products</span>
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      <style jsx="true">{`
        .best-seller-slider .slick-dots li {
          margin: 0 3px;
        }
        
        .best-seller-slider .slick-dots li.slick-active div {
          background-color: #3b82f6;
          transform: scale(1.2);
        }
        
        @media (prefers-color-scheme: dark) {
          .best-seller-slider .slick-dots li.slick-active div {
            background-color: #60a5fa;
          }
        }
      `}</style>
    </div>
  );
};

export default BestSellerProducts; 