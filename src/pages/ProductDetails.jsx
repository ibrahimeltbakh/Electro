import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

export default function ProductDetails() {
  const { mutate } = useAddToCart();
  const mutation = useAddToWishlist();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { data, isLoading, isError, error } = useSpacificProduct({
    productId: id,
  });

  const MotionDiv = motion.div;
  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { product } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br py-8">
      <div className="container mx-auto px-4 ">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Gallery Section */}
            <ProductGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            {/* Product Details Section */}
            <ProductInfo
              product={product}
              mutate={mutate}
              mutation={mutation}
            />
          </div>
        </MotionDiv>
      </div>

      <div className="mt-10 container mx-auto px-4">
        <RelatedProducts product={product} />
      </div>

      <div className="mt-10 container mx-auto px-4">
        {/* Reviews Section */}
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-5">Reviews</h2>
          <ReviewList reviews={product?.reviews} />
        </div>
        <h2 className="text-2xl font-bold my-5">Write a Review</h2>
        <ReviewForm productId={id} />
      </div>
     
    </div>
  );
}
