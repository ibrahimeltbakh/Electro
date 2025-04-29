import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import useCategories from "../Hooks/category/usecatergories";
import useProducts from "@/Hooks/products/useProducts";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function Categories() {
  const { data, isLoading, isError } = useCategories();
  const { data: productsData } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.categories && productsData?.products) {
      // Add product count to each category
      const categoriesWithCount = data.categories.map((category) => {
        const productCount = productsData.products.filter(
          (product) => product.category._id === category._id
        ).length;

        return {
          ...category,
          productCount,
        };
      });

      setCategories(categoriesWithCount);
    }
  }, [data, productsData]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define background colors for categories
  const bgColors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
    "from-orange-400 to-red-500",
    "from-cyan-500 to-blue-500",
    "from-indigo-500 to-purple-500",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Shop By Categories
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Browse our wide range of products organized by categories for
              easier shopping
            </p>

            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-full border-0 shadow-lg focus:ring-2 bg-white text-gray-500 placeholder:text-gray-400  focus:ring-blue-500 outline-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                <FaSearch size={20} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 ">
        <div className="my-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            All Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredCategories.length} categor
            {filteredCategories.length !== 1 ? "ies" : "y"} available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="rounded-xl overflow-hidden relative group h-64">
              <Link to={`/category/${category._id}`}>
                <div
                  className={`h-full bg-gradient-to-br ${
                    bgColors[index % bgColors.length]
                  } relative overflow-hidden`}>
                  {/* Category Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img
                      src={category.image.secure_url}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain transform transition-transform duration-500 group-hover:scale-110 filter brightness-110"
                    />
                  </div>

                  {/* Category Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white text-sm">
                        {category.productCount || 0} Products
                      </span>
                      <span className="text-white text-sm font-medium group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                        Shop Now
                        <motion.span
                          className="inline-block ml-1"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}>
                          <FaArrowRight size={12} />
                        </motion.span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search query
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Show All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
