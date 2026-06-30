import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { universities } from '../data/universities';
import { CheckCircle2, XCircle, BarChart3, ShieldCheck, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

const FeesComparison = () => {
  const [activeBudgetTab, setActiveBudgetTab] = useState<'abroad' | 'india'>('abroad');

  const indiaStatesData = [
    { state: "Kerala", cost: "35 Lakhs - 40 Lakhs" },
    { state: "Chhattisgarh", cost: "45 Lakhs - 50 Lakhs" },
    { state: "Karnataka", cost: "50 Lakhs - 60 Lakhs" },
    { state: "Bihar", cost: "50 Lakhs - 60 Lakhs" },
    { state: "Uttar Pradesh", cost: "60 Lakhs - 70 Lakhs" },
    { state: "Haryana", cost: "60 Lakhs - 70 Lakhs" },
    { state: "Madhya Pradesh", cost: "60 Lakhs - 70 Lakhs" },
    { state: "Uttarakhand", cost: "65 Lakhs - 75 Lakhs" },
    { state: "West Bengal", cost: "75 Lakhs - 85 Lakhs" },
    { state: "Jharkhand", cost: "80 Lakhs - 95 Lakhs" },
    { state: "Tamil Nadu", cost: "80 Lakhs - 95 Lakhs" },
    { state: "Puducherry", cost: "80 Lakhs - 95 Lakhs" },
    { state: "Maharashtra", cost: "85 Lakhs - 1.0 Crore" },
    { state: "Rajasthan", cost: "90 Lakhs - 1.15 Crore" }
  ];

  const abroadCountriesData = [
    { country: "Kyrgyzstan", range: "14 Lakhs - 25 Lakhs", spotlight: "Most Affordable MBBS abroad", isPartner: true },
    { country: "Uzbekistan", range: "16 Lakhs - 25 Lakhs", spotlight: "High clinical practice flow", isPartner: true },
    { country: "Georgia", range: "18 Lakhs - 40 Lakhs", spotlight: "European standards & high FMGE success rate", isPartner: true },
    { country: "Nepal", range: "20 Lakhs - 55 Lakhs", spotlight: "Extremely close proximity, Indian mess options", isPartner: true },
    { country: "Russia", range: "20 Lakhs - 41 Lakhs", spotlight: "Prestigious historic state universities", isPartner: true },
    { country: "Kazakhstan", range: "16 Lakhs - 35 Lakhs", spotlight: "Modern infrastructure and facilities", isPartner: true },
    { country: "Vietnam", range: "21 Lakhs - 35 Lakhs", spotlight: "Growing international medical destination", isPartner: true },
    { country: "Bangladesh", range: "24 Lakhs - 41 Lakhs", spotlight: "Identical disease pattern and climate", isPartner: true },
    { country: "Egypt", range: "31 Lakhs - 45 Lakhs", spotlight: "Highly respected degree & medical practices", isPartner: true },
    { country: "Serbia", range: "36 Lakhs Package", spotlight: "Premium clinical focus, beautiful cities", isPartner: false },
    { country: "Bosnia", range: "38 Lakhs Package", spotlight: "Fully English-medium custom programs", isPartner: false },
    { country: "Romania", range: "40 Lakhs Package", spotlight: "Great European exposure and standard of living", isPartner: false },
    { country: "Bulgaria", range: "50 Lakhs Package", spotlight: "World-class European union standard degrees", isPartner: false }
  ];

  return (
    <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
      <SEO 
        title="MBBS Abroad Fees Comparison 2026 | Lowest Fee Structure"
        description="Compare MBBS fees of top medical universities in Uzbekistan and Kyrgyzstan. Find the most affordable options for your medical education abroad."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-blue-600/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8"
          >
            <ShieldCheck className="w-3 h-3" />
            100% Transparency Guarantee
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-10 tracking-tight leading-[0.85]">
            Investment <br />
            <span className="text-blue-600">Overview.</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto font-serif italic text-2xl opacity-80 leading-relaxed font-medium">
            "Detailed assessment of international medical education costs for the academic cycle 2026-27."
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 p-1 md:p-4"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-10 py-10 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/5">Prime Institution</th>
                  <th className="px-10 py-10 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/5">Region</th>
                  <th className="px-10 py-10 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/5">Initial Package (USD)</th>
                  <th className="px-10 py-10 text-[10px] font-black uppercase tracking-[0.3em] border-r border-white/5">Yearly Average</th>
                  <th className="px-10 py-10 text-[10px] font-black uppercase tracking-[0.3em]">Logistics Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {universities.map((uni, i) => (
                  <tr key={uni.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="px-10 py-8 border-b border-slate-100 border-r font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {uni.name}
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-400 mt-1 opacity-60">Verified Program &bull; 2026</span>
                    </td>
                    <td className="px-10 py-8 border-b border-slate-100 border-r text-center">
                      <span className="px-4 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                        {uni.country}
                      </span>
                    </td>
                    <td className="px-10 py-8 border-b border-slate-100 border-r text-center font-mono text-xl tracking-tighter text-blue-600">
                      $ {uni.package.firstYearPackage}
                    </td>
                    <td className="px-10 py-8 border-b border-slate-100 border-r text-center font-mono text-lg tracking-tighter text-slate-400 group-hover:text-slate-700 transition-colors">
                      $ {uni.package.tuitionFeeYearly}
                    </td>
                    <td className="px-10 py-8 border-b border-slate-100">
                      {uni.features.includes('Indian Mess') ? (
                        <div className="flex items-center justify-center space-x-3 text-emerald-500">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Mess Active</span>
                        </div>
                      ) : (
                         <div className="flex items-center justify-center space-x-3 text-slate-300">
                            <span className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Private Arrangements</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Interactive Global Cost Benchmarking Tool */}
        <div className="mt-28 bg-slate-900 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-16 border-b border-white/10 pb-10">
            <div>
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Global Cost Benchmarks</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">MBBS Budget Comparison Estimator</h2>
              <p className="text-slate-400 text-sm mt-3 max-w-xl font-medium">
                Compare overall packages (including tuition fees, clinical logistics, and hostel) between Indian private colleges and leading global medical destinations.
              </p>
            </div>
            
            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10 shrink-0">
              <button 
                onClick={() => setActiveBudgetTab('abroad')}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeBudgetTab === 'abroad' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                MBBS Abroad Packages
              </button>
              <button 
                onClick={() => setActiveBudgetTab('india')}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeBudgetTab === 'india' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Indian Private MBBS
              </button>
            </div>
          </div>

          <div className="relative z-10">
            {activeBudgetTab === 'abroad' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {abroadCountriesData.map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-white/[0.07] transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-black text-xl tracking-tight text-white">{item.country}</span>
                      {item.isPartner && (
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[8px] font-black uppercase tracking-wider">
                          Elite Partner
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-blue-400 tracking-tight font-mono mb-2">
                      {item.range}
                    </div>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed font-medium">
                      "{item.spotlight}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-6 rounded-3xl mb-10 text-xs font-medium leading-relaxed max-w-3xl">
                  <strong>Important Budget Contrast:</strong> Private medical colleges in India require high scores and generally require steep tuition, development charges, and hostel packages. Compare options below to see how you can save up to 70% budget by studying at recognized international universities.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {indiaStatesData.map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-amber-500/50 transition-all">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">State / Region</div>
                      <div className="font-black text-lg text-white mb-3">{item.state}</div>
                      <div className="text-xl font-black text-amber-400 tracking-tight font-mono">
                        {item.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { title: "No Hidden Costs", desc: "Our structures include registration, processing, and first-year essential logistics.", icon: DollarSign },
                { title: "Institutional Direct", desc: "Safety first. Global academic fees are payable directly to university bank accounts.", icon: ShieldCheck },
                { title: "Value Benchmarking", desc: "We ensure you get the best clinical exposure for every dollar invested.", icon: BarChart3 }
            ].map((box, i) => (
                <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-slate-100 transition-all hover:scale-[1.02] group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <box.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-5 tracking-tight">{box.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-serif italic text-lg opacity-80">{box.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeesComparison;
