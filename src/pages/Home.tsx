import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Hero } from '../components/home/Hero';
import { TrustedFeatures } from '../components/home/TrustedFeatures';
import { UniversityCard } from '../components/home/UniversityCard';
import { universities } from '../data/universities';
import { blogPosts } from '../data/blogs';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Play, HelpCircle, Loader2, CheckCircle2, Award, Building2, Coins, MapPin, GraduationCap, Check, TrendingDown, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: ''
  });

  const [activeBudgetTab, setActiveBudgetTab] = useState<'abroad' | 'india'>('abroad');
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under25' | '25to45' | 'above45'>('all');

  const indiaStatesData = [
    { state: "Kerala", cost: "35 Lakhs - 40 Lakhs", minCost: 35, maxCost: 40 },
    { state: "Chhattisgarh", cost: "45 Lakhs - 50 Lakhs", minCost: 45, maxCost: 50 },
    { state: "Karnataka", cost: "50 Lakhs - 60 Lakhs", minCost: 50, maxCost: 60 },
    { state: "Bihar", cost: "50 Lakhs - 60 Lakhs", minCost: 50, maxCost: 60 },
    { state: "Uttar Pradesh", cost: "60 Lakhs - 70 Lakhs", minCost: 60, maxCost: 70 },
    { state: "Haryana", cost: "60 Lakhs - 70 Lakhs", minCost: 60, maxCost: 70 },
    { state: "Madhya Pradesh", cost: "60 Lakhs - 70 Lakhs", minCost: 60, maxCost: 70 },
    { state: "Uttarakhand", cost: "65 Lakhs - 75 Lakhs", minCost: 65, maxCost: 75 },
    { state: "West Bengal", cost: "75 Lakhs - 85 Lakhs", minCost: 75, maxCost: 85 },
    { state: "Jharkhand", cost: "80 Lakhs - 95 Lakhs", minCost: 80, maxCost: 95 },
    { state: "Tamil Nadu", cost: "80 Lakhs - 95 Lakhs", minCost: 80, maxCost: 95 },
    { state: "Puducherry", cost: "80 Lakhs - 95 Lakhs", minCost: 80, maxCost: 95 },
    { state: "Maharashtra", cost: "85 Lakhs - 1.0 Crore", minCost: 85, maxCost: 100 },
    { state: "Rajasthan", cost: "90 Lakhs - 1.15 Crore", minCost: 90, maxCost: 115 }
  ];

  const abroadCountriesData = [
    { country: "Kyrgyzstan", range: "14 Lakhs - 25 Lakhs", spotlight: "Most Affordable MBBS abroad, 100% English Medium", isPartner: true, minCost: 14, maxCost: 25 },
    { country: "Uzbekistan", range: "16 Lakhs - 25 Lakhs", spotlight: "High clinical practice flow & recognized standard", isPartner: true, minCost: 16, maxCost: 25 },
    { country: "Georgia", range: "18 Lakhs - 40 Lakhs", spotlight: "European standards & high FMGE success rate", isPartner: true, minCost: 18, maxCost: 40 },
    { country: "Nepal", range: "20 Lakhs - 55 Lakhs", spotlight: "Close proximity, identical disease profile, Indian food", isPartner: true, minCost: 20, maxCost: 55 },
    { country: "Russia", range: "20 Lakhs - 41 Lakhs", spotlight: "Prestigious historic state universities", isPartner: true, minCost: 20, maxCost: 41 },
    { country: "Kazakhstan", range: "16 Lakhs - 35 Lakhs", spotlight: "Modern infrastructure and advanced labs", isPartner: true, minCost: 16, maxCost: 35 },
    { country: "Vietnam", range: "21 Lakhs - 35 Lakhs", spotlight: "Growing international medical destination", isPartner: true, minCost: 21, maxCost: 35 },
    { country: "Bangladesh", range: "24 Lakhs - 41 Lakhs", spotlight: "Identical disease pattern, high passing percentage", isPartner: true, minCost: 24, maxCost: 41 },
    { country: "Egypt", range: "31 Lakhs - 45 Lakhs", spotlight: "Highly respected clinical-intensive courses", isPartner: true, minCost: 31, maxCost: 45 },
    { country: "Serbia", range: "36 Lakhs Package", spotlight: "Premium European clinical focus, completely in English", isPartner: false, minCost: 36, maxCost: 36 },
    { country: "Bosnia", range: "38 Lakhs Package", spotlight: "Customized English programs, world-class standard", isPartner: false, minCost: 38, maxCost: 38 },
    { country: "Romania", range: "40 Lakhs Package", spotlight: "Excellent European Union standard and exposure", isPartner: false, minCost: 40, maxCost: 40 },
    { country: "Bulgaria", range: "50 Lakhs Package", spotlight: "Top-tier EU recognized degree & clinical practice", isPartner: false, minCost: 50, maxCost: 50 },
    { country: "Tajikistan", range: "17 Lakhs - 25 Lakhs", spotlight: "Cost-effective, secure student friendly environment", isPartner: false, minCost: 17, maxCost: 25 },
    { country: "Iran", range: "20 Lakhs Package", spotlight: "WHO listed top universities, beautiful hostels", isPartner: false, minCost: 20, maxCost: 20 }
  ];

  const tcgCourses = [
    { name: "MBBS", category: "Medical" },
    { name: "BDS", category: "Medical" },
    { name: "BAMS", category: "Medical" },
    { name: "BUMS", category: "Medical" },
    { name: "BHMS", category: "Medical" },
    { name: "MD", category: "Post-Grad" },
    { name: "MS", category: "Post-Grad" },
    { name: "MDS", category: "Post-Grad" },
    { name: "Engineering", category: "Professional" },
    { name: "Paramedical", category: "Healthcare" },
    { name: "Nursing", category: "Healthcare" },
    { name: "Pharmacy", category: "Healthcare" },
    { name: "Law", category: "Professional" },
    { name: "Management", category: "Professional" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          universityName: `Interested in: ${formData.region}`,
          email: 'not-provided@via-sidebar.com', // Placeholder since email not in sidebar
          universityId: 'SBR',
          state: 'Unknown (Via Home Sidebar)'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        const whatsappMsg = `New Counsel Enquiry:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Target Region:* ${formData.region}`;
        const whatsappUrl = `https://wa.me/917909096738?text=${whatsappMsg}`;
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
      }
    } catch (error) {
      console.error('Sidebar submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col">
      <SEO 
        title="MBBS Abroad Admissions 2026 | Kyrgyzstan & Uzbekistan | Abroad MBBS"
        description="Secure your MBBS seat in top medical universities of Kyrgyzstan and Uzbekistan. English medium, MCI/NMC recognized, low tuition fees. Book your free counseling today."
      />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Left Side: Universities */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Featured Universities Section */}
            <section>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-md">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Curated Selection</h4>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[0.95]">Elite Medical Institutions 2026</h2>
                </div>
                <Link to="/universities" className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                  Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {universities
                  .filter(uni => ['osh-state-university', 'bukhara-state-medical-institute', 'samarkand-state-medical-university', 'kyrgyz-state-medical-academy'].includes(uni.id))
                  .sort((a, b) => {
                    const order = ['osh-state-university', 'bukhara-state-medical-institute', 'samarkand-state-medical-university', 'kyrgyz-state-medical-academy'];
                    return order.indexOf(a.id) - order.indexOf(b.id);
                  })
                  .map((uni, i) => (
                    <UniversityCard key={uni.id} university={uni} index={i} />
                  ))
                }
              </div>
            </section>
          </div>

          {/* Right Side: Lead Gen Sidebar */}
          <aside className="w-full lg:col-span-5 xl:col-span-4 lg:self-start">
            <div className="sticky top-28 space-y-6 z-20">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="text-center mb-8 relative">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">Get Personalized Counseling</h3>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.3em] mt-2">Free 1-on-1 Guidance</p>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">Request Received!</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Redirecting to WhatsApp...</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        placeholder="e.g. Rahul Sharma" 
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 text-sm font-semibold focus:border-blue-600 focus:bg-white outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                      <input 
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel" 
                        placeholder="+91 XXXXX XXXXX" 
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 text-sm font-semibold focus:border-blue-600 focus:bg-white outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Region</label>
                      <div className="relative">
                        <select 
                          required
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 text-sm font-black text-slate-900 focus:border-blue-600 focus:bg-white outline-none transition-all cursor-pointer appearance-none"
                        >
                          <option value="" disabled>Select Target Country</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Both (Explore)">Both (Explore)</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 hover:-translate-y-0.5 active:scale-95 transition-all mt-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Processing...
                        </span>
                      ) : 'Send Inquiry Now'}
                    </button>
                  </form>
                )}

                <div className="mt-8 flex items-center justify-center gap-4 pt-6 border-t border-slate-50">
                  <div className="flex -space-x-2.5">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden bg-slate-100">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Student" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                    Trusted by <br/><span className="text-blue-600 text-[10px]">2,400+ Students</span>
                  </p>
                </div>
              </div>

              {/* Fast Support Card with high contrast */}
              <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-blue-200/40">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
                  <div className="relative">
                    <h4 className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-3">Direct Access</h4>
                    <p className="text-lg font-bold mb-6 leading-tight">Speak with our <span className="text-blue-200">Senior Head</span> directly via WhatsApp.</p>
                    <a href="https://wa.me/917909096738" className="inline-flex items-center gap-3 bg-white text-blue-600 px-6 py-3.5 rounded-2xl transition-all font-black text-[10px] tracking-[0.2em] uppercase hover:bg-slate-900 hover:text-white group">
                        <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        Live Support
                    </a>
                  </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Full-width TrustedFeatures section */}
        <div className="border-t border-slate-200/60 pt-16">
          <TrustedFeatures />
        </div>
      </main>

      {/* Dynamic Cost Benchmarking Estimator Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-60 -mt-60"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] -ml-60 -mb-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-12 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                <Coins className="w-3.5 h-3.5" />
                <span>Smart Financial Decision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                MBBS Budget Comparison & Estimator
              </h2>
              <p className="text-slate-400 mt-4 text-base font-medium leading-relaxed">
                Compare overall package estimations (including tuition, clinical training, hostel, and mess) between global medical colleges and Indian private state options.
              </p>
            </div>
            
            <div className="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 shrink-0 self-stretch sm:self-auto justify-center">
              <button 
                onClick={() => {
                  setActiveBudgetTab('abroad');
                  setBudgetFilter('all');
                }}
                className={`px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeBudgetTab === 'abroad' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
              >
                MBBS Abroad Packages
              </button>
              <button 
                onClick={() => {
                  setActiveBudgetTab('india');
                  setBudgetFilter('all');
                }}
                className={`px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeBudgetTab === 'india' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}
              >
                Indian Private MBBS
              </button>
            </div>
          </div>

          {/* Dynamic Budget Filter Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                <Filter className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">Quick Filter by Budget</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Find eligible colleges instantly</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Budgets' },
                { id: 'under25', label: 'Under 25 Lakhs' },
                { id: '25to45', label: '25L - 45 Lakhs' },
                { id: 'above45', label: 'Above 45 Lakhs' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setBudgetFilter(btn.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${
                    budgetFilter === btn.id
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {budgetFilter === btn.id && <Check className="w-3 h-3" />}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {activeBudgetTab === 'abroad' ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {abroadCountriesData
                    .filter((item) => {
                      if (budgetFilter === 'all') return true;
                      if (budgetFilter === 'under25') return item.minCost < 25;
                      if (budgetFilter === '25to45') return item.minCost >= 25 && item.minCost <= 45;
                      if (budgetFilter === 'above45') return item.minCost > 45;
                      return true;
                    })
                    .map((item, idx) => {
                      // Savings estimation calculation
                      const avgAbroad = (item.minCost + item.maxCost) / 2;
                      const savingsPercentage = Math.round(((75 - avgAbroad) / 75) * 100);
                      const displaySavings = savingsPercentage > 0 ? savingsPercentage : null;

                      return (
                        <div key={idx} className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between min-h-[220px]">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div>
                                <span className="font-black text-xl tracking-tight text-white block">{item.country}</span>
                                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">Global Medical Program</span>
                              </div>
                              {item.isPartner ? (
                                <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0">
                                  NMC Approved
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0">
                                  WHO Recognized
                                </span>
                              )}
                            </div>

                            <div className="flex items-baseline gap-2 mb-4">
                              <span className="text-3xl font-black text-blue-400 tracking-tight font-mono">{item.range}</span>
                            </div>

                            {/* visual progress cost bar */}
                            <div className="w-full h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${Math.min(100, (item.minCost / 60) * 100)}%` }}
                              />
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium line-clamp-2 italic flex-1">
                              "{item.spotlight}"
                            </p>
                            {displaySavings && (
                              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" />
                                <span>Saves {displaySavings}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-amber-300 p-8 rounded-[2rem] mb-10 text-xs md:text-sm font-semibold leading-relaxed max-w-4xl flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-white mb-1">Direct Comparative Analysis</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">
                      Private colleges in India require exceptionally competitive NEET scores for low-budget seats, while management seats involve high package costs. Studying abroad in NMC-approved global institutions offers up to <strong className="text-blue-400">70% direct savings</strong> with identical globally-recognized clinical competencies and seamless license processes.
                    </p>
                  </div>
                </div>

                {/* Contrast indicator for India under 25 Lakhs */}
                {budgetFilter === 'under25' ? (
                  <div className="bg-slate-950/40 border border-red-500/20 rounded-[2.5rem] p-12 text-center max-w-3xl mx-auto my-6">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Coins className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">Zero Private Colleges Eligible</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto font-medium">
                      There are <span className="text-red-400 font-bold">no private medical colleges in India</span> with package costs under 25 Lakhs. 
                    </p>
                    <div className="mt-8 flex justify-center">
                      <button 
                        onClick={() => {
                          setActiveBudgetTab('abroad');
                          setBudgetFilter('under25');
                        }}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20"
                      >
                        Browse 5+ Abroad Countries Under 25L <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {indiaStatesData
                      .filter((item) => {
                        if (budgetFilter === 'all') return true;
                        if (budgetFilter === 'under25') return item.minCost < 25;
                        if (budgetFilter === '25to45') return item.minCost >= 25 && item.minCost <= 45;
                        if (budgetFilter === 'above45') return item.minCost > 45;
                        return true;
                      })
                      .map((item, idx) => (
                        <div key={idx} className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem] hover:border-amber-500/30 hover:bg-white/[0.03] transition-all relative group overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-12 -mt-12 blur-xl"></div>
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">State / Region</div>
                          <div className="font-black text-lg text-white mb-3 tracking-tight">{item.state}</div>
                          <div className="text-2xl font-black text-amber-400 tracking-tight font-mono mb-4">
                            {item.cost}
                          </div>

                          {/* progress cost visual */}
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                            <div 
                              className="h-full bg-amber-500 rounded-full" 
                              style={{ width: `${Math.min(100, (item.minCost / 115) * 100)}%` }}
                            />
                          </div>

                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">High NEET Cutoff / High Quota Fees</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* True Career Guidance Services (TCG) Institutional Overview */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="flex-1">
              <div className="flex items-center gap-3 bg-blue-600/10 px-4 py-2 rounded-full w-fit text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">
                <Award className="w-3.5 h-3.5" />
                <span>ISO 9001:2015 Certified Agency</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                True Career Guidance <br />
                <span className="text-blue-600">Services Pvt. Ltd.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6 font-medium italic opacity-90">
                "Your Trust, Our Commitment to Your Success!"
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-10 font-medium">
                Established with a foundational vision to deliver direct, genuine, and completely transparent admission counseling. With over a decade of dedication, we have guided <strong>1,000+ students</strong> to secure verified professional admissions in top-rated global and national institutions with zero hidden commissions.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="border border-slate-100 p-6 rounded-2xl">
                  <h4 className="text-3xl font-black text-blue-600 mb-1">10+</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Years Legacy</p>
                </div>
                <div className="border border-slate-100 p-6 rounded-2xl">
                  <h4 className="text-3xl font-black text-blue-600 mb-1">1000+</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Admissions</p>
                </div>
                <div className="border border-slate-100 p-6 rounded-2xl">
                  <h4 className="text-3xl font-black text-blue-600 mb-1">100%</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Transparency</p>
                </div>
                <div className="border border-slate-100 p-6 rounded-2xl">
                  <h4 className="text-3xl font-black text-blue-600 mb-1">ISO</h4>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Certified Standards</p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-[3.5rem] p-10 md:p-14 border border-slate-100 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">Multi-Discipline Programs</h3>
                </div>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-8">
                  We offer absolute compliance, mapping, documentation, and counseling guidance across a wide spectrum of career paths:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {tcgCourses.map((course, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 p-3 rounded-xl flex items-center gap-2.5 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                      <span className="text-xs font-bold text-slate-700">{course.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Branches Physical Locations Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Walk-In Hubs</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Our Verified Indian Branches</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Walk in anytime for a face-to-face personalized mapping session with senior registered counseling experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-black text-sm">01</div>
              <h3 className="font-black text-slate-850 text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                New Delhi Head Office
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-6">
                Unit No. 318-I, 3rd Floor, Living Style Mall, Jasola Vihar, New Delhi - 110025
              </p>
              <div className="text-[9px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                National Corporate Hub
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group hover:border-emerald-200 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 font-black text-sm">02</div>
              <h3 className="font-black text-slate-850 text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Lucknow Branch Office
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-6">
                Unit No. 203 A, 2nd Floor, Felix Square, Sushant Golf City, Ansal API (Near Lulu Mall), Lucknow, Uttar Pradesh - 226002
              </p>
              <div className="text-[9px] font-black text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Regional Counseling Hub
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group hover:border-purple-200 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 font-black text-sm">03</div>
              <h3 className="font-black text-slate-850 text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                Mumbai Branch Office
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-6">
                Unit No. 30, Great Eastern Galleria, Sector 4, Nerul, Navi Mumbai, Maharashtra - 400706
              </p>
              <div className="text-[9px] font-black text-purple-600 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Western India Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight leading-tight">Find Your Perfect Medical Career Path</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium opacity-80">Our specialized counselors provide end-to-end guidance from university selection to visa processing and hostel settlement.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+918521123304" className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-blue-500/10 hover:-translate-y-1 transition-all active:scale-95">
              CALL SENIOR COUNSELOR
            </a>
            <a href="https://wa.me/917909096738" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center justify-center active:scale-95">
              <MessageSquare className="mr-3 w-5 h-5 text-blue-200" />
              WHATSAPP US NOW
            </a>
          </div>
        </div>
      </section>

      {/* Blog / Knowledge Base */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-3">Resources & Insight</h4>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">Latest from Overseas Education</h2>
            </div>
            <Link to="/blog" className="text-sm font-black text-slate-400 hover:text-blue-600 px-6 py-3 border border-slate-100 rounded-xl transition-all">
              VIEW ALL POSTS
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical News</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed opacity-80">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Simple Support */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-4">Quick Answers</h4>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Need help deciding?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Recognition in India?', a: 'All listed universities are NMC (formerly MCI) recognized and global WHO listed.' },
              { q: 'Language Barrier?', a: 'Standardized 100% English medium curriculum designed specifically for Indian students.' },
              { q: 'Indian Food/Hostel?', a: 'Confirmed separate Indian hostels & veg/non-veg Indian mess available in all campuses.' },
              { q: 'NEET Requirement?', a: 'NEET qualification is mandatory as per NMC guidelines for your career in India.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200/60 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-slate-800 mb-3 text-sm flex items-center justify-between">
                  {faq.q}
                  <HelpCircle className="w-4 h-4 text-blue-200" />
                </h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
