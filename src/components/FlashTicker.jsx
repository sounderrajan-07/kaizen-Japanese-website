import React from 'react';
import { Bell, Sparkles, MapPin, Award, ArrowRight } from 'lucide-react';

export default function FlashTicker({ onOpenPoster, onOpenDemo }) {
  const newsItems = [
    { text: "Exclusive Offline Japanese Classes NOW in Coimbatore!", icon: MapPin, highlight: "Coimbatore Campus" },
    { text: "First 10 Members Get Exclusive Launch Offer!", icon: Sparkles, highlight: "Special Discount" },
    { text: "100% Placement Assistance in Japan (IT, SSW & TITP Visas)", icon: Award, highlight: "Career Support" },
    { text: "Higher Japanese Language Education in Collaboration with Apple.co Pvt. Ltd., Japan", icon: Bell, highlight: "Official Partner" },
    { text: "தமிழ் வழியில் ஜப்பானிய மொழி — Learn Japanese through Tamil & English", icon: Sparkles, highlight: "Bilingual Sensei" },
  ];

  return (
    <aside aria-label="Announcements" className="bg-gradient-to-r from-kaizen-red-dark via-kaizen-red to-black text-white text-xs sm:text-sm font-medium border-b border-red-500/20 overflow-hidden relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        
        {/* Flash Badge */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-black/60 px-2.5 py-1 rounded-full border border-red-500/30 text-white font-bold tracking-wide uppercase text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          FLASH NEWS
        </div>

        {/* Marquee Container */}
        <div className="overflow-hidden whitespace-nowrap flex-1 flex items-center relative mask-fade">
          <div className="inline-flex animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
            {[...newsItems, ...newsItems].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="inline-flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-red-300" />
                  <span className="bg-red-950/80 text-red-200 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-red-500/30">
                    {item.highlight}
                  </span>
                  <span className="text-white/90 hover:text-white transition-colors">
                    {item.text}
                  </span>
                  <span className="text-red-500/50 mx-2">•</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenPoster}
            className="hidden md:inline-flex items-center gap-1.5 bg-white text-black hover:bg-neutral-200 text-xs font-semibold px-2.5 py-1 rounded-full transition-all shadow-sm"
          >
            <span>View Offers</span>
            <ArrowRight className="w-3 h-3 text-red-600" />
          </button>
        </div>

      </div>
    </aside>
  );
}

