import React, { useState } from 'react';
import { 
  Briefcase, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, 
  Send, ExternalLink, HelpCircle, FileText, Globe, Award, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JobSupportPage({ onOpenDemo, onOpenEligibility }) {
  const [activePathway, setActivePathway] = useState('it');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pathway: 'IT & Engineering Visa',
    qualification: 'Degree (B.E/B.Tech/MCA/B.Sc)',
    experience: '1-3 Years',
    jlptLevel: 'Beginner (Ready to Learn)',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const pathways = {
    it: {
      id: 'it',
      title: 'IT & Engineering Visa',
      kanji: '技術',
      tag: 'Professional Technical Route',
      overview: 'A professional route for qualified candidates in technical and engineering fields who want to build a long-term, high-growth career in Japan.',
      opportunities: [
        'IT and Software Engineering (Full Stack, Cloud, AI, Web, Mobile)',
        'Mechanical & Automotive Engineering Opportunities',
        'Electrical & Embedded Systems Engineering',
        'Civil & Construction Engineering',
        'Technical Design and Professional Project Roles'
      ],
      howKaizenHelps: [
        'Structured Japanese language training and JLPT preparation (N5 to N3/N2)',
        'Technical Japanese vocabulary & interview preparation for HR and tech rounds',
        'Employer and recruitment coordination with leading Japanese partners',
        'Complete documentation, Certificate of Eligibility (COE) and visa guidance'
      ],
      bestSuitedFor: 'Engineering graduates, diploma holders, MCA/B.Sc IT and working professionals who want a flourishing technical career in Japan.'
    },
    ssw: {
      id: 'ssw',
      title: 'Specified Skilled Worker (SSW) Visa',
      kanji: '特定技能',
      tag: 'High Demand Skilled Industries',
      overview: 'A dedicated pathway for skilled candidates seeking direct employment in Japan’s priority skilled industries, supported by specialized language preparation and skill assessment test guidance.',
      opportunities: [
        'Employment across designated skilled industries in Japan',
        'Direct recruitment and verified placement assistance',
        'Competitive Japanese salary standards with health and retirement benefits',
        'Pathway for multi-year residency in Japan'
      ],
      howKaizenHelps: [
        'Japanese language training and JLPT N4 / JFT-Basic preparation',
        'Skill assessment test preparation and registration assistance',
        'One-on-one interview coaching with Japanese conversational nuances',
        'Full documentation, endorsement handling and visa process guidance'
      ],
      bestSuitedFor: 'Skilled candidates, diploma holders and graduates ready to learn Japanese and secure employment in Japan’s skilled sectors.'
    },
    titp: {
      id: 'titp',
      title: 'Technical Intern Training Program (TITP)',
      kanji: '技能実習',
      tag: 'Technical Training + On-The-Job Experience',
      overview: 'A globally recognized government-supported programme combining technical training with employment experience in Japan, helping you acquire high-demand technical expertise.',
      opportunities: [
        'Structured technical on-the-job training in Japan’s manufacturing and industry',
        'Subsidized living, practical stipend and industrial certification',
        'Coordination with approved Sending and Supervising Organizations in Japan'
      ],
      howKaizenHelps: [
        'Comprehensive Japanese language and etiquette foundation',
        'Coordination with recognized recruitment partners',
        'Documentation and visa processing assistance',
        'Cultural orientation and pre-departure life guidance'
      ],
      bestSuitedFor: 'Candidates eager to gain hands-on technical skills while living and working in Japan.'
    }
  };

  const steps = [
    { num: '01', title: 'Free Counselling', desc: 'Share your qualification, work experience and career goals. We help you identify the right pathway.' },
    { num: '02', title: 'Choose Your Pathway', desc: 'Select the IT & Engineering, SSW or TITP route that matches your background and ambitions.' },
    { num: '03', title: 'Learn Japanese', desc: 'Begin structured JLPT training (N5 to N2) with practical speaking practice, offline in Coimbatore or online.' },
    { num: '04', title: 'Skill & Profile Prep', desc: 'Receive skill assessment guidance and build a professional Japanese standard resume (Rirekisho).' },
    { num: '05', title: 'Interview Preparation', desc: 'Face mock interviews with our bilingual trainers covering both HR and technical expectations.' },
    { num: '06', title: 'Recruitment & Placement', desc: 'We coordinate with Japanese employers and recruitment partners to secure placement interviews.' },
    { num: '07', title: 'Documentation & Visa', desc: 'Step-by-step guidance for Certificate of Eligibility (COE) and visa embassy clearance.' },
    { num: '08', title: 'Pre-Departure Briefing', desc: 'Orientation on Japanese workplace culture, housing, bank setup and lifestyle before you fly.' },
  ];

  const faqs = [
    {
      q: "Do I need to know Japanese before applying?",
      a: "No. You can start from the absolute beginning! Kaizen offers comprehensive JLPT training from N5 through N2, so you learn Japanese while preparing for your career in Japan."
    },
    {
      q: "Can I attend classes while I am working?",
      a: "Yes! Kaizen offers flexible weekend and evening batches, offline classes at our Coimbatore campus, live online classes, and recorded video sessions for convenient revision."
    },
    {
      q: "Which visa pathway is right for me?",
      a: "It depends on your qualification, field of study, and goals. During your free counselling session, our team will analyze your profile and recommend the ideal route among IT & Engineering, SSW, and TITP."
    },
    {
      q: "Does Kaizen help with documents and the visa process?",
      a: "Yes. We provide complete documentation support, Certificate of Eligibility (COE) preparation guidance, visa filing support, and pre-departure guidance."
    },
    {
      q: "Will Kaizen prepare me for interviews?",
      a: "Yes! Interview preparation is an integral part of our programme. You will practice Japanese self-introductions (Jikoshoukai), corporate etiquette, and industry-specific interview questions."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionStatus(null);

    try {
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmissionStatus({
          type: 'success',
          message: data.message || 'Application submitted successfully! Our placement team will contact you.',
          previewUrl: data.previewUrl
        });
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          pathway: 'IT & Engineering Visa',
          qualification: 'Degree (B.E/B.Tech/MCA/B.Sc)',
          experience: '1-3 Years',
          jlptLevel: 'Beginner (Ready to Learn)',
          message: ''
        });
      } else {
        setSubmissionStatus({
          type: 'error',
          message: data.error || 'Failed to submit application. Please try again.'
        });
      }
    } catch (err) {
      setSubmissionStatus({
        type: 'error',
        message: 'Network error connecting to the mail server. Please try calling us at +91 8668136788.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedData = pathways[activePathway];

  return (
    <section id="job-support-section" className="py-12 sm:py-20 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white transition-colors relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/80 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5 text-red-600" />
            <span>Employment Support in Japan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
            Your Career in Japan <span className="text-red-600">Starts Here</span>
          </h1>

          <p className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Learn Japanese, prepare with confidence, and step into rewarding employment opportunities in Japan — with Kaizen guiding you at every single stage from Coimbatore.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={onOpenEligibility}
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check Your Eligibility</span>
            </button>
            <a
              href="#apply-job-form"
              className="bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-200 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 transition shadow-sm"
            >
              Enquire for Placement
            </a>
          </div>
        </div>

        {/* Narrative Feature: Build a Career Beyond Borders */}
        <div className="mt-14 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-md">
          <div className="absolute -top-12 -right-12 text-9xl font-black text-neutral-900/[0.03] dark:text-red-600/[0.04] select-none font-japanese">
            就職
          </div>
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400">
              Build a Career Beyond Borders
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
              Your talent deserves a bigger stage.
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              Japan offers skilled professionals and workers vast opportunities across technology, software, automotive, mechanical, electrical, and skilled industries. Kaizen Japanese Language Academy helps you reach them.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              We go far beyond standard textbook lessons. Through our recruitment partnerships, we connect skilled Indian candidates with authentic employment opportunities in Japan, preparing you thoroughly in language, corporate culture, mock interviews, and paperwork so you are ready from day one.
            </p>
          </div>
        </div>

        {/* 3 Visa Pathways Tabs */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
              Choose Your Pathway to Japan
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
              Kaizen supports three distinct employment pathways. Select the route that matches your qualification, skills, and goals.
            </p>
          </div>

          {/* Pathway Tab Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-neutral-100 dark:bg-neutral-900/80 p-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 max-w-4xl mx-auto">
            {Object.values(pathways).map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePathway(p.id)}
                className={`py-3.5 px-4 rounded-xl text-left transition-all relative ${
                  activePathway === p.id
                    ? 'bg-red-600 text-white shadow-xl shadow-red-600/30'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold tracking-wider opacity-85">
                    Pathway {p.id === 'it' ? '1' : p.id === 'ssw' ? '2' : '3'}
                  </span>
                  <span className="font-japanese text-sm font-bold opacity-70">{p.kanji}</span>
                </div>
                <div className="text-sm sm:text-base font-bold mt-1">{p.title}</div>
              </button>
            ))}
          </div>

          {/* Active Pathway Details Card */}
          <div className="mt-8 bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {selectedData.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-3">
                    {selectedData.title}
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base mt-2 leading-relaxed">
                    {selectedData.overview}
                  </p>
                </div>

                {/* Opportunities */}
                <div className="space-y-3 bg-neutral-50 dark:bg-black/40 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Career Opportunities Included:</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedData.opportunities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Suited For */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Best Suited For:</span>
                  <p className="text-neutral-900 dark:text-white text-sm font-semibold mt-1">
                    {selectedData.bestSuitedFor}
                  </p>
                </div>
              </div>

              {/* How Kaizen Helps */}
              <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-950/80 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-600" />
                    <span>How Kaizen Supports You</span>
                  </h4>
                  
                  <ul className="space-y-3.5 mt-4">
                    {selectedData.howKaizenHelps.map((help, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 border border-red-500/40 text-red-700 dark:text-red-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span>{help}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <a
                    href="#apply-job-form"
                    onClick={() => setFormData(prev => ({ ...prev, pathway: selectedData.title }))}
                    className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/30"
                  >
                    <span>Apply for {selectedData.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* 8-Step Journey With Kaizen */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-500">Your Structured Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-1">
              Your Journey to Japan with Kaizen
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
              A clear, supported 8-step path from your first enquiry in Coimbatore to your arrival in Japan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/40 p-5 rounded-2xl transition-all shadow-sm hover:shadow-md relative group"
              >
                <div className="text-2xl font-black text-red-600/60 dark:text-red-500/50 group-hover:text-red-600 transition-colors">
                  {st.num}
                </div>
                <h3 className="text-base font-bold text-neutral-950 dark:text-white mt-2 group-hover:text-red-600 transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Japanese Language Matters Box */}
        <div className="mt-16 bg-gradient-to-r from-red-50 via-white to-red-50 dark:from-red-950/40 dark:via-neutral-900 dark:to-black p-6 sm:p-10 rounded-3xl border border-red-200 dark:border-red-600/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                Why Japanese Language Matters
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                Japanese is your strongest weapon for career success. It sets you apart in employer interviews, enables smooth workplace collaboration, and guarantees high respect in Japanese corporate culture.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>JLPT Curriculum from N5 to N2</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Practical Speaking & Keigo Practice</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Coimbatore Offline & Live Online Classes</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>Recorded Sessions for Working Professionals</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <button
                onClick={onOpenDemo}
                className="bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-black text-sm px-6 py-3.5 rounded-xl shadow-xl transition-all"
              >
                Join Coimbatore JLPT Batch
              </button>
            </div>
          </div>
        </div>

        {/* Application Form + Google Form Section */}
        <div id="apply-job-form" className="mt-20 scroll-mt-24">
          <div className="bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Form Intro & Google Form Link */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-block bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Direct Placement Coordination
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                  Apply for Japan Career Opportunities
                </h3>
                
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  Fill out this placement inquiry form to have our career counseling team in Coimbatore review your profile. We coordinate directly with employers in Tokyo and across Japan.
                </p>

                {/* Google Form Link Support */}
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-red-500/30 space-y-3 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    <ExternalLink className="w-4 h-4" />
                    <span>Alternative Official Google Form</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Prefer submitting via Google Forms directly? You can also complete our official Japan Recruitment intake questionnaire.
                  </p>
                  <a
                    href="https://forms.gle/kaizen-japan-jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 transition shadow-sm"
                  >
                    <span>Open Official Google Form</span>
                    <ExternalLink className="w-3 h-3 text-red-600" />
                  </a>
                </div>

                <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                  <p>📍 Location: <strong>Coimbatore Campus, Tamil Nadu</strong></p>
                  <p>📞 Phone: <strong>+91 8668136788</strong></p>
                  <p>🌐 Web: <strong>www.kaizenjapaneseclass.com</strong></p>
                </div>
              </div>

              {/* Interactive Form Component (Forwarded via Nodemailer) */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {submissionStatus && (
                    <div className={`p-4 rounded-xl text-xs sm:text-sm border ${
                      submissionStatus.type === 'success'
                        ? 'bg-red-50 dark:bg-red-950/60 border-red-500/50 text-red-800 dark:text-red-200'
                        : 'bg-red-100 dark:bg-red-950/80 border-red-600 text-red-800 dark:text-red-200'
                    }`}>
                      <p className="font-semibold">{submissionStatus.message}</p>
                      {submissionStatus.previewUrl && (
                        <a
                          href={submissionStatus.previewUrl}
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
                        placeholder="e.g. Anand Kumar"
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
                        placeholder="name@example.com"
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Target Pathway *
                      </label>
                      <select
                        value={formData.pathway}
                        onChange={(e) => setFormData({ ...formData, pathway: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      >
                        <option value="IT & Engineering Visa">IT & Engineering Visa</option>
                        <option value="Specified Skilled Worker (SSW)">Specified Skilled Worker (SSW)</option>
                        <option value="Technical Intern Training Program (TITP)">TITP Internship</option>
                        <option value="Need Guidance / Counselling">Need Guidance / Counselling</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Highest Qualification
                      </label>
                      <select
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      >
                        <option value="B.E / B.Tech / MCA (Engineering/IT)">B.E / B.Tech / MCA (Engineering/IT)</option>
                        <option value="Diploma in Engineering">Diploma in Engineering</option>
                        <option value="Degree (Arts/Science/Commerce)">Degree (Arts/Science/Commerce)</option>
                        <option value="12th Standard Passed">12th Standard Passed</option>
                        <option value="Other Technical Qualification">Other Technical Qualification</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                        Current Japanese Level
                      </label>
                      <select
                        value={formData.jlptLevel}
                        onChange={(e) => setFormData({ ...formData, jlptLevel: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                      >
                        <option value="Complete Beginner (Ready to Learn)">Complete Beginner (Ready to Learn)</option>
                        <option value="JLPT N5 (Basic/Learning)">JLPT N5 (Basic/Learning)</option>
                        <option value="JLPT N4 Passed">JLPT N4 Passed</option>
                        <option value="JLPT N3 or Higher">JLPT N3 or Higher</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-400 mb-1.5">
                      Your Goals / Notes
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your background, preferred job role, or timing..."
                      className="w-full bg-neutral-50 dark:bg-black/60 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Forwarding Application...' : 'Submit Career Application'}</span>
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    Automated mail notification delivered via Nodemailer to Kaizen Placement Desk.
                  </p>

                </form>
              </div>

            </div>
          </div>
        </div>

        {/* FAQs Section From Word Document */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-500">Clarifications & Answers</span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
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

          {/* Important Regulatory Note */}
          <div className="max-w-3xl mx-auto mt-8 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-600 dark:text-neutral-400">
            <strong className="text-neutral-900 dark:text-white">Important note:</strong> Eligibility, recruitment decisions, and visa approvals are decided by the respective employers, accredited organizations, and Japanese immigration authorities. Kaizen Japanese Language Academy provides dedicated training, interview coaching, and official coordination support.
          </div>
        </div>

      </div>
    </section>
  );
}
