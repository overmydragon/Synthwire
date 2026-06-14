'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  SparklesIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { Button, Avatar, Badge } from '@/components/ui';
import { MOCK_USER_PROFILE } from '@/lib/data/mock';

const navigation = [
  { name: 'My Sources', href: '/app/discovery', icon: MagnifyingGlassIcon, badge: 3 },
  { name: 'Digest Builder', href: '/app/digest', icon: DocumentTextIcon },
  { name: 'Archive Search', href: '/app/archive', icon: SparklesIcon },
  { name: 'Workspaces', href: '/app/workspace', icon: UsersIcon },
  { name: 'Settings', href: '/app/settings', icon: Cog6ToothIcon },
];

function SidebarContent({
  onNavigate,
  showCollapseButton = false,
  onCollapse,
}: {
  onNavigate?: () => void;
  showCollapseButton?: boolean;
  onCollapse?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo & toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 flex-shrink-0">
        <Link
          href="/app"
          onClick={onNavigate}
          className="flex items-center gap-2 text-white font-medium text-xl"
          aria-label="Synthwire home"
        >
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#grad)" />
            <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
          </svg>
          <span className="block">Synthwire</span>
        </Link>
        {showCollapseButton && (
          <button
            onClick={onCollapse}
            className="p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto" aria-label="App navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-violet-500/20 text-white'
                  : 'text-violet-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{item.name}</span>
              {item.badge ? (
                <Badge variant="violet" size="sm" className="justify-self-end">
                  {item.badge}
                </Badge>
              ) : (
                <span className="justify-self-end invisible" aria-hidden="true">
                  <Badge variant="violet" size="sm">0</Badge>
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
          <Avatar size="md" fallback={MOCK_USER_PROFILE.user_id.slice(-2).toUpperCase()} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">You</p>
            <p className="text-xs text-violet-400 truncate">Free tier • 5 sources</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-violet-950">
      {/* Desktop sidebar (lg+) */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:z-30 bg-violet-950/90 backdrop-blur-2xl border-r border-white/10 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <SidebarContent
          showCollapseButton={sidebarOpen}
          onCollapse={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Mobile drawer backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer (below lg) */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-violet-950 border-r border-white/10 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-w-0 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        } transition-[margin] duration-300`}
      >
        {/* Top bar */}
        <header className="h-16 bg-violet-950/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 rounded-xl text-violet-300 hover:text-white hover:bg-white/10 flex-shrink-0 w-10 h-10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Bars3Icon className="w-5 h-5 mx-auto" />
          </button>

          {/* Desktop expand button (when sidebar is collapsed) */}
          {!sidebarOpen && (
            <button
              className="hidden lg:flex p-2 rounded-xl text-violet-300 hover:text-white hover:bg-white/10 flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
              aria-label="Expand sidebar"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          )}

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search sources, issues..."
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm sm:text-base text-white placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Button variant="ghost" size="sm" className="relative px-2 sm:px-3" aria-label="Notifications">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <Avatar size="sm" fallback={MOCK_USER_PROFILE.user_id.slice(-2).toUpperCase()} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
