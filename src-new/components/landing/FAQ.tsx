'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/ui';

const faqs = [
  {
    question: 'How does Synthwire find newsletters that match my interests?',
    answer: 'You describe your interests in natural language (e.g., "AI models, chip manufacturing, crypto policy"). We build a weighted topic graph from this, then rank our catalog of 10,000+ sources against it using semantic similarity, authority signals, and reader overlap data. You see scored recommendations with full rationale before anything is subscribed.',
  },
  {
    question: 'What\'s the "private relay email" and how does it protect me?',
    answer: 'When you approve a source, Synthwire subscribes using a unique @synthwire.email address — not your personal email. The newsletter lands in our system, we process it (summarize, deduplicate, tag), then deliver it to you via your chosen channel (email, Slack, Discord, SMS). Your real email is never exposed to publishers. You can disable the relay for any source instantly.',
  },
  {
    question: 'Can I control which sources get subscribed vs just recommended?',
    answer: 'Yes. Three approval modes: (1) Auto-subscribe — high-confidence matches (>90%) are added automatically. (2) Approve-first (default) — you review each recommendation before it\'s subscribed. (3) Recommend-only — you see suggestions but manually subscribe yourself. You can set this globally or per-source.',
  },
  {
    question: 'How does the redundancy filter work?',
    answer: 'When multiple sources cover the same story, we cluster them by semantic similarity (embedding-based). You see one synthesized entry with the best summary, attributed to all covering sources. Original links preserved. This reduces duplicate reading by ~87% based on our beta data.',
  },
  {
    question: 'What are "reading modes" and how do they differ?',
    answer: 'Executive brief: 3-sentence summaries per item, ~3 min total read. Analyst brief: Structured sections with context, implications, ~8 min. Deep-research: Full context, citations, related sources, ~20 min. You can set per-topic (e.g., deep for AI models, executive for crypto policy).',
  },
  {
    question: 'How does "topic memory" filter repeated takes?',
    answer: 'We track the semantic fingerprint of every idea across your feed. When a new issue arrives, we compare its key claims against your history. If it\'s a rehash of a narrative you\'ve already seen, it\'s flagged or filtered. You see "new idea" vs "repeated take" labels. Tunable sensitivity.',
  },
  {
    question: 'Can I search across all my archived issues?',
    answer: 'Yes (Max tier). Full-text search across every indexed issue with filters: source, date range, topic tags. Results ranked by relevance with highlighted excerpts. Search queries like "GPT-5 timeline" or "TSMC 2nm yield" return precise matches across all sources.',
  },
  {
    question: 'What happens if I want to pause or stop a source?',
    answer: 'One click: pause (temporarily stop ingest), mute 30 days (auto-resume), or remove (unsubscribe via relay, keep archive). No need to hunt down unsubscribe links in newsletters — we handle it through the relay. Your archive remains searchable.',
  },
  {
    question: 'How do team workspaces work?',
    answer: 'Max tier includes shared queues: curated feed of sources your team agrees on, with routing policies (all items, curated-only, voted). Members can propose sources, comment on items, and get a shared digest. Up to 10 members. Think of it as a team research desk.',
  },
  {
    question: 'Is there a free trial for paid tiers?',
    answer: 'Free tier gives you 5 sources and 7-day archive — enough to test the discovery quality. No credit card. Upgrade anytime. Yearly billing saves ~17%. Cancel anytime, keep archive access until period ends.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white/3 backdrop-blur-xl border-y border-white/10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            Questions about <span className="font-medium">how it works</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-violet-300 mb-4">Didn't find your answer?</p>
          <a href="mailto:help@synthwire.email" className="text-violet-400 hover:text-violet-300 underline">Email us at help@synthwire.email</a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-white pr-4">{faq.question}</span>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 text-violet-400 flex-shrink-0" /> : <ChevronDownIcon className="w-5 h-5 text-violet-400 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-white/10 animate-slide-down">
          <p className="text-violet-300 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </Card>
  );
}