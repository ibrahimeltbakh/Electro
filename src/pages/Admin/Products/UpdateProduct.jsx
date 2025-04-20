import React from "react";
import { useParams } from "react-router-dom";
import UpdateProductForm from "@/components/Admin/Products/UpdateProductForm";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useSpacificProduct from "@/Hooks/products/useSpacificProduct";

export default function UpdateProduct() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useSpacificProduct({ productId: id });
  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <UpdateProductForm product={product?.product} />;
}
