import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NewsLetter from "../components/Homepage/NewsLetter";
import ScrollToTop from "@/components/Homepage/ScrollToTop";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <NewsLetter />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
