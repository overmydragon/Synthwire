'use client';

import { Button } from '@/components/ui';
import { ArrowRightIcon, ShieldCheckIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';

export function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          <span className="text-sm font-medium text-violet-300">Private beta — limited spots</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-6">
          Ready to build your <span className="font-medium">signal feed</span>?
        </h2>

        <p className="text-lg md:text-xl text-violet-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join researchers, analysts, and curious professionals who've replaced their manual reading stack 
          with a controllable, transparent research inbox.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="xl" className="group w-full sm:w-auto">
            <span className="flex items-center gap-2">
              Join the waitlist
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          <Button variant="secondary" size="xl" className="w-full sm:w-auto">
            See a live demo
          </Button>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <TrustBadge icon={ShieldCheckIcon} label="Private relay" description="Your email stays yours" />
          <TrustBadge icon={MagnifyingGlassIcon} label="Full attribution" description="Every item sourced" />
          <TrustBadge icon={UsersIcon} label="Team ready" description="Shared workspaces" />
          <TrustBadge icon={ArrowRightIcon} label="Export anytime" description="Your data, portable" />
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ icon: Icon, label, description }: { icon: React.ComponentType<{ className?: string }>; label: string; description: string }) {
  return (
    <div className="p-6 bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-violet-500/30 transition-colors">
      <Icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
      <p className="font-medium text-white">{label}</p>
      <p className="text-violet-500 text-sm mt-1">{description}</p>
    </div>
  );
}