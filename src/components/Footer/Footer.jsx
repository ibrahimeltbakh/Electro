import { BiLogoMastercard } from "react-icons/bi";
import {
  FaApplePay,
  FaCcPaypal,
  FaFacebook,
  FaGooglePay,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <h2 className="relative inline-block text-2xl font-bold text-black dark:text-white mb-4 after:content-[''] after:absolute after:top-3/4 after:translate-y-[-50%] after:left-full after:m1/4 after:w-1 after:h-1 after:bg-yellow-400 after:rounded-full">
              Electro
            </h2>
            <p className=" text-black  dark:text-white mb-4">
              Find everything related to electronics in one place with Electro
            </p>
            <div className="flex gap-4 text-black  dark:text-white">
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300 text-2xl">
                <FaTwitter />
              </Link>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-2xl">
                <FaFacebook />
              </Link>
              <Link
                to="/"
                className="text-pink-500 hover:text-pink-700 transition-colors duration-300 text-2xl">
                <FaInstagram />
              </Link>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h5 className="text-black dark:text-white font-semibold mb-3">
                COMPANY
              </h5>
              <ul className="space-y-2 text-black dark:text-white text-sm">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/brands">Brands</Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-black dark:text-white font-semibold mb-3">
                HELP
              </h5>
              <ul className="space-y-2 text-black dark:text-white text-sm">
                <li>
                  <Link to="/contact">Customer Support</Link>
                </li>
                <li>
                  <Link to="/help">Delivery Info</Link>
                </li>
                <li>
                  <Link to="/help">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/help">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div>

              <h5 className=" text-black  dark:text-white font-semibold mb-3">FAQ</h5>
              <ul className="space-y-2  text-black  dark:text-white text-sm">
                <li><Link to="/profile/account">Account</Link></li>
                <li><Link to="/">Manage Deliveries</Link></li>
                <li><Link to="/profile/orders">Orders</Link></li>
                <li><Link to="/cart">Payments</Link></li>

              <h5 className="text-black dark:text-white font-semibold mb-3">
                FAQ
              </h5>
              <ul className="space-y-2 text-black dark:text-white text-sm">
                <li>
                  <Link to="/profile/account">Account</Link>
                </li>
                <li>
                  <Link to="/comparison">Compare Products</Link>
                </li>
                <li>
                  <Link to="/profile/orders">My Orders</Link>
                </li>
                <li>
                  <Link to="/cart">My Cart</Link>
                </li>

              </ul>
            </div>

            <div>
              <h5 className="text-black dark:text-white font-semibold mb-3">
                RESOURCES
              </h5>
              <ul className="space-y-2 text-black dark:text-white text-sm">
                <li>
                  <Link to="/help">eBooks</Link>
                </li>
                <li>
                  <Link to="/help">Tutorials</Link>
                </li>
                <li>
                  <Link to="/help">Blogs</Link>
                </li>
                <li>
                  <Link to="/help">Videos</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-500" />

        <div className="flex flex-col md:flex-row justify-between items-center  text-black  dark:text-white text-sm">
          <p className="mb-4 md:mb-0">
            Electro &copy; 2025-2026, All rights reserved
          </p>
          <div className="flex gap-4 text-xl  text-black  dark:text-white">
            <RiVisaLine className="text-blue-400" />
            <BiLogoMastercard className="text-yellow-400" />
            <FaCcPaypal className="text-blue-300" />
            <FaApplePay />
            <FaGooglePay />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
