import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, Sparkles, Image as ImageIcon, 
  ShieldCheck, Phone, ChevronRight, Home, Briefcase, GraduationCap, BookOpen, Camera, Award, Calculator
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ currentPage, onNavigate, onOpenDemo, onOpenPoster, onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'jobs', label: 'Work in Japan', icon: Briefcase },
    { id: 'higher-ed', label: 'Higher Education', icon: GraduationCap },
    { id: 'courses', label: 'JLPT Courses', icon: BookOpen },
    { id: 'campus', label: 'Campus Life', icon: Camera },
    { id: 'testimonials', label: 'Success Stories', icon: Award },
    { id: 'eligibility', label: 'Eligibility', icon: Calculator },
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 w-full ${
      scrolled 
        ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md border-b border-neutral-200 dark:border-neutral-800' 
        : 'bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Title */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group text-left flex-shrink-0"
          >
            <div className="h-10 sm:h-12 px-2 py-1 rounded-xl bg-white border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/logo.jpeg"
                alt="Kaizen Japanese Academy"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-neutral-950 dark:text-white group-hover:text-red-600 transition-colors">
                  Kaizen Academy
                </span>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-500/30">
                  Coimbatore
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold truncate max-w-[200px] md:max-w-none">
                Japanese Language & Careers • Apple.co Japan Collab
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Visible on xl screens: 1200px+) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'text-white bg-red-600 shadow-md shadow-red-600/30'
                      : 'text-neutral-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster (Desktop xl: 1280px+) */}
          <div className="hidden xl:flex items-center space-x-2 flex-shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-400 border border-neutral-200 dark:border-neutral-800 transition"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Launch Offers Button */}
            <button
              onClick={onOpenPoster}
              className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="View Coimbatore Launch & Japan Career Offers"
            >
              <ImageIcon className="w-3.5 h-3.5 text-red-600" />
              <span>Offers</span>
            </button>

            {/* Admin Desk Link */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Book Free Demo Button */}
            <button
              onClick={onOpenDemo}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition flex items-center gap-1.5 transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Demo</span>
            </button>
          </div>

          {/* Mobile & Tablet Control Buttons (Below 1200px) */}
          <div className="flex xl:hidden items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            <button
              onClick={onOpenDemo}
              className="bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm"
            >
              Demo
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800"
              aria-label="Toggle Mobile Navigation"
            >
              {isOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Slide Down & Full Screen Height Responsive) */}
      {isOpen && (
        <div className="xl:hidden bg-white/98 dark:bg-neutral-950/98 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-xl px-4 pt-3 pb-8 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-600'}`} />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                </button>
              );
            })}

            <div className="pt-4 mt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPoster();
                }}
                className="w-full py-3 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-bold flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-700"
              >
                <ImageIcon className="w-4 h-4 text-red-600" />
                <span>View Coimbatore Launch Posters</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-bold flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-800"
              >
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>Admin Management Desk</span>
              </button>

              <a
                href="tel:+918668136788"
                className="w-full py-3 px-4 rounded-xl bg-red-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 8668136788 (Coimbatore Campus)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
