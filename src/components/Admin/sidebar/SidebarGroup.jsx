// SidebarGroup.jsx
import { useState } from "react";

export const SidebarGroup = ({ title, children, isActive, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (onClick) onClick();
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleClick}
        className={`w-full border text-left font-bold text-sm mb-2 px-3 py-1 rounded 
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-blue-600 hover:bg-[hsl(var(--sidebar-accent))]"
        }`}>
        {title}
      </button>
      {open && (
        <div className="ml-4 space-y-1 text-xl text-muted-foreground font-bold">
          {children}
        </div>
      )}
    </div>
  );
};
