import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaFilter,
  FaSortAmountDown,
  FaThLarge,
  FaThList,
  FaSearch,
  FaArrowLeft,
  FaShoppingCart,
} from "react-icons/fa";
import useProducts from "@/Hooks/products/useProducts";
import useCategories from "@/Hooks/category/usecatergories";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import ProductCard from "@/components/Cards/newArrivalsAndPopularItems";

const CategoryDetail = () => {
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
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const { mutate: addToCart } = useAddToCart();

  const currentCategory = categoriesData?.categories?.find(
    (cat) => cat._id === id || cat.name === id
  );

  const filteredProducts =
    productsData?.products
      ?.filter((product) => {
        if (!currentCategory) return false;
        return product.category._id === currentCategory._id;
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

  if (productsLoading || categoriesLoading) {
    return <Loading />;
  }

  if (productsError || categoriesError || !currentCategory) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <FaArrowLeft className="text-sm" />
          <span>Back to Categories</span>
        </Link>

        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={currentCategory.image.secure_url}
                  alt={currentCategory.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {currentCategory.name}
                </h1>
                <p className="text-gray-600 text-sm max-w-2xl">
                  {currentCategory.description ||
                    `Explore our selection of ${currentCategory.name}. Find the best deals with fast shipping and great customer service.`}
                </p>
                <div className="mt-2">
                  <span className="text-sm font-medium">
                    {filteredProducts.length} products found
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                  showFilters
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-300 text-gray-700"
                }`}>
                <FaFilter className={showFilters ? "text-blue-600" : ""} />
                <span>Filters</span>
              </button>

              <div className="flex items-center bg-gray-100 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-500"
                  }`}>
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-500"
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
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 whitespace-nowrap">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2">
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-gray-800">
                Price Range
              </h3>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    ${priceRange[0]}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
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
                    className="w-full"
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
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPriceRange([0, 5000])}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search terms to find what you're
              looking for.
            </p>
            <button
              onClick={() => {
                setPriceRange([0, 5000]);
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "flex flex-col gap-4"
            }>
            {sortedProducts.map((product) => (
              <div key={product._id}>
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="w-1/4 p-4 flex items-center justify-center bg-gray-50">
                      <img
                        src={product.imageCover.secure_url}
                        alt={product.title}
                        className="max-h-32 max-w-full object-contain"
                      />
                    </div>
                    <div className="w-3/4 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">
                            ${product.price}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-sm line-through text-gray-400">
                              ${product.oldPrice}
                            </span>
                          )}
                          {product.discount > 0 && (
                            <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded-md">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart({ productId: product._id })}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm">
                          <FaShoppingCart className="text-sm" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="mt-12 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {productsData?.products
                ?.filter((product) => {
                  if (!currentCategory) return false;
                  return product.category._id !== currentCategory._id;
                })
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
