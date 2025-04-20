import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Admin/sidebar/Sidebar";
import { SidebarGroup } from "../../components/Admin/sidebar/SidebarGroup";
import { SidebarItem } from "../../components/Admin/sidebar/SidebarItem";
import { BiSolidDownArrowAlt } from "react-icons/bi";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarGroup
          title={
            <span className="flex justify-between items-center gap-1">
              Products <BiSolidDownArrowAlt className="w-4 h-4" />
            </span>
          }>
          <SidebarItem label="Products List" to="/admin/products" />
          <SidebarItem label="Add Product" to="/admin/products/add" />
        </SidebarGroup>
        <SidebarGroup
          title={
            <span className="flex justify-between items-center gap-1">
              Categories <BiSolidDownArrowAlt className="w-4 h-4" />
            </span>
          }>
          <SidebarItem label="Categories List" to="/admin/categories" />
          <SidebarItem label="Add Category" to="/admin/categories/add" />
        </SidebarGroup>
        <SidebarGroup
          title={
            <span className="flex justify-between items-center gap-1">
              Brands <BiSolidDownArrowAlt className="w-4 h-4" />
            </span>
          }>
          <SidebarItem label="Brands List" to="/admin/brands" />
          <SidebarItem label="Add Brand" to="/admin/brands/add" />
        </SidebarGroup>
      </Sidebar>

      <div className="flex-1 p-6">
        {/* <h1 className="text-secondary-foreground text-3xl font-bold mb-5 text-center">
          Admin Dashboard Content
        </h1> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
