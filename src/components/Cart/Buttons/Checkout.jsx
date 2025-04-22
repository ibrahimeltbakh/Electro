import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="my-6">
      <Link to="/order">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white-600 transition duration-300">
          Checkout
        </button>
      </Link>
    </div>
  );
}
