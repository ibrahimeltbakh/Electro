import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useBrands from "../../../Hooks/Brands/useBrands";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md cursor-pointer hover:bg-blue-50 transition-all -ml-5"
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
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md cursor-pointer hover:bg-blue-50 transition-all -mr-5"
      onClick={onClick}
    >
      <FaArrowRight className="text-blue-600" />
    </motion.div>
  );
};

const BrandSlider = () => {
  const { data, isLoading, isError } = useBrands();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
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

  return (
    <div className="py-10 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-center relative pb-3"
        >
          <span className="relative z-10">Top Brands</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
        </motion.h2>
        
        <div className="relative px-6">
          <Slider {...settings}>
            {data?.brands?.map((brand) => (
              <div key={brand._id} className="px-4">
                <Link to={`/brand/${brand.name}`}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 h-24 flex flex-col items-center justify-center shadow-sm transition-all duration-300"
                  >
                    <img
                      src={brand.image.secure_url}
                      alt={brand.name}
                      className="max-h-16 max-w-full object-contain mx-auto transition-all duration-300"
                    />
                    <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center transition-colors">
                      {brand.name}
                    </p>
                  </motion.div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
