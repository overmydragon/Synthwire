'use client';

import { createContext, useContext, useState, forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant: 'line' | 'enclosed' | 'soft' | 'pills';
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within Tabs.Root');
  return context;
};

interface TabsRootProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'line' | 'enclosed' | 'soft' | 'pills';
  children: ReactNode;
  className?: string;
}

export const TabsRoot = ({ defaultValue, value, onChange, variant = 'line', children, className }: TabsRootProps) => {
  const [activeTab, setActiveTab] = useState(value || defaultValue);

  const handleChange = (tab: string) => {
    if (value === undefined) setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange, variant }}>
      <div className={twMerge(className)}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ className, children, ...props }, ref) => {
  const { variant } = useTabsContext();

  const variants = {
    line: 'bg-transparent',
    enclosed: 'bg-white/5 p-1 rounded-xl',
    soft: 'bg-white/5 p-1 rounded-xl',
    pills: 'bg-transparent',
  };

  return (
    <div
      ref={ref}
      role="tablist"
      className={twMerge('flex items-center gap-1', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { activeTab, setActiveTab, variant } = useTabsContext();
    const isActive = activeTab === value;

    const variants = {
      line: isActive
        ? 'text-white border-b-2 border-violet-500 bg-transparent'
        : 'text-violet-400 hover:text-white hover:bg-white/5',
      enclosed: isActive
        ? 'text-white bg-violet-600 shadow-lg shadow-violet-500/25'
        : 'text-violet-400 hover:text-white hover:bg-white/5',
      soft: isActive
        ? 'text-violet-600 bg-white/10'
        : 'text-violet-400 hover:text-white hover:bg-white/5',
      pills: isActive
        ? 'text-white bg-violet-600 shadow-lg shadow-violet-500/25'
        : 'text-violet-400 hover:text-white hover:bg-white/5',
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`${value}-panel`}
        id={`${value}-trigger`}
        disabled={disabled}
        className={twMerge(
          'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-violet-950',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          className
        )}
        onClick={() => !disabled && setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, variant } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${value}-panel`}
        aria-labelledby={`${value}-trigger`}
        className={twMerge('animate-fade-in', variant === 'enclosed' && 'p-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});