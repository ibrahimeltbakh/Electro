import { Navigate } from "react-router-dom";
import UserAccount from "@/pages/profile/Account";
import UserOrders from "@/pages/profile/orders/Orders";
import OrderDetails from "@/pages/profile/orders/OrderDetails";

const profileRoutes = [
  { path: "", element: <Navigate to="account" replace /> },
  { path: "account", element: <UserAccount /> },
  { path: "orders", element: <UserOrders /> },
  { path: "orders/:id", element: <OrderDetails /> },
];

export default profileRoutes;
