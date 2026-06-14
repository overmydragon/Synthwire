'use client';

export function FooterMarquee() {
  const word = 'Synthwire';
  const repeat = Array.from({ length: 20 });

  return (
    <section className="relative py-12 sm:py-16 md:py-20 border-y border-white/[0.06] overflow-hidden">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-slow will-change-transform gap-8 sm:gap-10 md:gap-12">
          {repeat.flatMap((_, i) => [
            <span
              key={`w-${i}`}
              className="text-display text-[clamp(36px,8vw,120px)] text-ink-700/30 whitespace-nowrap select-none flex-shrink-0"
            >
              {word}
            </span>,
            <span
              key={`d-${i}`}
              className="text-display text-[clamp(36px,8vw,120px)] text-ink-800/30 whitespace-nowrap select-none flex-shrink-0"
            >
              ·
            </span>
          ])}
        </div>
      </div>
    </section>
  );
}