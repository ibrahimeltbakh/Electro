import useProducts from '@/Hooks/products/useProducts'
import React from 'react'
import Loading from '@/components/Loading/Loading'
import Error from '@/components/Error/Error'
import ProductCard from '@/components/Cards/ProductCard'

const RecentProducts = ({ numberOfProducts, start, name }) => {
  start = start || 0;
  numberOfProducts = numberOfProducts || 8;
  name = name || "Products"
  const { data, isLoading, isError, error } = useProducts();

  if (isError) {
    return (
      <>
        <div><Error /></div>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <div><Loading /></div>
      </>
    );
  }
  return (
    <div className="container mx-auto p-4  ">
      <h1 className="text-2xl font-bold mb-6 text-center">{name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {data?.products?.map((product, index) => (
          index >= start && index < numberOfProducts && <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
