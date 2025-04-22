import Products from "@/pages/Admin/Products/Products";
import AddProduct from "@/pages/Admin/Products/AddProduct";
import Categories from "@/pages/Admin/Categories/Categories";
import AddCategory from "@/pages/Admin/Categories/AddCategory";
import Brands from "@/pages/Admin/Brands/Brands";
import AddBrand from "@/pages/Admin/Brands/AddBrand";
import UpdateProduct from "@/pages/Admin/Products/UpdateProduct";
import UpdateCategory from "@/pages/Admin/Categories/UpdateCategory";
import UpdateBrand from "@/pages/Admin/Brands/UpdateBrans";
import Home from "@/pages/Admin/Home";
import { Navigate } from "react-router-dom";

const adminRoutes = [
  { path: "", element: <Navigate to="home" replace /> },
  { path: "home", element: <Home /> },
  { path: "products", element: <Products /> },
  { path: "products/add", element: <AddProduct /> },
  { path: "products/update/:id", element: <UpdateProduct /> },
  { path: "categories", element: <Categories /> },
  { path: "categories/add", element: <AddCategory /> },
  { path: "categories/update/:id", element: <UpdateCategory /> },
  { path: "brands", element: <Brands /> },
  { path: "brands/add", element: <AddBrand /> },
  { path: "brands/update/:id", element: <UpdateBrand /> },
];

export default adminRoutes;
