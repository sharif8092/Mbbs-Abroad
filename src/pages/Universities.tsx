import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { UniversityCard } from '../components/home/UniversityCard';
import { motion } from 'motion/react';
import { Search, MapPin, SlidersHorizontal, ArrowRight, Sparkles, Star, ShieldCheck, GraduationCap, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { universities as localUniversities } from '../data/universities';

const Universities = () => {
  const [universities, setUniversities] = useState<any[]>(localUniversities);
  const [filter, setFilter] = useState<string>('All');
  const [budgetFilter, setBudgetFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/universities')
      .then(res => {
        if (!res.ok) throw new Error('API status not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUniversities(data);
        } else {
          setUniversities(localUniversities);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn("API fetch error, using local fallback:", err);
        setUniversities(localUniversities);
        setLoading(false);
      });
  }, []);

  // Helper function to extract numerical USD budget value from firstYearPackage string (e.g. "6800 USD" -> 6800)
  const getUSDValue = (packageStr: string): number => {
    if (!packageStr) return 0;
    const cleanNum = packageStr.replace(/[^0-9.]/g, '');
    return parseFloat(cleanNum) || 0;
  };

  // Derive available countries dynamically from whatever universities are available
  const countries = ['All', ...Array.from(new Set(universities.map(u => u.country).filter(Boolean)))];

  // Filtering & Sorting Logic
  const filteredUniversities = (Array.isArray(universities) ? universities : [])
    .filter((u) => {
      // Country Filter
      const matchesCountry = filter === 'All' || u.country === filter;
      
      // Search matches name, location, or country
      const matchesSearch = 
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        (u.location && u.location.toLowerCase().includes(search.toLowerCase())) ||
        (u.country && u.country.toLowerCase().includes(search.toLowerCase()));

      // Budget Filter (First Year Package USD equivalent benchmark helper)
      const usdVal = getUSDValue(u.package?.firstYearPackage);
      let matchesBudget = true;
      if (budgetFilter === 'low') {
        matchesBudget = usdVal <= 7000; // Economy
      } else if (budgetFilter === 'medium') {
        matchesBudget = usdVal > 7000 && usdVal <= 10000; // Balanced
      } else if (budgetFilter === 'premium') {
        matchesBudget = usdVal > 10000; // Top-tier/Clinical Apex
      }

      return matchesCountry && matchesSearch && matchesBudget;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'fee-low') {
        return getUSDValue(a.package?.firstYearPackage) - getUSDValue(b.package?.firstYearPackage);
      } else if (sortBy === 'fee-high') {
        return getUSDValue(b.package?.firstYearPackage) - getUSDValue(a.package?.firstYearPackage);
      }
      return 0; // default order
    });

  return (
    <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
      <SEO 
        title="NMC Approved Universities for MBBS Abroad & India 2026 | TCG Educational Consultancy"
        description="Explore premium NMC approved and WHO recognized medical colleges in India, Kyrgyzstan, Uzbekistan, Russia, Bangladesh, and globally. Accurate fee schedules, transparent support, and 100% verified admissions."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-blue-600/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>NMC APPROVED & WHO LISTED 2026 BATCH</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            Premium Medical <br />
            <span className="text-blue-600">Institutions.</span>
          </h1>
          
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
            True Career Guidance Services Pvt. Ltd. connects you with elite world-class medical universities. Benefit from fully English-medium teaching, advanced diagnostic training, and rich Indian hosteling options.
          </p>
        </div>

        {/* Enhanced Dynamic Filters Bar */}
        <div className="bg-white rounded-[3rem] p-6 sm:p-10 shadow-2xl shadow-blue-900/5 border border-slate-100/80 mb-20 relative z-10 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Search Box */}
            <div className="lg:col-span-4 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-xs uppercase tracking-wider placeholder:text-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Dynamic Country Filter */}
            <div className="lg:col-span-8 flex flex-wrap items-center justify-start lg:justify-end gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1.5 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Country:
              </span>
              <div className="flex flex-wrap gap-2">
                {countries.map((countryName) => (
                  <button
                    key={countryName}
                    onClick={() => setFilter(countryName)}
                    className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                      filter === countryName
                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                        : 'bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {countryName}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Secondary Budget & Sorting Options */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Budget Range Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Est. Package:</span>
              <button
                onClick={() => setBudgetFilter('All')}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                  budgetFilter === 'All'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Budgets
              </button>
              <button
                onClick={() => setBudgetFilter('low')}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                  budgetFilter === 'low'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                Under $7,000 /yr
              </button>
              <button
                onClick={() => setBudgetFilter('medium')}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                  budgetFilter === 'medium'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                $7,000 - $10,000 /yr
              </button>
              <button
                onClick={() => setBudgetFilter('premium')}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
                  budgetFilter === 'premium'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                Above $10,000 /yr
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-stretch md:self-auto">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer w-full md:w-auto"
              >
                <option value="default">Default Order</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>
            </div>

          </div>

          {/* Quick Counter */}
          <div className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Showing {filteredUniversities.length} matching institutions
          </div>
        </div>

        {/* Catalog Grid View */}
        {loading && universities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
             <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Loading verified catalog...</span>
          </div>
        ) : filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredUniversities.map((uni, i) => (
              <UniversityCard key={uni.id} university={uni} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 max-w-3xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No institutions found.</h3>
            <p className="text-slate-400 text-sm font-medium">Try resetting your search query or choosing another country category.</p>
            <button
              onClick={() => {
                setFilter('All');
                setBudgetFilter('All');
                setSearch('');
              }}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* TCG Value Proposition Strip */}
        <div className="mt-32 bg-slate-900 text-white rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[80px] -mr-40 -mt-40"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Authorized Direct Representation</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 tracking-tight leading-tight">
                Get Admission in Elite Partner Medical Colleges with 100% Transparency
              </h2>
              <p className="text-slate-400 text-sm mt-4 font-medium leading-relaxed">
                TCG Educational Consultancy coordinates directly with Ministries of Education & health faculties. Your fees are payable directly to the university's official bank accounts — completely bypassing middlemen commission schemes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">ISO 9001:2015 Standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Complete English Medium</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">0% Hidden Charges Guarantees</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-300">Elite Hostel & Indian Food</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[2.5rem] relative">
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Confused about choices?</span>
              <h3 className="text-xl font-black mt-2 mb-4 text-white">Let Us Custom Map Your Admission Options</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8">
                Get a completely custom-tailored counseling map listing university approvals, FMGE records, and payment options directly based on your NEET score.
              </p>
              
              <Link
                to="/apply"
                className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300 active:scale-95"
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Globe = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20" />
    <path d="M2 12h20" />
  </svg>
);

export default Universities;
