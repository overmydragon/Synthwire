'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default context for SSR/pre-rendering
const defaultContext: ThemeContextType = {
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const getResolvedTheme = useCallback((t: Theme): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    if (t === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return t;
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    const resolved = getResolvedTheme(t);
    setResolvedTheme(resolved);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', t);
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    }
  }, [getResolvedTheme]);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored || 'system';
    setThemeState(initialTheme);
    const resolved = getResolvedTheme(initialTheme);
    setResolvedTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }, [getResolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolved);
      document.documentElement.classList.toggle('dark', newResolved === 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // During SSR/pre-rendering, provide default context
  const value = mounted
    ? { theme, resolvedTheme, setTheme }
    : defaultContext;

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // This should never happen if ThemeProvider is used, but provide fallback
    return defaultContext;
  }
  return context;
}