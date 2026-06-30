import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import FloatingApplyNow from './components/common/FloatingApplyNow';
import ScrollToTop from './components/common/ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      <WhatsAppButton />
      <FloatingApplyNow />
    </div>
  );
}
