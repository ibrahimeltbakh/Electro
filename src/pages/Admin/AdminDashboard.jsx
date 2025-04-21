import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Admin/sidebar/Sidebar";
import { SidebarGroup } from "../../components/Admin/sidebar/SidebarGroup";
import { SidebarItem } from "../../components/Admin/sidebar/SidebarItem";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { TbBrandShopee } from "react-icons/tb";

const AdminDashboard = () => {
  return (
    <div className="flex ">
      <Sidebar>
        <div className=" border font-semibold rounded mb-5 flex items-center justify-center">
          <FaHome />
          <SidebarItem label="Home" to="/admin" />
        </div>

        <SidebarGroup
          title={
            <span className="flex justify-between items-center gap-1 h-8">
              <span className="flex flex-row items-center gap-1">
                <AiOutlineProduct className="w-4 h-4" /> Products{" "}
              </span>
              <BiSolidDownArrowAlt className="w-4 h-4" />
            </span>
          }>
          <SidebarItem label="Products List" to="/admin/products" />
          <SidebarItem label="Add Product" to="/admin/products/add" />
        </SidebarGroup>
        <SidebarGroup
          title={
            <span className="flex justify-between items-center gap-1 h-8">
              <span className="flex flex-row items-center gap-1">
                <MdOutlineCategory className="w-4 h-4" /> Categories{" "}
              </span>{" "}
              <BiSolidDownArrowAlt className="w-4 h-4" />
            </span>
          }>
          <SidebarItem label="Categories List" to="/admin/categories" />
          <SidebarItem label="Add Category" to="/admin/categories/add" />
        </SidebarGroup>
        <SidebarGroup
          title={
            <span className="flex justify-between items-center gap-1 h-8">
              <span className="flex flex-row items-center gap-1">
                <TbBrandShopee className="w-4 h-4" /> Brands{" "}
              </span>{" "}
              <BiSolidDownArrowAlt className="w-4 h-4" />
            </span>
          }>
          <SidebarItem label="Brands List" to="/admin/brands" />
          <SidebarItem label="Add Brand" to="/admin/brands/add" />
        </SidebarGroup>
      </Sidebar>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
