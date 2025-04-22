import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import hero from "../../assets/Images/WhatsApp Image 2025-04-16 at 23.56.16_c2559278.jpg";
import headphonesImg from "../../assets/Images/hero-headphones.png"; // Assuming you have this image

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-[600px] overflow-hidden bg-gradient-to-r from-blue-950 to-indigo-900"
    >
      {/* Circular gradient follows mouse */}
      <motion.div
        className="absolute opacity-40 rounded-full w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 blur-xl"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 150 }}
      />
      
      {/* Content */}
      <div className="container mx-auto h-full relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-blue-400">Get Best Device</span>
                <br />
                With Lowest Price
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-sm md:text-base max-w-md opacity-90"
            >
              Find a lineup of quality computers designed, developed and maintained 
              by Electro Inc, added to the fact that they are created operating 
              at world-class standards.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Link to="/shop">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white px-8 py-3 rounded-full font-medium"
                >
                  Explore Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex justify-center items-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Circular glow behind product */}
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full opacity-30 blur-xl" />
              
              {/* Product badge */}
              <motion.div 
                className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-full z-20"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                New Release
              </motion.div>
              
              {/* Main product image - replace with a headphones image that has transparency */}
              <img 
                src={headphonesImg} 
                alt="Premium Headphones" 
                className="relative z-10 w-80 h-80 object-contain" 
              />
              
              {/* Feature badges */}
              <motion.div 
                className="absolute -left-20 top-1/3 bg-white bg-opacity-90 backdrop-blur-sm text-blue-900 p-2 rounded-lg shadow-lg text-sm font-medium"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                Premium Sound
              </motion.div>
              
              <motion.div 
                className="absolute -right-10 bottom-1/4 bg-white bg-opacity-90 backdrop-blur-sm text-blue-900 p-2 rounded-lg shadow-lg text-sm font-medium"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                Noise Cancellation
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
