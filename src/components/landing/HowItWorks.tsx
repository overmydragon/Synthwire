'use client';

import { MagnifyingGlassIcon, EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

const steps = [
  {
    number: '01',
    icon: MagnifyingGlassIcon,
    title: 'Curate',
    headline: 'You pick the sources.',
    description: 'Browse a directory of 10,000+ vetted newsletters. Filter by topic, frequency, paywall, or author type. One click to add.',
  },
  {
    number: '02',
    icon: EnvelopeIcon,
    title: 'Subscribe',
    headline: 'You confirm, like always.',
    description: 'Clicking "Subscribe" opens the newsletter&apos;s normal signup. You confirm via the standard double-opt-in. Your email stays yours.',
  },
  {
    number: '03',
    icon: SparklesIcon,
    title: 'Receive',
    headline: 'We consolidate, you read.',
    description: 'Ten newsletters covering the same story become one. Deduplicated, summarized, ranked. Delivered daily to email, Slack, Discord, or SMS.',
  },
];

export function HowItWorks() {
  return (
    <section id="s-3" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-20">
          <div className="mb-6">
            <SectionMarker num="1.2" eyebrow="How it works" />
          </div>
          <h2 className="text-display text-[clamp(32px,8vw,80px)] text-white mb-6 mt-6 text-balance">
            Three steps. <em className="text-ink-400 not-italic">No magic.</em>
          </h2>
          <p className="text-lg text-ink-300 leading-relaxed max-w-xl">
            Other tools promise AI auto-discovery and fail at the inbox-confirmation step. Synthwire is honest: you do the subscribing, we do the reading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-stretch">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 100}>
              <div className="group h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[14px] font-mono text-ink-500">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.06] group-hover:border-white/[0.15] transition-colors">
                    <step.icon className="w-5 h-5 text-ink-300 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <p className="eyebrow text-ink-500 mb-3">{step.title}</p>

                <h3 className="text-display text-3xl md:text-4xl text-white mb-4">
                  {step.headline}
                </h3>

                <p className="text-[15px] text-ink-300 leading-relaxed flex-1 line-clamp-3">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}