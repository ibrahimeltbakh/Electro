import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const AgentButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const goToComparePage = () => {
    navigate("/comparison");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={goToComparePage}
          className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-white hover:scale-105 focus:outline-none"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}>
          <img
            src="/agent.jpg"
            alt="Agent"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AgentButton;
