import React from "react";
import { useParams } from "react-router-dom";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import UpdateCouponForm from "@/components/Admin/Coupons/UpdateCouponForm";
import useSpecificCoupon from "@/Hooks/Coupon/useSpacificCoupon";

export default function UpdateCoupon() {
  const { id } = useParams();
  const {
    data: coupon,
    isLoading,
    isError,
    error,
  } = useSpecificCoupon({ couponId: id });

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <UpdateCouponForm coupon={coupon?.coupon} />;
}
