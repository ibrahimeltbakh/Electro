import Error from "@/components/Error/Error";
import useGetCart from "@/Hooks/cart/useGetCart";
import React from "react";
import Loading from "@/components/Loading/Loading";
import CartTable from "@/components/Cart/Table";
import Checkout from "@/components/Cart/Buttons/Checkout";

export default function Cart() {
  const { data, isLoading, isError, error } = useGetCart();
  const cartProducts = data?.cart?.products || [];

  if (isError) {
    return <Error error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (data?.count === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2 className="text-secondary-foreground text-3xl font-bold mt-10">
          Your Cart is empty
        </h2>
      </div>
    );
  }
  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10 ">
      <h1 className="text-secondary-foreground text-3xl font-bold ">
        Your Cart Products
      </h1>
      <CartTable
        cartProducts={cartProducts}
        total={data?.cart?.totalCartPrice}
      />
      <Checkout />
    </div>
  );
}
