"use client"; // (still safe to leave, doesn't harm in Vite)

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function StartButton() {
  const navigate = useNavigate();

  function handleClick() {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        navigate("/Home"); // adjust route
      } else {
        navigate("/Login");
      }
    } catch (err) {
      console.error("Error reading token:", err);
      navigate("/Login");
    }
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 2 }}
      whileHover={{ scale: 2.15 }}
      whileTap={{ scale: 1.5 }}
      onClick={handleClick}
      className="px-6 py-3 rounded-full font-semibold shadow-md bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white"
    >
      Get Started!
    </motion.button>
  );
}
