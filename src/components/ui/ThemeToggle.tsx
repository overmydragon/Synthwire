'use client';

import { useTheme, type Theme } from '@/lib/theme';
import { SunIcon, MoonIcon, ComputerDesktopIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: Theme; label: string; icon: React.ReactNode; description: string }[] = [
    { value: 'light', label: 'Light', icon: <SunIcon className="w-5 h-5" />, description: 'Always light mode' },
    { value: 'dark', label: 'Dark', icon: <MoonIcon className="w-5 h-5" />, description: 'Always dark mode' },
    { value: 'system', label: 'System', icon: <ComputerDesktopIcon className="w-5 h-5" />, description: 'Match OS preference' },
  ];

  const currentOption = options.find(o => o.value === theme) || options[2];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef} data-theme-toggle>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-ink-300 transition-colors group theme-toggle"
        aria-expanded={open}
        aria-haspopup="listbox"
        type="button"
      >
        {currentOption.icon}
        <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">{currentOption.label}</span>
        <ChevronDownIcon className={`w-4 h-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-ink-900 border border-white/[0.08] shadow-2xl ring-1 ring-white/[0.05] overflow-hidden py-1 z-[101] animate-slide-down">
          <div className="px-3 py-2 border-b border-white/[0.06]">
            <p className="eyebrow text-ink-500 text-[10px]">Appearance</p>
          </div>
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => { setTheme(option.value); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                theme === option.value
                  ? 'bg-violet-500/10 text-white'
                  : 'text-ink-300 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              <span className="flex-shrink-0" aria-hidden="true">{option.icon}</span>
              <div className="flex-1 min-w-0 text-sm">
                <p className="font-medium truncate">{option.label}</p>
                <p className="text-[10px] text-ink-500 truncate">{option.description}</p>
              </div>
              {theme === option.value && (
                <CheckIcon className="w-5 h-5 text-violet-400 flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}