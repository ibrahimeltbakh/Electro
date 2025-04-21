
import React from 'react';
import useGetuserOrders from '../Hooks/orders/useGetuserOrders';
import OrderCard from './Cards/OrderCard';
import Loading from './Loading/Loading';
import Error from './Error/Error';
export default function UserOrder() {
  const { data, isLoading, isError } = useGetuserOrders();

  console.log(data?.orders);

  if (isLoading) return <div className="text-center mt-10 text-blue-500 font-semibold"><Loading /></div>;
  if (isError) return <div className="text-center mt-10 text-red-500 font-semibold"><Error /></div>;

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Your Orders</h1>

        {data?.orders?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No orders yet 
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
