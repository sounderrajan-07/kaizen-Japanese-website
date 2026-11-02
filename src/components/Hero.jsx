import React from 'react';
import { ArrowRight, CheckCircle, Sparkles, MapPin, Building2, Briefcase, GraduationCap, Camera, ExternalLink, Award } from 'lucide-react';

export default function Hero({ onOpenDemo, onOpenPoster, onNavigate }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-14 lg:pb-24 bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors">
      
      {/* Background Lighting & Japanese Mon Motif */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/10 bg-red-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 text-[180px] font-black text-neutral-900/[0.03] dark:text-white/[0.02] font-japanese select-none pointer-events-none -z-10">
        改善
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge Banner */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Official Japanese Academy
              </span>
              
              <span className="inline-flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 px-3 py-1 rounded-full text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Coimbatore Offline Center
              </span>

              <span className="inline-flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 px-3 py-1 rounded-full text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5 text-red-600" />
                Collab with Apple.co Pvt. Ltd., Japan
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
              Learn Japanese. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-amber-600 dark:from-red-500 dark:via-red-400 dark:to-white">
                Work in Japan.
              </span> <br />
              Build Your Future.
            </h1>

            {/* Tamil Culture & Instruction Tagline */}
            <div className="inline-block bg-neutral-100 dark:bg-neutral-900/90 border-l-4 border-red-600 py-2.5 px-4 rounded-r-xl shadow-sm">
              <p className="text-red-700 dark:text-red-400 font-bold text-sm sm:text-base">
                தமிழ் வழியில் ஜப்பானிய மொழி — கோவையில் தொடங்கும் ஜப்பான் பயணம்!
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-0.5">
                Language Doesn't Just Communicate — IT REFLECTS CULTURE.
              </p>
            </div>

            {/* Sub-headline */}
            <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Turn your professional and academic ambitions into reality. Kaizen provides complete <strong className="text-neutral-900 dark:text-white">JLPT training (N5 to N2)</strong>, 
              direct <strong className="text-neutral-900 dark:text-white">Job Placement in Japan</strong> (IT & Engineering, SSW, TITP Visas), and <strong className="text-neutral-900 dark:text-white">Higher Education guidance</strong> in official partnership with Apple.co Pvt. Ltd., Japan.
            </p>

            {/* Core Pillars / Bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>100% Placement Assistance in Japan</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>IT, SSW & TITP Visa Pathways</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Higher Education with Apple.co Japan</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Exclusive Offline Batches in Coimbatore</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap gap-3 sm:gap-4 items-center">
              <button
                onClick={onOpenDemo}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center gap-2 text-sm sm:text-base transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book a Free Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('eligibility')}
                className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-bold px-5 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 transition flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Check Your Eligibility</span>
              </button>

              <button
                onClick={() => onNavigate('campus')}
                className="text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition underline decoration-red-500 underline-offset-4"
              >
                <Camera className="w-3.5 h-3.5 text-red-600" />
                <span>View Campus Moments</span>
              </button>
            </div>

            {/* First 10 Members Notice */}
            <div className="pt-1 flex items-center gap-2 text-xs text-red-700 dark:text-red-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>Coimbatore Campus Launch: First 10 Enrolled Members get Exclusive Privilege Offer!</span>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Outer Decorative Card */}
              <div className="relative rounded-3xl bg-neutral-100 dark:bg-neutral-950 p-1 shadow-2xl border border-neutral-200 dark:border-red-500/30">
                
                <div className="rounded-2xl bg-white dark:bg-neutral-950 p-5 space-y-4 shadow-inner">
                  
                  {/* Top Header Card with Real Logo */}
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 px-2 py-0.5 rounded-xl bg-white border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-sm">
                        <img
                          src="/logo.jpeg"
                          alt="Kaizen Logo"
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white">
                          Kaizen Academy
                        </h4>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Coimbatore Offline Center</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-500/30">
                      Admissions Open
                    </span>
                  </div>

                  {/* Japan Photography Showcase Card (Mount Fuji & Sakura / Work Poster) */}
                  <div 
                    onClick={onOpenPoster}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-neutral-800 hover:border-red-500 transition-all bg-black"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
                        alt="Japan Kyoto & Mount Fuji"
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Destination: Japan
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <div>
                          <div className="text-[11px] font-japanese font-bold text-red-400">日本で働く • 日本で学ぶ</div>
                          <h5 className="text-sm font-bold mt-0.5">Work in Japan & Higher Education</h5>
                          <p className="text-[10px] text-neutral-300">Click to preview Coimbatore launch posters</p>
                        </div>
                        <span className="p-2 rounded-xl bg-black/60 text-white group-hover:bg-red-600 transition shadow">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats Counter Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-neutral-50 dark:bg-neutral-900/80 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                      <div className="text-xl font-extrabold text-neutral-900 dark:text-white">100%</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Placement Assistance</div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900/80 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                      <div className="text-xl font-extrabold text-red-600">N5 — N2</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">JLPT Certified Training</div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900/80 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                      <div className="text-sm font-bold text-neutral-900 dark:text-white">Apple.co Pvt Ltd</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Collaborator in Japan</div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900/80 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                      <div className="text-sm font-bold text-red-600">Coimbatore</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Offline & Online Batches</div>
                    </div>
                  </div>

                  {/* Dual Quick Pathway Navigation */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onNavigate('jobs')}
                      className="py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-red-600" />
                      <span>Job Pathways</span>
                    </button>

                    <button
                      onClick={() => onNavigate('higher-ed')}
                      className="py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-white flex items-center justify-center gap-1.5 transition"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-red-600" />
                      <span>Study in Japan</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
