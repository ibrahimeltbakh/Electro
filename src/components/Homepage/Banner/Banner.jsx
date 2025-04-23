import { useEffect } from "react";
import "aos/dist/aos.css";
import banner1 from "../../../assets/Images/Banner/Screenshot 2025-04-15 172239.png";
import banner2 from "../../../assets/Images/Banner/Screenshot 2025-04-15 172617.png";
import "./Banner.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Aos from "aos";

const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-out-sine',
      delay: 100,
    });
  }, []);

  return (
    <section className="overflow-hidden py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-2xl"
            data-aos="fade-right"
          >
            <div className="magical-container">
              <div className="magical-glow"></div>
              <Link to="/shop" className="block">
                <img 
                  src={banner1} 
                  className="w-full h-full object-cover magical-image" 
                  alt="Electronics promotion" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Latest Electronics</h3>
                    <p className="mb-4 text-sm md:text-base">Check out our newest arrivals</p>
                    <span className="px-4 py-2 bg-white text-blue-900 rounded-full font-medium inline-block hover:bg-blue-100 transition-colors">
                      Explore Now
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-2xl"
            data-aos="fade-left"
          >
            <div className="magical-container">
              <div className="magical-glow"></div>
              <Link to="/shop" className="block">
                <img 
                  src={banner2} 
                  className="w-full h-full object-cover magical-image" 
                  alt="Electronics promotion" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Special Offers</h3>
                    <p className="mb-4 text-sm md:text-base">Limited time discounts up to 40%</p>
                    <span className="px-4 py-2 bg-white text-blue-900 rounded-full font-medium inline-block hover:bg-blue-100 transition-colors">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
