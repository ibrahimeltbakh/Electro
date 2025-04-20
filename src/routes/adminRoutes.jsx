import Products from "@/pages/Admin/Products/Products";
import AddProduct from "@/pages/Admin/Products/AddProduct";
import Categories from "@/pages/Admin/Categories/Categories";
import AddCategory from "@/pages/Admin/Categories/AddCategory";
import Brands from "@/pages/Admin/Brands/Brands";
import AddBrand from "@/pages/Admin/Brands/AddBrand";
import UpdateProduct from "@/pages/Admin/Products/UpdateProduct";

const adminRoutes = [
  { path: "products", element: <Products /> },
  { path: "products/add", element: <AddProduct /> },
  { path: "products/update/:id", element: <UpdateProduct /> },
  { path: "categories", element: <Categories /> },
  { path: "categories/add", element: <AddCategory /> },
  { path: "brands", element: <Brands /> },
  { path: "brands/add", element: <AddBrand /> },
];

export default adminRoutes;
