import { Link } from "react-router-dom";

export const SidebarItem = ({ label, to }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded hover:bg-[hsl(var(--sidebar-accent))] text-sm">
    {label}
  </Link>
);
