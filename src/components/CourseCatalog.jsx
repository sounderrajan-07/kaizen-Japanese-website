import React, { useState } from 'react';
import { BookOpen, Check, Clock, Calendar, Sparkles, MapPin, Users, Award, ArrowRight } from 'lucide-react';

export default function CourseCatalog({ onOpenDemo }) {
  const courses = [
    {
      id: 'n5',
      level: 'JLPT N5',
      kanji: '初級',
      title: 'Beginner Foundation Course',
      subtitle: 'Ideal for complete beginners & SSW preparation',
      tag: 'Most Popular for Beginners',
      popular: true,
      duration: '3 Months (approx. 120-150 hours)',
      batches: 'Weekday & Weekend Batches Available',
      mode: 'Offline in Coimbatore & Live Online',
      features: [
        'Hiragana & Katakana mastery with stroke orders',
        '100+ Essential Kanji & 800+ Core Vocabulary',
        'Basic Grammar, Sentence Structures & Particles',
        'Daily conversational speaking practice in Tamil/English',
        'JLPT N5 Mock Tests & Exam Strategy Sessions',
        'Recorded classes for revision anytime'
      ],
      suitable: 'School/College students, engineering freshers, job aspirants starting from scratch.'
    },
    {
      id: 'n4',
      level: 'JLPT N4',
      kanji: '初中級',
      title: 'Elementary Japanese Mastery',
      subtitle: 'Mandatory standard for SSW Visa in Japan',
      tag: 'Required for SSW Visa',
      popular: false,
      duration: '3.5 Months',
      batches: 'Morning, Evening & Weekend Batches',
      mode: 'Offline in Coimbatore & Live Online',
      features: [
        '300+ Kanji & 1,500+ Practical Vocabulary',
        'Intermediate grammar forms (Te-form, Conditional, Passive)',
        'Listening comprehension drills & speed reading',
        'Job interview self-introduction (Jikoshoukai) in Japanese',
        'Special preparation for SSW Skill Assessment tests',
        'Full set of study books & audio materials included'
      ],
      suitable: 'Candidates targeting Specified Skilled Worker (SSW) visas or TITP programs.'
    },
    {
      id: 'n3',
      level: 'JLPT N3',
      kanji: '中級',
      title: 'Intermediate Bridge Course',
      subtitle: 'The golden passport for IT & Engineering careers in Tokyo',
      tag: 'High Employment Demand',
      popular: true,
      duration: '4 to 5 Months',
      batches: 'Weekend Intensive / Evening Batches',
      mode: 'Offline in Coimbatore & Live Online',
      features: [
        '650+ Kanji & 3,750+ Professional Vocabulary',
        'Business email writing & corporate phone etiquette',
        'Natural conversational fluency and listening at native speeds',
        'Technical Japanese for software, mechanical & civil engineers',
        'Direct connection to Japanese IT hiring recruitment drives',
        '1-on-1 mock interviews with native Japanese guest speakers'
      ],
      suitable: 'Engineers, software developers, and professionals aiming for direct employment in Japan.'
    },
    {
      id: 'n2',
      level: 'JLPT N2',
      kanji: '上級',
      title: 'Advanced Professional Fluency',
      subtitle: 'Executive career placement & senior technical roles',
      tag: 'Corporate & Senior Roles',
      popular: false,
      duration: '5 to 6 Months',
      batches: 'Flexible Hybrid Schedule',
      mode: 'Offline in Coimbatore & Live Online',
      features: [
        '1,000+ Kanji & 6,000+ Advanced Vocabulary',
        'Keigo (Sonkeigo, Kenjougo, Teineigo) polite language mastery',
        'Complex business negotiations, presentations & contracts',
        'Nuanced comprehension of Japanese news, editorials & legal texts',
        'Executive recruitment facilitation across multinational corporations'
      ],
      suitable: 'Senior professionals, bilingual project managers, and translators.'
    }
  ];

  return (
    <section id="courses-section" className="py-12 sm:py-20 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-red-600" />
            <span>Structured JLPT Curriculum</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
            Master Japanese from <span className="text-red-600">N5 to N2</span>
          </h2>

          <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Personalised batches taught by certified senseis in Coimbatore. Learn in Tamil or English with practical speaking drills, cultural etiquette, and complete JLPT test readiness.
          </p>

          {/* Tamil Instruction Pill */}
          <div className="inline-block bg-white dark:bg-neutral-900 border border-red-500/30 px-4 py-2 rounded-xl text-xs sm:text-sm text-red-700 dark:text-red-300 font-bold shadow-sm">
            தமிழ் வழியில் ஜப்பானிய மொழி • Exclusive Launch Offer in Coimbatore!
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                course.popular
                  ? 'bg-gradient-to-b from-white to-red-50/20 dark:from-neutral-900 dark:to-neutral-950 border-2 border-red-500 shadow-xl'
                  : 'bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-md hover:border-neutral-400 dark:hover:border-neutral-700'
              }`}
            >
              {/* Popular Badge */}
              {course.popular && (
                <div className="absolute -top-3 right-6 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{course.tag}</span>
                </div>
              )}

              <div>
                {/* Level + Kanji */}
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-red-600">
                      {course.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-0.5">
                      {course.level}
                    </h3>
                  </div>
                  <div className="text-3xl font-black font-japanese text-neutral-400 dark:text-neutral-700">
                    {course.kanji}
                  </div>
                </div>

                <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-200 mt-4">
                  {course.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  {course.subtitle}
                </p>

                {/* Duration & Mode Badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-neutral-50 dark:bg-black/50 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="bg-neutral-50 dark:bg-black/50 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>Coimbatore & Online</span>
                  </div>
                </div>

                {/* Course Features */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    What You Learn:
                  </span>
                  <ul className="space-y-2">
                    {course.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-300">
                        <Check className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable For */}
                <div className="mt-5 p-3 rounded-2xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400">
                  <strong className="text-neutral-900 dark:text-neutral-300 font-bold">Ideal For:</strong> {course.suitable}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={onOpenDemo}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                    course.popular
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
                      : 'bg-neutral-900 hover:bg-black text-white dark:bg-neutral-800 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span>Enroll or Book Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Coimbatore Campus Offline Advantage Card */}
        <div className="mt-16 bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>Exclusive Offline Classrooms in Coimbatore</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
              Experience Authentic Japanese Culture in Coimbatore
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Step into our dedicated Japanese classroom. Practice live conversation with fellow learners, experience Japanese tea etiquette, culture workshops, and receive in-person faculty mentorship.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenDemo}
              className="bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-black text-sm px-6 py-3 rounded-xl shadow-lg transition"
            >
              Visit Coimbatore Campus
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
