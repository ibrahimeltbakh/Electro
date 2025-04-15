import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import ProductsPage from './pages/ProductsPage'
export default function Routs() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/shop",
                    element: <ProductsPage/>
                },
                {
                    path: "/cart",
                    element: <Cart/>
                },
                {
                    path: "/wishlist",
                    element: <Wishlist/>
                }   
            ]
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
