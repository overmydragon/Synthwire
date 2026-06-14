'use client';

import { 
  MagnifyingGlassIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  UsersIcon, 
  SparklesIcon, 
  ArrowPathIcon,
  EyeIcon,
  CpuChipIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BellIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui';
import { APPROVAL_MODES } from '@/lib/types';

const trustFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'Approval Modes',
    description: 'Three modes: auto-subscribe for high-confidence matches, approve-first (default), or recommend-only. Change per-source or globally.',
    details: ['Auto-subscribe: >90% confidence', 'Approve-first: Review each recommendation', 'Recommend-only: Manual curation'],
  },
  {
    icon: EyeIcon,
    title: '"Why This Source?" Panel',
    description: 'Every recommendation shows matched topics, source reputation, cadence, overlap score, and community save rate. Full transparency.',
    details: ['Topic match scores', 'Reputation & authority signals', 'Overlap with current subscriptions', 'Community validation metrics'],
  },
  {
    icon: ShieldExclamationIcon,
    title: 'Governance Controls',
    description: 'Never subscribe without approval. Digest-only mode (no live subscriptions). Pause all sources. One-click unsubscribe.',
    details: ['Global approval toggle', 'Digest-only mode', 'Pause all sources', '30-day mute', 'Instant remove'],
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Source Graph',
    description: '"People who read Stratechery and Import AI also kept these 6 niche sources." Collaborative filtering for discovery.',
    details: ['Reader overlap clusters', 'Cross-interest bridges', 'Niche discovery paths', 'Authority propagation'],
  },
  {
    icon: BoltIcon,
    title: 'Redundancy Filter',
    description: 'Ten newsletters covering the same story → one cluster with the best summary. Saves 87% duplicate reading time.',
    details: ['Semantic story clustering', 'Best-source selection', 'Cross-source synthesis', 'Original link preserved'],
  },
  {
    icon: ChartBarIcon,
    title: 'Coverage Gaps',
    description: '"You follow AI policy but miss 3 high-signal semiconductor sources." We detect and surface blind spots in your feed.',
    details: ['Topic adjacency analysis', 'Source catalog gaps', 'Blind spot alerts', 'One-click gap filling'],
  },
  {
    icon: SparklesIcon,
    title: 'Reading Modes',
    description: 'Executive brief (3-min), analyst brief (8-min), deep-research (20-min). Match depth to your available time.',
    details: ['Executive: 3-sentence summaries', 'Analyst: Structured briefs', 'Deep: Full context + citations', 'Per-topic mode selection'],
  },
  {
    icon: ArrowPathIcon,
    title: 'Topic Memory',
    description: '"Show me only new ideas, not repeated takes." Filter out rehashed narratives. Track idea evolution over time.',
    details: ['Novelty detection', 'Narrative deduplication', 'Idea lineage tracking', 'Staleness scoring'],
  },
  {
    icon: CpuChipIcon,
    title: 'Reputation Controls',
    description: 'Independent writers only. Institutional sources only. Exclude affiliate-heavy content. Filter by source authority type.',
    details: ['Author type filters', 'Affiliate detection', 'Institutional vs independent', 'Paywall awareness'],
  },
];

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Features that create <span className="font-medium">lock-in & differentiation</span>
          </h2>
          <p className="text-violet-300 text-lg max-w-2xl mx-auto">
            Not auto-discovery, summaries, and archive — every product has those. These are the features that make Synthwire irreplaceable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Trust layer callout */}
        <div className="mt-16 p-8 bg-gradient-to-r from-violet-500/10 to-violet-600/10 border border-violet-500/20 rounded-2xl">
          <div className="flex items-start gap-4">
            <ShieldCheckIcon className="w-8 h-8 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xl font-medium text-white mb-2">The trust layer you've been missing</h3>
              <p className="text-violet-300 mb-4">
                Most discovery tools are black boxes. Synthwire shows you exactly why each source was recommended, 
                lets you approve or reject before anything enters your feed, and gives you granular controls over 
                what gets subscribed, how often, and through which channel.
              </p>
              <div className="flex flex-wrap gap-2">
                {APPROVAL_MODES.map((mode) => (
                  <span key={mode.mode} className="px-3 py-1 bg-white/5 rounded-full text-sm text-violet-300 border border-white/10">
                    {mode.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof trustFeatures[0]; index: number }) {
  return (
    <Card variant="elevated" padding="lg" className="group animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-colors">
        <feature.icon className="w-6 h-6 text-violet-300" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
      <p className="text-violet-300 mb-4">{feature.description}</p>
      <ul className="space-y-2 text-sm text-violet-400">
        {feature.details.map((detail, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
            {detail}
          </li>
        ))}
      </ul>
    </Card>
  );
}