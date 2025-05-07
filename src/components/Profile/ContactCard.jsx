import React from "react";
import { motion } from "framer-motion";

export default function ContactCard({ type, desc, icon, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center cursor-pointer border border-gray-100 dark:border-gray-700">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
        {type}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{desc}</p>
    </motion.a>
  );
}
