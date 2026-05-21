import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/** Shimmer placeholder block */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-md bg-edge skeleton-shimmer', className)}
      style={style}
      aria-hidden
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}
