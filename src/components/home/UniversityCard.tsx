import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { University } from '../../types';

interface UniversityCardProps {
  university: University;
  index: number;
}

const featureDescriptions: Record<string, string> = {
  'Indian Mess': 'Authentic Indian food with separate vegetarian and non-vegetarian options prepared by Indian cooks.',
  'Government Hostel': 'Safe and secure university-managed accommodation with modern facilities and 24/7 security.',
  'English Medium': 'The entire course is conducted in English, eliminating the need to learn the local language for studies.',
  '2000+ Indian Students': 'Join a vibrant community of over 2000 Indian students already pursuing their dreams here.',
  'Safe Campus': 'Gated campus with restricted entry and CCTV surveillance ensuring student safety at all times.',
  'Global Opportunities': 'Degrees are recognized worldwide, enabling you to practice medicine in India, UK, USA, and more.',
  'Indian Faculty': 'Expert lectures and guidance from visiting Indian professors and experienced local faculty.',
  'NMC Approved': 'Fully approved by the National Medical Commission of India, valid for NEXT/FMGE exams.',
  'Indian Coordinator': 'Dedicated local staff to assist with everything from academics to personal well-being.',
  'International Medical Faculty': 'Highly qualified professors with international experience and modern teaching methods.',
  'Internship Available': 'Get clinical hands-on practice in affiliated government hospitals with high patient inflow.',
  'Indian Student Support': 'Comprehensive support system covering everything from airport pickup to degree completion.'
};

export const UniversityCard: React.FC<UniversityCardProps> = ({ university, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group bg-white rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_80px_-20px_rgba(30,58,138,0.12)] transition-all duration-700 border border-slate-100 flex flex-col h-full relative"
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10" />
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 z-20">
          <span className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center backdrop-blur-md border border-white/10">
            <span className="mr-2 text-base leading-none">{university.flag}</span>
            {university.country}
          </span>
        </div>
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 block mb-2">First Year Budget</span>
          <div className="text-4xl font-black tracking-[-0.04em] flex items-baseline gap-1">
            <span className="text-xl font-medium text-blue-400">$</span>
            {university.package.firstYearPackage}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-8 h-0.5 bg-blue-600 rounded-full"></div>
           <span className="text-blue-600 text-[9px] font-black uppercase tracking-[0.3em]">
             {university.location}
           </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 group-hover:text-blue-600 transition-colors leading-[0.9] tracking-tight">
          {university.name}
        </h3>
        
        <div className="flex flex-wrap gap-2.5 mb-10 flex-grow content-start relative">
          {university.features.slice(0, 2).map((feature, i) => (
            <div 
              key={i} 
              className="relative group/tooltip"
            >
              <div className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-help hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                {feature}
              </div>
              <div className="absolute bottom-full left-0 mb-5 w-72 p-6 bg-slate-900/95 backdrop-blur-2xl text-white text-[11px] font-medium rounded-[2rem] opacity-0 group-hover/tooltip:opacity-100 transition-all translate-y-3 group-hover/tooltip:translate-y-0 pointer-events-none z-40 shadow-2xl leading-relaxed font-serif italic border border-white/10">
                <div className="mb-3 text-blue-400 font-black uppercase tracking-[0.2em] text-[9px] not-italic font-sans">Feature Insight</div>
                "{featureDescriptions[feature] || `Key hallmark of excellence at ${university.name}.`}"
                <div className="absolute top-full left-8 w-4 h-4 bg-slate-900 transform rotate-45 -mt-2 border-r border-b border-white/5"></div>
              </div>
            </div>
          ))}
          {university.features.length > 2 && (
            <div className="flex items-center text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2 bg-slate-50/50 px-3 py-1 rounded-full border border-slate-100">
              +{university.features.length - 2} more
            </div>
          )}
        </div>

        <div className="pt-10 border-t border-slate-100 grid grid-cols-2 gap-5">
          <Link
            to={`/universities/${university.id}`}
            className="flex items-center justify-center gap-3 py-5 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 bg-white border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </Link>
          <Link
            to="/apply"
            className="flex items-center justify-center py-5 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white bg-blue-600 shadow-2xl shadow-blue-100 hover:bg-slate-900 hover:shadow-slate-200 transition-all active:scale-95"
          >
            Apply
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
