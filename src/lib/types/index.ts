/**
 * Synthwire Core Types
 * Matches the MCP spec from the product brief
 */

// ============================================
// USER PROFILE & PREFERENCES
// ============================================

export type ApprovalMode = 'auto_subscribe' | 'approve_first' | 'recommend_only';
export type DigestCadence = 'daily' | 'weekly' | 'custom';
export type SummaryMode = 'none' | '3_sentence' | 'executive_brief' | 'analyst_brief' | 'deep_research';
export type DeliveryChannel = 'email' | 'sms' | 'slack' | 'discord';
export type SourceType = 'newsletter' | 'rss' | 'creator_list';
export type DepthPreference = 'skim' | 'balanced' | 'deep';

export interface UserProfile {
  user_id: string;
  interests: string[];
  excluded_topics: string[];
  preferred_depth: DepthPreference;
  digest_cadence: DigestCadence;
  approval_mode: ApprovalMode;
  delivery_channels: DeliveryChannel[];
  created_at: string;
  updated_at: string;
}

export interface TopicNode {
  topic_id: string;
  label: string;
  weight: number; // 0-1, user interest strength
  freshness_preference: 'breaking' | 'daily' | 'weekly' | 'monthly';
  overlap_groups: string[]; // topic_ids that overlap
}

export interface TopicGraph {
  user_id: string;
  topics: TopicNode[];
}

// ============================================
// SOURCE CATALOG
// ============================================

export interface Source {
  source_id: string;
  title: string;
  publisher: string;
  description: string;
  topics: string[];
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  paywall_status: 'free' | 'freemium' | 'paid';
  reputation_score: number; // 0-1
  overlap_score: number; // 0-1, how much it overlaps with user's other sources
  sample_issue_refs: string[]; // issue_ids
  author_type: 'independent' | 'institutional' | 'affiliate_heavy';
  subscriber_count?: number;
  established_date?: string;
  tags: string[];
  website_url?: string;
  sample_issues?: SampleIssue[];
}

export interface SampleIssue {
  issue_id: string;
  title: string;
  published_at: string;
  excerpt: string;
  topics: string[];
  word_count: number;
  reading_time_minutes: number;
}

export interface SourceCatalog {
  sources: Source[];
  total: number;
  last_updated: string;
}

// ============================================
// SUBSCRIPTIONS & QUEUE
// ============================================

export type SubscriptionStatus = 'pending' | 'active' | 'paused' | 'muted' | 'removed';
export type SubscriptionRoute = 'digest' | 'instant' | 'team_queue';

export interface SubscriptionQueueItem {
  source_id: string;
  recommendation_score: number; // 0-1
  rationale: string[];
  topic_matches: string[];
  overlap_score: number;
  frequency: string;
  status: SubscriptionStatus;
  added_at: string;
  route: SubscriptionRoute;
  priority: number;
  digest_mode: SummaryMode;
  title: string;
  description?: string;
  publisher?: string;
  topic_tags?: string[];
}

export interface ActiveSubscription {
  source_id: string;
  subscribed_at: string;
  route: SubscriptionRoute;
  priority: number;
  digest_mode: SummaryMode;
  source: Source;
}

export interface SubscriptionQueue {
  user_id: string;
  pending: SubscriptionQueueItem[];
  active: ActiveSubscription[];
}

// ============================================
// DIGESTS
// ============================================

export interface DigestItem {
  source_id: string;
  source_title: string;
  title: string;
  summary: string;
  link_ref: string;
  published_at: string;
  topics: string[];
  reading_time_minutes: number;
  relevance_score: number;
}

export interface DigestSection {
  topic: string;
  section_title: string;
  section_summary: string;
  items: DigestItem[];
  style: 'skim' | 'deep';
}

export interface Digest {
  digest_id: string;
  user_id: string;
  created_at: string;
  cadence: DigestCadence;
  summary_mode: SummaryMode;
  channels: DeliveryChannel[];
  topic_filters: string[];
  max_items: number;
  sections: DigestSection[];
  total_items: number;
  estimated_read_time_minutes: number;
}

export interface DigestHistory {
  user_id: string;
  digests: Digest[];
}

// ============================================
// ARCHIVE & SEARCH
// ============================================

export interface ArchiveIssue {
  issue_id: string;
  source_id: string;
  source_title: string;
  title: string;
  published_at: string;
  extracted_text: string;
  summary: string;
  topic_tags: string[];
  word_count: number;
  reading_time_minutes: number;
  url: string;
}

export interface SearchResult {
  issue_id: string;
  source_id: string;
  source_title: string;
  title: string;
  published_at: string;
  excerpt: string;
  relevance_score: number;
  topic_tags: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  filters: SearchFilters;
  took_ms: number;
}

export interface SearchFilters {
  source_ids?: string[];
  date_range?: {
    start: string;
    end: string;
  };
  topic_filters?: string[];
  min_relevance?: number;
}

// ============================================
// WORKSPACE (TEAM)
// ============================================

export interface WorkspaceMember {
  user_id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  joined_at: string;
}

export interface SharedQueue {
  queue_id: string;
  name: string;
  description: string;
  source_ids: string[];
  members: string[]; // user_ids
  routing_policy: 'all' | 'curated' | 'voted';
}

export interface Workspace {
  workspace_id: string;
  name: string;
  description: string;
  members: WorkspaceMember[];
  shared_queues: SharedQueue[];
  shared_sources: string[]; // source_ids
  routing_policies: Record<string, string>;
  created_at: string;
}

// ============================================
// MCP TOOL INPUTS/OUTPUTS
// ============================================

export interface DiscoverSourcesInput {
  user_id: string;
  topics: string[];
  excluded_topics?: string[];
  source_types?: SourceType[];
  max_results?: number;
}

export interface SourceRecommendation {
  source_id: string;
  title: string;
  recommendation_score: number;
  rationale: string[];
  overlap_score: number;
  frequency: string;
  sample_issue_refs: string[];
}

export interface DiscoverSourcesOutput {
  recommendations: SourceRecommendation[];
}

export interface ExplainRecommendationInput {
  user_id: string;
  source_id: string;
}

export interface ExplainRecommendationOutput {
  source_id: string;
  reasons: string[];
  topic_matches: string[];
  similar_sources: string[];
  confidence: number;
}

export interface SubscribeSourceInput {
  user_id: string;
  source_id: string;
  mode: ApprovalMode;
  route: SubscriptionRoute;
}

export interface SubscribeSourceOutput {
  status: string;
  source_id: string;
  subscription_state: SubscriptionStatus;
}

export interface UnsubscribeSourceInput {
  user_id: string;
  source_id: string;
  action: 'pause' | 'remove' | 'mute_30_days';
}

export interface GenerateDigestInput {
  user_id: string;
  cadence: DigestCadence;
  summary_mode: SummaryMode;
  channels: DeliveryChannel[];
  topic_filters?: string[];
  max_items?: number;
}

export interface GenerateDigestOutput {
  digest_id: string;
  created_at: string;
  sections: DigestSection[];
}

export interface SearchArchiveInput {
  user_id: string;
  query: string;
  source_ids?: string[];
  date_range?: { start: string; end: string };
  topic_filters?: string[];
}

export interface SearchArchiveOutput {
  results: SearchResult[];
}

export interface RouteDigestInput {
  user_id: string;
  digest_id: string;
  channels: DeliveryChannel[];
  urgency: 'normal' | 'high';
}

export interface RouteDigestOutput {
  delivery_status: Array<{
    channel: DeliveryChannel;
    status: 'sent' | 'failed' | 'pending';
    delivered_at: string;
  }>;
}

export interface RequestSourceDiscoveryInput {
  user_id: string;
  query: string;
  desired_topic: string;
}

export interface RequestSourceDiscoveryOutput {
  request_id: string;
  status: string;
}

export interface ManageWorkspaceInput {
  workspace_id: string;
  action: 'add_member' | 'remove_member' | 'share_source' | 'set_policy';
  payload: Record<string, unknown>;
}

export interface BuildTopicProfileInput {
  raw_interests: string;
}

export interface BuildTopicProfileOutput {
  normalized_topics: string[];
  excluded_topics: string[];
  suggested_sources: string[];
}

export interface SummarizeIssueInput {
  issue_text: string;
  style: SummaryMode;
}

export interface SummarizeIssueOutput {
  summary: string;
}

export interface BuildDigestSectionInput {
  topic: string;
  issues: Array<{
    source_id: string;
    title: string;
    text: string;
    topics: string[];
  }>;
  style: 'skim' | 'deep';
}

export interface BuildDigestSectionOutput {
  section_title: string;
  section_summary: string;
  ordered_items: Array<{
    source_id: string;
    title: string;
    summary: string;
    relevance: number;
  }>;
}

export interface ExplainSignalQualityInput {
  source_metadata: Source;
  issue_history: ArchiveIssue[];
}

export interface ExplainSignalQualityOutput {
  explanation: string;
}

// ============================================
// EVENTS
// ============================================

export type EventType =
  | 'source_discovered'
  | 'source_recommended'
  | 'source_approved'
  | 'source_subscribed'
  | 'issue_ingested'
  | 'issue_summarized'
  | 'digest_generated'
  | 'digest_delivered'
  | 'archive_indexed'
  | 'workspace_shared';

export interface SynthwireEvent {
  event: EventType;
  user_id: string;
  source_id?: string;
  workspace_id?: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

// ============================================
// PRICING TIERS (repositioned)
// ============================================

export type Tier = 'free' | 'lite' | 'max';

export interface TierFeatures {
  name: string;
  tagline: string;
  price_monthly: number;
  price_yearly: number;
  sources_limit: number | 'unlimited';
  archive_days: number;
  summary_modes: SummaryMode[];
  delivery_channels: DeliveryChannel[];
  discovery_requests: boolean;
  team_workspaces: boolean;
  max_team_members: number;
  full_text_search: boolean;
  redundancy_filter: boolean;
  coverage_gaps: boolean;
  source_graph: boolean;
  reading_modes: SummaryMode[];
  topic_memory: boolean;
  reputation_controls: boolean;
}

export const TIER_FEATURES: Record<Tier, TierFeatures> = {
  free: {
    name: 'Free',
    tagline: 'Test your first signal feed',
    price_monthly: 0,
    price_yearly: 0,
    sources_limit: 5,
    archive_days: 7,
    summary_modes: ['none'],
    delivery_channels: ['email'],
    discovery_requests: false,
    team_workspaces: false,
    max_team_members: 0,
    full_text_search: false,
    redundancy_filter: false,
    coverage_gaps: false,
    source_graph: false,
    reading_modes: ['none'],
    topic_memory: false,
    reputation_controls: false,
  },
  lite: {
    name: 'Lite',
    tagline: 'Personal brief',
    price_monthly: 3,
    price_yearly: 30,
    sources_limit: 'unlimited',
    archive_days: 90,
    summary_modes: ['none', '3_sentence', 'executive_brief'],
    delivery_channels: ['email', 'slack'],
    discovery_requests: false,
    team_workspaces: false,
    max_team_members: 0,
    full_text_search: false,
    redundancy_filter: true,
    coverage_gaps: true,
    source_graph: true,
    reading_modes: ['none', '3_sentence', 'executive_brief'],
    topic_memory: true,
    reputation_controls: true,
  },
  max: {
    name: 'Max',
    tagline: 'Full research desk',
    price_monthly: 7,
    price_yearly: 70,
    sources_limit: 'unlimited',
    archive_days: 365,
    summary_modes: ['none', '3_sentence', 'executive_brief', 'analyst_brief', 'deep_research'],
    delivery_channels: ['email', 'slack', 'discord', 'sms'],
    discovery_requests: true,
    team_workspaces: true,
    max_team_members: 10,
    full_text_search: true,
    redundancy_filter: true,
    coverage_gaps: true,
    source_graph: true,
    reading_modes: ['none', '3_sentence', 'executive_brief', 'analyst_brief', 'deep_research'],
    topic_memory: true,
    reputation_controls: true,
  },
};

// ============================================
// PROOF METRICS (for landing page)
// ============================================

export interface ProofMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export const PROOF_METRICS: ProofMetric[] = [
  {
    label: 'Duplicate Reduction',
    value: '87%',
    description: 'Stories collapsed across sources',
    icon: 'compress',
  },
  {
    label: 'Median Read Time',
    value: '4.2 min',
    description: 'Per daily digest',
    icon: 'clock',
  },
  {
    label: 'Sources Kept at 30 Days',
    value: '73%',
    description: 'Retention vs 31% industry avg',
    icon: 'check-circle',
  },
  {
    label: 'New Ideas per Digest',
    value: '3.4x',
    description: 'vs manual curation',
    icon: 'sparkles',
  },
];

// ============================================
// UI STATE
// ============================================

export interface SourceDetailDrawerState {
  isOpen: boolean;
  source: Source | null;
  explanation: ExplainRecommendationOutput | null;
}

export interface ApprovalModeConfig {
  mode: ApprovalMode;
  label: string;
  description: string;
  icon: string;
}

export const APPROVAL_MODES: ApprovalModeConfig[] = [
  {
    mode: 'auto_subscribe',
    label: 'Auto-subscribe',
    description: 'Synthwire adds high-confidence sources automatically',
    icon: 'zap',
  },
  {
    mode: 'approve_first',
    label: 'Approve first (recommended)',
    description: 'You review each recommendation before it\'s added',
    icon: 'check-circle',
  },
  {
    mode: 'recommend_only',
    label: 'Recommend only',
    description: 'See suggestions but manually subscribe yourself',
    icon: 'eye',
  },
];