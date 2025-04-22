import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/UserProfile/Sidebar";
import { AuthContext } from "@/context/AuthContext/AuthContext";
export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">
      <Sidebar user={user} navigate={navigate} handleLogout={handleLogout} />
      <div className="flex-1 p-6 md:p-10 space-y-8">
        <Outlet />
      </div>
    </div>
  );
}
