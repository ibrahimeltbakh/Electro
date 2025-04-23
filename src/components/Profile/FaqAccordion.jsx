import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  { q: "How long does shipping take?", a: "Usually between 3–5 business days." },
  { q: "Can I return a product?", a: "Yes, within 14 days of delivery." },
  { q: "How to reset my password?", a: "Go to account settings and click 'Reset Password'." },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {faqs.map((item, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-4 py-3 text-left font-medium text-gray-800 dark:text-white"
          >
            {item.q}
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300"
              >
                {item.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
