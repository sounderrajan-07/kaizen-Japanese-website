import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function SakuraEffect() {
  const [enabled, setEnabled] = useState(true);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }

    // Generate 18 subtle petals with varying positions and delays
    const newPetals = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 96}%`,
      animationDuration: `${7 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${10 + Math.random() * 8}px`,
      opacity: 0.35 + Math.random() * 0.35,
    }));

    setPetals(newPetals);
  }, [enabled]);

  return (
    <>
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
          {petals.map((p) => (
            <div
              key={p.id}
              className="sakura-petal"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setEnabled(!enabled)}
        className="fixed bottom-5 left-5 z-40 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white px-3 py-1.5 rounded-full border border-neutral-700/80 backdrop-blur-md shadow-lg text-[11px] font-semibold flex items-center gap-1.5 transition"
        title="Toggle Japanese Sakura Animation"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="font-japanese text-red-400">桜</span>
        <span>{enabled ? 'Sakura Active' : 'Enable Sakura'}</span>
      </button>
    </>
  );
}

