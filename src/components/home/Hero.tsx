import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, Shield, IndianRupee, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Indian Students', value: '2000+', color: 'text-indigo-400' },
  { label: '100% Visa Success Rate', value: '100%', color: 'text-emerald-400' },
  { label: 'NMC/WHO Approved', value: 'Elite', color: 'text-amber-400' },
  { label: '24/7 On-Ground Support in Kyrgyzstan & Uzbekistan', value: '24/7', color: 'text-rose-400' },
];

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-2 items-center">
          
          <div className="relative z-10 py-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8 shadow-2xl shadow-slate-200"
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              2026 Batch Admissions Open
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-[104px] font-black leading-[0.85] mb-10 tracking-[-0.04em] text-slate-900"
            >
              Study MBBS <br />
              <span className="text-blue-600 relative">
                Abroad
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> 
              <br />With Confidence.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-lg"
            >
              <p className="text-slate-500 text-xl md:text-2xl mb-12 leading-relaxed font-serif italic text-balance">
                "Your dream of becoming a doctor starts here. Get guaranteed admission in top NMC & WHO approved medical universities abroad."
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/apply"
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 hover:bg-slate-900 hover:-translate-y-1 transition-all flex items-center justify-center group"
                >
                  Apply For 2026 Batch
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/universities"
                  className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3"
                >
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                  Explore Fees
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative lg:h-[700px] flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-full max-w-[500px] aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] outline outline-8 outline-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070" 
                alt="Medical College Students"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">+2.4k Students Enrolled</span>
                  </div>
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-blue-400"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating stats cards */}
            <div className="absolute -left-12 bottom-20 z-30 hidden xl:block">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-slate-50 space-y-6 w-64"
              >
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};
