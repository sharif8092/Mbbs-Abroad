import React from 'react';
import { SEO } from '../components/common/SEO';
import { GraduationCap, Award, Users, BookOpen, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="About Us | Trusted MBBS Abroad Consultants"
        description="Learn more about Abroad MBBS, our mission, and our 10-year legacy of helping Indian students become world-class doctors."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="flex-1">
            <div className="flex items-center gap-3 bg-blue-600/10 px-4 py-2 rounded-full w-fit text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">
              <span>ISO 9001:2015 Certified Company</span>
              <span className="w-1 h-1 rounded-full bg-blue-600"></span>
              <span>Award-Winning Consultancy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-8 tracking-tight leading-tight">
              True Career <br />
              <span className="text-blue-600">Guidance Services.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-6 font-medium italic opacity-90">
              True Career Guidance Services Pvt. Ltd. (TCG Educational Consultancy) was established with a clear commitment to delivering genuine, direct, and transparent career pathway counseling for aspiring students in India.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 font-normal">
              For over a decade, we have successfully partnered with premier institutions worldwide to offer comprehensive support in professional courses, including <strong className="text-slate-800">MBBS, BDS, BAMS, BUMS, BHMS, MD, MS, MDS, Engineering, Paramedical, Nursing, Pharmacy, Law, and Management</strong>. We celebrate a proud legacy of helping 1,000+ students secure verified admissions with zero hidden costs.
            </p>
            
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h4 className="text-4xl font-black text-blue-600 mb-1">10+</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Trust & Legacy</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-blue-600 mb-1">1000+</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Admissions</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-blue-600 mb-1">100%</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transparency Guarantee</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-blue-600 mb-1">ISO</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certified Standards</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white shadow-blue-900/10 scale-105">
                <img src="https://picsum.photos/seed/consulting/600/600" alt="TCG Consulting Team" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-slate-900 text-white p-10 rounded-[2.5rem] z-20 shadow-2xl hidden md:block border border-white/5">
                <p className="text-2xl font-black italic mb-3 leading-tight">"Your Trust, Our Commitment to Your Success."</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-blue-400">&mdash; TCG Educational Consultancy</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
            {[
                { icon: ShieldCheck, title: "Pure Integrity", desc: "No hidden charges, no false promises. Absolute transparency in every transaction." },
                { icon: Heart, title: "Student Welfare", desc: "From university selection to post-landing settlement, we are with you every step." },
                { icon: Award, title: "Prime Excellence", desc: "We only partner with top-rated, government-funded universities with global track records." }
            ].map((value, i) => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 text-center group hover:-translate-y-2 transition-all">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-5">{value.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed italic opacity-80">{value.desc}</p>
                </div>
            ))}
        </div>

        {/* Founders / Team */}
        <div className="text-center pb-20">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-4">Leadership</h4>
            <h2 className="text-4xl font-black text-slate-900 mb-20 tracking-tight">Meet Our Senior Consultants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
                <div className="group">
                    <div className="rounded-[4rem] overflow-hidden mb-8 relative grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-blue-900/5 border border-white">
                        <img src="https://picsum.photos/seed/founder/400/400" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 italic">Dr. Kamran Sharif</h3>
                    <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mt-3">Chief Admission Counselor</p>
                </div>
                <div className="group">
                    <div className="rounded-[4rem] overflow-hidden mb-8 relative grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-blue-900/5 border border-white">
                        <img src="https://picsum.photos/seed/consultant/400/400" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 italic">Mr. Amit Verma</h3>
                    <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mt-3">Head of Strategic Partnerships</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
