import React from "react";
import { motion } from "framer-motion";
import ContactCard from "@/components/Profile/ContactCard";
import SupportForm from "@/components/Profile/SupportForm";

export default function Support() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10"
      >
        We're here to help
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <ContactCard type="Email Us" desc="support@electro.com" icon="📧" />
        <ContactCard type="Live Chat" desc="Available 24/7" icon="💬" />
        <ContactCard type="Call Us" desc="+1 (800) 123-456" icon="📞" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SupportForm />
      </motion.div>
    </div>
  );
}
