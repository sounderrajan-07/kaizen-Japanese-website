import React, { useState } from 'react';
import { 
  GraduationCap, Building2, CheckCircle2, ChevronDown, ChevronUp, 
  ArrowRight, Send, HelpCircle, School, BookOpen, Compass, PlaneTakeoff, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HigherEducationPage({ onOpenDemo }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentEducation: 'Completed Bachelor’s Degree',
    intendedIntake: 'April Intake',
    budgetRange: 'Standard Language School',
    jlptLevel: 'Beginner (Ready to start)',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const services = [
    {
      title: "Guidance for Japanese Language Schools",
      desc: "We analyze your aspirations, academic background and preferred city in Japan (Tokyo, Osaka, Nagoya, Fukuoka) to select the right Japanese language school.",
      icon: School
    },
    {
      title: "Higher Japanese Language Education",
      desc: "Comprehensive roadmap for students aiming to transition from language schools into Japanese universities, vocational colleges (Senmon Gakko), or post-graduate programmes.",
      icon: GraduationCap
    },
    {
      title: "Admission & Application Assistance",
      desc: "Direct support in drafting application documents, Statement of Purpose (SOP), and liaison with schools through Apple.co Pvt. Ltd., Japan.",
      icon: BookOpen
    },
    {
      title: "Japanese Language Training (N5 to N2)",
      desc: "Arrive in Japan prepared. Study at our Coimbatore campus or online, with recorded sessions for revisions so you meet the 150-hour study requirement.",
      icon: Sparkles
    },
    {
      title: "Documentation & COE Guidance",
      desc: "Clear step-by-step assistance for financial sponsorship, educational translation, and Certificate of Eligibility (COE) submission to Japanese Immigration.",
      icon: Compass
    },
    {
      title: "Student Visa Process Guidance",
      desc: "Complete mock interviews and embassy filing support to ensure smooth visa approval without delays.",
      icon: CheckCircle2
    },
    {
      title: "Pre-departure & Settlement Support",
      desc: "Guidance on Japanese dormitories/apartments, student part-time work regulations (28 hours/week), bank accounts, and health insurance.",
      icon: PlaneTakeoff
    }
  ];

  const studySteps = [
    { step: '01', title: 'Educational Counselling', desc: 'Discuss your goals, previous academic marks and budget. We demystify the Japan study journey.' },
    { step: '02', title: 'Language Preparation', desc: 'Begin structured JLPT training with Kaizen in Coimbatore or online to build foundation skills.' },
    { step: '03', title: 'Language School Selection', desc: 'Receive tailored options for recognized Japanese language schools matching your long-term plan.' },
    { step: '04', title: 'Admission & Application', desc: 'Complete school admission forms supported by our collaborator in Japan, Apple.co Pvt. Ltd.' },
    { step: '05', title: 'Documentation & Translation', desc: 'Prepare all necessary financial documents and official Japanese translations with zero errors.' },
    { step: '06', title: 'COE & Student Visa', desc: 'Submit application to Japanese Immigration and obtain your Student Visa stamp at the VFS/Embassy.' },
    { step: '07', title: 'Pre-Departure Briefing', desc: 'Pack right, prepare for arrival in Japan, and connect with fellow Indian students already in Japan.' }
  ];

  const studyFaqs = [
    {
      q: "Who is Kaizen's collaborator in Japan?",
      a: "Kaizen proudly collaborates with Apple.co Pvt. Ltd., Japan, to assist Indian students in securing admissions to premier Japanese language schools and navigating student settlement in Japan."
    },
    {
      q: "Do I need to know Japanese before applying?",
      a: "You can begin your language preparation right here at Kaizen! Most Japanese language schools require at least 150 hours of study or JLPT N5 proficiency, which we prepare you for in Coimbatore or online."
    },
    {
      q: "Will Kaizen help with admission and visa documents?",
      a: "Yes. Together with Apple.co Pvt. Ltd., Japan, we provide full admission assistance, translation of documents into Japanese, Certificate of Eligibility (COE) filing, and visa interview readiness."
    },
    {
      q: "Does Kaizen support students after admission?",
      a: "Yes. We offer pre-departure sessions covering Japanese student life, finding accommodation, opening bank accounts, and understanding part-time work permissions (up to 28 hours per week)."
    },
    {
      q: "Can I learn Japanese online while preparing for intake?",
      a: "Absolutely. Kaizen offers both exclusive offline classes in Coimbatore and live interactive online sessions, accompanied by recorded classes for round-the-clock revision."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/higher-education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Counselling request submitted! Our higher education advisors will get in touch.',
          previewUrl: data.previewUrl
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          currentEducation: 'Completed Bachelor’s Degree',
          intendedIntake: 'April Intake',
          budgetRange: 'Standard Language School',
          jlptLevel: 'Beginner (Ready to start)',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to submit request. Please try again.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Network error connecting to backend. Please call +91 8668136788.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="higher-education-section" className="py-12 sm:py-20 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors relative overflow-hidden">
      
      {/* Background Japanese Watermark */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-red-600" />
            <span>Collaboration in Japan: Apple.co Pvt. Ltd.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
            Study in Japan: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-amber-600 dark:from-red-500 dark:via-red-400 dark:to-white">
              Turn Your Academic Dreams into Reality
            </span>
          </h1>

          <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            From choosing the right Japanese language school to preparing for departure, Kaizen walks beside you — together with our partner in Japan, <strong className="text-neutral-900 dark:text-white">Apple.co Pvt. Ltd.</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="#study-counselling-form"
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Study Counselling</span>
            </a>
            <button
              onClick={onOpenDemo}
              className="bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-200 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 transition shadow-sm"
            >
              Join Foundation Japanese Batch
            </button>
          </div>
        </div>

        {/* Partnership Showcase Card: Apple.co Pvt. Ltd., Japan */}
        <div className="mt-14 bg-gradient-to-br from-white via-red-50/20 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 border border-neutral-200 dark:border-red-600/30 rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 px-3 py-1 rounded-full border border-red-500/30">
                PROUDLY IN COLLABORATION WITH Apple.co Pvt. Ltd., Japan
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                Supporting students who aspire to pursue higher Japanese language education in Japan
              </h2>

              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                Kaizen Japanese Language Academy is proud to collaborate with <strong className="text-neutral-900 dark:text-white">Apple.co Pvt. Ltd., Japan</strong>. Studying abroad is a big step, and no student should take it alone.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                This international partnership brings together Kaizen's Japanese language training and student counselling in Coimbatore, India with the on-ground support of our collaborator in Japan, so that your study journey is guided, organised, and thoroughly prepared from day one.
              </p>

              {/* What this collaboration means */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Trusted collaborator stationed in Japan</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Direct Japanese language school liaison</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Complete admission & application support</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>Pre-departure and arrival guidance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-neutral-100 dark:bg-black/60 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-600 dark:text-red-500 font-bold">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white">Apple.co Pvt. Ltd.</h3>
                <p className="text-xs text-red-600 dark:text-red-400 font-bold">Official Japan Collaborator</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                  Partner facilitating Japanese language school admissions & higher education pathways for Indian students.
                </p>
              </div>
              <div className="text-[11px] bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 font-semibold px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800">
                Tokyo & Kansai Network
              </div>
            </div>

          </div>
        </div>

        {/* Study Services Grid */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-500">Comprehensive Student Care</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-1">
              Your Study in Japan Services
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
              Every detail taken care of — from your first vocabulary word in Coimbatore to receiving your student residency card in Japan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/40 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white mt-4 group-hover:text-red-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7-Step Study Roadmap */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-500">Step-by-Step Flow</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-1">
              Your Study Journey with Kaizen
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
              Structured stages ensuring complete clarity, documentation readiness, and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studySteps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/40 p-5 rounded-2xl transition group shadow-sm hover:shadow-md relative"
              >
                <div className="text-2xl font-black text-red-600/60 dark:text-red-500/40 group-hover:text-red-600 transition-colors">
                  {st.step}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white mt-2 group-hover:text-red-600 transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Study Counselling Form (Forwarded via Nodemailer) */}
        <div id="study-counselling-form" className="mt-20 scroll-mt-24">
          <div className="bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-block bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Higher Education Advisory
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                  Book Free Study in Japan Counselling
                </h3>

                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  Speak directly with Kaizen's overseas education advisors in Coimbatore and our Japan desk team. We will evaluate your profile for the next Japanese language school intake.
                </p>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-inner">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">Key Intakes in Japan:</div>
                  <div className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
                    <span>🌸 April Intake (Major 2-Year Program)</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">Apply 6 Months Prior</span>
                  </div>
                  <div className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-between pt-1">
                    <span>🍁 October Intake (1.5-Year Program)</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">Apply 6 Months Prior</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <p>📍 Coimbatore Center: <strong>Tamil Nadu, India</strong></p>
                  <p>🤝 Collaborator: <strong>Apple.co Pvt. Ltd., Japan</strong></p>
                  <p>📞 Phone: <strong>+91 8668136788</strong></p>
                </div>
              </div>

              {/* Form Input */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {status && (
                    <div className={`p-4 rounded-xl text-xs sm:text-sm border ${
                      status.type === 'success'
                        ? 'bg-red-50 dark:bg-red-950/60 border-red-500/50 text-red-800 dark:text-red-200'
                        : 'bg-red-100 dark:bg-red-950/80 border-red-600 text-red-800 dark:text-red-200'
                    }`}>
                      <p className="font-semibold">{status.message}</p>
                      {status.previewUrl && (
                        <a
                          href={status.previewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-1 text-xs text-red-700 dark:text-white underline"
                        >
                          View Nodemailer Delivery Log / Preview Link
                        </a>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sundaram"
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya@example.com"
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Target Intake
                      </label>
                      <select
                        value={formData.intendedIntake}
                        onChange={(e) => setFormData({ ...formData, intendedIntake: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      >
                        <option value="April Intake">April Intake (2-Year Course)</option>
                        <option value="October Intake">October Intake (1.5-Year Course)</option>
                        <option value="July Intake">July Intake</option>
                        <option value="January Intake">January Intake</option>
                        <option value="Need Guidance">Need Intake Guidance</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Current Education Level
                      </label>
                      <select
                        value={formData.currentEducation}
                        onChange={(e) => setFormData({ ...formData, currentEducation: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      >
                        <option value="Completed Bachelor’s Degree">Completed Bachelor’s Degree</option>
                        <option value="Currently in Final Year Degree">Currently in Final Year Degree</option>
                        <option value="Completed Diploma (3 Years)">Completed Diploma (3 Years)</option>
                        <option value="Passed 12th Standard (+2)">Passed 12th Standard (+2)</option>
                        <option value="Master’s / Post Graduate">Master’s / Post Graduate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Current Japanese Knowledge
                      </label>
                      <select
                        value={formData.jlptLevel}
                        onChange={(e) => setFormData({ ...formData, jlptLevel: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      >
                        <option value="Beginner (Zero Knowledge)">Beginner (Zero Knowledge)</option>
                        <option value="Studying N5 Currently">Studying N5 Currently</option>
                        <option value="Passed JLPT N5">Passed JLPT N5</option>
                        <option value="Passed JLPT N4 or Above">Passed JLPT N4 or Above</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                      Your Questions or Dream City (Tokyo/Osaka/etc.)
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Interested in Tokyo language schools and transitioning to IT master's later..."
                      className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Connecting with Apple.co Coordinator...' : 'Request Study Counselling'}</span>
                  </button>

                </form>
              </div>

            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-500">Answers to Common Doubts</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-1">
              Higher Education FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {studyFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm sm:text-base font-bold text-neutral-900 dark:text-white hover:text-red-600 transition"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </button>

                {expandedFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-8 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-600 dark:text-neutral-400">
            <strong className="text-neutral-900 dark:text-white">Important note:</strong> Admission, student visa decisions, and school selection are subject to the policies of the respective educational institutions and Japanese immigration authorities. Kaizen provides counselling, language training, and collaborative guidance support.
          </div>
        </div>

      </div>
    </section>
  );
}
