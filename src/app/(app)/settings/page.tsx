'use client';

import { useState } from 'react';
import { 
  UserCircleIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  KeyIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  CalendarIcon,
  TrashIcon,
  BoltIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Card, Button, Badge, Input, Avatar, Tabs, Switch } from '@/components/ui';
import { MOCK_USER_PROFILE } from '@/lib/data/mock';
import { TIER_FEATURES, APPROVAL_MODES, type Tier } from '@/lib/types';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'notifications' | 'billing' | 'integrations' | 'security'>('profile');
  const [profile, setProfile] = useState({
    name: 'Isaiah',
    email: 'isaiah@example.com',
    bio: 'Research engineer interested in AI, semiconductors, and crypto policy.',
    avatar: '',
  });
  const [preferences, setPreferences] = useState({
    theme: 'dark' as 'light' | 'dark' | 'system',
    digestCadence: MOCK_USER_PROFILE.digest_cadence,
    approvalMode: MOCK_USER_PROFILE.approval_mode,
    preferredDepth: MOCK_USER_PROFILE.preferred_depth,
    timezone: 'America/Chicago',
    language: 'en',
  });
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    emailAlerts: true,
    slackDigest: true,
    slackAlerts: false,
    discordDigest: false,
    discordAlerts: false,
    smsAlerts: false,
    weeklyReport: true,
    newSourceRecommendations: true,
    coverageGapAlerts: true,
  });
  const [currentTier, setCurrentTier] = useState<Tier>('free');

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">Settings</h1>
            <p className="text-violet-300 mt-1 text-sm sm:text-base">Manage your account, preferences, and billing</p>
          </div>
        </div>
      </div>

      {/* Tabs — horizontal scroll on mobile */}
      <div className="-mx-4 sm:mx-0 px-4 sm:px-0 mb-6 overflow-x-auto">
        <Tabs defaultValue={activeTab} onChange={setActiveTab}>
          <Tabs.List className="flex-nowrap whitespace-nowrap w-max sm:w-auto">
            <Tabs.Trigger value="profile">
              <UserCircleIcon className="w-4 h-4" /> Profile
            </Tabs.Trigger>
            <Tabs.Trigger value="preferences">
              <Cog6ToothIcon className="w-4 h-4" /> Preferences
            </Tabs.Trigger>
            <Tabs.Trigger value="notifications">
              <BellIcon className="w-4 h-4" /> Notifications
            </Tabs.Trigger>
            <Tabs.Trigger value="billing">
              <CreditCardIcon className="w-4 h-4" /> Billing
            </Tabs.Trigger>
            <Tabs.Trigger value="integrations">
              <GlobeAltIcon className="w-4 h-4" /> Integrations
            </Tabs.Trigger>
            <Tabs.Trigger value="security">
              <LockClosedIcon className="w-4 h-4" /> Security
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              <Card variant="elevated" padding="md" className="text-center p-5 sm:p-6 md:p-8">
                <Avatar size="2xl" fallback={profile.name.charAt(0)} className="mx-auto mb-4" />
                <h2 className="text-xl font-medium text-white">{profile.name}</h2>
                <p className="text-violet-400 text-sm mt-1">Free tier</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button variant="secondary" size="sm">
                    <PencilIcon className="w-4 h-4" /> Edit profile
                  </Button>
                </div>
              </Card>

              <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
                <h3 className="font-medium text-white mb-4">Account info</h3>
                <div className="space-y-3 text-sm">
                  <InfoRow label="Email" value={profile.email} icon={EnvelopeIcon} />
                  <InfoRow label="Member since" value="January 2026" icon={CalendarIcon} />
                  <InfoRow label="Sources active" value="3 / 5" icon={MagnifyingGlassIcon} />
                  <InfoRow label="Archive used" value="7 / 7 days" icon={LockClosedIcon} />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
                <h3 className="font-medium text-white mb-4 sm:mb-6">Profile details</h3>
                <div className="space-y-5">
                  <Input
                    label="Display name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Input
                    label="Bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    helperText="Shown to team members in workspaces"
                  />
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                  <Button variant="primary" size="sm" className="w-full sm:w-auto">Save changes</Button>
                </div>
              </Card>

              <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
                <h3 className="font-medium text-white mb-4 sm:mb-6">Preferences</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Timezone"
                      value={preferences.timezone}
                      onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                      options={['America/Chicago', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney']}
                    />
                    <SelectField
                      label="Language"
                      value={preferences.language}
                      onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                      options={['en', 'es', 'fr', 'de', 'ja', 'zh']}
                    />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                  <Button variant="primary" size="sm" className="w-full sm:w-auto">Save changes</Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Appearance</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {(['light', 'dark', 'system'] as const).map(theme => (
                  <button
                    key={theme}
                    onClick={() => setPreferences(prev => ({ ...prev, theme }))}
                    className={`p-3 sm:p-4 rounded-xl border transition-all text-center ${
                      preferences.theme === theme
                        ? 'border-violet-500 bg-violet-500/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {theme === 'light' && <SunIcon className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-amber-400" />}
                    {theme === 'dark' && <MoonIcon className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-violet-400" />}
                    {theme === 'system' && <ComputerDesktopIcon className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 text-violet-300" />}
                    <p className="font-medium text-white capitalize text-sm sm:text-base">{theme}</p>
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Digest settings</h3>
              <div className="space-y-5">
                <SelectField
                  label="Default cadence"
                  value={preferences.digestCadence}
                  onChange={(e) => setPreferences(prev => ({ ...prev, digestCadence: e.target.value as any }))}
                  options={['daily', 'weekly', 'custom']}
                />
                <SelectField
                  label="Default approval mode"
                  value={preferences.approvalMode}
                  onChange={(e) => setPreferences(prev => ({ ...prev, approvalMode: e.target.value as any }))}
                  options={['recommend_only', 'suggest_similar', 'never']}
                />
                <SelectField
                  label="Preferred reading depth"
                  value={preferences.preferredDepth}
                  onChange={(e) => setPreferences(prev => ({ ...prev, preferredDepth: e.target.value as any }))}
                  options={['skim', 'balanced', 'deep']}
                />
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <Button variant="primary" size="sm" className="w-full sm:w-auto">Save changes</Button>
              </div>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Approval modes explained</h3>
              <div className="space-y-3">
                {APPROVAL_MODES.map(mode => (
                  <div key={mode.mode} className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                          {mode.icon === 'zap' && <BoltIcon className="w-5 h-5" />}
                          {mode.icon === 'check-circle' && <CheckIcon className="w-5 h-5" />}
                          {mode.icon === 'eye' && <EyeIcon className="w-5 h-5" />}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-white">{mode.label}</p>
                          <p className="text-violet-400 text-sm line-clamp-2">{mode.description}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="approvalMode"
                        checked={preferences.approvalMode === mode.mode}
                        onChange={() => setPreferences(prev => ({ ...prev, approvalMode: mode.mode }))}
                        className="w-4 h-4 accent-violet-500 flex-shrink-0"
                        aria-label={mode.label}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-3 sm:mb-4">Delivery channels</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'emailDigest', label: 'Email digest', description: 'Receive scheduled digests via email', icon: EnvelopeIcon },
                  { key: 'emailAlerts', label: 'Email alerts', description: 'Breaking news and urgent updates via email', icon: EnvelopeIcon },
                  { key: 'slackDigest', label: 'Slack digest', description: 'Post digests to Slack channel', icon: ChatBubbleLeftRightIcon },
                  { key: 'slackAlerts', label: 'Slack alerts', description: 'Urgent alerts to Slack', icon: ChatBubbleLeftRightIcon },
                  { key: 'discordDigest', label: 'Discord digest', description: 'Post digests to Discord channel', icon: ChatBubbleLeftRightIcon },
                  { key: 'discordAlerts', label: 'Discord alerts', description: 'Urgent alerts to Discord', icon: ChatBubbleLeftRightIcon },
                  { key: 'smsAlerts', label: 'SMS alerts', description: 'Critical alerts via SMS (Max tier)', icon: PhoneIcon },
                ].map(item => (
                  <NotificationToggle
                    key={item.key}
                    {...item}
                    value={notifications[item.key as keyof typeof notifications]}
                    onChange={(val) => setNotifications(prev => ({ ...prev, [item.key]: val }))}
                    disabled={item.key === 'smsAlerts' && currentTier !== 'max'}
                  />
                ))}
              </div>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-3 sm:mb-4">Smart notifications</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { key: 'weeklyReport', label: 'Weekly report', description: 'Summary of your reading habits and source quality', icon: TruckIcon },
                  { key: 'newSourceRecommendations', label: 'New source recommendations', description: 'Notify when high-confidence sources are found', icon: MagnifyingGlassIcon },
                  { key: 'coverageGapAlerts', label: 'Coverage gap alerts', description: "Alert when you're missing key sources on a topic", icon: ShieldCheckIcon },
                ].map(item => (
                  <NotificationToggle
                    key={item.key}
                    {...item}
                    value={notifications[item.key as keyof typeof notifications]}
                    onChange={(val) => setNotifications(prev => ({ ...prev, [item.key]: val }))}
                  />
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <Button variant="primary" size="sm" className="w-full sm:w-auto">Save changes</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <div className="min-w-0">
                  <h3 className="font-medium text-white">Current plan</h3>
                  <p className="text-violet-400 text-sm">{TIER_FEATURES[currentTier].tagline}</p>
                </div>
                <Badge variant={currentTier === 'free' ? 'outline' : currentTier === 'lite' ? 'violet' : 'success'} size="md" className="self-start sm:self-auto">
                  {TIER_FEATURES[currentTier].name}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {(['free', 'lite', 'max'] as Tier[]).map(tier => (
                  <BillingTierCard
                    key={tier}
                    tier={tier}
                    features={TIER_FEATURES[tier]}
                    isCurrent={currentTier === tier}
                    onSelect={() => setCurrentTier(tier)}
                  />
                ))}
              </div>
            </Card>

            {currentTier !== 'free' && (
              <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
                <h3 className="font-medium text-white mb-4 sm:mb-6">Payment method</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <CreditCardIcon className="w-8 h-8 text-violet-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">•••• •••• •••• 4242</p>
                    <p className="text-violet-400 text-sm">Expires 12/28</p>
                  </div>
                  <Button variant="secondary" size="sm" className="self-start sm:self-auto">Update</Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Connected accounts</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: 'Email (Relay)', status: 'connected', description: 'synthwire_abc123@relay.synthwire.email', icon: EnvelopeIcon },
                  { name: 'Slack', status: 'connected', description: 'Connected to #research-digest', icon: ChatBubbleLeftRightIcon },
                  { name: 'Discord', status: 'disconnected', description: 'Not connected', icon: ChatBubbleLeftRightIcon },
                  { name: 'SMS', status: 'disconnected', description: 'Requires Max tier', icon: PhoneIcon, disabled: currentTier !== 'max' },
                ].map(item => (
                  <IntegrationRow key={item.name} {...item} />
                ))}
              </div>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">MCP Server</h3>
              <p className="text-violet-400 text-sm mb-4">Connect AI assistants and external tools to your Synthwire data via the Model Context Protocol.</p>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="min-w-0">
                    <p className="font-medium text-white">MCP Server URL</p>
                    <p className="text-violet-400 text-sm font-mono break-all">https://api.synthwire.email/mcp</p>
                  </div>
                  <Button variant="secondary" size="sm" className="self-start sm:self-auto flex-shrink-0">Copy URL</Button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="min-w-0">
                    <p className="font-medium text-white">API Key</p>
                    <p className="text-violet-400 text-sm font-mono">sw_live_••••••••••••••••</p>
                  </div>
                  <div className="flex gap-2 self-start sm:self-auto flex-shrink-0">
                    <Button variant="secondary" size="sm">Regenerate</Button>
                    <Button variant="ghost" size="sm">Copy</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Password</h3>
              <p className="text-violet-400 text-sm mb-4">Last changed: March 2026</p>
              <Button variant="secondary">
                <KeyIcon className="w-4 h-4" /> Change password
              </Button>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Two-factor authentication</h3>
              <p className="text-violet-400 text-sm mb-4">Add an extra layer of security to your account.</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="min-w-0">
                  <p className="font-medium text-white">Authenticator app</p>
                  <p className="text-violet-400 text-sm">Not enabled</p>
                </div>
                <Button variant="secondary" className="self-start sm:self-auto flex-shrink-0">
                  <ShieldCheckIcon className="w-4 h-4" /> Enable 2FA
                </Button>
              </div>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8">
              <h3 className="font-medium text-white mb-4 sm:mb-6">Active sessions</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'Corydon, IA', current: true, lastActive: 'Now' },
                  { device: 'Safari on iPhone', location: 'Corydon, IA', current: false, lastActive: '2 hours ago' },
                  { device: 'Slack Desktop', location: 'Corydon, IA', current: false, lastActive: '1 day ago' },
                ].map((session, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 min-w-0">
                      <ComputerDesktopIcon className="w-6 h-6 text-violet-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-white">{session.device}</p>
                        <p className="text-violet-400 text-sm">{session.location} • {session.lastActive}</p>
                      </div>
                      {session.current && <Badge variant="violet" size="sm">Current</Badge>}
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 self-start sm:self-auto">
                        <XMarkIcon className="w-4 h-4" /> Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 w-full">
                <XMarkIcon className="w-4 h-4" /> Revoke all other sessions
              </Button>
            </Card>

            <Card variant="elevated" padding="md" className="p-5 sm:p-6 md:p-8 border-red-500/20">
              <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                <LockClosedIcon className="w-5 h-5 text-red-400" />
                Delete account
              </h3>
              <p className="text-violet-400 text-sm mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <Button variant="danger">
                <TrashIcon className="w-4 h-4" /> Delete account
              </Button>
            </Card>
          </div>
        )}
    </div>
  );
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-xl">
      <Icon className="w-5 h-5 text-violet-400 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-violet-400 text-xs">{label}</p>
        <p className="font-medium text-white truncate">{value}</p>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-violet-300 mb-1">{label}</label>
      <select value={value} onChange={onChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function NotificationToggle({ label, description, icon: Icon, value, onChange, disabled }: { 
  label: string; 
  description: string; 
  icon: React.ComponentType<{ className?: string }>;
  value: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Icon className="w-5 h-5 text-violet-400 flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-medium text-white truncate">{label}</p>
          <p className="text-violet-400 text-sm truncate">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
      </label>
    </div>
  );
}

function BillingTierCard({ tier, features, isCurrent, onSelect }: {
  tier: Tier;
  features: typeof TIER_FEATURES[Tier];
  isCurrent: boolean;
  onSelect: () => void;
}) {
  return (
    <div className={`relative p-4 sm:p-6 rounded-xl border transition-all ${
      isCurrent
        ? 'border-violet-500 bg-violet-500/10'
        : 'border-white/10 hover:border-white/20'
    }`}>
      {isCurrent && (
        <div className="absolute -top-2 -right-2 bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full">Current</div>
      )}
      <div className="mb-4">
        <p className="text-2xl sm:text-3xl font-bold text-white">${features.price_monthly}</p>
        <p className="text-violet-400 text-sm">/month</p>
        {features.price_yearly > 0 && (
          <p className="text-emerald-400 text-sm mt-1">${features.price_yearly}/year (save 17%)</p>
        )}
      </div>
      <h4 className="font-medium text-white mb-2">{features.name}</h4>
      <p className="text-violet-400 text-sm mb-4">{features.tagline}</p>
      <ul className="space-y-2 mb-4 sm:mb-6">
        <li className="flex items-center gap-2 text-violet-300 text-sm">
          <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{features.sources_limit === 'unlimited' ? 'Unlimited sources' : `${features.sources_limit} sources`}</span>
        </li>
        <li className="flex items-center gap-2 text-violet-300 text-sm">
          <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{features.archive_days}-day archive</span>
        </li>
        {features.full_text_search && (
          <li className="flex items-center gap-2 text-violet-300 text-sm">
            <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Full-text search</span>
          </li>
        )}
        {features.redundancy_filter && (
          <li className="flex items-center gap-2 text-violet-300 text-sm">
            <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Redundancy filter</span>
          </li>
        )}
        {features.team_workspaces && (
          <li className="flex items-center gap-2 text-violet-300 text-sm">
            <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Team workspaces</span>
          </li>
        )}
      </ul>
      <Button
        variant={isCurrent ? 'secondary' : 'primary'}
        fullWidth
        onClick={onSelect}
        disabled={isCurrent}
      >
        {isCurrent ? 'Current plan' : tier === 'free' ? 'Downgrade' : `Upgrade to ${features.name}`}
      </Button>
    </div>
  );
}

function IntegrationRow({ name, status, description, icon: Icon, disabled }: {
  name: string;
  status: 'connected' | 'disconnected';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <Icon className={`w-6 h-6 flex-shrink-0 ${status === 'connected' ? 'text-emerald-400' : 'text-violet-400'}`} />
        <div className="min-w-0">
          <p className="font-medium text-white">{name}</p>
          <p className="text-violet-400 text-sm break-words">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 self-start sm:self-auto">
        <Badge variant={status === 'connected' ? 'success' : 'outline'} size="sm">
          {status === 'connected' ? 'Connected' : 'Not connected'}
        </Badge>
        {!disabled && (
          <Button variant={status === 'connected' ? 'ghost' : 'primary'} size="sm">
            {status === 'connected' ? 'Manage' : 'Connect'}
          </Button>
        )}
      </div>
    </div>
  );
}
