'use client';

import { Button } from '@/components/ui';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { MOCK_DIGEST } from '@/lib/data/mock';
import { SectionMarker } from './SectionMarker';

export function Hero() {
  return (
    <section id="s-1" className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden isolate">
      {/* Background halo — layered violet light at the top */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* Primary halo */}
        <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] sm:w-[1600px] sm:h-[1100px] bg-violet-600/[0.10] rounded-full blur-[80px] sm:blur-[140px]" />
        {/* Secondary tighter violet core */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[320px] sm:w-[800px] sm:h-[500px] bg-violet-500/[0.08] rounded-full blur-[60px] sm:blur-[100px]" />
        {/* Cool ink-100 wash for dimensionality */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025)_0%,transparent_60%)]" />
        {/* Faint horizon line for editorial weight */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        {/* Vignette falloff into the page */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#0a090e_70%)]" />
      </div>

      <div className="relative max-w-[var(--section-max-w)] mx-auto px-4 sm:px-6">
        {/* Section marker + eyebrow — Stripe Sessions style */}
        <div className="animate-slide-up mb-14" style={{ animationDelay: '60ms' }}>
          <SectionMarker num="1.0" eyebrow="The product" />
        </div>

        {/* Eyebrow chip — glass-morphism with green pulse */}
        <div
          className="flex justify-center mb-14 animate-slide-up"
          style={{ animationDelay: '120ms' }}
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-ink-200">
              Private beta · 178 researchers joined this week
            </span>
          </div>
        </div>

        {/* Massive display headline — Fraunces, genuinely huge */}
        <h1
          className="text-center text-display text-white mb-6 sm:mb-12 animate-slide-up leading-[0.92] text-balance"
          style={{
            animationDelay: '200ms',
            fontSize: 'clamp(40px, 11vw, 200px)',
          }}
        >
          <span className="block">
            <em className="not-italic text-ink-500">Your</em>{' '}
            <span>own</span>{' '}
            <em className="font-light text-ink-200">research</em>{' '}
            <span>desk,</span>
          </span>
          <span className="block">
            <span>not</span>{' '}
            <em className="not-italic text-ink-500">another</em>{' '}
            <em className="italic">aggregator.</em>
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-center text-base sm:text-lg md:text-xl text-ink-300 max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed animate-slide-up px-2"
          style={{ animationDelay: '280ms' }}
        >
          Curate the newsletters you trust. We consolidate them into one clean,
          deduplicated brief — delivered where you want, on your schedule.
        </p>

        {/* CTA — pill-shaped, white/black primary, outline secondary */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 sm:mb-24 animate-slide-up px-2"
          style={{ animationDelay: '400ms' }}
        >
          <Link
            href="/app"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-ink-950 text-[14px] font-medium rounded-full hover:bg-ink-100 transition-colors shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            Browse the source directory
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#s-2"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-ink-200 text-[14px] font-medium rounded-full hover:text-white border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03] transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4 text-ink-400 group-hover:text-ink-200 transition-colors" />
            See how it works
          </Link>
        </div>

        {/* Hero product UI */}
        <div
          className="relative max-w-5xl mx-auto px-2 sm:px-0 animate-slide-up overflow-hidden"
          style={{ animationDelay: '520ms' }}
        >
          <HeroDigestMock />
        </div>
      </div>
    </section>
  );
}

function HeroDigestMock() {
  return (
    <div
      className="relative"
      style={{ transform: 'rotate(-0.5deg)', transformOrigin: 'center center' }}
    >
      {/* Violet glow behind the mockup — godlike depth */}
      <div
        className="absolute -inset-x-8 sm:-inset-x-16 -inset-y-8 sm:-inset-y-16 bg-gradient-to-b from-violet-500/[0.18] via-violet-600/[0.06] to-transparent rounded-[2rem] sm:rounded-[2.5rem] blur-2xl sm:blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-x-4 sm:-inset-x-6 -inset-y-4 sm:-inset-y-6 bg-gradient-to-b from-violet-400/[0.08] to-transparent rounded-[1.5rem] sm:rounded-[2rem] blur-xl sm:blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Notification badge — floating outside the window frame, top-right */}
      <div
        className="absolute -top-2 sm:-top-3 right-2 sm:-right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-900/95 border border-white/[0.1] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl"
        aria-hidden="true"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        <span className="text-[10px] font-mono text-ink-200">3 new</span>
      </div>

      <div className="relative rounded-2xl border border-white/[0.08] bg-ink-950/85 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden ring-1 ring-white/[0.02]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80 shadow-[0_0_4px_rgba(244,63,94,0.3)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-300/80 shadow-[0_0_4px_rgba(252,211,77,0.3)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_4px_rgba(52,211,153,0.3)]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] text-ink-400 font-mono">
              synthwire.app / digest / today
            </div>
          </div>
          <div className="w-12" />
        </div>

        {/* Digest header */}
        <div className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-5 sm:pb-6 border-b border-white/[0.06]">
          <div className="flex items-baseline justify-between mb-3 sm:mb-5 gap-2 flex-wrap">
            <p className="eyebrow text-ink-400">Your brief · Today</p>
            <p className="text-[10px] sm:text-[11px] text-ink-500 font-mono flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              11 stories · 6 min · saved 47 min
            </p>
          </div>
          <h2 className="text-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2 tracking-[-0.035em] leading-[0.95] text-balance">
            June 13, 2026
          </h2>
          <p className="text-[13px] text-ink-400">
            From 9 sources you trust
          </p>

          {/* Signal meter — tiny AI-processing hint */}
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500">
                Signal
              </span>
              <div className="flex items-end gap-[2px] h-3">
                <div className="w-[3px] h-1.5 bg-violet-400/70 rounded-sm" />
                <div className="w-[3px] h-2 bg-violet-400/80 rounded-sm" />
                <div className="w-[3px] h-2.5 bg-violet-400/90 rounded-sm" />
                <div className="w-[3px] h-3 bg-violet-300 rounded-sm shadow-[0_0_4px_rgba(167,139,250,0.5)]" />
              </div>
            </div>
            <span className="w-px h-3 bg-white/[0.06]" />
            <div className="flex items-center gap-2.5">
              <span className="text-[14px] leading-none" title="Positive">📈</span>
              <span className="text-[14px] leading-none" title="Neutral">⚖️</span>
              <span className="text-[14px] leading-none" title="Caution">⚠️</span>
              <span className="text-[10px] font-mono text-ink-500 ml-1">3 sent.</span>
            </div>
            <span className="flex-1" />
            <span className="text-[10px] font-mono text-ink-500">
              <span className="text-violet-300">●</span> AI-curated · 0.94
            </span>
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 sm:px-6 lg:px-10 py-5 sm:py-7 space-y-5 sm:space-y-7">
          {MOCK_DIGEST.sections.slice(0, 3).map((section, i) => {
            const item = section.items[0];
            const avatar = item?.source_title?.[0] ?? '?';
            return (
              <div key={section.topic} className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-medium text-white flex items-center gap-2">
                    <span className="text-violet-400">
                      {section.section_title.split(' ')[0]}
                    </span>
                    <span>{section.section_title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  <span className="text-[10px] text-ink-500 font-mono uppercase tracking-wider">
                    {section.items.length} stories
                  </span>
                </div>
                <p className="text-[12px] text-ink-400 leading-relaxed mb-3 line-clamp-2">
                  {section.section_summary}
                </p>
                {item && (
                  <div className="group relative p-3 sm:p-4 pl-12 sm:pl-[3.75rem] rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.045] hover:border-white/[0.1] transition-colors">
                    {/* Avatar — first letter of source name in violet gradient box */}
                    <div className="absolute left-4 top-4 w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 ring-1 ring-white/[0.1] flex items-center justify-center text-[11px] font-medium text-white shadow-[0_2px_8px_-2px_rgba(139,92,246,0.5)]">
                      {avatar}
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] text-ink-500 font-mono">
                        from {item.source_title}
                      </p>
                      <p className="text-[10px] text-ink-600 font-mono">
                        {item.reading_time_minutes} min · {(item.relevance_score * 100).toFixed(0)}% match
                      </p>
                    </div>
                    <p className="text-[13px] text-white font-medium mb-1.5 leading-snug group-hover:text-white">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-ink-400 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Animated cursor — hovering over the second story card */}
                    {i === 1 && (
                      <div
                        className="absolute -top-1 -right-1 pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="relative">
                          <span className="absolute inset-0 rounded-full bg-violet-400/50 animate-ping" />
                          <span className="relative block w-3 h-3 rounded-full bg-violet-400 ring-2 ring-violet-200/40 shadow-[0_0_12px_rgba(167,139,250,0.7)]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom stats bar — monospace quick stats */}
        <div className="px-4 sm:px-6 lg:px-10 py-3 sm:py-4 border-t border-white/[0.06] bg-white/[0.015] grid grid-cols-3 gap-2 sm:gap-4">
          <p className="text-[11px] text-ink-400 font-mono flex items-center gap-1.5">
            <span className="text-violet-400">●</span>
            11 stories
          </p>
          <p className="text-[11px] text-ink-400 font-mono flex items-center justify-center gap-1.5">
            <span className="text-violet-400">●</span>
            6 min read
          </p>
          <p className="text-[11px] text-ink-400 font-mono flex items-center justify-end gap-1.5">
            <span className="text-violet-400">●</span>
            saved 47 min
          </p>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 lg:px-10 py-3 sm:py-3.5 border-t border-white/[0.06] bg-white/[0.01] flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] text-ink-500 font-mono">
            Sent to email · Slack
          </p>
          <p className="text-[11px] text-ink-500 font-mono">Synthwire · v1.0</p>
        </div>
      </div>
    </div>
  );
}
