import Loading from "@/components/Loading/Loading";
import useProducts from "@/Hooks/products/useProducts";
import React from "react";
import ProductsTable from "../../../components/Admin/Products/ProductsTable";

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  console.log(data);

  if (isError) {
    return <Error error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (data?.count === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2>Your Products is empty</h2>
      </div>
    );
  }
  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10 ">
      <h1 className="text-secondary-foreground text-3xl font-bold ">
        Your Products
      </h1>

      <ProductsTable products={data?.products} />
    </div>
  );
}
