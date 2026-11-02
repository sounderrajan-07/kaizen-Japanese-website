import React, { useState } from 'react';
import { Camera, MapPin, Sparkles, ZoomIn, X, Users, Award, Calendar } from 'lucide-react';

export default function CampusMoments({ onOpenDemo }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);

  const moments = [
    {
      id: 5,
      src: '/images/campus/Moment5.jpeg',
      title: 'Mega Japanese Career Symposium at AMSEC Auditorium',
      category: 'symposium',
      categoryLabel: 'Mega Symposium',
      desc: 'Over 400 engineering students attending the Kaizen Japanese Language & Career Opportunities seminar in Tamil Nadu.',
      location: 'AMSEC Auditorium, Tamil Nadu'
    },
    {
      id: 1,
      src: '/images/campus/Moment1.jpg',
      title: 'Interactive Hiragana & Katakana Classroom Session',
      category: 'classroom',
      categoryLabel: 'Classroom Training',
      desc: 'Live interactive classroom batch learning foundational Hiragana characters with bilingual Sensei guidance.',
      location: 'Classroom Campus'
    },
    {
      id: 6,
      src: '/images/campus/Moment6.jpeg',
      title: 'Sumitomo Heavy Industries Corporate Press Feature',
      category: 'achievement',
      categoryLabel: 'Corporate Placement',
      desc: 'Official Japanese corporate news release featuring Kaizen graduate Muzammil Ahmed at Sumitomo Heavy Industries.',
      location: 'Tokyo & India Division'
    },
    {
      id: 2,
      src: '/images/campus/Moment2.jpg',
      title: 'Student Certificate Felicitation & JLPT Recognition',
      category: 'achievement',
      categoryLabel: 'Recognition',
      desc: 'Celebrating successful student milestones and JLPT test clearances with our academic advisors.',
      location: 'Academic Seminar Hall'
    },
    {
      id: 3,
      src: '/images/campus/Moment3.jpeg',
      title: 'Sensei Mentorship & Faculty Group Interaction',
      category: 'culture',
      categoryLabel: 'Mentorship',
      desc: 'Dedicated Japanese faculty members guiding candidates in resume building (Rirekisho) and corporate Keigo.',
      location: 'Coimbatore Campus'
    },
    {
      id: 4,
      src: '/images/campus/Moment4.jpeg',
      title: 'Japanese Culture & Conversation Roleplay Workshop',
      category: 'classroom',
      categoryLabel: 'Culture Workshop',
      desc: 'Students practicing situational workplace dialogues, Japanese bowing etiquette (Ojigi), and technical terms.',
      location: 'Language Lab'
    },
    {
      id: 7,
      src: '/images/campus/Moment7.jpeg',
      title: 'Pre-Departure Briefing & Placement Milestone',
      category: 'achievement',
      categoryLabel: 'Placement',
      desc: 'Pre-departure orientation for candidates preparing for Japanese visa documentation and departure.',
      location: 'Placement Desk'
    }
  ];

  const filteredMoments = activeFilter === 'all'
    ? moments
    : moments.filter(m => m.category === activeFilter);

  return (
    <section id="campus-moments-section" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-300 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Campus Moments & Life at Kaizen</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Real Classrooms. <span className="text-red-600">Real Impact.</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Take a visual tour inside our classrooms, mega career symposiums, and student placement celebrations across Tamil Nadu.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Moments' },
              { id: 'classroom', label: 'Classroom Batches' },
              { id: 'symposium', label: 'Mega Symposiums' },
              { id: 'achievement', label: 'Placements & Press' },
              { id: 'culture', label: 'Culture & Mentorship' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === f.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMoments.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-black">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-red-400 border border-red-500/30 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                  {item.categoryLabel}
                </span>

                <span className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{item.location}</span>
                  </span>
                  <span className="text-red-600 font-semibold">View Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-red-600 to-red-800 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-xl sm:text-2xl font-black">
              Want to Experience a Class in Person?
            </h4>
            <p className="text-xs sm:text-sm text-red-100">
              Visit our Coimbatore campus and attend a complimentary demo lecture with our Sensei.
            </p>
          </div>

          <button
            onClick={onOpenDemo}
            className="px-6 py-3 rounded-xl bg-white text-black font-extrabold text-sm hover:bg-neutral-100 transition shadow-lg flex-shrink-0"
          >
            Reserve Coimbatore Demo Seat
          </button>
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden p-4 sm:p-6 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-500/30">
                  {activePhoto.categoryLabel}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                  {activePhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto mt-4 text-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[65vh] mx-auto rounded-xl shadow-2xl object-contain"
              />
              <p className="text-xs text-neutral-300 mt-3 max-w-2xl mx-auto">
                {activePhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

