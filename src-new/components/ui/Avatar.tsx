'use client';

import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', shape = 'circle', status, children, ...props }, ref) => {
    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-24 h-24 text-2xl',
    };

    const shapes = {
      circle: 'rounded-full',
      square: 'rounded-xl',
    };

    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
      '2xl': 'w-5 h-5',
    };

    const statusColors = {
      online: 'bg-emerald-500',
      offline: 'bg-violet-500',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    };

    const statusPosition = {
      xs: 'bottom-0 right-0',
      sm: 'bottom-0 right-0',
      md: 'bottom-0 right-0',
      lg: 'bottom-0 right-0',
      xl: 'bottom-0 right-0',
      '2xl': 'bottom-0 right-0',
    };

    return (
      <div ref={ref} className={twMerge('relative inline-flex shrink-0', className)} {...props}>
        {src ? (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            className={twMerge(sizes[size], shapes[shape], 'object-cover')}
          />
        ) : children ? (
          <div className={twMerge(sizes[size], shapes[shape], 'bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center font-medium text-white')}>
            {children}
          </div>
        ) : (
          <div className={twMerge(sizes[size], shapes[shape], 'bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center font-medium text-white')}>
            {fallback || '?'}
          </div>
        )}
        {status && (
          <span
            className={twMerge(
              'absolute border-2 border-violet-950 rounded-full',
              statusSizes[size],
              statusColors[status],
              statusPosition[size]
            )}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { max?: number }>(
  ({ className, max = 5, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    return (
      <div ref={ref} className={twMerge('flex -space-x-2', className)} {...props}>
        {visibleChildren.map((child, index) => (
          <span key={index} style={{ zIndex: max - index }}>
            {child}
          </span>
        ))}
        {remainingCount > 0 && (
          <span style={{ zIndex: 0 }}>
            <Avatar
              size="md"
              fallback={`+${remainingCount}`}
              className="bg-white/10 text-violet-300 border-2 border-violet-950"
            />
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

import React from 'react';