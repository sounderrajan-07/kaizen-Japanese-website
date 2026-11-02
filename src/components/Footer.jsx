import React from 'react';
import { Phone, Mail, MapPin, Globe, Building2, ArrowUp, ShieldCheck, Camera, Award } from 'lucide-react';

export default function Footer({ onNavigate, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 dark:bg-black text-white border-t border-neutral-800 dark:border-red-950/40 relative overflow-hidden transition-colors">
      
      {/* Top Banner with Red Accent */}
      <div className="h-1.5 bg-gradient-to-r from-kaizen-red-dark via-kaizen-red to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info with Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 px-2 py-1 rounded-xl bg-white flex items-center justify-center border border-neutral-700 shadow-md">
                <img
                  src="/logo.jpeg"
                  alt="Kaizen Japanese Language Academy Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">
                  Kaizen <span className="text-red-500">Academy</span>
                </span>
                <p className="text-[11px] text-neutral-400">改善日本語アカデミー • Coimbatore</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Bridging Tamil Nadu to Japan through structured JLPT training, direct recruitment pathways (IT, SSW, TITP), and higher education admissions in official collaboration with Apple.co Pvt. Ltd., Japan.
            </p>

            <div className="inline-block bg-neutral-800 dark:bg-neutral-950 border border-neutral-700 dark:border-neutral-800 px-3 py-1.5 rounded-xl text-xs text-red-400 font-semibold">
              தமிழ் வழியில் ஜப்பானிய மொழி • Coimbatore Campus
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-neutral-500">Japan Collaborator:</span>
              <span className="text-xs text-white font-bold bg-neutral-800 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-700 dark:border-neutral-800">
                Apple.co Pvt. Ltd., Japan
              </span>
            </div>
          </div>

          {/* Quick Links: Navigation Pages */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-red-400">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-400 transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-red-400 transition">
                  Job Support in Japan (IT, SSW, TITP)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('higher-ed')} className="hover:text-red-400 transition">
                  Higher Education (Apple.co Japan)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-red-400 transition">
                  JLPT Courses (N5 to N2)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('campus')} className="hover:text-red-400 transition flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-red-500" />
                  <span>Campus Moments & Life</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-red-400 transition flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-500" />
                  <span>Student Success Wall</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('eligibility')} className="hover:text-red-400 transition">
                  Interactive Eligibility Checker
                </button>
              </li>
            </ul>
          </div>

          {/* JLPT Levels */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-red-400">
              JLPT Training
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-red-400 transition">
                  JLPT N5 (Beginner)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-red-400 transition">
                  JLPT N4 (SSW Visa)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-red-400 transition">
                  JLPT N3 (IT Engineers)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-red-400 transition">
                  JLPT N2 (Advanced)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-red-400 transition">
                  Business Keigo & Etiquette
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-red-400">
              Coimbatore Campus
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Exclusive Offline Campus, Coimbatore, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href="tel:+918668136788" className="hover:text-white transition font-bold">
                  +91 8668136788
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href="https://www.kaizenjapaneseclass.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  www.kaizenjapaneseclass.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>In Collaboration with Apple.co Pvt. Ltd., Japan</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 flex items-center gap-1 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login Desk</span>
              </button>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-12 pt-6 border-t border-neutral-800 text-[11px] text-neutral-500 leading-relaxed text-center max-w-4xl mx-auto">
          <strong className="text-neutral-400">Regulatory Disclaimer:</strong> Eligibility, recruitment decisions, school admissions, and visa approvals are strictly subject to the regulations and discretion of employers, accredited overseas schools, and government immigration authorities. Kaizen Japanese Language Academy provides professional training, profile coaching, and official coordination support.
        </div>

        {/* Bottom Credits & Scroll Top */}
        <div className="mt-8 pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Kaizen Japanese Language Academy. All Rights Reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>

      </div>
    </footer>
  );
}
