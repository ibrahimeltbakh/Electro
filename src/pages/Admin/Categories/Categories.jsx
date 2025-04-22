import React from "react";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import CategoriesTable from "@/components/Admin/Categories/CategoriesTable";
import useCategories from "@/Hooks/category/usecatergories";

export default function Categories() {
  const { data, isLoading, isError, error } = useCategories();

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (data?.count === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2>Your Categories are empty</h2>
      </div>
    );
  }

  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
      <h1 className="text-secondary-foreground text-3xl font-bold">
        Your Categories
      </h1>

      <CategoriesTable categories={data.categories} />
    </div>
  );
}
