import React from 'react';
import { Award, Building2, MapPin, Users, Video, Compass, Sparkles, HeartHandshake } from 'lucide-react';

export default function WhyKaizen({ onOpenDemo }) {
  const reasons = [
    {
      title: "Language & Career Under One Roof",
      desc: "Unlike standard institutes that stop at textbooks, Kaizen trains you from JLPT N5 through N2 and handles direct recruitment coordination with Japanese employers.",
      icon: Award
    },
    {
      title: "International Collab: Apple.co Pvt. Ltd., Japan",
      desc: "Our active partnership in Japan provides authentic admissions to Japanese language schools, student visa assistance, and settlement support upon landing.",
      icon: Building2
    },
    {
      title: "Exclusive Offline Center in Coimbatore",
      desc: "Learn in our purpose-built Japanese cultural classroom in Coimbatore with live group interaction, calligraphy drills, and conversational roleplay.",
      icon: MapPin
    },
    {
      title: "தமிழ் வழியில் ஜப்பானிய மொழி",
      desc: "Specialized teaching approach explaining Japanese grammar, honorifics, and nuances through Tamil alongside standard English material.",
      icon: Sparkles
    },
    {
      title: "100% Placement Assistance",
      desc: "End-to-end guidance for IT & Engineering, Specified Skilled Worker (SSW), and TITP visa pathways with interview coaching.",
      icon: HeartHandshake
    },
    {
      title: "Recorded Sessions for Revision",
      desc: "Never miss a concept. Working professionals and college students can review recorded lectures and access our digital library 24/7.",
      icon: Video
    }
  ];

  return (
    <section id="why-kaizen-section" className="py-12 sm:py-20 bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>The Kaizen Difference</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
            Why Choose <span className="text-red-600">Kaizen Academy?</span>
          </h2>

          <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Bridging India and Japan with dedicated language mastery, accredited overseas education partnerships, and authentic career placements.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-neutral-950 dark:text-white mt-5 group-hover:text-red-600 transition-colors">
                  {r.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Coimbatore Community Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-red-50 via-white to-red-50 dark:from-red-950 dark:via-neutral-900 dark:to-black p-8 sm:p-12 border border-red-200 dark:border-red-600/30 text-center space-y-5 shadow-lg">
          <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400">
            Admissions Open for Coimbatore Campus & Online Batches
          </span>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 dark:text-white">
            Start Your International Career Journey with Kaizen!
          </h3>

          <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Learn Today. Explore Japan Tomorrow. Experience our interactive methodology firsthand with a complimentary demo session.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-xl shadow-red-600/30 transition-all transform active:scale-95"
            >
              Book Your Free Demo Class
            </button>
            <a
              href="tel:+918668136788"
              className="bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 transition shadow-sm"
            >
              Call +91 8668136788
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
