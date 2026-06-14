'use client';

import { Button } from '@/components/ui';
import { ArrowRightIcon, SparklesIcon, ShieldCheckIcon, BoltIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const featureHighlights = [
  {
    icon: SparklesIcon,
    title: 'Source Graph',
    description: 'Discover niche sources through reader overlap — "People who read Stratechery also kept these 6 newsletters."',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Approval Modes',
    description: 'Auto-subscribe, approve-first, or recommend-only. You control what enters your feed.',
  },
  {
    icon: BoltIcon,
    title: 'Redundancy Filter',
    description: 'Collapse 10 newsletters repeating the same story into one cluster. Read once, not ten times.',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Coverage Gaps',
    description: '"You follow AI policy but miss 3 high-signal semiconductor sources." We detect blind spots.',
  },
  {
    icon: UsersIcon,
    title: 'Reading Modes',
    description: 'Executive brief, analyst brief, deep-research mode. Match depth to your available time.',
  },
  {
    icon: ArrowRightIcon,
    title: 'Topic Memory',
    description: '"Show me only new ideas, not repeated takes." Filter out rehashed narratives automatically.',
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%237c3aed%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          <span className="text-sm font-medium text-violet-300">Now in private beta — Join the research desk waitlist</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[1.05] mb-6 animate-slide-up delay-100">
          Build a high-signal brief{' '}
          <span className="font-medium">on any topic</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-violet-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up delay-200">
          Continuous discovery. Human-readable controls. Source transparency. 
          <span className="font-medium text-white">Not another newsletter aggregator.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up delay-300">
          <Button size="xl" className="group w-full sm:w-auto">
            <span className="flex items-center gap-2">
              Start your signal feed
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          <Button variant="secondary" size="xl" className="w-full sm:w-auto">
            See how it works
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-violet-500 text-sm animate-fade-in delay-400">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>Private relay email — your inbox stays yours</span>
          </div>
          <div className="flex items-center gap-2">
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Full source attribution on every item</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            <span>Approve, pause, or mute any source anytime</span>
          </div>
        </div>

        {/* Sample digest preview hint */}
        <div className="mt-16 relative animate-slide-up delay-500">
          <p className="text-violet-500 text-sm mb-4">Your first digest would look like this:</p>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-900/50 to-transparent z-10 pointer-events-none h-20 bottom-0 top-auto" />
            <SampleDigestPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function SampleDigestPreview() {
  const sections = [
    { topic: '🤖 AI Models', count: 3, time: '4 min' },
    { topic: '🏭 Semiconductors', count: 2, time: '3 min' },
    { topic: '⚖️ Crypto Policy', count: 1, time: '2 min' },
    { topic: '🎮 Gaming Industry', count: 1, time: '2 min' },
  ];

  return (
    <div className="bg-white/3 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 text-left shadow-2xl shadow-violet-900/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-white">Daily Brief — June 13, 2026</p>
            <p className="text-violet-400 text-sm">Executive brief mode • 11 items • 6 min read</p>
          </div>
        </div>
        <Badge variant="violet" size="sm">Executive Brief</Badge>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.topic} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-lg">{section.topic}</span>
              <Badge variant="outline" size="sm">{section.count} items</Badge>
            </div>
            <span className="text-violet-500 text-sm">{section.time}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-violet-500 text-sm">Delivered to: Email • Slack</span>
        <Button variant="ghost" size="sm">View full digest →</Button>
      </div>
    </div>
  );
}