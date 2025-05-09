import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFilter,
  FaThLarge,
  FaThList,
  FaCheck,
  FaSearch,
  FaArrowLeft,
  FaShoppingCart,
} from "react-icons/fa";
import useProducts from "@/Hooks/products/useProducts";
import useBrands from "@/Hooks/Brands/useBrands";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import ProductCard from "@/components/Cards/Product/productCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandDetail = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts();
  const {
    data: brandsData,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useBrands();
  const { mutate: addToCart } = useAddToCart();

  const currentBrand = brandsData?.brands?.find(
    (brand) => brand._id === id || brand.name === id
  );

  const filteredProducts =
    productsData?.products
      ?.filter((product) => {
        if (!currentBrand) return false;
        return product.brand._id === currentBrand._id;
      })
      .filter(
        (product) =>
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  if (productsLoading || brandsLoading) {
    return <Loading />;
  }

  if (productsError || brandsError || !currentBrand) {
    return <Error />;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <FaArrowLeft className="text-sm" />
            <span>Back to Brands</span>
          </Link>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div
                className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
                style={{
                  backgroundImage: `url(${currentBrand.image.secure_url})`,
                  transform: "scale(1.1)",
                }}></div>

              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl inline-block max-w-2xl">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full shadow-xl p-4 flex items-center justify-center">
                      <img
                        src={currentBrand.image.secure_url}
                        alt={currentBrand.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-md">
                        {currentBrand.name}
                      </h1>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium bg-blue-500/30 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                          Official Store
                        </span>
                        <span className="text-xs font-medium bg-green-500/30 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                          {filteredProducts.length} Products
                        </span>
                      </div>
                      <p className="text-indigo-100 text-sm sm:text-base drop-shadow-md max-w-lg">
                        {currentBrand.description ||
                          `${currentBrand.name} is a leading manufacturer of high-quality products. Browse our collection of premium ${currentBrand.name} items.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  About {currentBrand.name}
                </h2>
                <p className="text-indigo-100 mb-6">
                  {currentBrand.name} has been a trusted name in the industry
                  for years, delivering exceptional products that combine
                  innovation, quality, and style.
                </p>
                <ul className="space-y-3">
                  {[
                    "Premium Quality",
                    "Innovation",
                    "Customer Satisfaction",
                    "Warranty Coverage",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white">
                      <span className="bg-green-500/30 backdrop-blur-sm w-6 h-6 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <FaCheck className="text-green-300 text-xs" />
                      </span>
                      <span className="text-indigo-100">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-800">
                <div className="w-full h-full flex items-center justify-center p-10 bg-indigo-900/30">
                  <img
                    src={currentBrand.image.secure_url}
                    alt={currentBrand.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-8 p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}>
                <FaFilter className={showFilters ? "text-indigo-600" : ""} />
                <span>Filters</span>
              </button>

              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                  <FaThList />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
                Price Range
              </h3>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${priceRange[0]}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${priceRange[1]}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="w-full accent-indigo-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPriceRange([0, 5000])}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              No products found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your filters or search terms to find what you're
              looking for.
            </p>
            <button
              onClick={() => {
                setPriceRange([0, 5000]);
                setSearchTerm("");
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {currentBrand.name} Products
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {sortedProducts.length} products found
              </span>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-6 w-full"
              }>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    type:
                      viewMode === "grid"
                        ? ["spring", "easeOut", "easeIn", "tween"][index % 4]
                        : "spring",
                  }}
                  className={viewMode === "list" ? "w-full" : ""}>
                  {viewMode === "grid" ? (
                    <ProductCard product={product} />
                  ) : (
                    <div className="w-full flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-1/4 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                        <img
                          src={product.imageCover.secure_url}
                          alt={product.title}
                          className="max-h-32 max-w-full object-contain"
                        />
                      </div>
                      <div className="w-3/4 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                            {product.title}
                          </h3>
                          <div className="flex items-center text-yellow-400 text-sm mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">
                              4.8 (120 reviews)
                            </span>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-indigo-600">
                              ${product.price}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-sm line-through text-gray-400">
                                ${product.oldPrice}
                              </span>
                            )}
                            {product.discount > 0 && (
                              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart({ productId: product._id });
                            }}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <FaShoppingCart className="text-sm" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {sortedProducts.length > 0 && (
          <div className="mt-16 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Similar Products From Other Brands
              </h2>
              <Link
                to="/shop"
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                View All Products
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Slider {...sliderSettings}>
                {productsData?.products
                  ?.filter((product) => {
                    if (!currentBrand) return false;
                    return (
                      product.brand._id !== currentBrand._id &&
                      filteredProducts.length > 0 &&
                      filteredProducts.some(
                        (fp) => fp.category._id === product.category._id
                      )
                    );
                  })
                  .slice(0, 8)
                  .map((product) => (
                    <div key={product._id} className="px-2">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        )}

        {sortedProducts.length > 0 && (
          <div className="mt-16 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                More From {currentBrand.name}
              </h2>
              <Link
                to="/shop"
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                View All Products
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <Slider {...sliderSettings}>
                {productsData?.products
                  ?.filter((product) => {
                    if (!currentBrand) return false;
                    return (
                      product.brand._id === currentBrand._id &&
                      !filteredProducts.includes(product)
                    );
                  })
                  .slice(0, 8)
                  .map((product) => (
                    <div key={product._id} className="px-2">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDetail;
