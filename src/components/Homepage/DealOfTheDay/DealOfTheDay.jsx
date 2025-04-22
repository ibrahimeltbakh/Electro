import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaClock, FaArrowRight } from 'react-icons/fa';
import useProducts from '@/Hooks/products/useProducts';
import useAddToCart from '@/Hooks/cart/useAddToCart';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';

const DealOfTheDay = () => {
  const { data, isLoading, isError } = useProducts();
  const { mutate: addToCart } = useAddToCart();
  
  // Find the product with the highest discount
  const dealProduct = data?.products?.reduce((highest, product) => {
    return (product.discount > (highest?.discount || 0)) ? product : highest;
  }, null);
  
  // Timer state for countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              // Reset timer when it reaches zero
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isError) {
    return <Error />;
  }
  
  if (isLoading || !dealProduct) {
    return <Loading />;
  }

  // Calculate the discounted price
  const discountedPrice = dealProduct.price;
  const originalPrice = dealProduct.oldPrice || (dealProduct.price * (100 / (100 - dealProduct.discount)));
  
  return (
    <div className="py-16 bg-gradient-to-r from-purple-500 to-blue-600 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 mb-8 lg:mb-0"
          >
            <div className="text-white mb-6">
              <h2 className="text-4xl font-bold mb-2">Deal of the Day</h2>
              <p className="text-blue-100 text-lg">
                Hurry up! This amazing offer ends in:
              </p>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex flex-col items-center w-20">
                <span className="text-3xl font-bold text-black dark:text-white ">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-xs text-black dark:text-white ">Hours</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex flex-col items-center w-20">
                <span className="text-3xl text-black dark:text-white font-bold ">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs text-black dark:text-white ">Minutes</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex flex-col items-center w-20">
                <span className="text-3xl text-black dark:text-white font-bold ">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs text-black dark:text-white ">Seconds</span>
              </div>
            </div>
            
            <div className="text-white mb-8">
              <h3 className="text-2xl font-bold mb-3">{dealProduct.title}</h3>
              <p className=" line-clamp-3 mb-4">
                {dealProduct.description || 'Experience ultimate performance with this amazing product. Limited time offer!'}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-xl text-blue-200 line-through">${originalPrice.toFixed(2)}</span>
                <span className="bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
                  Save {dealProduct.discount}%
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({ productId: dealProduct._id })}
                  className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </motion.button>
                
                <Link to={`/product/${dealProduct._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-white text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-black hover:bg-opacity-10 transition-colors"
                  >
                    <span>View Details</span>
                    <FaArrowRight />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-full animate-pulse" />
              <div className="absolute -inset-0.5 bg-white bg-opacity-20 rounded-full" />
              <div className="relative bg-white rounded-full p-8 shadow-2xl">
                <img 
                  src={dealProduct.imageCover.secure_url} 
                  alt={dealProduct.title}
                  className="w-full h-auto max-h-80 object-contain mx-auto"
                />
              </div>
              
              <div className="absolute -top-4 -right-4 bg-red-500 text-white font-bold text-xl w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <div className="transform -rotate-12">
                  -{dealProduct.discount}%
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay; 