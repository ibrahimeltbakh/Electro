import { useState } from "react";

export const SidebarGroup = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border text-left font-bold text-sm mb-2 px-3 py-1 hover:bg-[hsl(var(--sidebar-accent))] rounded">
        {title}
      </button>
      {open && <div className="ml-4 space-y-1">{children}</div>}
    </div>
  );
};
