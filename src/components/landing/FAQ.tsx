'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { RevealOnScroll } from './RevealOnScroll';
import { SectionMarker } from './SectionMarker';

const faqs = [
  {
    question: 'How does Synthwire work if the AI can\'t sign me up for newsletters?',
    answer: 'Right — the AI can\'t bypass confirmation emails or captchas. So we don\'t try. You browse our curated directory of 10,000+ vetted newsletters, click "Subscribe" on the ones you want, and confirm via their normal signup flow. Synthwire\'s role is consolidation: we read what you subscribed to, deduplicate, summarize, and route a clean daily brief.',
  },
  {
    question: 'How do my newsletters get into Synthwire?',
    answer: 'Three options. (1) Most common: subscribe at your normal email, and the ones you pick also get a copy forwarded to your unique @synthwire.email address. (2) Direct: sign up with your Synthwire address as primary. (3) Manual forward: forward any newsletter to your Synthwire address. Your real email is never exposed (option 1) and you can revoke any source instantly.',
  },
  {
    question: 'What can I control about my feed?',
    answer: 'Everything. Pause any source instantly. Mute for 30 days. Remove permanently. Adjust reading mode per-source. Filter by topic, source type, or author. Export your full data as JSON anytime. Delete your account with one click — we purge all data within 24 hours.',
  },
  {
    question: 'How does the redundancy filter work?',
    answer: 'When multiple sources cover the same story, we cluster them by semantic similarity. You see one synthesized entry with the best summary, attributed to all covering sources. Original links preserved. ~87% duplicate reduction based on beta data.',
  },
  {
    question: 'What are "reading modes"?',
    answer: 'Executive brief: 3-sentence summaries, ~3 min. Analyst brief: structured sections with context, ~8 min. Deep-research: full context with citations, ~20 min. You can set per-topic — deep for AI models, executive for crypto policy.',
  },
  {
    question: 'How does "topic memory" filter repeated takes?',
    answer: 'We track the semantic fingerprint of every idea across your feed. When a new issue arrives, we compare its key claims against your history. If it\'s a rehash of a narrative you\'ve already seen, it\'s flagged or filtered. You see "new idea" vs "repeated take" labels. Tunable sensitivity.',
  },
  {
    question: 'Can I search across all my archived issues?',
    answer: 'Yes (Max tier). Full-text search across every indexed issue with filters: source, date range, topic tags. Results ranked by relevance with highlighted excerpts.',
  },
  {
    question: 'How do team workspaces work?',
    answer: 'Max tier includes shared queues: a curated feed of sources your team agrees on, with routing policies (all items, curated-only, voted). Members can propose sources, comment on items, and get a shared digest. Up to 10 members.',
  },
  {
    question: 'Is there a free trial for paid tiers?',
    answer: 'Free tier gives you 5 sources and 7-day archive — enough to test the experience. No credit card. Upgrade anytime. Yearly billing saves ~17%. Cancel anytime.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="s-9" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="mb-6">
                <SectionMarker num="1.9" eyebrow="FAQ" />
              </div>
              <h2 className="text-display text-[clamp(40px,5vw,64px)] text-white mb-6 mt-6">
                Questions, <em className="text-ink-400 not-italic">answered.</em>
              </h2>
              <p className="text-[14px] text-ink-400 leading-relaxed">
                Can&apos;t find what you&apos;re looking for?{' '}
                <a href="mailto:help@synthwire.email" className="text-violet-400 hover:text-violet-300 underline">
                  Email us
                </a>
                .
              </p>
            </div>
          </div>

          <div className="md:col-span-8">
            <RevealOnScroll>
              <div className="border-t border-white/[0.08]">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between gap-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] md:text-[16px] font-medium text-white pr-2 md:pr-4 self-center">{faq.question}</span>
        <span className={`w-6 h-6 rounded-full border border-white/[0.12] flex items-center justify-center flex-shrink-0 self-center transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          <PlusIcon className="w-3 h-3 text-ink-300" />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
      >
        <div className="overflow-hidden">
          <p className="text-[14px] text-ink-300 leading-relaxed pb-6 max-w-2xl">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}