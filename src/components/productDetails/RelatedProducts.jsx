import React from "react";
import useProducts from "@/Hooks/products/useProducts";
import ProductCard from "../Cards/ProductCard";
export default function RelatedProducts({ product }) {
  const { data: products } = useProducts();
  const relatedProducts = products?.products?.filter(
    (rProduct) => rProduct?.category?.name === product?.category?.name
  );
  console.log(relatedProducts);
  return (
    relatedProducts && (
      <>
        <h2 className="mt-10 text-2xl font-bold mb-6 text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((rProduct) => (
            <ProductCard key={rProduct._id} product={rProduct} />
          ))}
        </div>
      </>
    )
  );
}
