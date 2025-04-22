import React from "react";
import { BiDollar, BiDollarCircle, BiShoppingBag } from "react-icons/bi";

export default function Home() {
  // Static data
  const totalSales = 54458.98;
  const averageOrder = 120.45;
  const totalOrders = 453;

  return (
    <div className="m-auto flex flex-col justify-center gap-10 items-center">
      <div className="text-center">
        <h1 className="text-secondary-foreground text-3xl font-bold mb-5">
          Admin Dashboard Content
        </h1>
        <p className="text-lg font-medium text-muted-foreground">
          Welcome back, Here's your dashboard overview.
        </p>
      </div>

      <div className="flex gap-10 flex-wrap">
        <div className="card w-full p-5 bg-base-100 shadow-xl">
          <div className="card-body flex justify-between flex-wrap gap-3">
            <h2 className="card-title flex gap-1 items-center">
              <BiDollar size={25} />
              Total Sales
            </h2>
            <p>${totalSales.toLocaleString()}</p>
          </div>
        </div>

        <div className="card w-full p-5 bg-base-100 shadow-xl">
          <div className="card-body flex justify-between flex-wrap gap-3">
            <h2 className="card-title flex gap-1 items-center">
              <BiDollarCircle size={25} />
              Average Order
            </h2>
            <p>${averageOrder.toFixed(2)}</p>
          </div>
        </div>

        <div className="card w-full p-5 bg-base-100 shadow-xl">
          <div className="card-body flex justify-between flex-wrap gap-3">
            <h2 className="card-title flex gap-1 items-center">
              <BiShoppingBag size={25} />
              Total Orders
            </h2>
            <p>{totalOrders.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
