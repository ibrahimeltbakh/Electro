// Navbar.jsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { ModeToggle } from "../theme/Mode-toggle";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/cart", label: "Cart" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/admin", label: "Dashboard" },
    { path: "/categories", label: "Categories" },
    { path: "/brands", label: "Brands" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-white"
        >
          Electro
        </NavLink>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={22} />
        </button>

        {/* Links Desktop */}
        <ul className="hidden md:flex space-x-6 font-medium text-sm text-gray-700 dark:text-gray-200">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 underline underline-offset-4"
                    : "hover:text-blue-500 dark:hover:text-blue-300 transition"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4 relative">
          <ModeToggle />

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:shadow-md transition text-sm text-gray-800 dark:text-gray-100"
            >
              <FaUser />
              {user ? user.name : "Guest"}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  {!user ? (
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <FaSignInAlt className="inline mr-2" />
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <FaUserPlus className="inline mr-2" />
                        Register
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <FaUserCircle className="inline mr-2" />
                        Profile
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-600" />
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm"
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4"
          >
            <ul className="flex flex-col space-y-2 font-medium text-sm text-gray-700 dark:text-gray-200">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 dark:text-blue-400 underline"
                        : "hover:text-blue-500 dark:hover:text-blue-300 transition"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
