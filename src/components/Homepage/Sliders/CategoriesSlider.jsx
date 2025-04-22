import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import useCategories from "../../../Hooks/category/usecatergories";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";

// Custom arrow components for the slider
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

const CategoriesSlider = () => {
  const { data, isLoading, isError } = useCategories();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
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

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-center relative pb-3"
        >
          <span className="relative z-10">Shop by Category</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
        </motion.h2>
        
        <div className="relative px-6">
          <Slider {...settings}>
            {data?.categories?.map((category) => (
              <div key={category._id} className="p-4">
                <Link to={`/category/${category.name}`}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 overflow-hidden shadow-md relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={category.image.secure_url}
                        alt={category.name}
                        className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-center font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{category.name}</h3>
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

export default CategoriesSlider;
