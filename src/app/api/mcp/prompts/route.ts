import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, input } = body;

    switch (prompt) {
      case 'build_topic_profile': {
        const { raw_interests } = input;
        const topics = raw_interests
          .split(',')
          .map((t: string) => t.trim())
          .filter(Boolean);
        
        const excluded = ['celebrity gossip', 'sports', 'fashion', 'lifestyle', 'entertainment'];
        
        const suggested = [
          'Import AI',
          'The Batch',
          'Stratechery',
          'TLDR AI',
          'Latent Space',
        ];

        return NextResponse.json({
          normalized_topics: topics,
          excluded_topics: excluded,
          suggested_sources: suggested,
        });
      }

      case 'summarize_issue': {
        const { issue_text, style } = input;
        
        const templates: Record<string, string> = {
          '3_sentence': `Summarize the following newsletter issue in exactly 3 sentences. Focus on the most important facts, decisions, or insights. Be specific and concrete.

Issue text:
${issue_text}

Summary:`,
          'executive_brief': `Create an executive brief from the following newsletter issue. Structure as:
1. One-sentence executive summary
2. 3-4 key takeaways with business/strategic implications
3. What to watch next

Issue text:
${issue_text}

Executive Brief:`,
          'analyst_brief': `Create an analyst brief from the following newsletter issue. Structure as:
1. Executive summary (2-3 sentences)
2. Key developments with supporting evidence
3. Strategic implications for stakeholders
4. Risks and uncertainties
5. Recommended actions
6. What to monitor next

Issue text:
${issue_text}

Analyst Brief:`,
          'deep_research': `Create a deep research summary from the following newsletter issue. Include:
1. Comprehensive summary with full context
2. All key claims with supporting evidence
3. Technical details and methodology (if applicable)
4. Comparison with prior work/state of the art
5. Limitations and caveats
6. Implications for the field
7. Open questions
8. Full citation list

Issue text:
${issue_text}

Deep Research Summary:`,
        };

        return NextResponse.json({
          summary: `[Generated ${style} summary would appear here. Template used: ${templates[style]?.slice(0, 100)}...]`,
        });
      }

      case 'build_digest_section': {
        const { topic, issues, style } = input;
        
        return NextResponse.json({
          section_title: `${topic} — ${style === 'deep' ? 'Deep Dive' : 'Executive Summary'}`,
          section_summary: `This section covers ${issues.length} items related to ${topic}. Key themes include ${issues.slice(0, 3).map((i: any) => i.title.slice(0, 40)).join(', ')}.`,
          ordered_items: issues.map((issue: any, i: number) => ({
            ...issue,
            relevance: 1 - i * 0.1,
          })),
        });
      }

      case 'explain_signal_quality': {
        const { source_metadata, issue_history } = input;
        
        return NextResponse.json({
          explanation: `Signal Quality Analysis for ${source_metadata.title}:
• Authority: ${source_metadata.author_type} publisher with ${source_metadata.subscriber_count?.toLocaleString() || 'N/A'} subscribers
• Reputation: ${Math.round(source_metadata.reputation_score * 100)}% (based on community validation)
• Uniqueness: ${Math.round((1 - source_metadata.overlap_score) * 100)}% unique vs your other sources
• Consistency: ${issue_history.length} issues indexed with ${Math.round(issue_history.reduce((a: number, i: any) => a + i.relevance_score, 0) / issue_history.length * 100)}% avg relevance
• Freshness: ${source_metadata.frequency} cadence aligns with your ${source_metadata.topics[0]} interest`,
        });
      }

      default:
        return NextResponse.json({ error: `Unknown prompt: ${prompt}` }, { status: 400 });
    }
  } catch (error) {
    console.error('MCP prompt error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}