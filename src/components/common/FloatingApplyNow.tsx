import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const FloatingApplyNow = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <Link
        to="/apply"
        className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform"
      >
        <span>Apply Now</span>
      </Link>
    </motion.div>
  );
};

export default FloatingApplyNow;
