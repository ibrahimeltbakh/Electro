import { useState } from "react";
import Loading from "@/components/Loading/Loading";
import RecentProducts from "@/components/recent Products/RecentProducts";
import useBrands from "@/Hooks/Brands/useBrands";
import useCategories from "@/Hooks/category/usecatergories";
import useProducts from "@/Hooks/products/useProducts"; // افترضنا إن دي موجودة
import { FaExchangeAlt, FaEye, FaHeart } from "react-icons/fa";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import useAddToWishlist from "@/Hooks/wishList/useAddToWishlist";

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  let numberOfProducts = 8;
  let start = 0;
  const { mutate } = useAddToCart();
  const mutation = useAddToWishlist();

  const { data, isLoading, error } = useCategories();
  const {
    data: brandData,
    isLoading: brandIsLoading,
    error: brandError,
  } = useBrands();
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  if (isLoading || brandIsLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error || brandError || productsError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl">Something went wrong</h1>
      </div>
    );
  }

  // فلترة السعر
  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setPriceRange([0, value]);
  };

  // اختيار براند
  function toggleBrand(value) {
    setBrand((prev) =>
      prev.includes(value) ? prev.filter((b) => b !== value) : [...prev, value]
    );
  }

  // اختيار كاتيجوري
  function toggleCategory(value) {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  }

  // تطبيق الفلتر
  const applyFilter = () => {
    let filtered = productsData?.products || [];
    console.log(filtered);

    if (brand.length > 0) {
      filtered = filtered.filter((product) =>
        brand.includes(product.brand.name)
      );
    }
    console.log(filtered);

    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category.name)
      );
    }
    console.log(filtered);
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProduct(filtered);
    console.log(filtered);
  };

  // تصفية الكل
  const clearFilter = () => {
    setBrand([]);
    setCategory([]);
    setPriceRange([0, 2000]);
    setFilteredProduct([]);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (currentPage == 1) {
    numberOfProducts = 8;
    start = 0;
  } else if (currentPage == 2) {
    numberOfProducts = 16;
    start = 8;
  } else if (currentPage == 3) {
    numberOfProducts = 24;
    start = 16;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border w-64 p-4 bg-white rounded-lg shadow-lg mt-6 mb-3">
          <h2 className="text-purple-700 text-xl font-bold mb-4">Filters</h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="bg-blue-900 text-white px-4 py-2 rounded-t-md mb-3">
              Category
            </h3>
            <div className="space-y-2">
              {data.categories.map((c) => (
                <label key={c._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={category.includes(c.name)}
                    onChange={() => toggleCategory(c.name)}
                    className="form-checkbox"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="mb-6">
            <h3 className="bg-blue-900 text-white px-4 py-2 rounded-t-md mb-3">
              Brand
            </h3>
            <div className="space-y-2">
              {brandData.brands.map((b) => (
                <label key={b._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={brand.includes(b.name)}
                    onChange={() => toggleBrand(b.name)}
                    className="form-checkbox"
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="bg-blue-900 text-white px-4 py-2 rounded-t-md">
              Price
            </h3>
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span>0</span>
                <span>{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={applyFilter}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Apply
            </button>
            <button
              onClick={clearFilter}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Clear
            </button>
          </div>
        </div>

        {/* Products */}
        <div className=" bg-amber-800    w-full md:w-2/3 lg:w-3/4 mt-6 md:mt-0 md:pl-4">
          <div className="w-full">
            {filteredProduct.length > 0 ? (
              <>
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Filtered Products
                </h1>
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-6 text-center">
                    {name}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                    {filteredProduct.map(
                      (product, index) =>
                        index >= start &&
                        index < numberOfProducts && (
                          <div
                            key={product._id}
                            className="border rounded-lg p-4 shadow-md bg-white relative flex flex-col justify-between min-h-[400px]">
                            {/* Badge */}
                            <div className="absolute top-2 left-2">
                              {product.discount ? (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                  -{product.discount}%
                                </span>
                              ) : (
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                  NEW
                                </span>
                              )}
                            </div>

                            {/* صورة المنتج */}
                            <img
                              src={product.imageCover.secure_url}
                              alt={product.title}
                              className="w-full h-48 object-contain rounded-lg mb-4"
                            />

                            {/* أيقونات */}
                            <div className="flex justify-center gap-3 mb-2 text-gray-600">
                              <FaHeart
                                onClick={() =>
                                  mutation?.mutate({ productId: product._id })
                                }
                                className="cursor-pointer hover:text-red-500"
                              />
                              <FaExchangeAlt className="cursor-pointer hover:text-blue-500" />
                              <FaEye className="cursor-pointer hover:text-green-500" />
                            </div>

                            {/* عنوان وتقييم */}
                            <h2 className="text-lg font-semibold mb-1 text-center">
                              {product.title}
                            </h2>
                            <div className="flex justify-center text-yellow-400 mb-2">
                              {"★".repeat(5)}
                            </div>

                            {/* السعر */}
                            <div className="flex justify-center items-center gap-2 mb-4">
                              <span className="text-lg font-bold text-green-600">
                                ${product.price}
                              </span>
                              <span className="text-sm line-through text-gray-500">
                                ${product.oldPrice || 50.99}
                              </span>
                            </div>

                            {/* زر السلة في الأسفل */}
                            <button
                              onClick={() => mutate({ productId: product._id })}
                              className="mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                              ADD TO CART
                            </button>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <RecentProducts
                numberOfProducts={numberOfProducts}
                start={start}
              />
            )}

            {/* Pagination */}
            <div className="flex justify-center my-4">
              {[1, 2, 3].map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 mx-1 rounded-md ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}>
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
