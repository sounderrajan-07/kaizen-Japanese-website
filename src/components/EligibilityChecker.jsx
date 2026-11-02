import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, Award, Compass, Calculator, Zap } from 'lucide-react';

export default function EligibilityChecker({ onApplyPathway }) {
  const [education, setEducation] = useState('engineering');
  const [field, setField] = useState('it');
  const [japanese, setJapanese] = useState('beginner');

  const calculateResult = () => {
    if (education === 'engineering' && (field === 'it' || field === 'mechanical' || field === 'electrical' || field === 'civil')) {
      return {
        pathway: 'IT & Engineering Visa (Engineer/Specialist in Humanities)',
        eligibilityStatus: 'High Eligibility',
        targetJlpt: 'JLPT N3 Recommended (N4 Minimum)',
        timeline: '6 to 9 Months with Kaizen Fast-Track',
        opportunities: 'Direct technical employment in Tokyo, Osaka & Nagoya',
        salaryRange: '¥240,000 to ¥450,000+ / month (₹1.3L to ₹2.5L+ INR)',
        keyAction: 'Start JLPT N5 in Coimbatore, advance to N3, and register for tech hiring rounds.',
        badgeColor: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950 border-red-500/30'
      };
    } else if (education === 'diploma' || field === 'skilled') {
      return {
        pathway: 'Specified Skilled Worker (SSW) Visa',
        eligibilityStatus: 'Eligible for SSW Program',
        targetJlpt: 'JLPT N4 or JFT-Basic + Skill Assessment Test',
        timeline: '5 to 7 Months Preparation',
        opportunities: 'Manufacturing, Machinery, Construction, Caregiving & Food Service',
        salaryRange: '¥200,000 to ¥280,000 / month (₹1.1L to ₹1.6L INR)',
        keyAction: 'Clear JLPT N4 with Kaizen Coimbatore, pass the skill test, and complete visa documentation.',
        badgeColor: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950 border-red-500/30'
      };
    } else if (education === '12th') {
      return {
        pathway: 'Higher Education in Japan (Apple.co Pvt. Ltd.) or TITP Internship',
        eligibilityStatus: 'Eligible for Study Abroad or TITP',
        targetJlpt: 'JLPT N5 (150 hours minimum) for School Visa',
        timeline: '6 Months to Next Intake (April / October)',
        opportunities: 'Japanese Language School in Japan -> Senmon Gakko / University / Career',
        salaryRange: 'Part-time student earnings up to ¥120,000/mo while studying',
        keyAction: 'Enroll in Kaizen N5 foundation batch and start application with Apple.co Japan.',
        badgeColor: 'text-neutral-800 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'
      };
    } else {
      return {
        pathway: 'Higher Education or SSW Career Pathway',
        eligibilityStatus: 'Eligible with Language Preparation',
        targetJlpt: 'JLPT N4 / N3',
        timeline: '6 to 8 Months',
        opportunities: 'Corporate support, translation, hospitality & higher education',
        salaryRange: '¥210,000 to ¥320,000 / month',
        keyAction: 'Schedule a free 1-on-1 career counselling session at our Coimbatore office.',
        badgeColor: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950 border-red-500/30'
      };
    }
  };

  const result = calculateResult();

  return (
    <section id="eligibility-section" className="py-12 sm:py-20 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5 text-red-600" />
            <span>Interactive Visa Eligibility Calculator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
            Check Your <span className="text-red-600">Japan Eligibility</span>
          </h1>

          <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Select your educational background, specialization, and current language proficiency to uncover your recommended pathway to Japan.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="mt-12 max-w-5xl mx-auto bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Step 1: Education */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                  1. Your Highest Qualification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'engineering', label: 'B.E / B.Tech / MCA' },
                    { id: 'diploma', label: 'Diploma (Engineering)' },
                    { id: 'degree', label: 'Graduate (Arts/Science/B.Com)' },
                    { id: '12th', label: '12th Standard Passed' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setEducation(opt.id)}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-bold text-left transition border ${
                        education === opt.id
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                          : 'bg-neutral-50 dark:bg-black/50 text-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-red-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Field */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                  2. Specialization / Field of Work
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'it', label: 'IT, Software & Web Dev' },
                    { id: 'mechanical', label: 'Mechanical / Automobile' },
                    { id: 'electrical', label: 'Electrical / Electronics' },
                    { id: 'skilled', label: 'Skilled / Technician / Others' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setField(f.id)}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-bold text-left transition border ${
                        field === f.id
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                          : 'bg-neutral-50 dark:bg-black/50 text-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-red-400'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Japanese Level */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                  3. Current Japanese Proficiency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'beginner', label: 'Complete Beginner (0%)' },
                    { id: 'n5', label: 'JLPT N5 (Basic)' },
                    { id: 'n4', label: 'JLPT N4 (Intermediate)' },
                    { id: 'n3', label: 'JLPT N3 / N2 (Advanced)' },
                  ].map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setJapanese(j.id)}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition border ${
                        japanese === j.id
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30'
                          : 'bg-neutral-50 dark:bg-black/50 text-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-red-400'
                      }`}
                    >
                      {j.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Output Assessment Card */}
            <div className="lg:col-span-6 bg-neutral-100 dark:bg-black/70 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-inner">
              
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${result.badgeColor}`}>
                    {result.eligibilityStatus}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 font-semibold">
                    <Zap className="w-3.5 h-3.5 text-red-600" />
                    Instant Evaluation
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white mt-4">
                  {result.pathway}
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="bg-white dark:bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <span className="text-[11px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block">Target Language Goal:</span>
                    <span className="text-sm font-black text-red-600 dark:text-red-400">{result.targetJlpt}</span>
                  </div>

                  <div className="bg-white dark:bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <span className="text-[11px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block">Estimated Timeline:</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{result.timeline}</span>
                  </div>

                  <div className="bg-white dark:bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <span className="text-[11px] font-bold uppercase text-neutral-500 dark:text-neutral-400 block">Expected Japanese Monthly Pay:</span>
                    <span className="text-sm font-black text-neutral-900 dark:text-white">{result.salaryRange}</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/20 text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed">
                    <strong className="text-neutral-950 dark:text-white">Recommended Action:</strong> {result.keyAction}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onApplyPathway(result.pathway)}
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl shadow-red-600/30 transition flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <span>Apply with This Eligibility Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
