import Error from "@/components/Error/Error";
import useGetCart from "@/Hooks/cart/useGetCart";
import React from "react";
import Loading from "@/components/Loading/Loading";
import CartTable from "@/components/Cart/Table";

export default function Cart() {
  const { data, isLoading, isError, error } = useGetCart();
  const cartProducts = data?.cart?.products || [];

  if (isError) {
    <Error error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (data?.count === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2>Your Cart is empty</h2>
      </div>
    );
  }
  return (
    <div className="container  m-auto flex flex-col justify-center gap-3 items-center mt-10 ">
      <h1 className="text-secondary-foreground mt-10 text-3xl font-bold ">
        Your Products
      </h1>

      <CartTable
        cartProducts={cartProducts}
        total={data?.cart?.totalCartPrice}
      />
    </div>
  );
}
