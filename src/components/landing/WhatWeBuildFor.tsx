'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

const weLike = [
  { letter: 'A', label: 'Independent writers', description: 'Newsletter authors with a clear point of view — not aggregators' },
  { letter: 'B', label: 'Niche specialists', description: 'Sources that cover one topic deeply rather than everything shallowly' },
  { letter: 'C', label: 'Long-form analysis', description: 'We are built for people who want to read, not people who want to scroll' },
  { letter: 'D', label: 'Weekly or better cadence', description: 'Sources that earn their place in your inbox' },
  { letter: 'E', label: 'Topic depth over breadth', description: 'Prefer 1 expert over 10 generalists' },
  { letter: 'F', label: 'Original reporting', description: 'Sources that break stories, not just re-package them' },
  { letter: 'G', label: 'Clear signal', description: 'No listicles, no roundups, no "10 things you missed this week"' },
];

const weAvoid = [
  { label: 'Affiliate-heavy content', description: 'Sources whose primary business is selling you things' },
  { label: 'Mass-market roundups', description: 'The same 5 stories everyone else covered' },
  { label: 'Hype newsletters', description: 'Funded by companies who want favorable coverage' },
];

export function WhatWeBuildFor() {
  return (
    <section id="s-5" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="mb-6">
            <SectionMarker num="1.5" eyebrow="What we build for" />
          </div>
          <h2 className="text-display text-[clamp(40px,6vw,80px)] text-white mb-6 mt-6">
            We like sources that have:
          </h2>
          <p className="text-lg text-ink-300 max-w-2xl">
            A short, opinionated list. If you read these, you&apos;ll love what we built. If you don&apos;t, this probably isn&apos;t for you.
          </p>
        </div>

        {/* We like — lettered grid */}
        <div className="border-t border-white/[0.08]">
          {weLike.map((item, i) => (
            <RevealOnScroll key={item.letter} delay={i * 40}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-white/[0.06] py-5 hover:bg-white/[0.015] transition-colors group">
                <div className="md:col-span-1 flex items-start mb-2 md:mb-0">
                  <span className="text-display text-3xl text-ink-500 group-hover:text-white transition-colors">
                    ({item.letter})
                  </span>
                </div>
                <div className="md:col-span-4 mb-1 md:mb-0">
                  <h3 className="text-[16px] text-white font-medium">{item.label}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[14px] text-ink-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* We avoid */}
        <div className="mt-16">
          <h3 className="text-display text-3xl text-white mb-8 mt-6">
            We avoid sources that are:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weAvoid.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <XMarkIcon className="w-4 h-4 text-ink-500 mb-3" />
                <h4 className="text-[15px] text-white font-medium mb-1">{item.label}</h4>
                <p className="text-[13px] text-ink-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}