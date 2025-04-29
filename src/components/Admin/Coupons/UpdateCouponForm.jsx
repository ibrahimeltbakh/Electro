import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useUpdateCoupon from "@/Hooks/dashboard/Coupons/useUpdateCoupon"; // افترضنا انك عامل هوك للتحديث
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function UpdateCouponForm({ coupon }) {
  const [code, setCode] = useState(coupon?.code || "");
  const [amount, setAmount] = useState(coupon?.amount || "");
  const [fromDate, setFromDate] = useState(
    coupon?.fromDate ? coupon.fromDate.slice(0, 10) : ""
  );
  const [toDate, setToDate] = useState(
    coupon?.toDate ? coupon.toDate.slice(0, 10) : ""
  );
  const { mutate: updateCoupon, isPending } = useUpdateCoupon(coupon?._id);

  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      return "";
    }
    return formattedDate.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !amount || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    const couponData = {
      couponId: coupon?._id,
      couponData: {
        code,
        amount: Number(amount),
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      },
    };

    updateCoupon(couponData);
  };

  if (isPending) return <Loading />;
  if (!coupon) return <Error error="Coupon not found" />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 rounded-xl border shadow">
      <div>
        <Label>Coupon Code</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>Discount Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>From Date</Label>
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>To Date</Label>
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isPending ? "Updating..." : "Update Coupon"}
      </Button>
    </form>
  );
}
