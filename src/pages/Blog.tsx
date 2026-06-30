import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, User, Search } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="MBBS Abroad Blog | Latest Admission & Career News"
        description="Stay updated with the latest news, admission guidelines, and tips for studying MBBS abroad. Expert advice for Indian medical students."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-4">Official Journal</h4>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">The Medical <span className="text-blue-600">Bulletin</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto italic font-medium opacity-80">Insights, news, and guides for the next generation of global doctors.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search articles by title or topic..." 
              className="w-full pl-16 pr-6 py-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-blue-900/5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-bold text-slate-600 placeholder:text-slate-300 placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-20">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <span className="text-[10px] font-black uppercase tracking-widest">Publishing latest stories...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5 hover:shadow-blue-900/10 border border-slate-100 transition-all duration-500 group"
                >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Admissions
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center space-x-6 mb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-2 text-blue-500" /> {post.date}</span>
                    <span className="flex items-center"><User className="w-3 h-3 mr-2 text-blue-500" /> Expert Advice</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 mb-5 group-hover:text-blue-600 transition-colors leading-tight italic decoration-blue-500/30 underline-offset-4 decoration-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm mb-10 leading-relaxed line-clamp-3 font-medium opacity-80">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-700 transition-colors"
                  >
                    READ ARTICLE 
                    <ArrowRight className="ml-3 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="flex flex-col items-center opacity-20">
                <Search className="w-16 h-16 mb-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">No matching articles found</span>
              </div>
            </div>
          )}
        </div>
      )}

        {/* Newsletter / CTA */}
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="flex w-full h-full">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="w-full border-r border-white" />)}
                </div>
            </div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-8 animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Stay Ahead of the Curve</h2>
                <p className="text-slate-400 mb-12 font-medium leading-relaxed">Join 5,000+ medical aspirants receiving exclusive admission alerts and scholarship updates monthly.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="email" placeholder="Future Doctor's Email" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-500 font-bold text-sm" />
                    <button className="bg-blue-600 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-2xl shadow-blue-500/20">
                        GET UPDATES
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
