import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";

import NewsLetter from "../components/Homepage/NewsLetter";
import ScrollToTop from "@/components/Homepage/ScrollToTop";
import Footer from "@/components/Footer/Footer";
import AgentButton from "@/components/Homepage/Agent";

export default function Layout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>

      {isClient && !location.pathname.startsWith("/admin") && <NewsLetter />}

      <Footer />
      <ScrollToTop />
      <AgentButton />
    </div>
  );
}
