import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Universities', href: '/universities' },
    { name: 'Fees', href: '/fees' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 h-24 lg:h-28 flex items-center',
        isScrolled
          ? 'bg-white/80 backdrop-blur-3xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group relative">
            <div className="relative">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform shadow-2xl shadow-slate-900/10">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-slate-900">
                MBBS<span className="text-blue-600">DIRECT</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1.5 opacity-80">International Admissions &bull; 2026</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-blue-600 relative py-2 group/nav",
                    location.pathname === link.href ? "text-blue-600" : "text-slate-500"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full transition-all duration-300 group-hover/nav:w-2",
                    location.pathname === link.href ? "w-2" : ""
                  )}></span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-10 border-l border-slate-100 pl-10">
              <a href="tel:+918521123304" className="flex flex-col items-end group/call">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.3em] group-hover:text-blue-600 transition-colors mb-1">Advisory</span>
                <span className="text-sm font-black text-slate-900 tracking-tight">+91 85211 23304</span>
              </a>
              <Link
                to="/apply"
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-slate-200 hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-lg",
                isScrolled ? "text-slate-900" : "text-slate-900"
              )}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-2xl absolute top-full left-0 right-0 border-t border-slate-100"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-lg font-black py-4 border-b border-slate-50 flex items-center justify-between uppercase tracking-widest text-[10px]",
                    location.pathname === link.href ? "text-blue-600" : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/apply"
                className="bg-slate-900 text-white px-6 py-5 rounded-2xl text-center text-[10px] font-black shadow-2xl tracking-[0.2em] uppercase"
              >
                Apply for 2026 Batch
              </Link>
              <div className="flex justify-around pt-8 border-t border-slate-100">
                <a href="tel:+918521123304" className="flex flex-col items-center text-slate-900">
                  <Phone className="w-5 h-5 mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Call Desk</span>
                </a>
                <a href="https://wa.me/917909096738" className="flex flex-col items-center text-blue-600">
                  <MessageSquare className="w-5 h-5 mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
