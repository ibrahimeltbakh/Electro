import React from "react";
import { FaStar } from "react-icons/fa";
import CartToggleButton from "../Cart/Buttons/CartToggleButton";

const CompareCard = ({ data }) => {
  const parsedData = typeof data === "string" ? JSON.parse(data) : data;
  console.log(parsedData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {parsedData?.products.map((product, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-all">
          <div
            className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-bold text-white shadow-lg"
            style={{
              background:
                product.discount !== "0%"
                  ? "linear-gradient(to right, #f56565, #ed64a6)"
                  : "linear-gradient(to right, #38a169, #319795)",
            }}>
            {product.discount !== "0%" ? `-${product.discount} OFF` : "NEW"}
          </div>

          <div className="mb-3">
            <h2 className="text-lg font-bold text-blue-600 capitalize my-5">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaStar className="text-yellow-400" />
              <span>{product.rating}</span>
              <span className="ml-2">| Sold: {product.sold}</span>
            </div>
          </div>

          <div className="my-4 flex justify-between items-center ">
            <p className="text-sm text-blue-600">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="text-sm  text-blue-600">
              <strong>Category:</strong> {product.category}
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium text-green-600 mb-1">
              <strong>Pros:</strong>
            </p>
            <ul className="list-none text-sm text-gray-700">
              {product.pros.map((pro, i) => (
                <li className="mb-1 border border-green-600 p-2" key={i}>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium text-red-600 mb-1">
              <strong>Cons:</strong>
            </p>
            <ul className="list-none text-sm text-gray-700">
              {product.cons.map((con, i) => (
                <li className="mb-1 border border-red-600 p-2" key={i}>
                  {con}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-xl font-bold text-blue-600">
                ${product.price}
              </span>
            </div>
            <CartToggleButton productId={product._id} iconOnly={true} />
          </div>
        </div>
      ))}

      <div className="col-span-full bg-blue-50 border border-blue-200 p-5 rounded-xl">
        <h3 className="text-md font-bold text-blue-700 mb-2">
          Comparison Summary:
        </h3>
        <p className="text-sm text-gray-700">
          {parsedData?.comparison_summary}
        </p>
      </div>
    </div>
  );
};

export default CompareCard;
