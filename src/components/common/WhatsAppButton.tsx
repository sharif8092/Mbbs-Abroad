import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/917909096738"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-semibold whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
