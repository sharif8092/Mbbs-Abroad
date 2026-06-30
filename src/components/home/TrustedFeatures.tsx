import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, Hotel, Utensils, Award, Globe, Plane, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Award, title: 'NMC Approved', desc: 'Universities recognized by National Medical Commission India.' },
  { icon: Users, title: 'Indian Faculty', desc: 'Learn from experienced professors from India.' },
  { icon: Hotel, title: 'Govt. Hostel', desc: 'Secure and verified government hostel facilities.' },
  { icon: Utensils, title: 'Indian Mess', desc: 'Home-like Indian food available on campus.' },
  { icon: Globe, title: 'English Medium', desc: 'Entire curriculum taught in English for clarity.' },
  { icon: Plane, title: 'Visa Assistance', desc: 'End-to-end help with documentation and flights.' },
  { icon: ShieldCheck, title: 'NEXT Preparation', desc: 'Coaching for Indian medical licensure exams.' },
  { icon: Lock, title: '24/7 Security', desc: 'Safe and monitored campus environments.' },
];

export const TrustedFeatures = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-4">
          <div className="max-w-md">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Elite Standards</h4>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[0.9]">Why Parents & Students <br/> Trust Our Process</h2>
          </div>
          <p className="text-slate-500 font-serif italic text-lg max-w-sm">"Transparency is the foundation of our counseling. Every university is personally vetted by our senior team."</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-6 group-hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/5">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em] mb-2">{feature.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};
