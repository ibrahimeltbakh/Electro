import Sidebar from "@/components/Admin/Sidebar";
import React from "react";

export default function Admin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Admin Page</h1>
      <Sidebar />
    </div>
  );
}
