import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { universities } from '../data/universities';
import { SEO } from '../components/common/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Globe, 
  MapPin, 
  Table as TableIcon, 
  FileText, 
  Info, 
  MessageSquare, 
  BarChart2, 
  Maximize2,
  X,
  ChevronLeft,
  GraduationCap,
  Building2,
  ShieldCheck,
  CreditCard,
  AlertCircle
} from 'lucide-react';

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const university = universities.find((u) => u.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!university) {
      navigate('/universities');
    }
  }, [id, university, navigate]);

  if (!university) return null;

  return (
    <div className="pt-24 pb-32 bg-slate-100 min-h-screen">
      <SEO 
        title={`${university.name} - Fee Structure, Admission 2026`}
        description={`Study MBBS at ${university.name}, ${university.country}. Check latest fee structure, eligibility criteria, and admission process for Indian students.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <Link to="/universities" className="hover:text-blue-600 transition-colors">Universities</Link>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-slate-900">{university.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            {/* Header / Intro */}
            <section className="bg-white p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full md:w-80 aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl group"
                >
                  <img 
                    src={university.image} 
                    alt={university.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] mb-2 block">Institution Type</span>
                    <span className="text-white font-black uppercase tracking-widest text-xs">Medical University</span>
                  </div>
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="text-5xl leading-none shadow-2xl">{university.flag}</span>
                    <div className="h-8 w-px bg-slate-100" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">{university.country} Academic Excellence</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tight leading-[0.85]">{university.name}</h1>
                  
                  <p className="flex items-center text-slate-400 mb-12 font-black text-[10px] uppercase tracking-[0.3em]">
                    <MapPin className="w-4 h-4 mr-4 text-blue-600" />
                    {university.location} &bull; Clinical Center
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {university.features.map((feature, i) => (
                      <span key={i} className="bg-slate-50 text-slate-500 px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-900 hover:text-white transition-all cursor-default">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-16 border-t border-slate-50 relative">
                <div className="absolute top-0 left-0 w-24 h-1 bg-blue-600 -translate-y-[2px] rounded-full"></div>
                <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.3em] flex items-center">
                  <Info className="w-4 h-4 mr-4 text-blue-600" />
                  Institutional Ethos
                </h3>
                <p className="text-slate-600 leading-[1.6] font-serif italic text-2xl opacity-90 first-letter:text-7xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2">{university.overview}</p>
              </div>

              {/* Campus Gallery */}
              {university.gallery && university.gallery.length > 0 && (
                <div className="mt-16 pt-16 border-t border-slate-50">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] flex items-center">
                      <div className="w-8 h-px bg-blue-600 mr-4"></div>
                      Visual Campus Tour
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                      {university.gallery.length} High-Res Frames
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:grid-flow-dense">
                    {university.gallery.map((img, i) => {
                      // Create a masonry-like effect with varied spans based on index
                      const isLarge = i === 0 || i === 5;
                      const isWide = i === 3;
                      
                      return (
                        <motion.div 
                          key={i}
                          layoutId={`gallery-${i}`}
                          onClick={() => setSelectedImage(i)}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ y: -5 }}
                          className={`
                            relative overflow-hidden rounded-[2rem] group cursor-zoom-in shadow-xl shadow-blue-900/5
                            ${isLarge ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-auto' : 'h-[200px]'}
                            ${isWide ? 'md:col-span-2' : ''}
                          `}
                        >
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center backdrop-blur-[2px]">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileHover={{ scale: 1.1, opacity: 1 }}
                              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl"
                            >
                              <Maximize2 className="w-5 h-5" />
                            </motion.div>
                            <span className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em]">View Frame {i + 1}</span>
                          </div>
                          
                          <img 
                            src={img} 
                            alt={`${university.name} view ${i}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Lightbox / Preview */}
                  <AnimatePresence>
                    {selectedImage !== null && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                      >
                        <button 
                          className="absolute top-10 right-10 w-16 h-16 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all hover:rotate-90 z-10 border border-white/10"
                          onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        >
                          <X className="w-8 h-8" />
                        </button>

                        <div className="absolute bottom-10 left-1/2 -translate-x-2/4 flex items-center gap-6 z-10 bg-black/40 px-10 py-5 rounded-full border border-white/10 backdrop-blur-md">
                          <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               setSelectedImage(prev => prev !== null && prev > 0 ? prev - 1 : (university.gallery?.length || 1) - 1);
                             }}
                             className="text-white hover:text-blue-400 transition-colors"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">
                            Frame {selectedImage + 1} / {university.gallery?.length}
                          </span>
                          <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               setSelectedImage(prev => prev !== null && prev < (university.gallery?.length || 1) - 1 ? prev + 1 : 0);
                             }}
                             className="text-white hover:text-blue-400 transition-colors"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>

                        <motion.div
                          layoutId={`gallery-${selectedImage}`}
                          className="relative max-w-6xl w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img 
                            src={university.gallery[selectedImage]} 
                            alt={`${university.name} selected`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </section>

            {/* Fee structure */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/50">
              <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center tracking-tight">
                <TableIcon className="w-6 h-6 mr-4 text-blue-600" />
                Fee Structure (Academic Year 2026-27)
              </h3>
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">Category</th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-100">Charges (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6 border-b border-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm">First Year Package</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Application + Processing</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 font-black text-blue-600 text-xl tracking-tight leading-none">$ {university.package.firstYearPackage}</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6 border-b border-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">Tuition Fee (Annual)</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Instructional Cost</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 font-bold text-slate-700">$ {university.package.tuitionFeeYearly}</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6 border-b border-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">Hostel Fee (Annual)</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Accommodation & Maintenance</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-slate-50 font-bold text-slate-700">$ {university.package.hostelFeeYearly}</td>
                    </tr>
                    {university.package.visaFee && (
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 border-b border-slate-50">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">Visa & Insurance</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Regulatory Compliance</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 border-b border-slate-50 font-bold text-slate-700">{university.package.visaFee}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-start gap-5">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm border border-slate-100 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1.5">Financial Disclaimer & Notes</h4>
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                    * All fees are listed in USD and are subject to change based on central university decisions and potential currency fluctuations. 
                    First-year packages may include one-time administrative, translation, and legalization fees. 
                    <span className="block mt-1 font-bold text-slate-700">Fees are directly payable to the University treasury upon arrival or via official bank transfer.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/50 flex flex-col">
                <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center tracking-tight">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-blue-600" />
                  Eligibility Criteria
                </h3>
                <ul className="space-y-4 flex-grow">
                  {university.eligibility.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start font-medium opacity-90">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/50 flex flex-col">
                <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center tracking-tight">
                  <FileText className="w-5 h-5 mr-3 text-blue-600" />
                  Required Documents
                </h3>
                <ul className="space-y-4 flex-grow">
                  {university.documentsRequired.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start font-medium opacity-90">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Admission Process */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center">
                  <GraduationCap className="w-6 h-6 mr-4 text-blue-600" />
                  Step-by-Step Admission Process
                </h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-100/50">
                  Guaranteed Success
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {university.admissionProcess.map((step, i) => {
                  const icons = [
                    <FileText className="w-4 h-4 text-blue-600" />,
                    <GraduationCap className="w-4 h-4 text-emerald-600" />,
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />,
                    <ShieldCheck className="w-4 h-4 text-purple-600" />,
                    <Globe className="w-4 h-4 text-teal-600" />
                  ];
                  return (
                    <div key={i} className="bg-slate-50/50 border border-slate-100/80 p-5 rounded-2xl hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between min-h-[160px] group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-black text-slate-200 group-hover:text-blue-500/20 font-mono transition-colors">
                            0{i + 1}
                          </span>
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {icons[i] || <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                          </div>
                        </div>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed group-hover:text-blue-600 transition-colors">
                          {step}
                        </p>
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-100/60 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                        <span>Step {i + 1}</span>
                        <span className="text-blue-600">Day {i * 2 + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Strategic Advantages */}
            {university.usps && university.usps.length > 0 && (
              <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/50">
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-12 h-px bg-blue-600"></div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Strategic Advantages</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {university.usps.map((usp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000"></div>
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-[11px] font-black text-slate-900 mb-4 uppercase tracking-widest leading-relaxed group-hover:text-blue-600 transition-colors">{usp}</h4>
                      <p className="text-slate-500 text-[11px] font-medium leading-relaxed italic opacity-80 group-hover:text-slate-600 transition-colors">
                        "Proven excellence in delivering globally competitive education in the heart of {university.country}."
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / CTA */}
          <div className="space-y-10">
            <div className="sticky top-28 space-y-6 z-20 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/20 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
                
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em] mb-4">Admissions Open 2026</h4>
                <h3 className="text-2xl font-black mb-6 tracking-tight leading-tight">Secure Your MBBS Seat Today</h3>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Limited slots available for {university.name}. Complete registration to lock your seat at current fee structure.</p>
                
                <Link 
                  to={`/apply?university=${encodeURIComponent(university.name)}`}
                  className="block w-full bg-blue-600 text-white text-center py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 mb-4"
                >
                  APPLY FOR ADMISSION
                </Link>
                
                <a 
                  href="https://wa.me/917909096738"
                  className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 mb-4"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  CHAT WITH COUNSELOR
                </a>
                
                <div className="mt-12 pt-10 border-t border-white/5 flex flex-col space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-400">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Document</span>
                      <span className="text-xs font-bold text-white">Full Fee Brochure</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Visibility</span>
                      <span className="text-xs font-bold text-white">English Medium Program</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Admissions Sidebar */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/50">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Recent Candidate Inquiries</h4>
                  <div className="space-y-6">
                      {[
                          { name: "Rahul K.", city: "Delhi", time: "5m ago" },
                          { name: "Sneha P.", city: "Mumbai", time: "12m ago" },
                          { name: "Amit G.", city: "Lucknow", time: "1h ago" }
                      ].map((e, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-5 last:border-0 last:pb-0 group">
                              <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xs font-black text-slate-400 uppercase group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                      {e.name.charAt(0)}
                                  </div>
                                  <div className="relative">
                                      <p className="text-sm font-black text-slate-800">{e.name}</p>
                                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">{e.city}</p>
                                  </div>
                              </div>
                              <span className="text-[9px] text-blue-600 font-black tracking-widest bg-blue-50 px-3 py-1 rounded-full uppercase">{e.time}</span>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndianRupee = ({ className }: { className?: string }) => (
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
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m6 13 8.5 8" />
        <path d="M6 13h3" />
        <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
)

export default UniversityDetails;
