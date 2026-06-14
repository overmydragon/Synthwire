'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  PauseIcon,
  InformationCircleIcon,
  ChevronRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, Input, Tabs } from '@/components/ui';
import { MOCK_RECOMMENDATIONS, MOCK_SOURCES, MOCK_EXPLANATION } from '@/lib/data/mock';
import type { SourceRecommendation, SubscriptionQueueItem, Source, ExplainRecommendationOutput } from '@/lib/types';

const mockQueueItems: SubscriptionQueueItem[] = [
  { ...MOCK_RECOMMENDATIONS[0], source_id: 'src_import_ai', status: 'active', added_at: '2026-01-15', route: 'digest', priority: 1, digest_mode: 'executive_brief' },
  { ...MOCK_RECOMMENDATIONS[1], source_id: 'src_semiconductor_daily', status: 'pending', added_at: '2026-06-10', route: 'digest', priority: 2, digest_mode: '3_sentence' },
  { ...MOCK_RECOMMENDATIONS[2], source_id: 'src_china_ai', status: 'active', added_at: '2026-03-22', route: 'digest', priority: 3, digest_mode: 'executive_brief' },
  { ...MOCK_RECOMMENDATIONS[3], source_id: 'src_crypto_policy', status: 'paused', added_at: '2026-05-01', route: 'team_queue', priority: 4, digest_mode: 'none' },
];

export default function DiscoveryQueue() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'queue'>('recommendations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [explanation, setExplanation] = useState<ExplainRecommendationOutput | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredRecommendations = MOCK_RECOMMENDATIONS.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.rationale.some(reason => reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewDetails = (sourceId: string) => {
    const source = MOCK_SOURCES.find(s => s.source_id === sourceId);
    if (source) {
      setSelectedSource(source);
      setExplanation(MOCK_EXPLANATION);
      setDrawerOpen(true);
    }
  };

  const getStatusBadge = (status: SubscriptionQueueItem['status']) => {
    switch (status) {
      case 'active': return <Badge variant="success" size="sm" dot>Active</Badge>;
      case 'pending': return <Badge variant="info" size="sm" dot>Pending</Badge>;
      case 'paused': return <Badge variant="warning" size="sm" dot>Paused</Badge>;
      case 'muted': return <Badge variant="default" size="sm" dot>Muted</Badge>;
      case 'removed': return <Badge variant="danger" size="sm" dot>Removed</Badge>;
    }
  };

  const getStatusActions = (item: SubscriptionQueueItem) => {
    switch (item.status) {
      case 'pending':
        return (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="success" onClick={() => console.log('Approve', item.source_id)}>
              <CheckIcon className="w-4 h-4" /> Approve
            </Button>
            <Button size="sm" variant="ghost" onClick={() => console.log('Reject', item.source_id)}>
              <XMarkIcon className="w-4 h-4" /> Reject
            </Button>
          </div>
        );
      case 'active':
        return (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => console.log('Pause', item.source_id)}>
              <PauseIcon className="w-4 h-4" /> Pause
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setDrawerOpen(true)}>
              <EyeIcon className="w-4 h-4" /> View
            </Button>
          </div>
        );
      case 'paused':
        return (
          <Button size="sm" variant="success" onClick={() => console.log('Resume', item.source_id)}>
            <ArrowDownTrayIcon className="w-4 h-4" /> Resume
          </Button>
        );
      default:
        return <Button size="sm" variant="ghost" onClick={() => console.log('Re-add', item.source_id)}>Re-add</Button>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-light text-white">Discovery Queue</h1>
            <p className="text-violet-300 mt-1">Review, approve, and manage your signal sources</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">
              <FunnelIcon className="w-4 h-4" /> Filters
            </Button>
            <Button variant="secondary" size="sm">
              <ArrowDownTrayIcon className="w-4 h-4" /> Export
            </Button>
          </div>
        </div>

        {/* Search & tabs */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative max-w-md w-full lg:w-auto">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recommendations..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          <Tabs defaultValue="recommendations" onChange={setActiveTab} className="w-full lg:w-auto">
            <Tabs.List>
              <Tabs.Trigger value="recommendations">
                <span className="flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4" /> Recommendations
                  <Badge variant="violet" size="sm">{filteredRecommendations.length}</Badge>
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger value="queue">
                <span className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4" /> Your Queue
                  <Badge variant="violet" size="sm">{mockQueueItems.length}</Badge>
                </span>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <TabsContent value={activeTab}>
        {/* Recommendations Tab */}
        <div className="hidden lg:block" role="tabpanel" id="recommendations-panel" aria-labelledby="recommendations-trigger">
          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              {filteredRecommendations.map((rec, index) => (
                <RecommendationCard 
                  key={rec.source_id} 
                  rec={rec} 
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Queue Tab */}
        <div className="hidden lg:block" role="tabpanel" id="queue-panel" aria-labelledby="queue-trigger">
          {activeTab === 'queue' && (
            <div className="space-y-4">
              {mockQueueItems.map((item, index) => (
                <QueueItemCard key={item.source_id} item={item} index={index} onViewDetails={handleViewDetails} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile tabs content */}
        <div className="lg:hidden">
          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              {filteredRecommendations.map((rec, index) => (
                <RecommendationCard 
                  key={rec.source_id} 
                  rec={rec} 
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
          {activeTab === 'queue' && (
            <div className="space-y-4">
              {mockQueueItems.map((item, index) => (
                <QueueItemCard key={item.source_id} item={item} index={index} onViewDetails={handleViewDetails} />
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      {/* Source Detail Drawer */}
      {drawerOpen && selectedSource && (
        <SourceDetailDrawer 
          source={selectedSource} 
          explanation={explanation} 
          onClose={() => setDrawerOpen(false)} 
        />
      )}

      {/* Mobile bottom sheet for drawer */}
      {drawerOpen && selectedSource && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setDrawerOpen(false)} />
      )}
    </div>
  );
}

function RecommendationCard({ rec, index, onViewDetails }: { 
  rec: SourceRecommendation; 
  index: number; 
  onViewDetails: (sourceId: string) => void;
}) {
  const scoreColor = rec.recommendation_score > 0.85 ? 'emerald' : rec.recommendation_score > 0.7 ? 'amber' : 'violet';

  return (
    <Card variant="elevated" padding="lg" className="animate-slide-up" style={{ animationDelay: `${index * 30}ms` }}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Rank & score */}
        <div className="flex flex-col items-center lg:items-start gap-2 lg:w-24 flex-shrink-0">
          <span className="text-3xl font-bold text-violet-500/50">{index + 1}</span>
          <Badge variant={scoreColor as any} size="lg" className="px-3 py-1">
            {Math.round(rec.recommendation_score * 100)}% match
          </Badge>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-medium text-white">{rec.title}</h3>
              <p className="text-violet-400 text-sm mt-1">{rec.frequency} • {rec.rationale[0]}</p>
            </div>
            <Badge variant="outline" size="sm">Overlap: {Math.round(rec.overlap_score * 100)}%</Badge>
          </div>

          {/* Rationale tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {rec.rationale.slice(0, 3).map((reason, i) => (
              <Badge key={i} variant="outline" size="sm" className="max-w-xs truncate">
                {reason}
              </Badge>
            ))}
            {rec.rationale.length > 3 && (
              <Badge variant="violet" size="sm">+{rec.rationale.length - 3} more</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={() => onViewDetails(rec.source_id)}>
              <InformationCircleIcon className="w-4 h-4" /> Why this source?
            </Button>
            <Button variant="success" size="sm">
              <CheckIcon className="w-4 h-4" /> Approve & Subscribe
            </Button>
            <Button variant="ghost" size="sm">
              <XMarkIcon className="w-4 h-4" /> Not relevant
            </Button>
            <Badge variant="outline" size="sm">{rec.frequency}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

function QueueItemCard({ item, index, onViewDetails }: { 
  item: SubscriptionQueueItem; 
  index: number; 
  onViewDetails: (sourceId: string) => void;
}) {
  return (
    <Card variant="default" padding="lg" className="animate-slide-up" style={{ animationDelay: `${index * 30}ms` }}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300 font-medium flex-shrink-0">
            {item.title.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-white truncate">{item.title}</h3>
            <p className="text-violet-400 text-sm">{item.frequency} • {item.rationale[0]}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {getStatusBadge(item.status)}
          <Badge variant="outline" size="sm">{item.route}</Badge>
          <Badge variant="outline" size="sm">{item.digest_mode}</Badge>
          {getStatusActions(item)}
        </div>
      </div>
    </Card>
  );
}

function SourceDetailDrawer({ source, explanation, onClose }: { 
  source: Source; 
  explanation: ExplainRecommendationOutput | null; 
  onClose: () => void;
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden flex items-end">
        <div className="w-full max-h-[90vh] bg-violet-950 rounded-t-2xl shadow-2xl overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-violet-950">
            <h2 className="text-xl font-medium text-white">{source.title}</h2>
            <button onClick={onClose} className="p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/10" aria-label="Close">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            {renderDrawerContent(source, explanation)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl h-full max-h-screen bg-violet-950 shadow-2xl overflow-y-auto animate-slide-in-right">
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-violet-950">
          <h2 className="text-xl font-medium text-white">{source.title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/10" aria-label="Close">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {renderDrawerContent(source, explanation)}
        </div>
      </div>
    </div>
  );
}

function renderDrawerContent(source: Source, explanation: ExplainRecommendationOutput | null) {
  return (
    <>
      {/* Source header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {source.title.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-medium text-white">{source.title}</h3>
          <p className="text-violet-400">{source.publisher}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="violet" size="sm">{source.frequency}</Badge>
            <Badge variant={source.paywall_status === 'free' ? 'success' : source.paywall_status === 'freemium' ? 'warning' : 'danger'} size="sm">
              {source.paywall_status}
            </Badge>
            <Badge variant="outline" size="sm">{source.author_type}</Badge>
            <Badge variant="outline" size="sm">Reputation: {Math.round(source.reputation_score * 100)}%</Badge>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-violet-300">{source.description}</p>
      </div>

      {/* Topics */}
      <div>
        <h4 className="text-sm font-medium text-violet-300 mb-2">Topics</h4>
        <div className="flex flex-wrap gap-2">
          {source.topics.map((topic) => (
            <Badge key={topic} variant="outline" size="sm">{topic}</Badge>
          ))}
        </div>
      </div>

      {/* Why this source? */}
      {explanation && (
        <div className="border-t border-white/10 pt-6">
          <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 text-violet-400" />
            Why this source?
          </h4>
          <div className="space-y-3">
            {explanation.reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 text-sm font-medium flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-violet-200">{reason}</p>
              </div>
            ))}
          </div>

          {/* Confidence meter */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-violet-300">Confidence</span>
              <span className="font-medium text-white">{Math.round(explanation.confidence * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-500" 
                style={{ width: `${explanation.confidence * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sample issues */}
      {source.sample_issues && source.sample_issues.length > 0 && (
        <div className="border-t border-white/10 pt-6">
          <h4 className="text-lg font-medium text-white mb-4">Recent issues</h4>
          <div className="space-y-3">
            {source.sample_issues.map((issue) => (
              <div key={issue.issue_id} className="p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="font-medium text-white truncate">{issue.title}</p>
                <p className="text-violet-400 text-sm mt-1 line-clamp-1">{issue.excerpt}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-violet-500">
                  <span>{issue.word_count} words</span>
                  <span>•</span>
                  <span>{issue.reading_time_minutes} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-white/10 pt-6 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" className="flex-1 sm:flex-none">
          <CheckIcon className="w-4 h-4" /> Approve & Subscribe
        </Button>
        <Button variant="secondary" size="lg" className="flex-1 sm:flex-none">
          <EyeIcon className="w-4 h-4" /> View full profile
        </Button>
        <Button variant="ghost" size="lg" className="flex-1 sm:flex-none">
          <XMarkIcon className="w-4 h-4" /> Not relevant
        </Button>
      </div>
    </>
  );
}

function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  return <div role="tabpanel">{children}</div>;
}