import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: 'Uzbekistan',
    message: ''
  });

  const faqs = [
    {
      question: "How long does the student visa process take for Uzbekistan & Kyrgyzstan?",
      answer: "The student visa process generally takes between 15 to 30 working days. Our dedicated admissions office handles all document translation, ministry approvals, and official invitation letters to ensure a smooth, worry-free process with a 100% success rate."
    },
    {
      question: "What are the accommodation and living conditions like in the student hostels?",
      answer: "All recommended medical universities provide fully-furnished, highly secure hostels on or near campus. Hostels feature 24/7 security surveillance, high-speed Wi-Fi, central heating, modern kitchenettes, and complete laundry facilities. Separate hostels or secure wings are strictly maintained for male and female students."
    },
    {
      question: "Are Indian/Asian food options available for students?",
      answer: "Yes, most universities feature dedicated Indian and international student messes that serve high-quality, nutritious vegetarian and non-vegetarian meals prepared by professional chefs. Fresh local produce, grains, and spices are sourced daily to ensure a familiar and homely taste."
    },
    {
      question: "What documents are required to initiate the student visa application?",
      answer: "To start your visa application, you will need your original valid Passport, NEET-UG Scorecard (Qualified status), 10th & 12th standard Marksheets (properly Apostilled/Attested), recent passport-sized photographs with a clear white background, and a Medical Fitness Certificate (including a certified HIV negative report)."
    },
    {
      question: "Can parents visit students abroad? What is the visitor visa process?",
      answer: "Absolutely! We encourage parents to visit their children. Our support team assists parents in obtaining tourist or visitor invitation letters from the university and guides them through the quick visa application process, ensuring seamless travel and local stay arrangements."
    },
    {
      question: "How do students manage local transport, banking, and currency exchange?",
      answer: "Upon arrival, our local student support coordinators help students open local bank accounts, secure international student cards, obtain local high-speed SIM cards, and purchase public transport passes. Currency exchange services are conveniently available at major bank branches and airport terminals."
    }
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
          universityName: `Target: ${formData.country} | Msg: ${formData.message}`,
          email: 'not-provided@contact-form.com',
          universityId: 'CON',
          state: 'General Contact'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        const whatsappMsg = `New Contact Enquiry:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Target:* ${formData.country}%0A*Message:* ${formData.message}`;
        const whatsappUrl = `https://wa.me/917909096738?text=${whatsappMsg}`;
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
      }
    } catch (error) {
      console.error('Contact submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="Contact Us | Abroad MBBS Admissions Office"
        description="Have questions about MBBS abroad? Visit our office or call us for free counseling. We are here to help you 24/7."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-4">Admissions Office</h4>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight transition-all">Get in Touch</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium opacity-80">Whether you're a parent or a student, we're ready to answer all your admission queries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <a href="tel:+917909096738" className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 group transition-all hover:bg-blue-600 hover:text-white">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <Phone className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="font-black text-slate-800 mb-2 group-hover:text-white">Call Us</h3>
                <p className="text-sm text-slate-500 font-bold group-hover:text-white opacity-80">+91 79090 96738</p>
                <p className="text-[9px] font-black uppercase tracking-widest mt-2 group-hover:text-white opacity-60">10 AM - 8 PM IST</p>
              </a>
              <a href="https://wa.me/917909096738" className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 group transition-all hover:bg-slate-900 hover:text-white">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-blue-400 transition-colors">
                  <MessageSquare className="text-slate-900 w-6 h-6 group-hover:text-blue-400" />
                </div>
                <h3 className="font-black text-slate-800 mb-2 group-hover:text-white text-lg">WhatsApp</h3>
                <p className="text-sm text-slate-500 font-bold group-hover:text-white opacity-80">+91 79090 96738</p>
                <p className="text-[9px] font-black uppercase tracking-widest mt-2 group-hover:text-white opacity-60">24/7 Priority Support</p>
              </a>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                <Mail className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-800 mb-4 text-xl">Email Support</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-sm text-slate-600 font-bold opacity-80">admissions@mbbsdirect.in</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <p className="text-sm text-slate-600 font-bold opacity-80">support@mbbsdirect.in</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
                <div className="flex items-start">
                    <div className="bg-slate-50 p-4 rounded-2xl mr-8">
                        <MapPin className="text-blue-600 w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 mb-3 text-xl">Corporate HUB</h3>
                        <p className="text-sm text-slate-500 leading-relaxed italic opacity-80 font-medium">Cyber Park, Sector 62, Noida, Uttar Pradesh - 201309, India</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-16 shadow-2xl shadow-slate-900/30 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
            <h2 className="text-3xl font-black mb-10 tracking-tight leading-tight">Send a Message</h2>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-white/5 text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black mb-5 tracking-tight">Message Logged!</h2>
                <p className="text-slate-400 mb-12 font-medium italic opacity-80">Connecting you to our senior advisor on WhatsApp...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white" placeholder="Rahul Sharma" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white" placeholder="+91..." />
                  </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Country</label>
                    <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer text-white">
                      <option className="bg-slate-900" value="Uzbekistan">Uzbekistan</option>
                      <option className="bg-slate-900" value="Kyrgyzstan">Kyrgyzstan</option>
                      <option className="bg-slate-900" value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white" placeholder="How can we help you?" />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                       <Loader2 className="w-4 h-4 animate-spin" />
                       Processing...
                    </span>
                  ) : 'PROCEED TO INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Branch Offices Section */}
        <div className="mt-28 pt-20 border-t border-slate-200/60">
          <div className="text-center mb-16">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-4">True Career Guidance Services Pvt. Ltd.</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Our Indian Branch Offices</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium opacity-80">Walk in for a one-on-one counseling session with our certified education experts at any of our branches.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 animate-pulse"></div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-black text-sm">01</div>
              <h3 className="font-black text-slate-800 text-lg mb-4">New Delhi Office</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                Unit No. 318-I, 3rd Floor, Living Style Mall, Jasola Vihar, New Delhi - 110025
              </p>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Main Head Office
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group hover:border-emerald-200 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 font-black text-sm">02</div>
              <h3 className="font-black text-slate-800 text-lg mb-4">Lucknow Office</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                Unit No. 203 A, 2nd Floor, Felix Square, Sushant Golf City, Ansal API (Near Lulu Mall), Lucknow, Uttar Pradesh - 226002
              </p>
              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Regional Counseling Hub
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden group hover:border-purple-200 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 font-black text-sm">03</div>
              <h3 className="font-black text-slate-800 text-lg mb-4">Mumbai Office</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                Unit No. 30, Great Eastern Galleria, Sector 4, Nerul, Navi Mumbai, Maharashtra - 400706
              </p>
              <div className="text-[10px] font-black text-purple-600 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Western India Support
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-28 pt-20 border-t border-slate-200/60">
          <div className="text-center mb-16">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-4">Common Concerns Explained</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Visa & Living FAQ</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium opacity-80">Got questions about visa procedures, student hostels, or daily life abroad? Find answers from our senior academic counselors here.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden transition-all duration-300 hover:border-slate-200/60"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-8 py-6 md:px-10 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-black text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4.5 h-4.5" />
                    </div>
                  </button>
                  
                  {/* Expandable Panel */}
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'
                    }`}
                  >
                    <div className="p-8 md:p-10 text-slate-500 text-sm leading-relaxed font-medium bg-slate-50/20 italic">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
