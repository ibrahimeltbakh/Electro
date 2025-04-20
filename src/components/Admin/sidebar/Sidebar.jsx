import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ====== Button for small screens (mobile) ====== */}
      <button
        className="md:hidden absolute top-21 left-4 z-50 bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] p-2 rounded"
        onClick={() => setIsOpen(true)}>
        <Menu />
      </button>

      {/* ====== Sidebar ====== */}
      <aside
        className={`relative top-0 left-0 h-full bg-[hsl(var(--sidebar-background))] 
          text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))] 
          p-4 transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-64`}>
        {/* Close button (mobile only) */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[hsl(var(--sidebar-accent-foreground))] bg-[hsl(var(--sidebar-accent))] p-2 rounded">
            <X />
          </button>
        </div>

        {children}
      </aside>
    </>
  );
};
