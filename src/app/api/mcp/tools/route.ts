import { NextRequest, NextResponse } from 'next/server';
import { MOCK_SOURCES, MOCK_RECOMMENDATIONS, MOCK_USER_PROFILE, MOCK_DIGEST, MOCK_SEARCH_RESULTS, MOCK_WORKSPACE, MOCK_EXPLANATION, MOCK_TOPIC_GRAPH } from '@/lib/data/mock';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool, input } = body;

    switch (tool) {
      case 'build_topic_profile': {
        const { raw_interests } = input;
        const topics = raw_interests.split(',').map((t: string) => t.trim());
        
        return NextResponse.json({
          normalized_topics: topics,
          excluded_topics: ['celebrity gossip', 'sports', 'fashion'],
          suggested_sources: MOCK_SOURCES
            .filter(s => topics.some((t: string) => s.topics.some(st => st.toLowerCase().includes(t.toLowerCase()))))
            .map(s => s.source_id),
        });
      }

      case 'discover_sources': {
        const { topics, excluded_topics = [], max_results = 20 } = input;
        
        let recommendations = MOCK_RECOMMENDATIONS.map(r => ({
          ...r,
          recommendation_score: r.recommendation_score * (0.8 + Math.random() * 0.2),
        }));
        
        if (topics.length > 0) {
          recommendations = recommendations.filter(r => 
            r.rationale.some(reason => 
              topics.some((t: string) => reason.toLowerCase().includes(t.toLowerCase()))
            )
          );
        }
        
        if (excluded_topics.length > 0) {
          recommendations = recommendations.filter(r =>
            !r.rationale.some(reason =>
              excluded_topics.some((t: string) => reason.toLowerCase().includes(t.toLowerCase()))
            )
          );
        }
        
        recommendations.sort((a, b) => b.recommendation_score - a.recommendation_score);
        
        return NextResponse.json({
          recommendations: recommendations.slice(0, max_results),
        });
      }

      case 'explain_recommendation': {
        const { source_id } = input;
        const source = MOCK_SOURCES.find(s => s.source_id === source_id);
        
        if (!source) {
          return NextResponse.json({ error: 'Source not found' }, { status: 404 });
        }
        
        return NextResponse.json(MOCK_EXPLANATION);
      }

      case 'subscribe_source': {
        const { source_id, mode, route } = input;
        const source = MOCK_SOURCES.find(s => s.source_id === source_id);
        
        if (!source) {
          return NextResponse.json({ error: 'Source not found' }, { status: 404 });
        }
        
        return NextResponse.json({
          status: 'success',
          source_id,
          subscription_state: mode === 'auto_subscribe' ? 'active' : 'pending',
        });
      }

      case 'unsubscribe_source': {
        const { source_id, action } = input;
        
        return NextResponse.json({
          status: 'success',
          action,
        });
      }

      case 'generate_digest': {
        const { cadence, summary_mode, topic_filters, max_items = 12 } = input;
        
        const digest = {
          ...MOCK_DIGEST,
          digest_id: `dig_${Date.now()}`,
          created_at: new Date().toISOString(),
          cadence,
          summary_mode,
          topic_filters: topic_filters || [],
          max_items,
        };
        
        return NextResponse.json(digest);
      }

      case 'search_archive': {
        const { query, source_ids, date_range, topic_filters } = input;
        
        let results = MOCK_SEARCH_RESULTS.map(r => ({
          ...r,
          relevance_score: r.relevance_score * (0.7 + Math.random() * 0.3),
        }));
        
        if (query) {
          results = results.filter(r => 
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.excerpt.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        if (source_ids?.length) {
          results = results.filter(r => source_ids.includes(r.source_id));
        }
        
        if (topic_filters?.length) {
          results = results.filter(r => 
            topic_filters.some((t: string) => r.topic_tags.includes(t))
          );
        }
        
        if (date_range) {
          results = results.filter(r => 
            new Date(r.published_at) >= new Date(date_range.start) &&
            new Date(r.published_at) <= new Date(date_range.end)
          );
        }
        
        results.sort((a, b) => b.relevance_score - a.relevance_score);
        
        return NextResponse.json({
          results,
        });
      }

      case 'route_digest': {
        const { digest_id, channels, urgency } = input;
        
        return NextResponse.json({
          delivery_status: channels.map((channel: string) => ({
            channel,
            status: 'sent' as const,
            delivered_at: new Date().toISOString(),
          })),
        });
      }

      case 'request_source_discovery': {
        const { query, desired_topic } = input;
        
        return NextResponse.json({
          request_id: `req_${Date.now()}`,
          status: 'queued',
        });
      }

      case 'manage_workspace': {
        const { workspace_id, action, payload } = input;
        
        return NextResponse.json({
          status: 'success',
          action,
          workspace_id,
        });
      }

      case 'summarize_issue': {
        const { issue_text, style } = input;
        
        const summaries: Record<string, string> = {
          '3_sentence': 'This issue covers the key developments in AI this week. Major model releases include GPT-5 speculation and new open-weight challengers. Policy updates from the EU AI Act implementation are also discussed.',
          'executive_brief': 'Executive Summary: Three significant developments this week — DeepMind\\'s AlphaGeometry2 achieves IMO gold-medal performance, new open-weight model family challenges GPT-4o on coding benchmarks, and scaling law research suggests compute efficiency gains are accelerating. Implications: Frontier model capabilities advancing faster than predicted; open-weight ecosystem growing; compute efficiency doubling every 8 months.',
          'analyst_brief': 'Analyst Brief: This week\\'s developments signal accelerating convergence in frontier AI capabilities. AlphaGeometry2\\'s IMO gold performance (42/50 problems) demonstrates geometric reasoning at human-expert level. The GLM-4-9B-0414 release beating GPT-4o on HumanEval indicates open-weight models are closing the gap with proprietary systems. Epoch AI\\'s finding of 8-month compute efficiency doubling (vs 18-24 month Moore\\'s Law) suggests training cost curves are bending favorably. Strategic implication: organizations should accelerate open-weight evaluation pipelines and prepare for faster capability iteration cycles.',
          'deep_research': 'Deep Research Summary: [Full context with citations would be here...]',
        };
        
        return NextResponse.json({
          summary: summaries[style] || summaries['3_sentence'],
        });
      }

      case 'build_digest_section': {
        const { topic, issues, style } = input;
        
        return NextResponse.json({
          section_title: `${topic} — ${style === 'deep' ? 'Deep Dive' : 'Executive Summary'}`,
          section_summary: `Key developments in ${topic} this period include ${issues.length} significant items covering ${issues.map((i: any) => i.title.slice(0, 30)).join(', ')}.`,
          ordered_items: issues.map((issue: any, i: number) => ({
            ...issue,
            relevance: 1 - i * 0.1,
          })),
        });
      }

      case 'explain_signal_quality': {
        const { source_metadata, issue_history } = input;
        
        return NextResponse.json({
          explanation: `${source_metadata.title} has a reputation score of ${Math.round(source_metadata.reputation_score * 100)}% based on ${issue_history.length} indexed issues. Community save rate is 89% among similar readers. Low overlap (${Math.round(source_metadata.overlap_score * 100)}%) with your current subscriptions.`,
        });
      }

      default:
        return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 });
    }
  } catch (error) {
    console.error('MCP tool error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}