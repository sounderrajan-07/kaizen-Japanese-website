import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowLeft, RefreshCw, Mail, Download, Search, 
  CheckCircle, Clock, Trash2, ExternalLink, Send, Sparkles, Filter, 
  UserCheck, Plus, Image as ImageIcon, Upload, Star, X
} from 'lucide-react';

export default function AdminPortal({ onBackToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab: 'leads' or 'testimonials'
  const [adminTab, setAdminTab] = useState('leads');

  // Leads State
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Testimonials State
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tFormData, setTFormData] = useState({
    name: '',
    role: '',
    company: '',
    avatar: '/images/testimonials/Kaushik Nivesh P.jpeg',
    badge: '100% Placement Milestone',
    jlpt: 'JLPT N4 Passed',
    quote: '',
    location: 'Coimbatore Campus',
    featured: false
  });

  // Test Mailer State
  const [testMailRecipient, setTestMailRecipient] = useState('');
  const [testMailStatus, setTestMailStatus] = useState(null);
  const [testingMail, setTestingMail] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'sensei123' || password === 'admin') {
      setIsAuthenticated(true);
      fetchLeads();
      fetchTestimonials();
    } else {
      setLoginError(true);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchLeads();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSendTestMail = async (e) => {
    e.preventDefault();
    setTestingMail(true);
    setTestMailStatus(null);

    try {
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: testMailRecipient })
      });
      const data = await res.json();

      if (data.success) {
        setTestMailStatus({
          type: 'success',
          message: data.message,
          previewUrl: data.previewUrl
        });
      } else {
        setTestMailStatus({
          type: 'error',
          message: data.error || 'Failed to dispatch test email.'
        });
      }
    } catch (err) {
      setTestMailStatus({
        type: 'error',
        message: 'Could not connect to Nodemailer test endpoint.'
      });
    } finally {
      setTestingMail(false);
    }
  };

  // Image Upload handler for Testimonials
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: reader.result,
            filename: file.name
          })
        });
        const data = await res.json();
        if (data.success && data.url) {
          setTFormData(prev => ({ ...prev, avatar: data.url }));
        } else {
          // fallback to base64 preview directly
          setTFormData(prev => ({ ...prev, avatar: reader.result }));
        }
      } catch (err) {
        setTFormData(prev => ({ ...prev, avatar: reader.result }));
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    if (!tFormData.name || !tFormData.quote) return;

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tFormData)
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        fetchTestimonials();
        setTFormData({
          name: '',
          role: '',
          company: '',
          avatar: '/images/testimonials/Kaushik Nivesh P.jpeg',
          badge: '100% Placement Milestone',
          jlpt: 'JLPT N4 Passed',
          quote: '',
          location: 'Coimbatore Campus',
          featured: false
        });
      }
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const exportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Type', 'Name', 'Email', 'Phone', 'Pathway/Course', 'Status', 'Notes'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.date).toLocaleDateString(),
      `"${l.type || ''}"`,
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.pathway || l.course || ''}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kaizen_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone?.includes(searchTerm) ||
      (l.pathway || l.course)?.toLowerCase().includes(searchTerm.toLowerCase());

    if (typeFilter === 'all') return matchesSearch;
    if (typeFilter === 'jobs') return matchesSearch && l.type?.includes('Job');
    if (typeFilter === 'higher-ed') return matchesSearch && l.type?.includes('Higher Education');
    if (typeFilter === 'demo') return matchesSearch && (l.type?.includes('Demo') || l.type?.includes('Course'));
    return matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white flex items-center justify-center p-4 transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-2xl relative">
          
          <button 
            onClick={onBackToSite}
            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-white flex items-center gap-1.5 mb-6 transition font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Academy Website</span>
          </button>

          <div className="text-center space-y-2 mb-8">
            <div className="h-14 px-3 py-1 bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <img src="/logo.jpeg" alt="Logo" className="h-10 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Kaizen Admin Desk</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Coimbatore Student & Job Application Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter admin password (hint: sensei123)"
                className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold text-center">
                Invalid credentials! Please use <code className="bg-neutral-100 dark:bg-black px-1.5 py-0.5 rounded text-red-600 dark:text-white">sensei123</code>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition"
            >
              Unlock Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(true);
                fetchLeads();
                fetchTestimonials();
              }}
              className="w-full py-2 px-3 text-xs text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-white underline text-center font-semibold"
            >
              Quick Preview (One-Click Demo Access)
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white p-4 sm:p-8 transition-colors">
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900/80 p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-white transition"
              title="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <div className="h-6 px-1.5 py-0.5 bg-white rounded border border-neutral-200 flex items-center">
                  <img src="/logo.jpeg" alt="Logo" className="h-5 w-auto object-contain" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-neutral-950 dark:text-white">Kaizen Admin Dashboard</h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-500/30">
                  Live Desk
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Centralized Enquiries, Job Applications, Testimonials & Nodemailer Forwarding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {adminTab === 'leads' ? (
              <>
                <button
                  onClick={fetchLeads}
                  className="flex-1 sm:flex-none p-2.5 rounded-xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-white flex items-center justify-center gap-1.5 text-xs font-bold"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-600' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={exportCsv}
                  className="flex-1 sm:flex-none p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow-md shadow-red-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex-1 sm:flex-none p-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow-md shadow-red-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Testimonial</span>
              </button>
            )}

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-300 text-xs font-bold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <button
            onClick={() => setAdminTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              adminTab === 'leads'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-red-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Student & Job Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => {
              setAdminTab('testimonials');
              fetchTestimonials();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              adminTab === 'testimonials'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-red-600'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Testimonial Manager ({testimonials.length})</span>
          </button>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {adminTab === 'leads' && (
          <div className="space-y-6">
            {/* Nodemailer Verification Tool Box */}
            <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800/80 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-neutral-950 dark:text-white">
                    <Mail className="w-4 h-4 text-red-600" />
                    <span>Nodemailer Dispatch Verification</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Test the email forwarding pipeline configured in <code>server/server.js</code>.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSendTestMail} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  value={testMailRecipient}
                  onChange={(e) => setTestMailRecipient(e.target.value)}
                  placeholder="Recipient Email (leave blank to use default admin)"
                  className="flex-1 w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={testingMail}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{testingMail ? 'Sending...' : 'Trigger Test Email'}</span>
                </button>
              </form>

              {testMailStatus && (
                <div className={`mt-3 p-3.5 rounded-xl text-xs border ${
                  testMailStatus.type === 'success'
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500/40 text-red-800 dark:text-red-200'
                    : 'bg-red-100 dark:bg-red-950/80 border-red-600 text-red-800 dark:text-red-200'
                }`}>
                  <p className="font-semibold">{testMailStatus.message}</p>
                </div>
              )}
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search leads by name, email, or pathway..."
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500 shadow-sm"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'All Leads' },
                  { id: 'jobs', label: 'Job Applications' },
                  { id: 'higher-ed', label: 'Higher Ed' },
                  { id: 'demo', label: 'Demo Bookings' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTypeFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      typeFilter === tab.id
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-neutral-100 dark:bg-black/60 text-neutral-700 dark:text-neutral-400 font-extrabold uppercase tracking-wider text-[11px] border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Student / Applicant</th>
                      <th className="py-3.5 px-4">Pathway / Course</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-neutral-500 text-sm">
                          No matching leads found. Submit an enquiry on the site to see it appear here!
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap text-neutral-500 dark:text-neutral-400 text-xs">
                            {new Date(lead.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                              lead.type?.includes('Job') 
                                ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-500/30'
                                : lead.type?.includes('Higher')
                                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-red-300 border border-neutral-200 dark:border-neutral-700'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                            }`}>
                              {lead.type?.split(' ')[0]}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-neutral-950 dark:text-white">{lead.name}</div>
                            {lead.qualification && (
                              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{lead.qualification}</div>
                            )}
                            {lead.message && (
                              <div className="text-[11px] text-neutral-500 italic mt-0.5 line-clamp-1 max-w-xs">
                                "{lead.message}"
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-neutral-900 dark:text-white">
                              {lead.pathway || lead.course || 'General'}
                            </div>
                            {lead.jlptLevel && (
                              <div className="text-[11px] text-red-600 dark:text-red-400 font-bold">JLPT: {lead.jlptLevel}</div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="text-neutral-900 dark:text-neutral-300 font-bold">{lead.phone}</div>
                            <div className="text-neutral-500 dark:text-neutral-400 text-xs">{lead.email}</div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={lead.status || 'New'}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className={`text-xs font-bold rounded-xl px-2.5 py-1 border focus:outline-none ${
                                lead.status === 'Enrolled'
                                  ? 'bg-green-100 dark:bg-green-950/80 border-green-500 text-green-700 dark:text-green-200'
                                  : lead.status === 'Contacted'
                                  ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200'
                                  : 'bg-white dark:bg-black border-red-500/40 text-red-600 dark:text-red-400'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-bold mr-2.5"
                            >
                              Call
                            </a>
                            <a
                              href={`mailto:${lead.email}`}
                              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                            >
                              Email
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TESTIMONIALS MANAGER */}
        {adminTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div>
                <h3 className="text-lg font-black text-neutral-950 dark:text-white">Live Student Testimonials & Placements</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Manage the student stories and large portraits displayed on the public website.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Big Image Preview */}
                    <div className="relative h-64 w-full bg-black">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                        {t.badge}
                      </span>
                      {t.featured && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                          <Star className="w-3 h-3 fill-black" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-black text-neutral-950 dark:text-white">{t.name}</h4>
                      <p className="text-xs font-bold text-red-600 dark:text-red-400">{t.role}</p>
                      <p className="text-xs text-neutral-500">{t.company} • {t.location}</p>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 italic pt-2 line-clamp-3">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 dark:bg-black/40 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-600 dark:text-neutral-400">{t.jlpt}</span>
                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1 font-bold p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD NEW TESTIMONIAL */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="relative max-w-2xl w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-black text-neutral-950 dark:text-white">Add New Student Testimonial</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 mt-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={tFormData.name}
                    onChange={(e) => setTFormData({ ...tFormData, name: e.target.value })}
                    placeholder="e.g. Karthik Raja"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={tFormData.role}
                    onChange={(e) => setTFormData({ ...tFormData, role: e.target.value })}
                    placeholder="e.g. Software Engineer / Mechanical Engineer"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={tFormData.company}
                    onChange={(e) => setTFormData({ ...tFormData, company: e.target.value })}
                    placeholder="e.g. Sumitomo Heavy Industries / Tokyo Placement"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                    JLPT Level
                  </label>
                  <input
                    type="text"
                    value={tFormData.jlpt}
                    onChange={(e) => setTFormData({ ...tFormData, jlpt: e.target.value })}
                    placeholder="e.g. JLPT N4 / N3 Certified"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Student Portrait Upload & Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400">
                  Student Portrait Photo (Big High-Res Image) *
                </label>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex-shrink-0 shadow-md">
                    <img
                      src={tFormData.avatar}
                      alt="Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div>
                      <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-bold cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition">
                        <Upload className="w-3.5 h-3.5 text-red-600" />
                        <span>{uploadingImage ? 'Uploading Image...' : 'Upload Student Photo from Device'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-[11px] text-neutral-500 block mb-1">Or choose an existing student image:</span>
                      <select
                        value={tFormData.avatar}
                        onChange={(e) => setTFormData({ ...tFormData, avatar: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="/images/testimonials/Muzammil Ahmed BE.jpeg">Muzammil Ahmed B.E.</option>
                        <option value="/images/testimonials/Kaushik Nivesh P.jpeg">Kaushik Nivesh P.</option>
                        <option value="/images/testimonials/Mr.Monesh M.jpeg">Mr. Monesh M.</option>
                        <option value="/images/campus/Moment1.jpg">Classroom Session Photo</option>
                        <option value="/images/campus/Moment2.jpg">Certificate Felicitation Photo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={tFormData.badge}
                    onChange={(e) => setTFormData({ ...tFormData, badge: e.target.value })}
                    placeholder="e.g. 100% Placement Milestone"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                    Location / Campus
                  </label>
                  <input
                    type="text"
                    value={tFormData.location}
                    onChange={(e) => setTFormData({ ...tFormData, location: e.target.value })}
                    placeholder="e.g. Coimbatore Campus / Tokyo"
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1">
                  Student Review / Quote *
                </label>
                <textarea
                  required
                  rows="3"
                  value={tFormData.quote}
                  onChange={(e) => setTFormData({ ...tFormData, quote: e.target.value })}
                  placeholder="Share their experience learning Japanese at Kaizen and their career placement success..."
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={tFormData.featured}
                  onChange={(e) => setTFormData({ ...tFormData, featured: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded border-neutral-300 dark:border-neutral-700 focus:ring-red-500"
                />
                <label htmlFor="featured" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 cursor-pointer">
                  Mark as Featured Spotlight (Displayed prominently at the top)
                </label>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30"
                >
                  Save & Publish Testimonial
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
