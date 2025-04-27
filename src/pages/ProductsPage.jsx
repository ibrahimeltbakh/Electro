/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFilter,
  FaSearch,
  FaTimes,
  FaArrowLeft,
  FaArrowUp,
  FaThLarge,
  FaThList,
} from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import useBrands from "@/Hooks/Brands/useBrands";
import useCategories from "@/Hooks/category/usecatergories";
import useProducts from "@/Hooks/products/useProducts";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import useAddToWishlist from "@/Hooks/wishList/useAddToWishlist";
import useRemoveFromWishlist from "@/Hooks/wishList/useRemoveFromWishlist";
import useGetWishList from "@/Hooks/wishList/useGetWishList";
import ShopCard from "@/components/Cards/Product/ShopCard";

export default function ProductsPage() {
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Pagination settings
  const itemsPerPage = 8;

  // Hooks

  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { data: wishlistData } = useGetWishList();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError,
  } = useBrands();
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  // Keep track of products in wishlist
  const [productsInWishlist, setProductsInWishlist] = useState({});

  useEffect(() => {
    if (wishlistData?.wishlist?.products) {
      const wishlistMap = {};
      wishlistData.wishlist.products.forEach((item) => {
        wishlistMap[item._id] = true;
      });
      setProductsInWishlist(wishlistMap);
    }
  }, [wishlistData]);

  useEffect(() => {
    if (productsData?.products && isFilterApplied) {
      applyFilters();
    }
  }, [sortBy, isFilterApplied, productsData]);

  // Check loading and error states
  if (categoriesLoading || brandsLoading || productsLoading) {
    return <Loading />;
  }

  if (categoriesError || brandsError || productsError) {
    return <Error />;
  }

  // Toggle category selection
  const toggleCategory = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Toggle brand selection
  const toggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = productsData?.products || [];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand.name)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.name)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy !== "featured") {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "price-low-high":
            return a.price - b.price;
          case "price-high-low":
            return b.price - a.price;
          case "name-a-z":
            return a.title.localeCompare(b.title);
          case "name-z-a":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
    setIsFilterApplied(true);
    setMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setSearchQuery("");
    setSortBy("featured");
    setFilteredProducts([]);
    setIsFilterApplied(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "EG-AR";
  recognition.continuous = false;
  const startListening = () => {
    recognition.start();
  };
  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    setSearchQuery(voiceText);
  };
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = isFilterApplied
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : productsData?.products?.slice(indexOfFirstProduct, indexOfLastProduct) ||
      [];

  const totalProducts = isFilterApplied
    ? filteredProducts.length
    : productsData?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Shop Our Collection
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Discover the latest tech gadgets and electronics with unbeatable
              prices and exceptional quality.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-full border-0 shadow-lg focus:ring-2 bg-white text-gray-500 placeholder:text-gray-400  focus:ring-blue-500 outline-none"
              />
              <div className="flex gap-2 justify-between items-center">
                <button
                  type="button"
                  onClick={startListening}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-blue-600 p-1">
                  <MdOutlineKeyboardVoice size={24} />
                </button>
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 p-1">
                  <FaSearch size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800">
              <FaFilter />
              <span className="hidden sm:inline">Filters</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                <FaThList />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <label className="text-gray-700 dark:text-gray-300 text-sm mr-2 whitespace-nowrap">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  if (isFilterApplied) {
                    applyFilters();
                  }
                }}
                className="border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 py-2 px-3 bg-white dark:bg-gray-800">
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A-Z</option>
                <option value="name-z-a">Name: Z-A</option>
              </select>
            </div>

            {isFilterApplied && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 font-medium">
                <FaTimes />
                <span className="hidden sm:inline">Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div
            className={`fixed inset-0 z-50 transform ${
              mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
            } lg:static lg:z-0 lg:translate-x-0 lg:w-1/4 px-4 transition-transform duration-300 ease-in-out`}>
            <div className="h-full lg:h-auto overflow-y-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg lg:shadow-md">
              <div className="flex justify-between items-center mb-6 lg:mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-gray-500 dark:text-gray-400">
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Categories
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {categoriesData?.categories?.map((category) => (
                    <label
                      key={category._id}
                      className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Brands
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {brandsData?.brands?.map((brand) => (
                    <label
                      key={brand._id}
                      className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => toggleBrand(brand.name)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {brand.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Price Range
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      ${priceRange[0]}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      ${priceRange[1]}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={applyFilters}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {mobileFiltersOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}></div>
          )}

          <div className="w-full lg:w-3/4 px-4">
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts}{" "}
                products
              </p>
            </div>

            {currentProducts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-md">
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
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-6"
                  }>
                  {currentProducts.map((product) => (
                    <ShopCard
                      key={product._id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}>
                        <FaArrowLeft />
                      </button>

                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => paginate(i + 1)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === i + 1
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}>
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}>
                        <FaArrowUp className="transform rotate-90" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
