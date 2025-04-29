import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import useBrands from "@/Hooks/Brands/useBrands";
import { Link } from "react-router-dom";

export default function Brands() {
  const { data, isLoading, isError } = useBrands();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  // Filter brands based on search query
  const filteredBrands = data?.brands?.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our Brands
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Discover premium quality products from the world's top electronics
              brands.
            </p>

            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search brands..."
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

      <div className="container mx-auto px-4 py-12">
        <div className="my-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Browse Our Brands
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredBrands?.length} brand
            {filteredBrands?.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10">
          {filteredBrands?.map((brand, index) => (
            <motion.div
              key={brand._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group ">
              <Link
                to={`/brands/${brand.name}`}
                className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full ">
                <div className="relative p-6 flex flex-col items-center">
                  <div className="h-32  w-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg mb-6 overflow-hidden relative">
                    <motion.img
                      src={brand.image.secure_url}
                      alt={brand.name}
                      className="max-h-28 max-w-full object-contain transition-transform duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>

                  <div className="text-center w-full">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {brand.name}
                    </h3>

                    <div className="flex items-center justify-center mt-4">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center group-hover:underline">
                        View Products
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

                <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredBrands?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No brands found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search query
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Show All Brands
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
