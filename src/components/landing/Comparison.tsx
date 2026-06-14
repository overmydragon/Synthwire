'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

const rows = [
  { label: 'Who chooses sources', them: 'Black-box AI', us: 'You do' },
  { label: 'Inbox crawling', them: 'Often required', us: 'Never' },
  { label: 'Captcha handling', them: 'Pretends to (doesn\'t)', us: 'Not needed' },
  { label: 'Trust model', them: 'Opaque algorithm', us: 'Your source list' },
  { label: 'Email exposure', them: 'Sometimes', us: 'Never' },
  { label: 'Deduplication', them: 'Basic', us: 'Semantic + source attribution' },
  { label: 'Reading modes', them: 'One', us: 'Executive / Analyst / Deep' },
  { label: 'Cancellation', them: 'Hunt for links', us: 'One click' },
];

export function Comparison() {
  return (
    <section id="s-4" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-7">
              <div className="mb-6">
                <SectionMarker num="1.4" eyebrow="Why us" />
              </div>
              <h2 className="text-display text-[clamp(40px,6vw,80px)] text-white mt-6 text-balance">
                The other <em className="text-ink-400 not-italic">newsletter</em>
                <br />
                tools, then us.
              </h2>
            </div>
            <div className="md:col-span-5 flex md:items-end">
              <p className="text-[15px] text-ink-300 leading-relaxed">
                We don&apos;t pretend to read your inbox, bypass your newsletter confirmations, or invent sources you didn&apos;t ask for. We do the part AI is actually good at: consolidation.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Comparison table — 2 columns, hairline dividers */}
        <RevealOnScroll delay={150}>
          <div className="border-t border-white/[0.08]">
            {/* Header row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-white/[0.08]">
              <div className="p-4 sm:p-6 text-[11px] font-mono uppercase tracking-wider text-ink-500">Property</div>
              <div className="p-4 sm:p-6 sm:border-l border-white/[0.06] text-[11px] font-mono uppercase tracking-wider text-ink-500">Other tools</div>
              <div className="p-4 sm:p-6 sm:border-l border-t sm:border-t-0 border-white/[0.06] text-[11px] font-mono uppercase tracking-wider text-white bg-white/[0.02]">Synthwire</div>
            </div>

            {rows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-1 sm:grid-cols-3 border-b border-white/[0.06] ${i === rows.length - 1 ? '' : ''} hover:bg-white/[0.015] transition-colors`}>
                <div className="p-4 sm:p-6 text-[13px] sm:text-[14px] text-ink-400 border-t sm:border-t-0 border-white/[0.04]">{row.label}</div>
                <div className="p-4 sm:p-6 sm:border-l border-t sm:border-t-0 border-white/[0.04] text-[13px] sm:text-[14px] text-ink-300 flex items-start gap-3">
                  <XMarkIcon className="w-4 h-4 text-ink-600 flex-shrink-0 mt-1" />
                  <span>{row.them}</span>
                </div>
                <div className="p-4 sm:p-6 sm:border-l border-t sm:border-t-0 border-white/[0.04] text-[13px] sm:text-[14px] text-white bg-white/[0.02] flex items-start gap-3">
                  <CheckIcon className="w-4 h-4 text-violet-400 flex-shrink-0 mt-1" />
                  <span>{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}