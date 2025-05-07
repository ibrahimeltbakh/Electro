import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

export default function SupportForm() {
  const [state, handleSubmit] = useForm("xblognra");

  if (state.succeeded) {
    return (
      <motion.p
        className="text-green-600 text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        Thanks for contacting us! 💌
      </motion.p>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md grid gap-4 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
        Send us a message
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
        required
      />

      <ValidationError prefix="Name" field="name" errors={state.errors} />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
        required
      />

      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea
        name="message"
        placeholder="Your Message"
        rows={4}
        className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
        required
      />

      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
        Submit
      </button>
    </motion.form>
  );
}
