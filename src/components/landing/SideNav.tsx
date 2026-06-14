'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 's-1', label: 'Product', num: '1.0' },
  { id: 's-2', label: 'Sources', num: '1.1' },
  { id: 's-3', label: 'How it works', num: '1.2' },
  { id: 's-3-demo', label: 'Demo', num: '1.3' },
  { id: 's-4', label: 'Comparison', num: '1.4' },
  { id: 's-5', label: 'What we build for', num: '1.5' },
  { id: 's-6', label: 'Proof', num: '1.6' },
  { id: 's-7', label: 'Features', num: '1.7' },
  { id: 's-8', label: 'Pricing', num: '1.8' },
  { id: 's-9', label: 'FAQ', num: '1.9' },
];

export function SideNav() {
  const [active, setActive] = useState('s-1');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Skip heavy work below the SideNav's xl breakpoint (it is hidden anyway)
      if (window.innerWidth < 1280) return;

      setVisible(window.scrollY > 400);

      // Find the section closest to the top
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.3) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`hidden xl:block fixed top-1/2 -translate-y-1/2 left-8 z-40 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Page sections"
    >
      <ul className="space-y-3">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 transition-all"
              >
                <span
                  className={`text-[11px] font-mono transition-colors ${
                    isActive ? 'text-white' : 'text-ink-600 group-hover:text-ink-400'
                  }`}
                >
                  {section.num}
                </span>
                <span
                  className={`h-px transition-all ${
                    isActive
                      ? 'w-12 bg-white'
                      : 'w-6 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-ink-600 group-hover:text-ink-300'
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}