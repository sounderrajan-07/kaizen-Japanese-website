import React, { useState, useEffect } from 'react';
import { 
  Award, Quote, CheckCircle2, Building2, Star, X, ZoomIn, Plus, 
  Upload, Shield, Sparkles, MapPin, ExternalLink, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestimonialsSection({ onOpenDemo, onOpenAdmin }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProofModal, setSelectedProofModal] = useState(false);
  const [zoomPhoto, setZoomPhoto] = useState(null);

  // Quick Add Testimonial Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState(null);

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    company: '',
    avatar: '/images/testimonials/Muzammil Ahmed BE.jpeg',
    badge: '100% Placement Milestone',
    jlpt: 'JLPT N4 Certified',
    quote: '',
    location: 'Coimbatore Campus',
    featured: false
  });

  const fallbackTestimonials = [
    {
      id: 'testimonial-1',
      name: 'Muzammil Ahmed B.E.',
      role: 'Service Engineer • Cryogenic Department',
      company: 'Sumitomo Heavy Industries (India) Pvt. Ltd.',
      avatar: '/images/testimonials/Muzammil Ahmed BE.jpeg',
      badge: 'Corporate Japanese News Feature',
      jlpt: 'JLPT Certified',
      quote: 'Kaizen Japanese Language Academy transformed my career. The technical Japanese interview coaching and JLPT training prepared me directly for multinational engineering standards. Today, I am proud to be working at Sumitomo Heavy Industries and featured in their official Japanese publication!',
      location: 'Bangalore & Japan Operations',
      pressProof: '/images/campus/Moment6.jpeg',
      featured: true
    },
    {
      id: 'testimonial-2',
      name: 'Kaushik Nivesh P.',
      role: 'IT & Software Engineering Pathway',
      company: 'Japan Career Aspirant',
      avatar: '/images/testimonials/Kaushik Nivesh P.jpeg',
      badge: 'Engineering Fast-Track',
      jlpt: 'JLPT N4/N3 Track',
      quote: 'Learning Japanese through Tamil and English at Kaizen was a game changer. The senseis break down complex grammar patterns with cultural context and daily conversational drills. The Coimbatore offline classroom ambiance is very supportive!',
      location: 'Coimbatore Campus',
      featured: false
    },
    {
      id: 'testimonial-3',
      name: 'Mr. Monesh M.',
      role: 'Technical Professional',
      company: 'Japan Placement Selected',
      avatar: '/images/testimonials/Mr.Monesh M.jpeg',
      badge: '100% Placement Coaching',
      jlpt: 'JLPT Preparation',
      quote: 'From having zero knowledge of Hiragana and Katakana to confidently giving a self-introduction in Japanese (Jikoshoukai), Kaizen guided me step by step. Their direct connection with Japanese companies gives students real career outcomes.',
      location: 'Tamil Nadu to Japan',
      featured: false
    }
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success && data.testimonials && data.testimonials.length > 0) {
        setTestimonials(data.testimonials);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (e) {
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminVerify = (e) => {
    e.preventDefault();
    if (adminPasscode === 'sensei123' || adminPasscode === 'admin') {
      setIsAuth(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleImageUpload = async (e) => {
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
          setNewTestimonial(prev => ({ ...prev, avatar: data.url }));
        } else {
          setNewTestimonial(prev => ({ ...prev, avatar: reader.result }));
        }
      } catch (err) {
        setNewTestimonial(prev => ({ ...prev, avatar: reader.result }));
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.quote) {
      setFormFeedback('Please enter student name and quote.');
      return;
    }

    setSubmitting(true);
    setFormFeedback(null);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      const data = await res.json();

      if (data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setIsAddModalOpen(false);
        fetchTestimonials();
        setNewTestimonial({
          name: '',
          role: '',
          company: '',
          avatar: '/images/testimonials/Muzammil Ahmed BE.jpeg',
          badge: '100% Placement Milestone',
          jlpt: 'JLPT N4 Certified',
          quote: '',
          location: 'Coimbatore Campus',
          featured: false
        });
      } else {
        setFormFeedback(data.error || 'Failed to save testimonial.');
      }
    } catch (err) {
      setFormFeedback('Server connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const featured = testimonials.find(t => t.featured) || testimonials[0];
  const others = testimonials.filter(t => t.id !== featured?.id);

  return (
    <section id="testimonials-section" className="py-12 sm:py-20 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Admin Quick Add Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-red-600" />
              <span>Verified Student Placements & Stories</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
              Proven Success with <span className="text-red-600">Leading Japanese Employers</span>
            </h2>

            <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              Real graduates, verified employment in Japan, and corporate press recognition from Kaizen Japanese Language Academy in Coimbatore.
            </p>
          </div>

          {/* Admin / Add Story Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial (Admin)</span>
            </button>
            
            <button
              onClick={fetchTestimonials}
              title="Refresh Testimonials"
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-red-600 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Featured Student Showcase (BIG Hero Portrait: Muzammil Ahmed at Sumitomo) */}
        {featured && (
          <div className="bg-white dark:bg-neutral-900 border-2 border-red-500/50 rounded-3xl p-6 sm:p-10 mb-14 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* BIG Prominent Student Portrait (High Impact Vertical Portrait) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div 
                  onClick={() => setZoomPhoto(featured.avatar)}
                  className="relative group cursor-pointer w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 bg-neutral-950"
                >
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    className="w-full h-80 sm:h-96 md:h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg">
                    {featured.badge || 'Verified Placement'}
                  </span>

                  <div className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-black/80 text-white group-hover:bg-red-600 transition shadow-lg flex items-center gap-1.5 text-xs font-bold">
                    <ZoomIn className="w-4 h-4" />
                    <span>View High-Res Photo</span>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
                  Click portrait to view full resolution
                </span>
              </div>

              {/* Testimonial Quote & Press Release Box */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                    <span className="text-xs font-black text-red-600 dark:text-red-400 ml-2 uppercase tracking-wide">
                      Corporate Placement Spotlight
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 dark:text-white">
                    {featured.name}
                  </h3>
                  
                  <p className="text-base sm:text-lg font-extrabold text-red-600 dark:text-red-400 mt-1">
                    {featured.role}
                  </p>
                  
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 mt-1">
                    <Building2 className="w-4 h-4 text-neutral-500" />
                    <span className="font-semibold">{featured.company}</span>
                    <span className="mx-1">•</span>
                    <span>{featured.location}</span>
                  </p>
                </div>

                <blockquote className="text-base sm:text-lg text-neutral-800 dark:text-neutral-200 italic leading-relaxed bg-neutral-100 dark:bg-black/50 p-6 rounded-2xl border-l-4 border-red-600 relative">
                  <Quote className="w-8 h-8 text-red-500/20 absolute top-3 right-4 select-none" />
                  "{featured.quote}"
                </blockquote>

                {/* Japanese Press Release Verification Box */}
                <div className="bg-neutral-100 dark:bg-black/60 p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div 
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 border-red-500/40 flex-shrink-0 cursor-pointer shadow-md group bg-neutral-950"
                      onClick={() => setSelectedProofModal(true)}
                    >
                      <img
                        src="/images/campus/Moment6.jpeg"
                        alt="Sumitomo Press Article"
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded border border-red-500/30">
                        Official Japanese Corporate Press
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-neutral-950 dark:text-white mt-1">
                        Sumitomo Heavy Industries: Opening Ceremony News
                      </h4>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Muzammil Ahmed highlighted under Cryogenic Service Division
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProofModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-black dark:bg-neutral-800 dark:hover:bg-red-600 text-white text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Press Clipping</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Sub-heading for other student stories */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white flex items-center gap-2">
            <span>Student Success Gallery</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-500/30">
              {others.length} Stories
            </span>
          </h3>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Click any portrait to enlarge</span>
        </div>

        {/* All Other Students: LARGE High-Impact Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                
                {/* BIG Prominent Portrait Header - h-80 sm:h-96 ensures large size */}
                <div 
                  onClick={() => setZoomPhoto(t.avatar)}
                  className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-950 cursor-pointer"
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-md shadow-md">
                    {t.badge || 'Graduate'}
                  </span>

                  <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 text-white opacity-90 group-hover:bg-red-600 group-hover:opacity-100 transition flex items-center gap-1.5 text-xs font-bold shadow">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Enlarge Photo</span>
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-500/20">
                      {t.jlpt || 'JLPT Enrolled'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
                      {t.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 mt-0.5">
                      {t.role}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                      {t.company}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 italic leading-relaxed pt-2">
                    "{t.quote}"
                  </p>
                </div>

              </div>

              {/* Bottom Footer Info */}
              <div className="px-6 py-4 bg-neutral-100/70 dark:bg-black/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5 font-semibold text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Verified Candidate</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{t.location}</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal Lightbox for Japanese Press Clipping Proof */}
      {selectedProofModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedProofModal(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-neutral-950 border border-red-500/40 rounded-3xl overflow-hidden p-4 sm:p-6 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-white">
                  Sumitomo Heavy Industries Official Publication • Muzammil Ahmed Feature
                </span>
              </div>
              <button
                onClick={() => setSelectedProofModal(false)}
                className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto mt-4 text-center">
              <img
                src="/images/campus/Moment6.jpeg"
                alt="Sumitomo Full Feature Article"
                className="max-h-[72vh] mx-auto rounded-xl shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Full Resolution Photo Lightbox */}
      {zoomPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setZoomPhoto(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden p-4 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-bold text-neutral-400">Student Profile Portrait</span>
              <button
                onClick={() => setZoomPhoto(null)}
                className="p-1 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto mt-3 text-center">
              <img
                src={zoomPhoto}
                alt="Student Full Resolution Portrait"
                className="max-h-[75vh] mx-auto rounded-2xl object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Testimonial Modal (Direct Admin Action) */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="relative max-w-xl w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-black text-neutral-950 dark:text-white">
                  Add Student Testimonial
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If not authenticated with admin passcode */}
            {!isAuth ? (
              <form onSubmit={handleAdminVerify} className="mt-6 space-y-4 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Please enter the Admin Passcode to add a new testimonial directly to the live website.
                </p>
                <div>
                  <input
                    type="password"
                    placeholder="Enter Admin Password (e.g. sensei123)"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-center font-mono text-base focus:outline-none focus:border-red-600"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-red-600 mt-2 font-bold">
                      Incorrect passcode. Default is 'sensei123'.
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md"
                  >
                    Unlock & Proceed
                  </button>
                </div>
              </form>
            ) : (
              /* Authenticated Form */
              <form onSubmit={handleSaveTestimonial} className="mt-6 space-y-4">
                {formFeedback && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-500/30 text-xs text-red-600 dark:text-red-400 font-bold">
                    {formFeedback}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar B.Tech"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Role / Department
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mechanical Engineer / SSW"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Company / Placement
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tokyo Automotive Ltd."
                      value={newTestimonial.company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      JLPT Level
                    </label>
                    <select
                      value={newTestimonial.jlpt}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, jlpt: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                    >
                      <option value="JLPT N5 Passed">JLPT N5 Passed</option>
                      <option value="JLPT N4 Certified">JLPT N4 Certified</option>
                      <option value="JLPT N3 Certified">JLPT N3 Certified</option>
                      <option value="JLPT N2 Certified">JLPT N2 Certified</option>
                      <option value="TITP / SSW Cleared">TITP / SSW Cleared</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 100% Placement Milestone"
                      value={newTestimonial.badge}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Coimbatore Campus / Japan"
                      value={newTestimonial.location}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Photo Selection / File Upload */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Student Photo (Large Portrait)
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-20 rounded-xl overflow-hidden border-2 border-red-500/40 bg-neutral-950 flex-shrink-0">
                      <img
                        src={newTestimonial.avatar}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    <div className="space-y-1.5 flex-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700">
                        <Upload className="w-3.5 h-3.5 text-red-600" />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Student Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="text-[11px] text-neutral-500">
                        PNG or JPG portrait photo. Or select a preset below:
                      </p>
                    </div>
                  </div>

                  {/* Preset Photos */}
                  <div className="flex gap-2 pt-1">
                    {[
                      { name: 'Muzammil', url: '/images/testimonials/Muzammil Ahmed BE.jpeg' },
                      { name: 'Kaushik', url: '/images/testimonials/Kaushik Nivesh P.jpeg' },
                      { name: 'Mr. Monesh', url: '/images/testimonials/Mr.Monesh M.jpeg' },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setNewTestimonial({ ...newTestimonial, avatar: preset.url })}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                          newTestimonial.avatar === preset.url
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Student Quote / Feedback *
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Write the student's review or achievement feedback..."
                    value={newTestimonial.quote}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured-toggle"
                    checked={newTestimonial.featured}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, featured: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded border-neutral-400"
                  />
                  <label htmlFor="featured-toggle" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Feature this testimonial at the top banner
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    {submitting ? 'Saving...' : 'Publish Testimonial'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
