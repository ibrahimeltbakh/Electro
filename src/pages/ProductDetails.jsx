import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAddToCart from "@/Hooks/cart/useAddToCart";
import useAddToWishlist from "@/Hooks/wishList/useAddToWishlist";
import { motion } from 'framer-motion';
import ReviewForm from "@/components/Reviews/ReviewForm";
import useSpacificProduct from "@/Hooks/products/useSpacificProduct";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import ProductGallery from "@/components/productDetails/ProductGallery";
import ProductInfo from "./../components/productDetails/ProductInfo";
import ReviewList from "./../components/productDetails/ReviewList";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductDetails() {
  const { mutate } = useAddToCart();
  const mutation = useAddToWishlist();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { data, isLoading, isError, error } = useSpacificProduct({
    productId: id,
  });

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Loading />
      </div>
    );
  }

  const { product } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to shop</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
            <div className="p-6 md:p-8">
              <ProductGallery
                product={product}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>

            <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700">
              <ProductInfo
                product={product}
                mutate={mutate}
                mutation={mutation}
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <RelatedProducts product={product} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900/40 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
                {product?.reviews?.length || 0}
              </span>
              Customer Reviews
            </h2>
            <ReviewList reviews={product?.reviews} />
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Write a Review</h2>
            <ReviewForm productId={id} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
