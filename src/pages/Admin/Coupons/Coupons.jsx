import React from "react";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import CouponsTable from "@/components/Admin/Coupons/CouponsTable";
import useGetCoupons from "@/Hooks/dashboard/Coupons/useGetCoupons";

export default function Coupons() {
  const { data, isLoading, isError, error } = useGetCoupons();

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (data?.coupons.length === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2 className="text-secondary-foreground text-3xl font-bold">
          Your Coupons are empty
        </h2>
      </div>
    );
  }

  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
      <h1 className="text-secondary-foreground text-3xl font-bold">
        Your Coupons
      </h1>

      <CouponsTable coupons={data.coupons} />
    </div>
  );
}
