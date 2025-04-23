import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import UserAccount from "@/pages/profile/Account";
import UserOrders from "@/pages/profile/orders/Orders";
import OrderDetails from "@/pages/profile/orders/OrderDetails";
import WishList from "@/pages/WishList";
import Loading from "@/components/Loading/Loading";

// Wrapper to ensure consistent visibility
const withSuspense = (Component) => {
  return (props) => (
    <Suspense fallback={<Loading />}>
      <div className="profile-content" style={{ opacity: 1 }}>
        <Component {...props} />
      </div>
    </Suspense>
  );
};

const profileRoutes = [
  { path: "", element: <Navigate to="account" replace /> },
  { path: "account", element: withSuspense(UserAccount)() },
  { path: "orders", element: withSuspense(UserOrders)() },
  { path: "orders/:id", element: withSuspense(OrderDetails)() },
  { path: "wishlist", element: withSuspense(WishList)() },
];

export default profileRoutes;
