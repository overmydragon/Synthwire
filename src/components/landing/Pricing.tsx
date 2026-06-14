'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { TIER_FEATURES, type Tier } from '@/lib/types';
import Link from 'next/link';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

const tierOrder: Tier[] = ['free', 'lite', 'max'];

const tierCopy: Record<Tier, { tagline: string; ideal: string }> = {
  free: { tagline: 'Try the experience.', ideal: 'For the curious.' },
  lite: { tagline: 'Build a real feed.', ideal: 'For the practitioner.' },
  max: { tagline: 'The full research desk.', ideal: 'For teams and analysts.' },
};

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="s-8" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-7">
            <div className="mb-6">
              <SectionMarker num="1.8" eyebrow="Pricing" />
            </div>
            <h2 className="text-display text-[clamp(40px,6vw,80px)] text-white mb-6 mt-6">
              Pay for what <em className="text-ink-400 not-italic">you read.</em>
            </h2>
          </div>
          <div className="md:col-span-5 flex md:items-end">
            <p className="text-[15px] text-ink-300 leading-relaxed">
              No team seats you don&apos;t need. No enterprise tier that hides the good stuff. Pick the level that matches how you work.
            </p>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center gap-3 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`text-[13px] font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-ink-400'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-violet-500' : 'bg-white/[0.1]'
            }`}
            aria-label="Toggle billing cycle"
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`text-[13px] font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-ink-400'}`}
          >
            Yearly <span className="text-violet-400 text-[11px]">−17%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/[0.06]">
          {tierOrder.map((tier, i) => {
            const features = TIER_FEATURES[tier];
            const price = billingCycle === 'monthly' ? features.price_monthly : features.price_yearly;
            const isPopular = tier === 'lite';

            return (
              <RevealOnScroll key={tier} delay={i * 80}>
                <div
                  className={`group relative p-5 sm:p-6 md:p-8 lg:p-10 border-b md:border-b-0 border-white/[0.06] ${
                    i < tierOrder.length - 1 ? 'md:border-r' : ''
                  } ${isPopular ? 'bg-white/[0.02]' : ''} hover:bg-white/[0.03] transition-colors flex flex-col h-full`}
                >
                  {/* Invisible "Popular" spacer reserves badge space in all 3 cards so tops align on mobile */}
                  <span
                    className={`absolute top-4 right-4 md:top-6 md:right-6 text-[10px] font-mono uppercase tracking-wider select-none ${
                      isPopular ? 'text-violet-400' : 'invisible'
                    }`}
                  >
                    Popular
                  </span>

                  <p className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-2xl font-medium text-white mb-1">{features.name}</h3>
                  <div className="min-h-[40px] mb-6">
                    <p className="text-[13px] text-ink-400">{tierCopy[tier].tagline}</p>
                    <p className="text-[12px] text-ink-500">{tierCopy[tier].ideal}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-display text-5xl text-white">${price}</span>
                    <span className="text-[14px] text-ink-400 ml-2">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>

                  <ul className="space-y-3 flex-1">
                    <FeatureItem>{features.sources_limit === 'unlimited' ? 'Unlimited sources' : `${features.sources_limit} sources`}</FeatureItem>
                    <FeatureItem>{features.archive_days}-day archive</FeatureItem>
                    <FeatureItem>Email delivery</FeatureItem>
                    {features.delivery_channels.includes('slack') && <FeatureItem>Slack delivery</FeatureItem>}
                    {features.redundancy_filter && <FeatureItem>Redundancy filter</FeatureItem>}
                    {features.coverage_gaps && <FeatureItem>Coverage gap detection</FeatureItem>}
                    {features.source_graph && <FeatureItem>Source graph</FeatureItem>}
                    {features.full_text_search && <FeatureItem>Full-text archive search</FeatureItem>}
                    {features.discovery_requests && <FeatureItem>On-demand source requests</FeatureItem>}
                    {features.team_workspaces && <FeatureItem>Team workspaces ({features.max_team_members} members)</FeatureItem>}
                  </ul>

                  <Link
                    href="/app"
                    className={`block w-full text-center py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                      isPopular
                        ? 'bg-white text-ink-950 hover:bg-ink-100'
                        : 'border border-white/[0.12] text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {price === 0 ? 'Start free' : `Get ${features.name}`}
                  </Link>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        <p className="text-center text-[12px] text-ink-500 mt-8">No credit card required · Cancel anytime</p>
      </div>
    </section>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[13px] text-ink-300">
      <CheckIcon className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}