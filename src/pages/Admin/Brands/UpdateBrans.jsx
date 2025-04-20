import React from "react";
import { useParams } from "react-router-dom";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useSpacificBrand from "@/Hooks/Brands/useSpacificBrand";
import UpdateBrandForm from "@/components/Admin/Brands/UpdateBrandForm";

export default function UpdateBrand() {
  const { id } = useParams();
  const {
    data: brand,
    isLoading,
    isError,
    error,
  } = useSpacificBrand({ brandId: id });

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <UpdateBrandForm brand={brand?.brand} />;
}
