import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import ProductsCompare from "../components/Ai/ProductsCompare";
import useProducts from "@/Hooks/products/useProducts";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import CompareCard from "@/components/Cards/CompareCard";

export default function ProductsComparison() {
  const { data: products, isLoading, isError, error } = useProducts();
  const [compareQuery, setCompareQuery] = useState("");
  const [comparisonResult, setComparisonResult] = useState("");
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const result = await ProductsCompare({ voiceText: compareQuery, products });
    setComparisonResult(result);
  };

  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "EG-AR";
  recognition.continuous = false;

  const startListening = () => {
    recognition.start();
  };

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    setCompareQuery(voiceText);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Compare Products
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              Compare products and find the best deals.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Compare products..."
                value={compareQuery}
                onChange={(e) => setCompareQuery(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-full border-0 shadow-lg focus:ring-2 bg-white text-gray-500 placeholder:text-gray-400 focus:ring-blue-500 outline-none"
              />
              <div className="flex gap-1 justify-center items-center absolute right-3 top-1/2 transform -translate-y-1/2 px-2">
                <button
                  type="button"
                  onClick={startListening}
                  className="text-blue-600 p-1 cursor-pointer">
                  <MdOutlineKeyboardVoice size={24} />
                </button>
                <button
                  type="submit"
                  className="text-blue-600 p-1 cursor-pointer">
                  <FaSearch size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {comparisonResult && <CompareCard data={comparisonResult} />}
      </div>
    </>
  );
}
