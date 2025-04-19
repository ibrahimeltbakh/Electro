import Login from "@/components/Auth/Login";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import ResetPassword from "@/components/Auth/ResetPassword";
import Admin from "@/pages/Admin";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import RegisterPage from "@/pages/Register";
import WishList from "@/pages/WishList";
import Categories from "@/pages/Categories";
import Brands from "@/pages/Brands";
import ProductDetails from "@/pages/ProductDetails";
import BrandsDetails from "@/pages/BrandsDetails";
import Profile from "@/pages/Profile";
import CategoryDetails from "@/pages/CategoryDetails";
const pageRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <ProductsPage /> },
  { path: "/categories", element: <Categories /> },
  { path: "/brands", element: <Brands /> },
  {
    path: "/brands/:id",
    element: (
     
        <BrandsDetails />
     
    ),
  },  
  {
    path: "/categories/:id",
    element: (
      
        <CategoryDetails />
    
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
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
];

export default pageRoutes;
