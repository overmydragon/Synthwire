'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { SectionMarker } from './SectionMarker';

export function CTA() {
  return (
    <section className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] sm:w-[1000px] sm:h-[600px] bg-violet-600/[0.1] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="mb-8">
          <SectionMarker num="2.0" eyebrow="Get started" align="center" />
        </div>

        <h2 className="text-display text-[clamp(40px,9vw,140px)] text-white mb-10 text-balance">
          Stop reading 47 newsletters.
          <span className="block">
            <em className="text-ink-400 not-italic">Read one brief.</em>
          </span>
        </h2>

        <p className="text-lg text-ink-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Free while we&apos;re building. No credit card, no commitment, no AI crawling your inbox.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink-950 text-[14px] font-medium rounded-full hover:bg-ink-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            aria-label="Browse the source directory and create your free account"
          >
            Browse the source directory
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="mailto:help@synthwire.email"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-ink-300 text-[14px] font-medium rounded-full hover:text-white border border-white/[0.12] hover:bg-white/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            aria-label="Contact the Synthwire team via email"
          >
            Talk to the team
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-ink-500 font-mono">
          <span>No captchas</span>
          <span className="text-ink-700">·</span>
          <span>No inbox crawling</span>
          <span className="text-ink-700">·</span>
          <span>No third-party auth</span>
          <span className="text-ink-700">·</span>
          <span>You own your data</span>
        </div>
      </div>
    </section>
  );
}