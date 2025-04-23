import React from "react";
import { motion } from "framer-motion";
import HelpCategory from "@/components/Profile/HelpCategory";
import FaqAccordion from "@/components/Profile/FaqAccordion";

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
      >
        Help Center
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <HelpCategory title="Shipping & Delivery" icon="📦" />
        <HelpCategory title="Returns & Refunds" icon="💰" />
        <HelpCategory title="Account & Security" icon="🔐" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Frequently Asked Questions
        </h2>
        <FaqAccordion />
      </motion.div>
    </div>
  );
}
