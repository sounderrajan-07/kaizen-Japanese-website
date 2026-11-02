import React, { useState } from 'react';
import { X, Sparkles, Phone, ArrowRight, ExternalLink, ZoomIn, CheckCircle2 } from 'lucide-react';

export default function PromoModal({ isOpen, onClose, onOpenDemo, onOpenJobs }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const posters = [
    {
      id: 'coimbatore-launch',
      title: "Coimbatore Offline Class Launch",
      tamilTitle: "கோவையில் தொடங்கும் ஜப்பான் பயணம்!",
      badge: "Exclusive Launch Offer",
      tagline: "First 10 Members Get Exclusive Launch Offer • 100% Placement Support",
      src: "/images/poster-coimbatore-class.jpeg",
      highlights: [
        "Exclusive Offline Japanese Batches in Coimbatore",
        "Learn Japanese through Tamil & English (தமிழ் வழியில்)",
        "First 10 Members Special Early-Bird Privilege",
        "Direct JLPT N5 to N2 Curriculum + Speaking Practice"
      ],
      ctaText: "Claim Coimbatore Launch Offer",
      action: () => {
        onClose();
        onOpenDemo();
      }
    },
    {
      id: 'work-in-japan',
      title: "Work in Japan Career Pathways",
      tamilTitle: "ஜப்பானில் வேலை வாய்ப்புகள்!",
      badge: "100% Placement Assistance",
      tagline: "SSW Visa • TITP Visa • IT / Engineering Visa",
      src: "/images/poster-work-japan.jpeg",
      highlights: [
        "12th Pass, Diploma & Degree Holders Eligible",
        "Japanese Language Proficiency Prep (JLPT N4 & Above)",
        "IT, Mechanical, Electrical, Civil & Skilled Industries",
        "Complete Interview Preparation & Visa Guidance"
      ],
      ctaText: "Check Job Eligibility & Apply",
      action: () => {
        onClose();
        onOpenJobs();
      }
    }
  ];

  const currentPoster = posters[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-red-600/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-kaizen-red-dark via-kaizen-red to-black px-4 sm:px-6 py-3 flex items-center justify-between text-white border-b border-red-500/20">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpeg" alt="Kaizen Academy Logo" className="h-7 w-auto bg-white rounded p-0.5 object-contain" />
            <span className="bg-black/60 px-2 py-0.5 rounded text-xs font-bold text-red-300 border border-red-500/30">
              改善 SPECIAL LAUNCH
            </span>
            <span className="hidden sm:inline text-xs text-white/80">Official Academy Announcements</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-black/80 text-white/80 hover:text-white transition text-xs flex items-center gap-1 border border-white/10"
              title="Toggle Full Preview"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isZoomed ? "Standard" : "Zoom Poster"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-red-600 text-white transition border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-neutral-800 bg-neutral-900/60 p-1.5 gap-2">
          {posters.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === idx
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeTab === idx ? 'text-white' : 'text-red-500'}`} />
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className={`grid ${isZoomed ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'} gap-6 items-center`}>
            
            {/* Poster Image Preview */}
            <div className={`${isZoomed ? 'w-full max-w-xl mx-auto' : 'lg:col-span-5'} flex justify-center`}>
              <div className="relative group rounded-xl overflow-hidden border border-red-500/30 shadow-2xl bg-black">
                <img
                  src={currentPoster.src}
                  alt={currentPoster.title}
                  className="w-full max-h-[440px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-red-400 border border-red-500/30">
                  {currentPoster.badge}
                </div>
              </div>
            </div>

            {/* Poster Details & Benefits */}
            {!isZoomed && (
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-block bg-red-950/80 text-red-400 border border-red-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                    {currentPoster.badge}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentPoster.title}
                  </h3>
                  
                  <p className="text-red-400 font-medium text-sm sm:text-base mt-0.5">
                    {currentPoster.tamilTitle}
                  </p>

                  <p className="text-neutral-300 text-sm mt-2">
                    {currentPoster.tagline}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-2 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Key Highlights:</h4>
                  <ul className="space-y-1.5">
                    {currentPoster.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Area */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={currentPoster.action}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 text-sm"
                  >
                    <span>{currentPoster.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:+918668136788"
                    className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3 px-4 rounded-xl border border-neutral-700 transition text-sm"
                  >
                    <Phone className="w-4 h-4 text-red-400" />
                    <span>+91 8668136788</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
                  <span>📍 Offline Campus: Coimbatore, Tamil Nadu</span>
                  <span>🌐 www.kaizenjapaneseclass.com</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer Dismiss Area */}
        <div className="bg-neutral-900/80 px-4 py-2.5 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Kaizen Japanese Language Academy • Official Collaboration with Apple.co Pvt. Ltd., Japan</span>
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-white underline font-medium"
          >
            Continue to Website
          </button>
        </div>

      </div>
    </div>
  );
}

