import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
export default function Layout() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
