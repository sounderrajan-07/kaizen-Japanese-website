import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, MapPin, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegistrationModal({ isOpen, onClose, defaultCourse = 'JLPT N5 Beginner Batch' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: defaultCourse,
    mode: 'Offline (Coimbatore Campus)',
    preferredTime: 'Weekend Morning (10:00 AM - 1:00 PM)',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setResult({
          type: 'success',
          message: data.message || 'Demo booked successfully! We will contact you with batch details.',
          previewUrl: data.previewUrl
        });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: 'JLPT N5 Beginner Batch',
          mode: 'Offline (Coimbatore Campus)',
          preferredTime: 'Weekend Morning (10:00 AM - 1:00 PM)',
          message: ''
        });
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Failed to submit. Please call +91 8668136788.'
        });
      }
    } catch (err) {
      setResult({
        type: 'error',
        message: 'Could not connect to server. Please call us directly at +91 8668136788.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-red-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-kaizen-red-dark via-kaizen-red to-black px-6 py-4 flex items-center justify-between text-white border-b border-red-500/20">
          <div className="flex items-center gap-2.5">
            <div className="h-8 px-1.5 py-0.5 rounded-lg bg-white flex items-center justify-center border border-white/20">
              <img src="/logo.jpeg" alt="Kaizen Logo" className="h-6 w-auto object-contain" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Book Your Free Demo Class</h3>
              <p className="text-[11px] text-red-200">Experience our teaching in Coimbatore or Online</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-red-600 text-white transition border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 overflow-y-auto">
          {result && (
            <div className={`mb-5 p-4 rounded-xl text-xs sm:text-sm border ${
              result.type === 'success'
                ? 'bg-red-950/60 border-red-500/40 text-red-200'
                : 'bg-red-950/80 border-red-600 text-red-200'
            }`}>
              <p className="font-bold">{result.message}</p>
              {result.previewUrl && (
                <a
                  href={result.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-1 text-xs text-white underline font-semibold"
                >
                  View Nodemailer Dispatch Log / Ethereal Preview
                </a>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sundaram"
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 86681 36788"
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rahul@example.com"
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Course of Interest
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                >
                  <option value="JLPT N5 Beginner Batch">JLPT N5 Beginner Batch</option>
                  <option value="JLPT N4 Intermediate Batch">JLPT N4 Intermediate Batch</option>
                  <option value="JLPT N3 Technical Batch">JLPT N3 Technical Batch</option>
                  <option value="JLPT N2 Advanced Batch">JLPT N2 Advanced Batch</option>
                  <option value="Spoken Japanese (Conversational)">Spoken Japanese (Conversational)</option>
                  <option value="1-on-1 Personalized Coaching">1-on-1 Personalized Coaching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Classroom Mode
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
                >
                  <option value="Offline (Coimbatore Campus)">Offline (Coimbatore Campus)</option>
                  <option value="Live Interactive Online">Live Interactive Online</option>
                  <option value="Hybrid (Weekend Offline + Online)">Hybrid (Weekend Offline + Online)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                Preferred Timing
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
              >
                <option value="Weekend Morning (10:00 AM - 1:00 PM)">Weekend Morning (10:00 AM - 1:00 PM)</option>
                <option value="Weekend Afternoon (2:00 PM - 5:00 PM)">Weekend Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="Weekday Evening (7:00 PM - 8:30 PM)">Weekday Evening (7:00 PM - 8:30 PM)</option>
                <option value="Flexible / Contact Me">Flexible / Contact Me</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                Any specific question or goals?
              </label>
              <textarea
                rows="2"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e.g. Planning for SSW mechanical exam in 6 months..."
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-red-500 rounded-xl px-4 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Confirming Demo Reservation...' : 'Confirm Free Demo Class'}</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-900">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500" />
                Coimbatore Campus, Tamil Nadu
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-red-500" />
                +91 8668136788
              </span>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

