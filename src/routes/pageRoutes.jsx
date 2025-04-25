import Login from "@/components/Auth/Login";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import ResetPassword from "@/components/Auth/ResetPassword";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import RegisterPage from "@/pages/Register";
import WishList from "@/pages/WishList";
import Categories from "@/pages/Categories";
import Brands from "@/pages/Brands";
import ProductDetails from "@/pages/ProductDetails";
import BrandDetail from "@/pages/BrandDetail";
import BrandsDetails from "@/pages/BrandsDetails";
import CategoryDetails from "@/pages/CategoryDetails";
import adminRoutes from "./adminRoutes";
import profileRoutes from "./profileRoutes";
import CashOrder from "@/pages/CashOrder";
import Profile from "@/pages/profile/Profile";
import LoginPage from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Support from "@/pages/Support";
import Help from "@/pages/Help";
import ProductsComparison from "@/pages/ProductsComparison";

const pageRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <ProductsPage /> },
  { path: "/categories", element: <Categories /> },
  { path: "/brands", element: <Brands /> },
  {
    path: "/brands/:id",
    element: <BrandDetail />,
  },
  {
    path: "/category",
    element: <Categories />,
  },
  {
    path: "/category/:id",
    element: <CategoryDetails />,
  },
  {
    path: "/contact",
    element: <Support />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/comparison",
    element: (
      <ProtectedRoute>
        <ProductsComparison />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order",
    element: (
      <ProtectedRoute>
        <CashOrder />
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
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <ProductDetails />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/admin/*",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: adminRoutes,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    children: profileRoutes,
  },
  { path: "*", element: <NotFound /> },
];

export default pageRoutes;
