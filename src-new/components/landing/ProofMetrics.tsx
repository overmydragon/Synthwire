'use client';

import { CompressIcon, ClockIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { PROOF_METRICS } from '@/lib/types';
import { Badge } from '@/components/ui';

const metricIcons = {
  compress: CompressIcon,
  clock: ClockIcon,
  'check-circle': CheckCircleIcon,
  sparkles: SparklesIcon,
};

export function ProofMetrics() {
  return (
    <section className="py-24 px-6 bg-white/3 backdrop-blur-xl border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="violet" className="mb-4">Proof, not promises</Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Metrics tied to <span className="font-medium">value delivered</span>
          </h2>
          <p className="text-violet-300 text-lg max-w-2xl mx-auto">
            Vanity stats don't tell you if the product works. These do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROOF_METRICS.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} icon={metricIcons[metric.icon as keyof typeof metricIcons]} index={index} />
          ))}
        </div>

        <div className="mt-16 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-lg font-medium text-white mb-4 text-center">How we measure these</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-violet-300">
            <div className="text-center p-4 bg-white/3 rounded-xl">
              <p className="font-medium text-violet-200 mb-1">Duplicate Reduction</p>
              <p>Cluster stories by semantic similarity across all sources. Count unique clusters vs raw items.</p>
            </div>
            <div className="text-center p-4 bg-white/3 rounded-xl">
              <p className="font-medium text-violet-200 mb-1">Median Read Time</p>
              <p>Track actual scroll depth and time-on-page per digest section. Median across active users.</p>
            </div>
            <div className="text-center p-4 bg-white/3 rounded-xl">
              <p className="font-medium text-violet-200 mb-1">30-Day Retention</p>
              <p>Sources still active (not paused/muted) after 30 days vs industry benchmark for newsletter tools.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric, icon: Icon, index }: { metric: typeof PROOF_METRICS[0]; icon: React.ComponentType<{ className?: string }>; index: number }) {
  return (
    <div className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-violet-500/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-colors">
          <Icon className="w-6 h-6 text-violet-300" />
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-2">{metric.value}</div>
        <h3 className="text-lg font-medium text-violet-200 mb-1">{metric.label}</h3>
        <p className="text-violet-400 text-sm">{metric.description}</p>
      </div>
    </div>
  );
}