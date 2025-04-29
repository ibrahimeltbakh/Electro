import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../../components/Admin/sidebar/Sidebar";
import { SidebarGroup } from "../../components/Admin/sidebar/SidebarGroup";
import { SidebarItem } from "../../components/Admin/sidebar/SidebarItem";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { TbBrandShopee } from "react-icons/tb";
import { FaTicketAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const sidebarGroups = [
  {
    icon: <AiOutlineProduct className="w-4 h-4" />,
    title: "Products",
    links: [
      { label: "Products List", to: "/admin/products" },
      { label: "Add Product", to: "/admin/products/add" },
    ],
  },
  {
    icon: <MdOutlineCategory className="w-4 h-4" />,
    title: "Categories",
    links: [
      { label: "Categories List", to: "/admin/categories" },
      { label: "Add Category", to: "/admin/categories/add" },
    ],
  },
  {
    icon: <TbBrandShopee className="w-4 h-4" />,
    title: "Brands",
    links: [
      { label: "Brands List", to: "/admin/brands" },
      { label: "Add Brand", to: "/admin/brands/add" },
    ],
  },
  {
    icon: <FaTicketAlt className="w-4 h-4" />,
    title: "Coupons",
    links: [
      { label: "Coupons List", to: "/admin/coupons" },
      { label: "Add Coupon", to: "/admin/coupons/add" },
    ],
  },
];

const AdminDashboard = () => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin/home") {
      setIsHomeActive(true);
      setActiveGroup(null);
    } else {
      setIsHomeActive(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex">
      <Sidebar>
        {/* Home Item */}
        <div
          className={`border font-semibold rounded mb-5 flex items-center justify-center px-3 py-1 
          ${
            isHomeActive
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-[hsl(var(--sidebar-accent))]"
          }`}>
          <FaHome />
          <SidebarItem label="Home" to="/admin" />
        </div>

        {/* Grouped Items */}
        {sidebarGroups.map((group, index) => (
          <SidebarGroup
            key={index}
            isActive={activeGroup === index}
            onClick={() => setActiveGroup(index)}
            title={
              <span className="flex justify-between items-center gap-1 h-8">
                <span className="flex flex-row items-center gap-1">
                  {group.icon} {group.title}
                </span>
                <BiSolidDownArrowAlt className="w-4 h-4" />
              </span>
            }>
            {group.links.map((link, idx) => (
              <SidebarItem key={idx} label={link.label} to={link.to} />
            ))}
          </SidebarGroup>
        ))}
      </Sidebar>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
