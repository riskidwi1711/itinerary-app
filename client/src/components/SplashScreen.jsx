import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl font-bold mb-4"
      >
        Itinerary App
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-xl"
      >
        Loading your adventure...
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-1 bg-white rounded-full mt-8"
      />
    </motion.div>
  );
};

export default SplashScreen;
