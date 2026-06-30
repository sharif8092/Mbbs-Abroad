import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center mb-12">
          <Link to="/" className="flex flex-col items-center group mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
              <GraduationCap className="text-slate-950 w-7 h-7" />
            </div>
            <span className="text-2xl font-black tracking-tighter leading-none text-white">
              MBBS<span className="text-blue-500">DIRECT</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">Verified Admissions Council</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed font-serif italic max-w-sm">
            "We provide a bridge between aspiring Indian medical students and the world's most prestigious international universities."
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-12 border-y border-white/5 py-8">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest opacity-50">Head Office</span>
            <span className="text-slate-300 text-sm font-bold tracking-tight">Jasola Vihar, New Delhi</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest opacity-50">Electronic Mail</span>
            <span className="text-slate-300 text-sm font-bold tracking-tight">admissions@mbbsdirect.in</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest opacity-50">Corporate Hub</span>
            <span className="text-slate-300 text-sm font-bold tracking-tight">True Career Guidance Services Pvt. Ltd.</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse" />
            ISO 9001:2015 Certified &bull; NMC Approved &bull; TCG Educational
          </p>
          <div className="flex gap-10 text-slate-700 text-[9px] font-bold uppercase tracking-widest">
            <Link to="/admin" className="hover:text-white transition-colors">Admin Panel</Link>
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Charter</span>
            <span className="cursor-pointer hover:text-white transition-colors">Academic Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
