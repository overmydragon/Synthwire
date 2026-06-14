'use client';

import { MOCK_SOURCES } from '@/lib/data/mock';

export function FooterMarquee() {
  const word = 'Synthwire';
  const repeat = Array.from({ length: 20 });

  return (
    <section className="relative py-12 sm:py-16 md:py-20 border-y border-white/[0.06] overflow-hidden">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-slow">
          {repeat.map((_, i) => (
            <span
              key={i}
              className="text-display text-[clamp(48px,10vw,160px)] text-ink-700/30 whitespace-nowrap px-4 sm:px-6 md:px-8 select-none"
            >
              {word}
              <span className="text-ink-800/30 mx-4 sm:mx-6 md:mx-8">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}