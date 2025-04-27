import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaGem } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useProducts from "@/Hooks/products/useProducts";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import FeaturedAndBestSellers from "../Cards/Product/FeaturedAndBestSellers";

// Custom arrow components for the slider
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#6366f1" }}
      whileTap={{ scale: 0.9 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:text-white transition-all -ml-5 md:ml-0"
      onClick={onClick}>
      <FaArrowLeft className="text-indigo-600 group-hover:text-white" />
    </motion.div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: "#6366f1" }}
      whileTap={{ scale: 0.9 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:text-white transition-all -mr-5 md:mr-0"
      onClick={onClick}>
      <FaArrowRight className="text-indigo-600 group-hover:text-white" />
    </motion.div>
  );
};

const FeaturedProductsSlider = () => {
  const { data, isLoading, isError } = useProducts();

  // Track hovered product for more dynamic animations
  const [hoveredProduct, setHoveredProduct] = useState(null);

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
    appendDots: (dots) => (
      <div className="custom-dots">
        <ul className="flex justify-center gap-1 mt-6"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 cursor-pointer transition-colors"></div>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  // Get first 8 products for featured
  const featuredProducts = data?.products?.slice(0, 8) || [];

  return (
    <div className="py-20 overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50/30 to-white dark:from-gray-800 dark:via-purple-900/10 dark:to-gray-900">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full transform -rotate-6"></div>
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 rounded-xl rotate-3 shadow-lg">
                <FaGem className="text-3xl" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Handpicked products curated for you
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block">
            <Link to="/shop" className="inline-flex items-center group">
              <span className="relative overflow-hidden">
                <span className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors">
                  Explore Collection
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
              <FaArrowRight className="ml-2 text-sm text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="relative px-6">
          <Slider {...settings} className="featured-slider -mx-4">
            {featuredProducts.map((product, index) => {
              const isHovered = hoveredProduct === product._id;

              return (
                <FeaturedAndBestSellers
                  product={product}
                  index={index}
                  key={product._id}
                  cardFor="featured"
                  isHovered={isHovered}
                  setHoveredProduct={setHoveredProduct}
                />
              );
            })}
          </Slider>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex justify-center md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all font-medium">
              <span>View Collection</span>
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      <style jsx="true">{`
        .featured-slider .slick-dots li {
          margin: 0 3px;
        }

        .featured-slider .slick-dots li.slick-active div {
          background-color: #6366f1;
          transform: scale(1.2);
        }

        @media (prefers-color-scheme: dark) {
          .featured-slider .slick-dots li.slick-active div {
            background-color: #818cf8;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedProductsSlider;
