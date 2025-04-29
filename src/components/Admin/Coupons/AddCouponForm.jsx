import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAddCoupon from "@/Hooks/dashboard/Coupons/useAddCoupon";

export default function CouponForm() {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { mutate: addCoupon, isPending } = useAddCoupon();

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
    addCoupon({
      code,
      amount: Number(amount),
      fromDate: formattedFromDate,
      toDate: formattedToDate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-8 rounded-xl border shadow">
      <div>
        <Label>Coupon Code</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>Discount Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter discount amount"
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
        {isPending ? "Adding..." : "Add Coupon"}
      </Button>
    </form>
  );
}
