import React from "react";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import BrandsTable from "@/components/Admin/Brands/BrandsTable";
import useBrands from "@/Hooks/Brands/useBrands";

export default function Brands() {
  const { data, isLoading, isError, error } = useBrands();

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (data?.count === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2>Your Brands are empty</h2>
      </div>
    );
  }

  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
      <h1 className="text-secondary-foreground text-3xl font-bold">
        Your Brands
      </h1>

      <BrandsTable brands={data.brands} />
    </div>
  );
}
