'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  SparklesIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, Input, Tabs } from '@/components/ui';
import { MOCK_DIGEST } from '@/lib/data/mock';
import type { Digest, DigestSection, DigestItem } from '@/lib/types';

const SUMMARY_MODES = [
  { value: 'none', label: 'No summary', description: 'Full items only', icon: DocumentTextIcon },
  { value: '3_sentence', label: '3-sentence', description: 'Quick skim (~3 min)', icon: SparklesIcon },
  { value: 'executive_brief', label: 'Executive brief', description: 'Structured overview (~6 min)', icon: BoltIcon },
  { value: 'analyst_brief', label: 'Analyst brief', description: 'Deep analysis (~12 min)', icon: Squares2X2Icon },
  { value: 'deep_research', label: 'Deep research', description: 'Full context + citations (~20 min)', icon: MagnifyingGlassIcon },
];

const CADENCE_OPTIONS = ['daily', 'weekly', 'custom'];
const CHANNEL_OPTIONS = ['email', 'slack', 'discord', 'sms'];

export default function DigestBuilder() {
  const [digest, setDigest] = useState<Digest>(MOCK_DIGEST);
  const [selectedMode, setSelectedMode] = useState<'executive_brief' | 'analyst_brief' | 'deep_research'>('executive_brief');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const toggleSection = (topic: string) => {
    setExpandedSections(prev => ({ ...prev, [topic]: !prev[topic] }));
  };

  const generateDigest = () => {
    // Simulate generation
    console.log('Generating digest with mode:', selectedMode);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">Digest Builder</h1>
            <p className="text-violet-300 mt-1 text-sm sm:text-base">Configure and preview your personalized brief</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
            <Button variant="secondary" size="sm">
              <ArrowDownTrayIcon className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="secondary" size="sm">
              <ShareIcon className="w-4 h-4" /> <span className="hidden sm:inline">Share</span>
            </Button>
            <Button size="md" onClick={generateDigest} className="group w-full sm:w-auto">
              <SparklesIcon className="w-5 h-5 mr-2" /> Generate Digest
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Configuration bar */}
        <Card variant="glass" padding="md" className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0 sm:min-w-[260px]">
            <label className="text-sm font-medium text-violet-300 whitespace-nowrap">Cadence</label>
            <select
              value={digest.cadence}
              onChange={(e) => setDigest(prev => ({ ...prev, cadence: e.target.value as any }))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 min-w-0 flex-1 sm:flex-none"
            >
              {CADENCE_OPTIONS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>

            <label className="text-sm font-medium text-violet-300 whitespace-nowrap sm:ml-2">Summary</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 min-w-0 flex-1 sm:flex-none"
            >
              {SUMMARY_MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {CHANNEL_OPTIONS.map(channel => (
              <Badge
                key={channel}
                variant={digest.channels.includes(channel as any) ? 'violet' : 'outline'}
                size="sm"
                className="cursor-pointer"
                onClick={() => setDigest(prev => ({
                  ...prev,
                  channels: prev.channels.includes(channel as any)
                    ? prev.channels.filter(c => c !== channel)
                    : [...prev.channels, channel as any]
                }))}
              >
                {channel.charAt(0).toUpperCase() + channel.slice(1)}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary mode selector (visual) */}
      <div className="mb-6">
        <p className="text-sm font-medium text-violet-300 mb-3">Reading mode</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {SUMMARY_MODES.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.value}
                onClick={() => setSelectedMode(mode.value as any)}
                className={`flex flex-col h-full p-4 sm:p-5 rounded-xl border transition-all text-left ${
                  selectedMode === mode.value
                    ? 'border-violet-500 bg-violet-500/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${selectedMode === mode.value ? 'text-violet-400' : 'text-violet-500'}`} />
                <p className="font-medium text-white text-sm sm:text-base">{mode.label}</p>
                <p className="text-violet-400 text-xs sm:text-sm mt-1 line-clamp-2">{mode.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Digest Preview */}
      <div className="space-y-6">
        {digest.sections.map((section) => (
          <DigestSectionCard 
            key={section.topic} 
            section={section} 
            mode={selectedMode}
            isExpanded={expandedSections[section.topic] || false}
            onToggle={() => toggleSection(section.topic)}
          />
        ))}
      </div>

      {/* Empty state */}
      {digest.sections.length === 0 && (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <MagnifyingGlassIcon className="w-16 h-16 text-violet-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No items yet</h3>
          <p className="text-violet-400 mb-6">Approve some sources in the Discovery Queue to start building your digest.</p>
          <a href="/app/discovery" className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 bg-violet-600 text-white hover:bg-violet-500 focus:ring-violet-500 shadow-lg shadow-violet-500/25 px-5 py-2.5 text-base gap-2">
            Browse Recommendations
          </a>
        </Card>
      )}
    </div>
  );
}

function DigestSectionCard({ section, mode, isExpanded, onToggle }: { 
  section: DigestSection; 
  mode: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-medium text-white">{section.section_title}</h3>
            <Badge variant="violet" size="sm">{section.style}</Badge>
            <Badge variant="outline" size="sm">{section.items.length} items</Badge>
            <Badge variant="outline" size="sm">{section.items.reduce((acc, item) => acc + item.reading_time_minutes, 0)} min</Badge>
          </div>
          <p className="text-violet-300">{section.section_summary}</p>
        </div>
        <button
          onClick={onToggle}
          className="p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 animate-slide-down">
          {section.items.map((item, index) => (
            <DigestItemCard key={item.link_ref} item={item} index={index} mode={mode} />
          ))}
        </div>
      )}

      {!isExpanded && section.items.length > 0 && (
        <div className="flex items-center gap-2 text-violet-500 text-sm">
          <EyeIcon className="w-4 h-4" />
          <span>Click to expand {section.items.length} items</span>
        </div>
      )}
    </Card>
  );
}

function DigestItemCard({ item, mode }: { item: DigestItem; mode: string }) {
  const showSummary = mode !== 'none';

  return (
    <Card variant="outlined" padding="md" className="hover:border-violet-500/30 transition-colors">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-violet-300">{item.source_title}</span>
            <Badge variant="outline" size="sm">{item.reading_time_minutes} min</Badge>
            <Badge variant="violet" size="sm">{Math.round(item.relevance_score * 100)}% match</Badge>
          </div>
          <h4 className="font-medium text-white mb-2 truncate">{item.title}</h4>
          {showSummary && (
            <p className="text-violet-300 text-sm line-clamp-3">{item.summary}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {item.topics.map((topic) => (
              <Badge key={topic} variant="outline" size="sm" className="text-xs">{topic}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 lg:flex-none">
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <EyeIcon className="w-4 h-4" /> Read
          </Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <ArrowDownTrayIcon className="w-4 h-4" /> Save
          </Button>
        </div>
      </div>
    </Card>
  );
}