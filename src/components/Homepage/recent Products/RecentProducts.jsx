import useProducts from "@/Hooks/products/useProducts";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import ProductCard from "@/components/Cards/Product/productCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

// Custom arrow components for the slider
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-50 transition-all"
      style={{ ...style }}
      onClick={onClick}>
      <FaArrowLeft className="text-blue-600" />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-50 transition-all"
      style={{ ...style }}
      onClick={onClick}>
      <FaArrowRight className="text-blue-600" />
    </div>
  );
};

const RecentProducts = ({
  numberOfProducts,
  start,
  name,
  showSlider = false,
}) => {
  start = start || 0;
  numberOfProducts = numberOfProducts || 8;
  name = name || "Products";
  const { data, isLoading, isError, error } = useProducts();
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-out-cubic",
      delay: 100,
      offset: 120,
    });
  }, []);

  useEffect(() => {
    if (data?.products) {
      // For slider, use first 6 products, for grid use the rest
      setVisibleProducts(data.products.slice(start, start + numberOfProducts));
    }
  }, [data, start, numberOfProducts]);

  const sliderSettings = {
    dots: true,
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
        },
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isError) {
    return (
      <>
        <div>
          <Error error={error} />
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div>
          <Loading />
        </div>
      </>
    );
  }

  // Determine which products to show in slider vs grid
  const sliderProducts =
    name === "Best Seller"
      ? data.products.slice(0, 6)
      : data.products.slice(start, start + Math.min(6, numberOfProducts));

  const gridProducts =
    name === "Best Seller"
      ? data.products.slice(6, 6 + numberOfProducts - 6)
      : data.products.slice(
          start + Math.min(6, numberOfProducts),
          start + numberOfProducts
        );

  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-center relative pb-3">
          <span className="relative z-10">{name}</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
        </motion.h2>

        {/* Products Slider - Displayed for "Best Seller" or when showSlider is true */}
        {(name === "Best Seller" || showSlider) &&
          sliderProducts.length > 0 && (
            <div className="mb-16 relative px-6" data-aos="fade-up">
              <Slider {...sliderSettings}>
                {sliderProducts.map((product) => (
                  <div key={product._id} className="px-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </Slider>
            </div>
          )}

        {/* Products Grid */}
        {gridProducts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gridProducts.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={index * 50}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RecentProducts;
