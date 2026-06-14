'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  SparklesIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { Button, Avatar, Badge } from '@/components/ui';
import { MOCK_USER_PROFILE } from '@/lib/data/mock';

const navigation = [
  { name: 'Discovery Queue', href: '/app/discovery', icon: MagnifyingGlassIcon, badge: 3 },
  { name: 'Digest Builder', href: '/app/digest', icon: DocumentTextIcon },
  { name: 'Archive Search', href: '/app/archive', icon: SparklesIcon },
  { name: 'Workspaces', href: '/app/workspace', icon: UsersIcon },
  { name: 'Settings', href: '/app/settings', icon: Cog6ToothIcon },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-violet-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-violet-950/90 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}`}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo & toggle */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <Link href="/app" className="flex items-center gap-2 text-white font-medium text-xl" aria-label="Synthwire home">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#grad)"/>
                <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className={sidebarOpen ? 'block' : 'hidden'}>Synthwire</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/10 transition-colors lg:hidden"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="App navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-violet-500/20 text-white'
                      : 'text-violet-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && (
                        <Badge variant="violet" size="sm">{item.badge}</Badge>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className={`p-3 border-t border-white/10 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <Avatar size="md" fallback={MOCK_USER_PROFILE.user_id.slice(-2).toUpperCase()} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">You</p>
                <p className="text-xs text-violet-400 truncate">Free tier • 5 sources</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-w-0 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top bar */}
        <header className="h-16 bg-violet-950/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 rounded-xl text-violet-400 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
              <input
                type="search"
                placeholder="Search sources, issues, topics..."
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-10 py-2.5 text-white placeholder-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <Avatar size="sm" fallback={MOCK_USER_PROFILE.user_id.slice(-2).toUpperCase()} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}