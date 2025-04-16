import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/pages/Layout';
import pageRoutes from './pageRoutes';

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: pageRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
}