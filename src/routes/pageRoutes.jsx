import Login from "@/components/Auth/Login";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import ResetPassword from "@/components/Auth/ResetPassword";
import Admin from "@/pages/Admin";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import RegisterPage from "@/pages/Register";
import WishList from "@/pages/WishList";

const pageRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <ProductsPage /> },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <WishList />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
];

export default pageRoutes;
