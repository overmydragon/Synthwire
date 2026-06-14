'use client';

import { MOCK_SOURCES } from '@/lib/data/mock';
import { SectionMarker } from './SectionMarker';

export function SourceMarquee() {
  const sources = [...MOCK_SOURCES, ...MOCK_SOURCES];

  return (
    <section id="s-2" className="relative py-12 sm:py-16 md:py-20 border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="mb-4">
          <SectionMarker
            num="1.1"
            eyebrow="Indexing 10,000+ vetted newsletters"
          />
        </div>
        <h2 className="text-display text-[clamp(32px,4.5vw,56px)] text-white max-w-2xl">
          The sources you <em className="text-ink-400 not-italic">already trust.</em>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {sources.map((source, i) => (
            <div
              key={`${source.source_id}-${i}`}
              className="flex-shrink-0 mx-2 sm:mx-3 group"
            >
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500/20 to-violet-700/20 border border-white/[0.06] flex items-center justify-center text-[10px] font-medium text-violet-300">
                  {source.title.charAt(0)}
                </div>
                <span className="text-[13px] font-medium text-ink-200 whitespace-nowrap">{source.title}</span>
                <span className="text-[10px] text-ink-500 font-mono uppercase tracking-wider">{source.frequency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}