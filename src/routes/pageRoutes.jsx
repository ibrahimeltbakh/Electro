import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import WishList from "@/pages/WishList";

const pageRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <ProductsPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <WishList /> },
  
];

export default pageRoutes;
