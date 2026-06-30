import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  Search,
  Filter,
  Download,
  ShieldCheck,
  TrendingUp,
  School,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Save,
  Globe,
  MapPin,
  ExternalLink
} from 'lucide-react';

type AdminTab = 'Applications' | 'Universities' | 'Blogs' | 'Gallery';

interface Application {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  universityName: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
  createdAt: string;
}

interface University {
  id: string;
  name: string;
  country: string;
  location: string;
  image: string;
  flag: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  date: string;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);

  // For CRUD
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'Applications': endpoint = '/api/admin/applications'; break;
        case 'Universities': endpoint = '/api/universities'; break;
        case 'Blogs': endpoint = '/api/blogs'; break;
        default: endpoint = '/api/admin/applications';
      }

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Failed to fetch ${activeTab}`);
      const data = await response.json();
      
      if (activeTab === 'Applications') setApplications(Array.isArray(data) ? data : []);
      else if (activeTab === 'Universities') setUniversities(Array.isArray(data) ? data : []);
      else if (activeTab === 'Blogs') setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteUniversity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return;
    try {
      await fetch(`/api/universities/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filteredItems = () => {
    if (activeTab === 'Applications') {
      return applications.filter(app => {
        const matchesSearch = app.fullName.toLowerCase().includes(search.toLowerCase()) || 
                             app.universityName?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || app.status === filter;
        return matchesSearch && matchesFilter;
      });
    }
    if (activeTab === 'Universities') {
      return universities.filter(uni => uni.name.toLowerCase().includes(search.toLowerCase()) || uni.country.toLowerCase().includes(search.toLowerCase()));
    }
    if (activeTab === 'Blogs') {
      return blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
    }
    return [];
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUni, setNewUni] = useState({ name: '', country: '', location: '', image: '', flag: '' });

  const addUniversity = async () => {
    try {
      await fetch('/api/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUni)
      });
      setShowAddModal(false);
      fetchData();
    } catch (error) {
      console.error('Add error:', error);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 shadow-2xl"
            >
              <h2 className="text-3xl font-black mb-8 tracking-tight">Add New <span className="text-blue-600">University</span></h2>
              <div className="space-y-4">
                <input 
                  type="text" placeholder="University Name" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600"
                  value={newUni.name} onChange={e => setNewUni({...newUni, name: e.target.value})}
                />
                <input 
                  type="text" placeholder="Country" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600"
                  value={newUni.country} onChange={e => setNewUni({...newUni, country: e.target.value})}
                />
                <input 
                  type="text" placeholder="Location" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600"
                  value={newUni.location} onChange={e => setNewUni({...newUni, location: e.target.value})}
                />
                <input 
                  type="text" placeholder="Image URL" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600"
                  value={newUni.image} onChange={e => setNewUni({...newUni, image: e.target.value})}
                />
                <input 
                  type="text" placeholder="Flag Emoji" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600"
                  value={newUni.flag} onChange={e => setNewUni({...newUni, flag: e.target.value})}
                />
              </div>
              <div className="flex gap-4 mt-10">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
                <button onClick={addUniversity} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700">Add Institution</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Elite Control Center</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              Admin <span className="text-blue-600">Console</span>
            </h1>
          </div>
          
          <div className="flex gap-2 p-1 bg-white rounded-2xl shadow-xl shadow-blue-900/5">
             {(['Applications', 'Universities', 'Blogs', 'Gallery'] as AdminTab[]).map(tab => (
               <button 
                 key={tab}
                 onClick={() => { setActiveTab(tab); setSearch(''); }}
                 className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-2 rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col md:flex-row items-center gap-2 mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-slate-50 border-none focus:ring-0 text-[10px] uppercase font-black tracking-widest outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {activeTab !== 'Applications' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-slate-900 text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-black transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Add New</span>
            </button>
          )}
          {activeTab === 'Applications' && (
            <div className="flex gap-1 p-1 bg-slate-50 rounded-full">
               {['All', 'Pending', 'Reviewing', 'Approved', 'Rejected'].map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                     filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                   }`}
                 >
                   {f}
                 </button>
               ))}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-8 py-6 rounded-3xl mb-8 flex items-center gap-4">
            <XCircle className="w-6 h-6 flex-shrink-0" />
            <div className="text-sm font-medium">{error}</div>
            <button onClick={fetchData} className="ml-auto bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Retry</button>
          </div>
        )}

        {/* Content Display */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] opacity-20">
               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
               <span className="text-[10px] font-black uppercase tracking-widest">Loading Intelligence...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                {activeTab === 'Applications' && (
                  <>
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Student Profile</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Institution Selection</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Submission</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredItems().map((app: Application) => (
                        <tr key={app._id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-10 py-8">
                            <div>
                              <div className="text-sm font-black text-slate-900 mb-1">{app.fullName}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.email} | {app.phone}</div>
                            </div>
                          </td>
                          <td className="px-10 py-8 font-black text-[10px] text-slate-600 uppercase tracking-widest">
                            {app.universityName}
                          </td>
                          <td className="px-10 py-8">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                               app.status === 'Approved' ? 'text-green-500 bg-green-50 border-green-100' :
                               app.status === 'Rejected' ? 'text-red-500 bg-red-50 border-red-100' :
                               'text-amber-500 bg-amber-50 border-amber-100'
                             }`}>
                                {app.status}
                             </span>
                          </td>
                          <td className="px-10 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex gap-2">
                               <button onClick={() => updateStatus(app._id, 'Approved')} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle2 className="w-4 h-4" /></button>
                               <button onClick={() => updateStatus(app._id, 'Rejected')} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><XCircle className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {activeTab === 'Universities' && (
                  <>
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Institution</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Location</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Country</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredItems().map((uni: University) => (
                        <tr key={uni.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-10 py-8 flex items-center gap-4">
                            <img src={uni.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                            <div className="text-sm font-black text-slate-900">{uni.name}</div>
                          </td>
                          <td className="px-10 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {uni.location}
                          </td>
                          <td className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                            {uni.flag} {uni.country}
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex gap-2">
                               <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                               <button onClick={() => deleteUniversity(uni.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {activeTab === 'Blogs' && (
                  <>
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Article Title</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Slug</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Date</th>
                        <th className="px-10 py-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredItems().map((blog: Blog) => (
                        <tr key={blog.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-10 py-8 text-sm font-black text-slate-900">{blog.title}</td>
                          <td className="px-10 py-8 text-xs text-slate-400">{blog.slug}</td>
                          <td className="px-10 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{blog.date}</td>
                          <td className="px-10 py-8">
                             <div className="flex gap-2">
                               <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                               <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
