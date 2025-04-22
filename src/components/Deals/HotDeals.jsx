import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import headphoneImg from '../../../src/assets/Images/hero-headphones.png'; // Replace with your image path
import smartphone from '../../../src/assets/Images/smartphone.jpg'; // Replace with your image path
import tablet from '../../../src/assets/Images/tablet.png'; // Replace with your image path
import smartwatch from '../../../src/assets/Images/smartwatch.png'; // Replace with your image path

const HotDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const timerInterval = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;

      if (difference <= 0) {
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="py-16 bg-gray-900 mb-5 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            HOT DEAL THIS WEEK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl opacity-90 mb-8"
          >
            NEW COLLECTION UP TO 50% OFF
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-4 mb-10"
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="w-20 h-20 bg-blue-600 rounded-full flex flex-col items-center justify-center"
              >
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-xs uppercase">{unit}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Now
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>

        {/* Featured Deals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
        >
          {/* Deal 1 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl overflow-hidden group"
          >
            <div className="relative">
              <img
              src={headphoneImg}
                alt="Wireless Headphones"
                className="w-full h-40 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                -30%
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-1">Premium Headphones</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-400">$69.99</span>
                  <span className="text-sm line-through text-gray-400 ml-2">$99.99</span>
                </div>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">Limited Offer</span>
              </div>
            </div>
          </motion.div>

          {/* Deal 2 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl overflow-hidden group"
          >
            <div className="relative">
              <img
              src={smartwatch}
                alt="Smart Watch"
                className="w-full h-40 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                -25%
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-1">Smart Watch Gen 4</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-400">$89.99</span>
                  <span className="text-sm line-through text-gray-400 ml-2">$119.99</span>
                </div>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">Limited Offer</span>
              </div>
            </div>
          </motion.div>

          {/* Deal 3 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl overflow-hidden group"
          >
            <div className="relative">
              <img
                src={smartphone}
                alt="Smartphone"
                className="w-full h-40 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                -40%
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-1">Premium Smartphone</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-400">$499.99</span>
                  <span className="text-sm line-through text-gray-400 ml-2">$839.99</span>
                </div>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">Limited Offer</span>
              </div>
            </div>
          </motion.div>

          {/* Deal 4 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl overflow-hidden group"
          >
            <div className="relative">
              <img
                src={tablet}
                alt="Tablet"
                className="w-full h-40 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                -20%
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-1">Premium Tablet</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-400">$299.99</span>
                  <span className="text-sm line-through text-gray-400 ml-2">$379.99</span>
                </div>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">Limited Offer</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HotDeals; 