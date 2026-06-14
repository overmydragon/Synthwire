import { NextRequest, NextResponse } from 'next/server';
import { MOCK_SOURCES, MOCK_RECOMMENDATIONS, MOCK_USER_PROFILE, MOCK_DIGEST, MOCK_SEARCH_RESULTS, MOCK_WORKSPACE, MOCK_EXPLANATION, MOCK_TOPIC_GRAPH } from '@/lib/data/mock';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get('resource');
  const userId = searchParams.get('user_id') || 'usr_123';

  try {
    switch (resource) {
      case 'user_profile': {
        return NextResponse.json({
          ...MOCK_USER_PROFILE,
          topic_graph: MOCK_TOPIC_GRAPH,
        });
      }

      case 'topic_graph': {
        return NextResponse.json({
          user_id: userId,
          topics: MOCK_TOPIC_GRAPH,
        });
      }

      case 'source_catalog': {
        const topic = searchParams.get('topic');
        const type = searchParams.get('type');
        let sources = MOCK_SOURCES;
        
        if (topic) {
          sources = sources.filter(s => s.topics.includes(topic));
        }
        if (type) {
          sources = sources.filter(s => s.paywall_status === type || s.author_type === type);
        }
        
        return NextResponse.json({
          sources,
          total: sources.length,
          last_updated: new Date().toISOString(),
        });
      }

      case 'subscription_queue': {
        const pending = MOCK_RECOMMENDATIONS.slice(0, 3).map(r => ({
          ...r,
          status: 'pending' as const,
          added_at: new Date().toISOString(),
          route: 'digest' as const,
          priority: 1,
          digest_mode: 'executive_brief' as const,
        }));
        
        const active = MOCK_RECOMMENDATIONS.slice(3, 6).map(r => ({
          source_id: r.source_id,
          subscribed_at: new Date(Date.now() - 86400000 * Math.random() * 30).toISOString(),
          route: 'digest' as const,
          priority: 1,
          digest_mode: 'executive_brief' as const,
          source: MOCK_SOURCES.find(s => s.source_id === r.source_id)!,
        }));

        return NextResponse.json({
          user_id: userId,
          pending,
          active,
        });
      }

      case 'digest_history': {
        return NextResponse.json({
          user_id: userId,
          digests: [MOCK_DIGEST],
        });
      }

      case 'archive_search': {
        const query = searchParams.get('q') || '';
        const results = MOCK_SEARCH_RESULTS.filter(r => 
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.excerpt.toLowerCase().includes(query.toLowerCase())
        );
        
        return NextResponse.json({
          results,
          total: results.length,
          query,
          took_ms: 42,
        });
      }

      case 'workspace': {
        const workspaceId = searchParams.get('workspace_id') || 'ws_research_team';
        if (workspaceId === 'ws_research_team') {
          return NextResponse.json(MOCK_WORKSPACE);
        }
        return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
      }

      default:
        return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });
    }
  } catch (error) {
    console.error('MCP resource error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}