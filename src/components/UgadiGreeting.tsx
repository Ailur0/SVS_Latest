import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const SESSION_KEY = 'ugadi_2026_seen';
const DURATION = 5000; // ms

export default function UgadiGreeting() {
  const [visible] = useState(() => {
    const today = new Date();
    const isUgadiPeriod = today <= new Date('2026-03-19T23:59:59');
    return isUgadiPeriod && !sessionStorage.getItem(SESSION_KEY);
  });
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) return;

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 30);

    timeoutRef.current = setTimeout(() => dismiss(), DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible]);

  const dismiss = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProgress(100);
    setFading(true);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setGone(true);
    }, 600);
  };

  if (!visible || gone) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        animation: fading ? 'ugadiFadeOut 0.6s ease forwards' : undefined,
      }}
    >
      <style>{`
        @keyframes ugadiFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes ugadiSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Full-bleed background image */}
      <img
        src="/Ugadi wishes.png"
        alt="Ugadi"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Gradient scrim — bottom-heavy so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center"
        style={{ animation: 'ugadiSlideUp 0.7s 0.2s ease both' }}
      >
        {/* Telugu greeting */}
        <p
          className="font-bold leading-tight mb-1"
          style={{
            fontSize: 'clamp(2rem, 7vw, 4rem)',
            color: '#FFD700',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            fontFamily: 'serif',
          }}
        >
          ఉగాది శుభాకాంక్షలు
        </p>

        {/* Transliteration */}
        <p
          className="font-semibold tracking-wide mb-3"
          style={{
            fontSize: 'clamp(1rem, 3.5vw, 1.75rem)',
            color: '#FFE066',
            textShadow: '0 1px 8px rgba(0,0,0,0.7)',
          }}
        >
          Ugadi Shubhakankshalu
        </p>

        {/* Subtitle */}
        <p
          className="text-white/80 mb-8 max-w-md"
          style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)' }}
        >
          Wishing you a prosperous new year from SVS Polymer Industries
        </p>

        {/* Continue button */}
        <button
          onClick={dismiss}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(255,215,0,0.15)',
            border: '1.5px solid rgba(255,215,0,0.6)',
            color: '#FFD700',
            backdropFilter: 'blur(8px)',
          }}
        >
          Continue to Site
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-yellow-400/80 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
