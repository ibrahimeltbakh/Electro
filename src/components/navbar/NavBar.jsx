import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../theme/Mode-toggle";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt, 
  FaUserCircle 
} from "react-icons/fa";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/" className="flex items-center justify-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Electro
            </span>
          </NavLink>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto "
            id="navbar-language"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

          <div className="relative">
  <button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="flex items-center gap-2 px-4 py-2  dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded-full">
        <FaUser className="text-blue-600 text-lg" />
      </div>
      <span className="text-gray-800 dark:text-gray-200 font-medium">
        {user ? user.name : "Guest"}
      </span>
    </div>
    <svg
      className={`w-4 h-4 ml-2 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${
        dropdownOpen ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {dropdownOpen && (
    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
      {!user ? (
        <>
          <NavLink
            to="/login"
            className="flex items-center gap-3 px-5 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onClick={() => setDropdownOpen(false)}
          >
            <FaSignInAlt className="text-blue-600 dark:text-blue-400" />
            <span>Login</span>
          </NavLink>
          <NavLink
            to="/register"
            className="flex items-center gap-3 px-5 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onClick={() => setDropdownOpen(false)}
          >
            <FaUserPlus className="text-blue-600 dark:text-blue-400" />
            <span>Register</span>
          </NavLink>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/profile");
              setDropdownOpen(false);
            }}
            className="flex items-center gap-3 w-full px-5 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            <FaUserCircle className="text-blue-600 dark:text-blue-400" />
            <span>Profile</span>
          </button>
          <div className="border-t border-gray-100 dark:border-gray-700" />
          <button
            onClick={() => {
              logout();
              setDropdownOpen(false);
            }}
            className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  )}
</div>

          </div>
        </div>
      </nav>
    </>
  );
}
