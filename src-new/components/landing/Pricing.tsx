'use client';

import { useState } from 'react';
import { 
  CheckIcon, 
  XIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  ArrowPathIcon,
  CpuChipIcon,
  EyeIcon,
  DocumentTextIcon,
  BellIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { Button, Card } from '@/components/ui';
import { TIER_FEATURES, type Tier } from '@/lib/types';

const featureRows = [
  { key: 'sources_limit', label: 'Sources', getValue: (t: Tier) => TIER_FEATURES[t].sources_limit === 'unlimited' ? 'Unlimited' : TIER_FEATURES[t].sources_limit },
  { key: 'archive_days', label: 'Archive retention', getValue: (t: Tier) => `${TIER_FEATURES[t].archive_days} days` },
  { key: 'summary_modes', label: 'Summary modes', getValue: (t: Tier) => TIER_FEATURES[t].summary_modes.filter(m => m !== 'none').join(', ') || '—' },
  { key: 'delivery_channels', label: 'Delivery channels', getValue: (t: Tier) => TIER_FEATURES[t].delivery_channels.join(', ') },
  { key: 'full_text_search', label: 'Full-text archive search', icon: MagnifyingGlassIcon },
  { key: 'redundancy_filter', label: 'Redundancy filter (87% dedup)', icon: BoltIcon },
  { key: 'coverage_gaps', label: 'Coverage gap detection', icon: SparklesIcon },
  { key: 'source_graph', label: 'Source graph discovery', icon: ArrowPathIcon },
  { key: 'reading_modes', label: 'Reading modes (exec/analyst/deep)', icon: DocumentTextIcon },
  { key: 'topic_memory', label: 'Topic memory (novelty filter)', icon: ShieldCheckIcon },
  { key: 'reputation_controls', label: 'Reputation controls (indie/inst/affiliate)', icon: CpuChipIcon },
  { key: 'discovery_requests', label: 'On-demand source discovery', icon: MagnifyingGlassIcon },
  { key: 'team_workspaces', label: 'Team workspaces', icon: UsersIcon },
  { key: 'max_team_members', label: 'Max team members', getValue: (t: Tier) => TIER_FEATURES[t].max_team_members > 0 ? TIER_FEATURES[t].max_team_members : '—' },
];

const tierOrder: Tier[] = ['free', 'lite', 'max'];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Pricing by <span className="font-medium">use case</span>, not feature gates
          </h2>
          <p className="text-violet-300 text-lg max-w-2xl mx-auto mb-8">
            Choose the tier that matches how you work. Upgrade when your needs grow.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-white/5 rounded-xl border border-white/10">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-violet-400'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-violet-500' : 'bg-white/10'
              }`}
              aria-label={billingCycle === 'monthly' ? 'Switch to yearly billing' : 'Switch to monthly billing'}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-violet-400'}`}>
              Yearly
              <span className="ml-1 text-xs text-emerald-400 font-normal">(save ~17%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tierOrder.map((tier) => (
            <PricingCard key={tier} tier={tier} billingCycle={billingCycle} />
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 font-medium text-violet-300">Feature</th>
                {tierOrder.map((tier) => (
                  <th key={tier} className="text-center p-4 font-medium text-white">
                    {TIER_FEATURES[tier].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row) => (
                <tr key={row.key} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="p-4 text-violet-200 font-medium">
                    <div className="flex items-center gap-2">
                      {row.icon && <row.icon className="w-4 h-4 text-violet-500" />}
                      {row.label}
                    </div>
                  </td>
                  {tierOrder.map((tier) => (
                    <td key={tier} className="p-4 text-center">
                      {row.getValue ? (
                        <span className={TIER_FEATURES[tier][row.key as keyof typeof TIER_FEATURES[tier]] ? 'text-white' : 'text-violet-500'}>
                          {row.getValue(tier)}
                        </span>
                      ) : TIER_FEATURES[tier][row.key as keyof typeof TIER_FEATURES[tier]] ? (
                        <CheckIcon className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <XIcon className="w-5 h-5 text-violet-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, billingCycle }: { tier: Tier; billingCycle: 'monthly' | 'yearly' }) {
  const features = TIER_FEATURES[tier];
  const price = billingCycle === 'monthly' ? features.price_monthly : features.price_yearly;
  const isPopular = tier === 'lite';

  return (
    <Card variant={isPopular ? 'elevated' : 'default'} padding="lg" className={`relative ${isPopular ? 'border-violet-500/30 scale-105 z-10' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 text-white text-sm font-medium rounded-full">
          Most popular
        </div>
      )}

      <div className="mb-6">
        <span className="text-xs text-violet-400 font-medium uppercase tracking-wider">{features.tagline}</span>
        <h3 className="text-2xl font-medium text-white mt-1">{features.name}</h3>
      </div>

      <div className="mb-6">
        <span className="text-5xl font-bold text-white">${price}</span>
        <span className="text-violet-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
        {billingCycle === 'yearly' && price > 0 && (
          <p className="text-emerald-400 text-sm mt-1">Billed ${features.price_yearly}/year</p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        <li className="flex items-center gap-3 text-violet-300">
          <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{features.sources_limit === 'unlimited' ? 'Unlimited sources' : `${features.sources_limit} sources`}</span>
        </li>
        <li className="flex items-center gap-3 text-violet-300">
          <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{features.archive_days}-day archive</span>
        </li>
        <li className="flex items-center gap-3 text-violet-300">
          <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Email delivery</span>
        </li>
        {features.delivery_channels.includes('slack') && (
          <li className="flex items-center gap-3 text-violet-300">
            <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Slack delivery</span>
          </li>
        )}
        {features.redundancy_filter && (
          <li className="flex items-center gap-3 text-violet-300">
            <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Redundancy filter</span>
          </li>
        )}
        {features.coverage_gaps && (
          <li className="flex items-center gap-3 text-violet-300">
            <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Coverage gap detection</span>
          </li>
        )}
        {features.source_graph && (
          <li className="flex items-center gap-3 text-violet-300">
            <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Source graph discovery</span>
          </li>
        )}
      </ul>

      <Button 
        variant={isPopular ? 'primary' : 'secondary'} 
        size="lg" 
        fullWidth
        className={isPopular ? 'shadow-lg shadow-violet-500/25' : ''}
      >
        {price === 0 ? 'Start free' : `Get ${features.name}`}
      </Button>

      <p className="text-center text-violet-500 text-sm mt-4">No credit card required · Cancel anytime</p>
    </Card>
  );
}