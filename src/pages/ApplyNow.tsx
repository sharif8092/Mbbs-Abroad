import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Phone, MessageSquare, Loader2 } from 'lucide-react';

const ApplyNow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    universityName: '',
    state: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          universityId: formData.universityName.slice(0, 3).toUpperCase()
        })
      });

      if (response.ok) {
        setSubmitted(true);
        // Automatically redirect to WhatsApp after a small delay
        const whatsappMsg = `New MBBS Enquiry:%0A%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*University:* ${formData.universityName}%0A*State:* ${formData.state}`;
        const whatsappUrl = `https://wa.me/917909096738?text=${whatsappMsg}`;
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit application. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="Apply Online for MBBS Abroad 2026 | Admission Form"
        description="Fill out our simple online application form to start your MBBS journey abroad. Our counselors will contact you within 24 hours."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 shadow-blue-900/5">
          {/* Left Panel */}
          <div className="bg-slate-900 p-10 md:p-14 text-white md:w-[40%] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
            
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em] mb-6">Admission Form</h4>
              <h1 className="text-3xl md:text-4xl font-black mb-8 tracking-tight leading-tight italic">Secure Your Global Medical <span className="text-blue-500">Career</span></h1>
              <p className="text-slate-400 text-sm mb-12 opacity-90 leading-relaxed font-medium">Join 2,000+ Indian students already studying in our partner universities. Your journey starts here.</p>
              
              <ul className="space-y-6">
                {[
                  'Guaranteed Admission 2026',
                  'Exclusive Elite Scholarships',
                  'Full VISA & Travel Support',
                  'Post-Landing Concierge'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-xs font-black uppercase tracking-widest text-slate-300">
                    <CheckCircle2 className="w-4 h-4 mr-4 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-16 pt-12 border-t border-white/5 relative z-10">
              <p className="text-[9px] uppercase tracking-[0.2em] font-black mb-4 text-slate-500">Need immediate help?</p>
              <div className="flex flex-col space-y-4">
                <a href="tel:+918521123304" className="flex items-center group/link">
                    <div className="bg-white/5 p-3 rounded-xl mr-4 group-hover/link:bg-blue-600 transition-colors"><Phone className="w-4 h-4 text-blue-400 group-hover/link:text-white" /></div>
                    <span className="font-black text-sm tracking-tight">+91 85211 23304</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="p-10 md:p-16 md:w-[60%] bg-white">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-5 tracking-tight">Application Lodged!</h2>
                <p className="text-slate-500 mb-12 font-medium italic opacity-80">Our senior advisor will contact you within 24 hours to initiate your documentation.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                >
                  NEW APPLICATION
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Candidate Profile</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Student Full Name</label>
                            <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="e.g. Rahul Sharma" className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-slate-400" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp Number</label>
                            <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 00000 00000" className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-slate-400" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
                        <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="rahul@domain.com" className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-slate-400" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Preferred Institution</label>
                            <select name="universityName" value={formData.universityName} onChange={handleChange} className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all appearance-none cursor-pointer">
                                <option value="">Select University</option>
                                <option value="Bukhara State Medical Institute">Bukhara State Medical Institute</option>
                                <option value="Tashkent State Medical Academy">Tashkent State Medical Academy</option>
                                <option value="Samarkand State Medical University">Samarkand State Medical University</option>
                                <option value="Osh State University">Osh State University</option>
                                <option value="Other / Advisory Needed">Other / Advisory Needed</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current State</label>
                            <input required name="state" value={formData.state} onChange={handleChange} type="text" placeholder="e.g. Uttar Pradesh" className="w-full bg-slate-50 border-0 rounded-2xl p-5 text-slate-900 font-bold focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-slate-400" />
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 disabled:opacity-70 active:scale-95"
                    >
                    {isSubmitting ? (
                        <>
                        <Loader2 className="animate-spin mr-3 w-5 h-5" />
                        PROCESSING SECURELY...
                        </>
                    ) : (
                        <>
                        SUBMIT ADMISSION REQUEST <Send className="ml-3 w-4 h-4" />
                        </>
                    )}
                    </button>
                    <div className="flex items-center justify-center space-x-3 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-8">
                        <Lock className="w-3 h-3 text-blue-500" />
                        <span>Encrypted SSL Application &bull; High Privacy</span>
                    </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Lock = ({ className }: { className?: string }) => (
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

export default ApplyNow;
