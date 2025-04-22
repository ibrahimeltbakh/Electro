import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-50 transition-all -ml-5"
      onClick={onClick}
    >
      <FaArrowLeft className="text-blue-600" />
    </motion.div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-50 transition-all -mr-5"
      onClick={onClick}
    >
      <FaArrowRight className="text-blue-600" />
    </motion.div>
  );
};

const BestSellerProducts = () => {
  const { data, isLoading, isError } = useProducts();
  const { mutate } = useAddToCart();
  const mutation = useAddToWishlist();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
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

  return (
    <div className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold relative pb-3"
          >
            <span className="relative z-10">BestSeller Products</span>
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-blue-500 rounded-full"></span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/shop" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View More
            </Link>
          </motion.div>
        </div>
        
        <div className="relative px-6">
          <Slider {...settings}>
            {bestSellerProducts.map((product) => (
              <div key={product._id} className="px-3 py-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="relative pt-4 px-4">
                    {/* Product Image */}
                    <Link to={`/product/${product._id}`} className="block relative">
                      <img 
                        src={product.imageCover.secure_url} 
                        alt={product.title}
                        className="w-full h-48 object-contain mx-auto transition-transform duration-300 hover:scale-105"
                      />
                      
                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}
                    </Link>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 mb-1">
                      {product.title}
                    </h3>
                    
                    <div className="text-yellow-400 text-sm mb-2">
                      {'★'.repeat(5)}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-sm line-through text-gray-500">${product.oldPrice}</span>
                          )}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => mutate({ productId: product._id })}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors"
                          aria-label="Add to cart"
                        >
                          <FaShoppingCart />
                        </motion.button>
                      </div>
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