'use client';

import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';
import { SparklesIcon, ClockIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

type SourceCard = {
  letter: string;
  name: string;
  badge: string;
  headline: string;
  summary: string;
  readTime: number;
};

const sources: SourceCard[] = [
  {
    letter: 'S',
    name: 'stratechery.com',
    badge: 'covers this story',
    headline: 'OpenAI’s new model changes the unit economics of inference',
    summary:
      'The cost-per-token has fallen below a threshold that makes always-on agents viable for the first time. Implications for SaaS pricing are significant.',
    readTime: 8,
  },
  {
    letter: 'I',
    name: 'import-ai.news',
    badge: 'covers this story',
    headline: 'Jack Morris — what an order of magnitude cheaper inference means',
    summary:
      'Cheaper inference reframes the question from "can we afford to run this model?" to "what should we run it on?" The bottleneck moves to evaluation.',
    readTime: 6,
  },
  {
    letter: 'T',
    name: 'theinformation.com',
    badge: 'covers this story',
    headline: 'Inside OpenAI’s aggressive GPU reserve strategy for 2026',
    summary:
      'OpenAI is locking in multi-year compute commitments, signalling it expects inference demand to outpace training within 18 months.',
    readTime: 7,
  },
  {
    letter: 'T',
    name: 'techcrunch.com',
    badge: 'covers this story',
    headline: 'OpenAI announces 90% price cut on its flagship model',
    summary:
      'The new pricing undercuts every major competitor and accelerates a race to the bottom for inference APIs.',
    readTime: 4,
  },
  {
    letter: 'T',
    name: 'theverge.com',
    badge: 'covers this story',
    headline: 'OpenAI just made its smartest model basically free',
    summary:
      'For consumers, the price drop is invisible. For developers building products, it changes the math on what is possible to ship this quarter.',
    readTime: 5,
  },
  {
    letter: 'W',
    name: 'wired.com',
    badge: 'covers this story',
    headline: 'The quiet collapse of the AI compute moat',
    summary:
      'When the marginal cost of intelligence falls by an order of magnitude, the value shifts from owning models to owning distribution and data.',
    readTime: 6,
  },
  {
    letter: 'P',
    name: 'platformer.news',
    badge: 'covers this story',
    headline: 'What OpenAI’s price cut tells us about the agent economy',
    summary:
      'The strategic move is not about API revenue. It is about making agents ubiquitous so the next platform layer belongs to OpenAI.',
    readTime: 5,
  },
];

export function DemoSection() {
  return (
    <section
      id="s-3-demo"
      className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="demo-heading"
    >
      {/* Subtle violet wash behind the section */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-violet-600/[0.05] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 sm:mb-16 md:mb-20">
            <div className="md:col-span-7">
              <div className="mb-6">
                <SectionMarker num="1.3" eyebrow="How a digest gets built" />
              </div>
              <h2
                id="demo-heading"
                className="text-display text-white text-[clamp(40px,5.5vw,72px)] leading-[1.02] tracking-[-0.035em] text-balance"
              >
                <span className="block">
                  Seven newsletters{' '}
                  <em className="not-italic text-ink-400">cover</em>{' '}
                  <em className="not-italic text-ink-400">the</em>{' '}
                  same
                </span>
                <span className="block">
                  <em className="italic text-ink-200">story.</em>
                </span>
              </h2>
            </div>
            <div className="md:col-span-5 flex md:items-end">
              <p className="text-[15px] text-ink-300 leading-relaxed max-w-md">
                <span className="text-white">One synthesis.</span> One read.{' '}
                <span className="text-white">Six minutes</span> instead of
                forty. Same coverage. None of the inbox archaeology.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Two-column demo board */}
        <RevealOnScroll delay={120}>
          <DemoBoard />
        </RevealOnScroll>

        {/* Footnote row */}
        <RevealOnScroll delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-ink-500">
            <p>
              <span className="text-violet-400">●</span> Real product output
              from a beta user · OpenAI price cut, June 2026
            </p>
            <p>
              <span className="text-ink-600">demo</span> · static · no state
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function DemoBoard() {
  return (
    <div className="relative">
      {/* Desktop: side-by-side. Mobile: stacked. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,360px)] gap-10 lg:gap-12 items-center">
        {/* LEFT: seven source cards stacked */}
        <ul className="space-y-2 sm:space-y-3">
          {sources.map((s, i) => (
            <li key={s.name}>
              <SourceRow source={s} index={i} />
            </li>
          ))}
        </ul>

        {/* RIGHT: one synthesis card */}
        <div className="relative">
          <SynthesisCard sources={sources} />
        </div>
      </div>

      {/* Converging SVG arrows — desktop only, absolute between the columns */}
      <ConvergingArrows />
    </div>
  );
}

function SourceRow({ source, index }: { source: SourceCard; index: number }) {
  return (
    <div
      className="group relative flex items-start gap-3 p-3 rounded-lg border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.1] hover:bg-white/[0.03] transition-colors"
      data-source-row
      data-index={index}
    >
      {/* Violet gradient avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-violet-400 via-violet-500 to-violet-700 ring-1 ring-white/[0.08] flex items-center justify-center text-[12px] font-medium text-white shadow-[0_4px_12px_-4px_rgba(139,92,246,0.6)]">
        {source.letter}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-ink-500 truncate">
            {source.name}
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[9px] font-mono uppercase tracking-wider text-violet-300">
            {source.badge}
          </span>
        </div>
        <p className="text-[12.5px] text-white font-medium leading-snug mb-1 line-clamp-1">
          {source.headline}
        </p>
        <p className="text-[11px] text-ink-400 leading-relaxed line-clamp-2">
          {source.summary}
        </p>
        <p className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-ink-500">
          <ClockIcon className="w-3 h-3" />
          {source.readTime} min
        </p>
      </div>
    </div>
  );
}

function SynthesisCard({ sources }: { sources: SourceCard[] }) {
  return (
    <div className="relative" data-synthesis-card>
      {/* Violet glow halo behind the synthesis card */}
      <div
        className="absolute -inset-x-6 -inset-y-6 bg-gradient-to-br from-violet-500/[0.18] via-violet-600/[0.08] to-transparent rounded-3xl blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative rounded-2xl border border-violet-500/30 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950 p-6 shadow-2xl shadow-violet-900/20 ring-1 ring-violet-400/10">
        {/* Eyebrow */}
        <div className="flex items-center justify-between mb-5">
          <p className="eyebrow text-violet-300 inline-flex items-center gap-1.5">
            <SparklesIcon className="w-3.5 h-3.5" />
            Synthwire synthesis
          </p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono uppercase tracking-wider text-emerald-300">
            live
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-display text-2xl md:text-[26px] text-white mb-4 leading-[1.15] tracking-[-0.025em]">
          OpenAI’s 90% inference price cut signals a shift from training
          to agent economics.
        </h3>

        {/* Summary */}
        <p className="text-[13px] text-ink-200 leading-relaxed mb-5">
          On Monday, OpenAI cut API prices by 90% — an aggressive move
          that makes always-on agents economically viable for the first
          time. Seven trusted sources covered the same story from
          different angles: pricing, strategy, GPU reserves, and the
          downstream collapse of the compute moat. The synthesis below
          captures the consensus and the disagreement.
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-4" />

        {/* Footer: covers + signal quality */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 flex-wrap">
          <div className="flex-1 min-w-0 break-words">
            <p className="eyebrow text-ink-500 mb-2">Covers</p>
            <p className="text-[11px] font-mono text-ink-300 leading-relaxed">
              {sources.map((s, i) => (
                <span key={s.name}>
                  <span className="text-ink-200">{s.name}</span>
                  {i < sources.length - 1 && (
                    <span className="text-ink-600"> · </span>
                  )}
                </span>
              ))}
            </p>
          </div>
          <div className="flex-shrink-0 text-right self-end sm:self-auto">
            <p className="eyebrow text-ink-500 mb-2">Signal</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/25">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-300">
                quality
              </span>
              <span className="text-[12px] font-mono text-white">0.94</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Static SVG overlay that draws 7 hairlines from the right edge of each
 * source row to the left edge of the synthesis card. The lines are computed
 * in a viewBox that matches the responsive grid — CSS handles scaling.
 *
 * Implementation note: we cannot measure DOM positions server-side, so we
 * draw a stylized "spokes on a wheel" that visually communicates the
 * convergence without depending on real coordinates. On desktop, the SVG
 * is positioned over the gap between the two columns. On mobile, it is
 * hidden because the columns stack.
 */
function ConvergingArrows() {
  return (
    <div
      className="hidden lg:block absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="converge-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="converge-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 7 spokes converging from the left column toward a single point on the right */}
        {/* Each spoke is a thin path with a gradient stroke and a small dot at the destination */}
        {[
          { y1: 60, y2: 480 },
          { y1: 185, y2: 510 },
          { y1: 310, y2: 530 },
          { y1: 435, y2: 545 },
          { y1: 560, y2: 560 },
          { y1: 685, y2: 575 },
          { y1: 810, y2: 590 },
        ].map((spoke, i) => (
          <g key={i}>
            {/* Glow underlay */}
            <path
              d={`M 720 ${spoke.y1} Q 820 ${(spoke.y1 + spoke.y2) / 2} 920 ${spoke.y2}`}
              stroke="url(#converge-glow)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Hairline stroke */}
            <path
              d={`M 720 ${spoke.y1} Q 820 ${(spoke.y1 + spoke.y2) / 2} 920 ${spoke.y2}`}
              stroke="url(#converge-gradient)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="0"
            />
            {/* Source endpoint dot (faint) */}
            <circle
              cx="720"
              cy={spoke.y1}
              r="2"
              fill="#a78bfa"
              opacity="0.55"
            />
          </g>
        ))}

        {/* Convergence target — violet ring with pulse */}
        <circle
          cx="920"
          cy="535"
          r="6"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="920" cy="535" r="2.5" fill="#c4b5fd" />
        <circle
          cx="920"
          cy="535"
          r="10"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="0.6"
          opacity="0.35"
        >
          <animate
            attributeName="r"
            values="6;18;6"
            dur="3.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

// Re-export for type-checking the unused import warning suppression.
// (ArrowLongRightIcon is imported above; kept available for future expansion.)
void ArrowLongRightIcon;
