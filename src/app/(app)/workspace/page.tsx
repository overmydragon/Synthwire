'use client';

import { useState } from 'react';
import { 
  UsersIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  BellIcon,
  Cog6ToothIcon,
  LinkIcon,
  LockClosedIcon,
  KeyIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, Avatar, AvatarGroup, Input, Tabs } from '@/components/ui';
import { MOCK_WORKSPACE, MOCK_USER_PROFILE, MOCK_SOURCES } from '@/lib/data/mock';
import type { Workspace, WorkspaceMember } from '@/lib/types';

export default function Workspace() {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'queues' | 'sources' | 'settings'>('overview');
  const [workspace] = useState<Workspace>(MOCK_WORKSPACE);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">Workspaces</h1>
            <p className="text-violet-300 mt-1 text-sm sm:text-base">Collaborate on shared signal feeds with your team</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
            <Button className="w-full sm:w-auto">
              <PlusIcon className="w-5 h-5" /> New workspace
            </Button>
          </div>
        </div>

        {/* Workspace selector */}
        <Card variant="glass" padding="md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-white truncate">{workspace.name}</h3>
                <p className="text-violet-400 text-sm line-clamp-2">{workspace.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <AvatarGroup max={5}>
                {workspace.members.map(member => (
                  <Avatar key={member.user_id} size="sm" fallback={member.name.charAt(0)} />
                ))}
              </AvatarGroup>
              <span className="text-violet-300 text-sm whitespace-nowrap">{workspace.members.length} members</span>
              <Badge variant="violet" size="sm">Max tier</Badge>
              <Button size="sm" variant="secondary" className="self-start sm:self-auto flex-shrink-0">
                <PlusIcon className="w-4 h-4" /> Add member
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="-mx-4 sm:mx-0 px-4 sm:px-0 mb-6 overflow-x-auto">
        <Tabs defaultValue={activeTab} onChange={(v) => setActiveTab(v as typeof activeTab)}>
          <Tabs.List className="flex-nowrap whitespace-nowrap w-max sm:w-auto">
            <Tabs.Trigger value="overview">
              <ShieldCheckIcon className="w-4 h-4" /> Overview
            </Tabs.Trigger>
            <Tabs.Trigger value="members">
              <UsersIcon className="w-4 h-4" /> Members ({workspace.members.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="queues">
              <LinkIcon className="w-4 h-4" /> Queues ({workspace.shared_queues.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="sources">
              <MagnifyingGlassIcon className="w-4 h-4" /> Sources ({workspace.shared_sources.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="settings">
              <Cog6ToothIcon className="w-4 h-4" /> Settings
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>

      {/* Tab panels */}
      {activeTab === 'overview' && <OverviewTab workspace={workspace} />}
      {activeTab === 'members' && <MembersTab workspace={workspace} />}
      {activeTab === 'queues' && <QueuesTab workspace={workspace} />}
      {activeTab === 'sources' && <SourcesTab workspace={workspace} />}
      {activeTab === 'settings' && <SettingsTab workspace={workspace} />}
    </div>
  );
}

function OverviewTab({ workspace }: { workspace: Workspace }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Stats cards */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <Card variant="elevated" padding="md">
          <h3 className="font-medium text-white mb-4">Activity summary</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <StatCard label="Shared sources" value={workspace.shared_sources.length} icon="📰" />
            <StatCard label="Active queues" value={workspace.shared_queues.length} icon="🔗" />
            <StatCard label="Team members" value={workspace.members.length} icon="👥" />
            <StatCard label="Digests sent" value="127" icon="📬" />
          </div>
        </Card>

        <Card variant="elevated" padding="md">
          <h3 className="font-medium text-white mb-4">Recent activity</h3>
          <div className="space-y-3">
            {[
              'Sarah approved "Import AI" for AI Strategy queue',
              'Marcus added "Semiconductor Daily" to Hardware queue',
              'You created weekly digest for Research Desk',
              'Sarah commented on "GPT-5 timeline" issue',
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <UsersIcon className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-violet-200 text-sm break-words">{activity}</p>
                  <p className="text-violet-500 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="space-y-4">
        <Card variant="elevated" padding="md">
          <h3 className="font-medium text-white mb-4">Quick actions</h3>
          <div className="space-y-3">
            <ActionButton icon={PlusIcon} label="Invite member" onClick={() => {}} />
            <ActionButton icon={LinkIcon} label="Create shared queue" onClick={() => {}} />
            <ActionButton icon={MagnifyingGlassIcon} label="Add shared source" onClick={() => {}} />
            <ActionButton icon={ArrowRightIcon} label="Generate team digest" onClick={() => {}} />
          </div>
        </Card>

        <Card variant="elevated" padding="md">
          <h3 className="font-medium text-white mb-4">Routing policies</h3>
          <div className="space-y-2">
            {Object.entries(workspace.routing_policies).map(([sourceId, policy]) => {
              const source = MOCK_SOURCES.find(s => s.source_id === sourceId);
              return (
                <div key={sourceId} className="flex items-center justify-between gap-2 p-2 bg-white/5 rounded-xl">
                  <span className="text-sm text-violet-300 truncate pr-2 flex-1 min-w-0">{source?.title || sourceId}</span>
                  <Badge variant={policy === 'curated' ? 'violet' : 'outline'} size="sm" className="flex-shrink-0">{policy}</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MembersTab({ workspace }: { workspace: Workspace }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card variant="elevated" padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <h3 className="font-medium text-white">Team members</h3>
          <Button className="w-full sm:w-auto">
            <PlusIcon className="w-4 h-4" /> Invite member
          </Button>
        </div>

        <div className="space-y-3">
          {workspace.members.map((member) => (
            <MemberRow key={member.user_id} member={member} isCurrentUser={member.user_id === MOCK_USER_PROFILE.user_id} />
          ))}
        </div>
      </Card>

      <Card variant="glass" padding="md">
        <h3 className="font-medium text-white mb-4">Pending invitations</h3>
        <p className="text-violet-400 text-sm">No pending invitations.</p>
      </Card>
    </div>
  );
}

function MemberRow({ member, isCurrentUser }: { member: WorkspaceMember; isCurrentUser: boolean }) {
  const roleBadges: Record<string, 'violet' | 'success' | 'outline'> = {
    owner: 'violet',
    editor: 'success',
    viewer: 'outline',
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <Avatar size="md" fallback={member.name.charAt(0)} status="online" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-white truncate">{member.name}</p>
            {isCurrentUser && <Badge variant="violet" size="sm">You</Badge>}
          </div>
          <p className="text-violet-400 text-sm truncate">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <Badge variant={roleBadges[member.role]} size="sm">{member.role}</Badge>
        <Button variant="ghost" size="sm" aria-label="Edit member">
          <PencilIcon className="w-4 h-4" />
        </Button>
        {!isCurrentUser && (
          <Button variant="ghost" size="sm" aria-label="Remove member">
            <TrashIcon className="w-4 h-4 text-red-400" />
          </Button>
        )}
      </div>
    </div>
  );
}

function QueuesTab({ workspace }: { workspace: Workspace }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-medium text-white">Shared queues</h3>
        <Button className="w-full sm:w-auto">
          <PlusIcon className="w-4 h-4" /> Create queue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {workspace.shared_queues.map((queue) => (
          <Card key={queue.queue_id} variant="elevated" padding="md">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="min-w-0">
                <h4 className="text-lg font-medium text-white break-words">{queue.name}</h4>
                <p className="text-violet-400 text-sm mt-1 line-clamp-2">{queue.description}</p>
              </div>
              <Badge variant="violet" size="sm" className="flex-shrink-0">{queue.routing_policy}</Badge>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-violet-300 mb-2">Sources ({queue.source_ids.length})</p>
              <div className="flex flex-wrap gap-2">
                {queue.source_ids.map(sourceId => {
                  const source = MOCK_SOURCES.find(s => s.source_id === sourceId);
                  return (
                    <Badge key={sourceId} variant="outline" size="sm" className="truncate max-w-[10rem]">
                      {source?.title || sourceId}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <AvatarGroup max={3}>
                {queue.members.map(memberId => {
                  const member = workspace.members.find(m => m.user_id === memberId);
                  return <Avatar key={memberId} size="sm" fallback={member?.name.charAt(0) || '?'} />;
                })}
              </AvatarGroup>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <ChevronRightIcon className="w-4 h-4" /> View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SourcesTab({ workspace }: { workspace: Workspace }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-medium text-white">Shared sources</h3>
        <Button className="w-full sm:w-auto">
          <PlusIcon className="w-4 h-4" /> Add source
        </Button>
      </div>

      <div className="space-y-3">
        {workspace.shared_sources.map((sourceId) => {
          const source = MOCK_SOURCES.find(s => s.source_id === sourceId);
          if (!source) return null;
          return (
            <Card key={sourceId} variant="default" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300 text-sm font-medium flex-shrink-0">
                    {source.title.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">{source.title}</p>
                    <p className="text-violet-400 text-sm truncate">{source.publisher} • {source.frequency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
                  <Badge variant={source.paywall_status === 'free' ? 'success' : 'warning'} size="sm">
                    {source.paywall_status}
                  </Badge>
                  <Badge variant="outline" size="sm">{source.frequency}</Badge>
                  <Button variant="ghost" size="sm" aria-label="View source">
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function SettingsTab({ workspace }: { workspace: Workspace }) {
  return (
    <div className="max-w-2xl space-y-6 sm:space-y-8">
      <Card variant="elevated" padding="md">
        <h3 className="font-medium text-white mb-4 sm:mb-6">Workspace settings</h3>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-violet-300 mb-2">Workspace name</label>
            <Input defaultValue={workspace.name} />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-300 mb-2">Description</label>
            <Input defaultValue={workspace.description} />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="min-w-0">
              <p className="font-medium text-white">Default routing policy</p>
              <p className="text-violet-400 text-sm">How new sources are added to queues</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white w-full sm:w-auto">
              <option value="curated">Curated (require approval)</option>
              <option value="all">All items</option>
              <option value="voted">Team vote</option>
            </select>
          </div>
        </div>
      </Card>

      <Card variant="elevated" padding="md" className="border-red-500/20">
        <h3 className="font-medium text-white mb-4 flex items-center gap-2">
          <LockClosedIcon className="w-5 h-5 text-red-400" />
          Danger zone
        </h3>
        <p className="text-violet-400 text-sm mb-4">Deleting this workspace will remove all shared queues and sources. This action cannot be undone.</p>
        <Button variant="danger">
          <TrashIcon className="w-4 h-4" /> Delete workspace
        </Button>
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div className="p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
      <span className="text-xl sm:text-2xl mb-2 block">{icon}</span>
      <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
      <p className="text-violet-400 text-xs sm:text-sm">{label}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-violet-500/30 hover:bg-violet-500/10 transition-colors text-left"
    >
      <Icon className="w-5 h-5 text-violet-400" />
      <span className="text-white">{label}</span>
      <ChevronRightIcon className="w-4 h-4 text-violet-500 ml-auto" />
    </button>
  );
}