'use client';

import { PROOF_METRICS } from '@/lib/types';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

export function ProofMetrics() {
  return (
    <section id="s-6" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20">
          <div className="mb-6">
            <SectionMarker num="1.6" eyebrow="Proof, not promises" />
          </div>
          <h2 className="text-display text-[clamp(36px,5vw,64px)] text-white mt-6 text-balance">
            The numbers that <em className="text-ink-400 not-italic">actually matter.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-8">
          {PROOF_METRICS.map((metric, i) => (
            <RevealOnScroll key={metric.label} delay={i * 80}>
              <div className="group">
                <p className="text-[11px] font-mono text-ink-500 mb-3">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-display text-[clamp(48px,7vw,80px)] text-white mb-2 tracking-tighter">
                  {metric.value}
                </p>
                <p className="text-[14px] text-ink-200 font-medium mb-1">{metric.label}</p>
                <p className="text-[12px] text-ink-500">{metric.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}