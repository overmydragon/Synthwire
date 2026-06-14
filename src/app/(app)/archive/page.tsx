'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon,
  ChevronRightIcon,
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, Input, Tabs } from '@/components/ui';
import { MOCK_SEARCH_RESULTS, MOCK_SOURCES } from '@/lib/data/mock';
import type { SearchResult, SearchFilters } from '@/lib/types';

const mockAllResults: SearchResult[] = [
  ...MOCK_SEARCH_RESULTS,
  ...Array.from({ length: 12 }, (_, i) => ({
    issue_id: `arch_${i + 10}`,
    source_id: MOCK_SOURCES[i % MOCK_SOURCES.length].source_id,
    source_title: MOCK_SOURCES[i % MOCK_SOURCES.length].title,
    title: `Search result ${i + 1} for GPT-5 timeline`,
    published_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt: `This is a sample excerpt for search result ${i + 1}. It contains relevant information about the query...`,
    relevance_score: 0.9 - Math.random() * 0.3,
    topic_tags: ['AI models', 'GPT-5'],
  })),
];

export default function ArchiveSearch() {
  const [query, setQuery] = useState('GPT-5 timeline');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<SearchResult[]>(mockAllResults);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [topicFilters, setTopicFilters] = useState<string[]>([]);
  const [minRelevance, setMinRelevance] = useState(0);

  const handleSearch = () => {
    // In real app, this would call the API
    console.log('Searching:', query, filters);
  };

  const clearFilters = () => {
    setFilters({});
    setSelectedSourceFilter([]);
    setDateRange({ start: '', end: '' });
    setTopicFilters([]);
    setMinRelevance(0);
    setResults(mockAllResults);
  };

  const activeFilterCount = 
    selectedSourceFilter.length + 
    (dateRange.start ? 1 : 0) + 
    (dateRange.end ? 1 : 0) + 
    topicFilters.length + 
    (minRelevance > 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">Archive Search</h1>
            <p className="text-violet-300 mt-1 text-sm sm:text-base">Full-text search across all indexed issues</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
            <Button variant="secondary" size="sm" onClick={clearFilters} disabled={activeFilterCount === 0} className="hidden sm:inline-flex">
              <XMarkIcon className="w-4 h-4" /> Clear filters
            </Button>
            <Button variant="secondary" size="sm">
              <ArrowDownTrayIcon className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-violet-400 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search issues, topics, authors..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-lg text-white placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="secondary" size="md" onClick={() => setShowFilters(!showFilters)} className="gap-2 flex-1 sm:flex-none">
              <FunnelIcon className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && <Badge variant="violet" size="sm">{activeFilterCount}</Badge>}
            </Button>
            <Button size="md" onClick={handleSearch} className="gap-2 flex-1 sm:flex-none">
              <MagnifyingGlassIcon className="w-5 h-5" /> Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <Card variant="glass" padding="md" className="mb-6 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Source filter */}
            <div>
              <label className="block text-sm font-medium text-violet-300 mb-2">Sources</label>
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 pointer-events-none" />
                <select
                  multiple
                  value={selectedSourceFilter}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
                    setSelectedSourceFilter(selected);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 h-32"
                >
                  {MOCK_SOURCES.map(source => (
                    <option key={source.source_id} value={source.source_id}>{source.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date range — stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-violet-300 mb-2">From</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 pointer-events-none" />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-violet-300 mb-2">To</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 pointer-events-none" />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Topic filter */}
            <div>
              <label className="block text-sm font-medium text-violet-300 mb-2">Topics</label>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 pointer-events-none" />
                <select
                  multiple
                  value={topicFilters}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
                    setTopicFilters(selected);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 h-32"
                >
                  <option value="AI models">AI models</option>
                  <option value="chip manufacturing">chip manufacturing</option>
                  <option value="crypto policy">crypto policy</option>
                  <option value="gaming industry">gaming industry</option>
                  <option value="AI safety">AI safety</option>
                  <option value="compute infrastructure">compute infrastructure</option>
                </select>
              </div>
            </div>

            {/* Min relevance */}
            <div>
              <label className="block text-sm font-medium text-violet-300 mb-2">Min relevance</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minRelevance}
                  onChange={(e) => setMinRelevance(Number(e.target.value))}
                  className="flex-1 accent-violet-500"
                />
                <span className="text-white font-mono w-12 text-sm">{minRelevance}%</span>
              </div>
            </div>
          </div>
          {/* Footer: full-width clear button */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
            <Button
              variant="secondary"
              size="sm"
              onClick={clearFilters}
              disabled={activeFilterCount === 0}
              className="w-full sm:w-auto justify-center"
            >
              <XMarkIcon className="w-4 h-4" /> Clear filters
            </Button>
          </div>
        </Card>
      )}

      {/* Results */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Results list */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <p className="text-violet-300 text-sm sm:text-base">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <select
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 self-start sm:self-auto"
            >
              <option value="relevance">Sort by relevance</option>
              <option value="date">Sort by date</option>
              <option value="source">Sort by source</option>
            </select>
          </div>

          {results.length === 0 ? (
            <Card variant="outlined" padding="md" className="text-center py-12 sm:py-16">
              <MagnifyingGlassIcon className="w-12 h-12 sm:w-16 sm:h-16 text-violet-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-white mb-2">No results found</h3>
              <p className="text-violet-400 text-sm sm:text-base">Try adjusting your search query or filters.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <SearchResultCard key={result.issue_id} result={result} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Search suggestions */}
        <div className="hidden lg:block w-72">
          <Card variant="glass" padding="lg">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-violet-400" />
              Search tips
            </h3>
            <ul className="space-y-3 text-sm text-violet-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 flex-shrink-0" />
                Use quotes for exact phrases: "GPT-5"
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 flex-shrink-0" />
                Filter by source: source:import-ai
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 flex-shrink-0" />
                Date ranges: after:2026-01-01 before:2026-06-01
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 flex-shrink-0" />
                Topic tags: topic:"AI models"
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 flex-shrink-0" />
                Combine: GPT-5 source:import-ai topic:"AI models"
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-medium text-white mb-3">Recent searches</h4>
              <ul className="space-y-2">
                {['GPT-5 timeline', 'TSMC 2nm yield', 'stablecoin regulation', 'Unity runtime fee'].map((search) => (
                  <button
                    key={search}
                    className="w-full text-left p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
                  >
                    {search}
                  </button>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="default" padding="md" className="hover:border-violet-500/30 transition-colors">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="max-w-[10rem] truncate">{result.source_title}</Badge>
            <Badge variant="violet" size="sm">{Math.round(result.relevance_score * 100)}% match</Badge>
            <span className="text-violet-500 text-xs sm:text-sm">
              {new Date(result.published_at).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-white mb-2 break-words">{result.title}</h3>
          <p className="text-violet-300 text-sm mb-3 line-clamp-2 break-words">{result.excerpt}</p>
          <div className="flex flex-wrap gap-1">
            {result.topic_tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center sm:flex-none flex-shrink-0 divide-x divide-white/5 rounded-xl border border-white/10 bg-white/5">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="rounded-none border-0" aria-label={expanded ? 'Collapse' : 'Expand'}>
            {expanded ? <ChevronRightIcon className="w-4 h-4 rotate-90" /> : <ChevronRightIcon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="rounded-none border-0" aria-label="Open issue">
            <DocumentTextIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-none border-0" aria-label="Save">
            <ClockIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-slide-down">
          <p className="text-violet-300 text-sm">
            This is the expanded view with more context from the issue. In the real app, this would show
            the full excerpt, highlighted search terms, and links to the original source.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" size="sm">View full issue</Button>
            <Button variant="ghost" size="sm">Save to collection</Button>
          </div>
        </div>
      )}
    </Card>
  );
}