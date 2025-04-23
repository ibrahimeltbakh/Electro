import React from "react";
import { motion } from "framer-motion";

export default function HelpCategory({ title, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center cursor-pointer transition"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
    </motion.div>
  );
}
