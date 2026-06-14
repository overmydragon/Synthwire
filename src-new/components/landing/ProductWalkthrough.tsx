'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  DocumentTextIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Card, Button } from '@/components/ui';
import { MOCK_RECOMMENDATIONS, MOCK_DIGEST, MOCK_SEARCH_RESULTS, MOCK_EXPLANATION } from '@/lib/data/mock';
import { Badge } from '@/components/ui';

const walkthroughSteps = [
  {
    number: '01',
    title: 'Interest Input',
    description: 'Describe what you care about in natural language. We normalize to a weighted topic graph with freshness preferences.',
    icon: MagnifyingGlassIcon,
    preview: (
      <div className="space-y-3">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
          <input 
            type="text" 
            defaultValue="AI models, chip manufacturing, crypto policy, tactical gaming industry" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-violet-500"
            readOnly
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['AI models', 'chip manufacturing', 'crypto policy', 'gaming industry'].map((topic) => (
            <Badge key={topic} variant="violet" size="sm" dot>{topic}</Badge>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Ranked Source Suggestions',
    description: 'Synthwire ranks 10,000+ sources against your topic profile. Each shows score, rationale, overlap, and sample issues.',
    icon: SparklesIcon,
    preview: (
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {MOCK_RECOMMENDATIONS.slice(0, 4).map((rec, i) => (
          <div key={rec.source_id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-2xl font-bold text-violet-500/50">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">{rec.title}</h4>
                <Badge variant="violet" size="sm">{Math.round(rec.recommendation_score * 100)}%</Badge>
              </div>
              <p className="text-violet-400 text-sm mt-1 line-clamp-1">{rec.rationale[0]}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge variant="outline" size="sm">{rec.frequency}</Badge>
                <Badge variant="outline" size="sm">Overlap: {Math.round(rec.overlap_score * 100)}%</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="flex-shrink-0">Approve</Button>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '03',
    title: 'Approval State',
    description: 'Each source shows its state: pending approval, active, paused, or muted. One-click actions. Full audit trail.',
    icon: CheckCircleIcon,
    preview: (
      <div className="space-y-2">
        {[
          { name: 'Import AI', state: 'active', mode: 'approve_first' },
          { name: 'Semiconductor Daily', state: 'pending', mode: 'approve_first' },
          { name: 'ChinAI Newsletter', state: 'active', mode: 'approve_first' },
          { name: 'Crypto Policy Review', state: 'paused', mode: 'recommend_only' },
          { name: 'The Batch', state: 'muted', mode: 'auto_subscribe' },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300 text-sm font-medium">
                {item.name.charAt(0)}
              </span>
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-violet-500 text-xs capitalize">{item.mode.replace('_', ' ')}</p>
              </div>
            </div>
            <Badge 
              variant={item.state === 'active' ? 'success' : item.state === 'pending' ? 'info' : item.state === 'paused' ? 'warning' : 'danger'} 
              size="sm" 
              dot
            >
              {item.state}
            </Badge>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '04',
    title: 'Sample Digest',
    description: 'Your unified brief — organized by topic, summarized at your chosen depth, with source attribution and relevance scores.',
    icon: DocumentTextIcon,
    preview: (
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {MOCK_DIGEST.sections.map((section) => (
          <div key={section.topic} className="p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">{section.section_title}</h4>
              <Badge variant="violet" size="sm">{section.style}</Badge>
            </div>
            <p className="text-violet-300 text-sm mb-2 line-clamp-2">{section.section_summary}</p>
            <div className="flex items-center gap-2 text-xs text-violet-500">
              <span>{section.items.length} items</span>
              <span>•</span>
              <span>{section.items.reduce((acc, item) => acc + item.reading_time_minutes, 0)} min read</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '05',
    title: 'Archive Search',
    description: 'Full-text search across all indexed issues. Filter by source, date, topic. Relevance-ranked results with excerpts.',
    icon: MagnifyingGlassIcon,
    preview: (
      <div className="space-y-3">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
          <input 
            type="text" 
            defaultValue="GPT-5 timeline speculation" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-violet-500"
            readOnly
          />
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {MOCK_SEARCH_RESULTS.map((result) => (
            <div key={result.issue_id} className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{result.title}</p>
                  <p className="text-violet-400 text-sm mt-1 line-clamp-1">{result.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" size="sm">{result.source_title}</Badge>
                    <Badge variant="violet" size="sm">{Math.round(result.relevance_score * 100)}% match</Badge>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-violet-500 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function ProductWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-6 bg-white/3 backdrop-blur-xl border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            How it works: <span className="font-medium">5 steps to your signal feed</span>
          </h2>
          <p className="text-violet-300 text-lg max-w-2xl mx-auto">
            Not a feature grid — a product walkthrough. Each step shows the actual interface.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Step navigator */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              {walkthroughSteps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-4 ${
                    activeStep === index
                      ? 'bg-violet-500/20 border border-violet-500/30'
                      : 'border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-medium text-lg flex-shrink-0 ${
                    activeStep === index ? 'bg-violet-500 text-white' : 'bg-white/5 text-violet-400'
                  }`}>
                    {step.number}
                  </span>
                  <div>
                    <p className={`font-medium ${activeStep === index ? 'text-white' : 'text-violet-300'}`}>{step.title}</p>
                    <p className="text-violet-500 text-sm">{step.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile step selector */}
          <div className="lg:hidden mb-8">
            <select
              value={activeStep}
              onChange={(e) => setActiveStep(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              {walkthroughSteps.map((step, index) => (
                <option key={step.number} value={index}>{step.number}. {step.title}</option>
              ))}
            </select>
          </div>

          {/* Step content */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <walkthroughSteps[activeStep].icon className="w-8 h-8 text-violet-400" />
              <div>
                <h3 className="text-2xl font-medium text-white">{walkthroughSteps[activeStep].title}</h3>
                <p className="text-violet-300">{walkthroughSteps[activeStep].description}</p>
              </div>
            </div>

            <Card variant="glass" padding="lg" className="min-h-[400px]">
              {walkthroughSteps[activeStep].preview}
            </Card>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {walkthroughSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeStep ? 'bg-violet-500 w-6' : 'bg-white/20 hover:bg-white/30'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}