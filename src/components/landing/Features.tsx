'use client';

import {
  ShieldCheckIcon,
  EyeIcon,
  BoltIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'You choose every source',
    description: 'No AI auto-subscribing. Browse a directory of 10,000+ vetted newsletters and add the ones you want. We never subscribe on your behalf.',
    span: 'md:col-span-2',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Source similarity',
    description: '"People who read these also kept these 3 sources" — find writers like the ones you already trust.',
    span: 'md:col-span-1',
  },
  {
    icon: BoltIcon,
    title: 'Redundancy filter',
    description: 'Ten newsletters covering the same story → one entry. 87% duplicate reduction.',
    span: 'md:col-span-1',
  },
  {
    icon: ChartBarIcon,
    title: 'Coverage gaps',
    description: '"You follow AI policy but miss 3 high-signal semiconductor sources." Blind-spot detection on your curated list.',
    span: 'md:col-span-2',
  },
  {
    icon: EyeIcon,
    title: 'Full source transparency',
    description: 'Every source shows publisher, topics, cadence, paywall status, reputation, and overlap with your other sources.',
    span: 'md:col-span-1',
  },
  {
    icon: ArrowPathIcon,
    title: 'Topic memory',
    description: '"Show me only new ideas, not repeated takes." Filter rehashed narratives across your sources.',
    span: 'md:col-span-1',
  },
  {
    icon: SparklesIcon,
    title: 'Reading modes',
    description: 'Executive (3 min), analyst (8 min), deep-research (20 min). Match depth to available time.',
    span: 'md:col-span-1',
  },
  {
    icon: CpuChipIcon,
    title: 'You control routing',
    description: 'Email, Slack, Discord, or SMS. Pause all sources. One-click unsubscribe. Export anytime.',
    span: 'md:col-span-1',
  },
  {
    icon: ShieldExclamationIcon,
    title: 'Privacy first',
    description: 'No captchas. No inbox crawling. No third-party authentication. You own your data — export or delete with one click.',
    span: 'md:col-span-2',
  },
];

export function Features() {
  return (
    <section id="s-7" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-7">
            <div className="mb-6">
              <SectionMarker num="1.7" eyebrow="Features" />
            </div>
            <h2 className="text-display text-[clamp(40px,6vw,80px)] text-white mt-6 text-balance">
              You curate the sources. <em className="text-ink-400 not-italic">We do the work.</em>
            </h2>
          </div>
          <div className="md:col-span-5 flex md:items-end">
            <p className="text-[15px] text-ink-300 leading-relaxed">
              Most newsletter tools try to auto-discover for you and fail at trust. Synthwire flips the model: you own the source list, we handle the reading.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 50}>
              <div
                className={`group relative p-5 sm:p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 ${feature.span}`}
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                  <feature.icon className="w-5 h-5 text-ink-300 group-hover:text-violet-300 transition-colors" />
                </div>

                <h3 className="text-[18px] font-medium text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-ink-400 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute top-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}