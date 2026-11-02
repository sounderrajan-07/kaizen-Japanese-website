import React, { useState, useEffect } from 'react';
import FlashTicker from './components/FlashTicker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobSupportPage from './components/JobSupportPage';
import HigherEducationPage from './components/HigherEducationPage';
import CourseCatalog from './components/CourseCatalog';
import EligibilityChecker from './components/EligibilityChecker';
import WhyKaizen from './components/WhyKaizen';
import TestimonialsSection from './components/TestimonialsSection';
import CampusMoments from './components/CampusMoments';
import JapaneseStudyWidget from './components/JapaneseStudyWidget';
import Footer from './components/Footer';
import PromoModal from './components/PromoModal';
import RegistrationModal from './components/RegistrationModal';
import AdminPortal from './components/AdminPortal';
import SakuraEffect from './components/SakuraEffect';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoCourse, setDemoCourse] = useState('JLPT N5 Beginner Batch');

  // Trigger launch promo popup once shortly after load as requested by client
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('kaizen_promo_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsPromoOpen(true);
        sessionStorage.setItem('kaizen_promo_seen', 'true');
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDemoWithCourse = (courseName) => {
    setDemoCourse(courseName || 'JLPT N5 Beginner Batch');
    setIsDemoOpen(true);
  };

  // Dedicated Breadcrumb Bar for Inner Navigated Pages
  const renderBreadcrumb = (title, category) => (
    <div className="bg-neutral-100 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <button 
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-1 hover:text-red-600 transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        {category && (
          <>
            <span>{category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </>
        )}
        <span className="font-bold text-neutral-900 dark:text-white">{title}</span>
      </div>
    </div>
  );

  if (currentPage === 'admin') {
    return (
      <AdminPortal onBackToSite={() => handleNavigate('home')} />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white relative flex flex-col font-sans transition-colors selection:bg-red-600 selection:text-white">
      
      {/* Subtle Japanese Sakura Petal Particles */}
      <SakuraEffect />

      {/* Top Announcement Ticker */}
      <FlashTicker 
        onOpenPoster={() => setIsPromoOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Sticky Navigation Header with Brand Logo & Theme Switcher */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDemo={() => handleOpenDemoWithCourse('JLPT N5 Beginner Batch')}
        onOpenPoster={() => setIsPromoOpen(true)}
        onOpenAdmin={() => handleNavigate('admin')}
      />

      {/* Navigatable Pages View Router */}
      <main className="flex-1">
        
        {/* Page 1: Home Overview */}
        {currentPage === 'home' && (
          <div>
            <Hero 
              onOpenDemo={() => handleOpenDemoWithCourse('JLPT N5 Beginner Batch')}
              onOpenPoster={() => setIsPromoOpen(true)}
              onNavigate={handleNavigate}
            />

            {/* Interactive Japanese Study Widget (Kanji flip card & JLPT quiz) */}
            <JapaneseStudyWidget />

            {/* Real Campus Moments Preview */}
            <CampusMoments 
              onOpenDemo={() => handleOpenDemoWithCourse('Coimbatore Offline Batch')}
            />

            {/* Student Placements & Testimonials (Sumitomo Heavy Industries feature) */}
            <TestimonialsSection 
              onOpenDemo={() => handleOpenDemoWithCourse('Job Placement Batch')}
              onOpenAdmin={() => handleNavigate('admin')}
            />

            {/* Why Kaizen Core Advantage */}
            <WhyKaizen 
              onOpenDemo={() => handleOpenDemoWithCourse('Free Coimbatore Demo Class')}
            />
          </div>
        )}

        {/* Page 2: Job Support in Japan (Word Doc Page 1 Content) */}
        {currentPage === 'jobs' && (
          <div>
            {renderBreadcrumb('Job Support in Japan', 'Careers')}
            <JobSupportPage 
              onOpenDemo={() => handleOpenDemoWithCourse('IT / SSW Japanese Language Prep')}
              onOpenEligibility={() => handleNavigate('eligibility')}
            />
          </div>
        )}

        {/* Page 3: Higher Education in Japan (Apple.co Pvt. Ltd. Collaboration) */}
        {currentPage === 'higher-ed' && (
          <div>
            {renderBreadcrumb('Higher Education in Japan', 'Study Abroad')}
            <HigherEducationPage 
              onOpenDemo={() => handleOpenDemoWithCourse('Higher Education Foundation Japanese')}
            />
          </div>
        )}

        {/* Page 4: JLPT Courses & Coaching */}
        {currentPage === 'courses' && (
          <div>
            {renderBreadcrumb('JLPT Courses (N5 to N2)', 'Curriculum')}
            <CourseCatalog 
              onOpenDemo={() => handleOpenDemoWithCourse('JLPT N5 Beginner Batch')}
            />
            <JapaneseStudyWidget />
          </div>
        )}

        {/* Page 5: Real Campus Moments & Gallery */}
        {currentPage === 'campus' && (
          <div>
            {renderBreadcrumb('Campus Moments & Photo Gallery', 'Life at Kaizen')}
            <CampusMoments 
              onOpenDemo={() => handleOpenDemoWithCourse('Campus Visit & Free Demo')}
            />
          </div>
        )}

        {/* Page 6: Student Testimonials & Corporate Placement Wall */}
        {currentPage === 'testimonials' && (
          <div>
            {renderBreadcrumb('Student Testimonials & Success Wall', 'Placements')}
            <TestimonialsSection 
              onOpenDemo={() => handleOpenDemoWithCourse('Placement Track Batch')}
              onOpenAdmin={() => handleNavigate('admin')}
            />
          </div>
        )}

        {/* Page 7: Visa Eligibility Calculator */}
        {currentPage === 'eligibility' && (
          <div>
            {renderBreadcrumb('Interactive Visa Eligibility Calculator', 'Tools')}
            <EligibilityChecker 
              onApplyPathway={(pathway) => handleNavigate('jobs')}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenAdmin={() => handleNavigate('admin')}
      />

      {/* Promotional Marketing Popup (Displays WhatsApp Posters) */}
      <PromoModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        onOpenDemo={() => handleOpenDemoWithCourse('Coimbatore Launch Batch')}
        onOpenJobs={() => handleNavigate('jobs')}
      />

      {/* Demo & Registration Modal */}
      <RegistrationModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        defaultCourse={demoCourse}
      />

    </div>
  );
}
