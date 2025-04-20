import React from "react";
import { useParams } from "react-router-dom";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useSpacificCategory from "@/Hooks/category/useSpacificCategory";
import UpdateCategoryForm from "@/components/Admin/Categories/UpdateCategoryForm";
export default function UpdateCategory() {
  const { id } = useParams();
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useSpacificCategory({ categoryId: id });

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <UpdateCategoryForm category={category?.category} />;
}
