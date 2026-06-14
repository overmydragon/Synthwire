'use client';

import { useEffect, useRef, useState } from 'react';

type RevealOnScrollProps = {
  children: React.ReactNode;
  /** Delay in milliseconds (0-1000) used to stagger reveals. */
  delay?: number;
  /** Optional className passthrough for the wrapper. */
  className?: string;
};

/**
 * Wraps children in a div that fades + slides up the first time it enters
 * the viewport. Intended to replace `animate-slide-up` for below-the-fold
 * sections so they don't animate until the user scrolls to them.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion: just show it.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const clampedDelay = Math.max(0, Math.min(1000, delay));

  return (
    <div
      ref={ref}
      className={`will-change-transform transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[30px]'
      } ${className}`}
      style={{
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${clampedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default RevealOnScroll;
