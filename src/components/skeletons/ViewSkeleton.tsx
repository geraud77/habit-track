import type { ReactElement } from 'react';
import type { View } from '@/context/navigationContext';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'dashboard' | 'habits' | 'analytics' | 'generic';

function skeletonVariant(view: View): SkeletonVariant {
  if (view === 'dashboard') return 'dashboard';
  if (view === 'habits') return 'habits';
  if (view === 'analytics') return 'analytics';
  return 'generic';
}

function StatCardSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-edge bg-surface p-4">
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-2.5 w-24" />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-52" />
      </div>
      <Skeleton className="h-28 w-full rounded-lg" />
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Skeleton className="h-36 rounded-lg lg:col-span-3" />
        <Skeleton className="h-36 rounded-lg lg:col-span-2" />
      </div>
      <Skeleton className="h-24 w-full rounded-lg" />
      <div className="grid gap-3 lg:grid-cols-2">
        <Skeleton className="h-28 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
      </div>
    </div>
  );
}

function HabitsSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
      <div className="flex flex-col gap-2 pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-xl border border-edge">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-4">
            <Skeleton className="h-2.5 w-12" />
            <Skeleton className="h-6 w-14" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-edge p-4">
        <Skeleton className="mb-3 h-4 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-edge p-4"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Skeleton className="mb-3 h-3.5 w-32" />
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, j) => (
                <Skeleton key={j} className="h-12 flex-1 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-6 py-7 pb-24 md:pb-10">
      <div className="flex flex-col gap-2 pb-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div>
        <Skeleton className="mb-3 h-2.5 w-24" />
        <div className="rounded-lg border border-edge p-5">
          <div className="flex gap-[3px]">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, j) => (
                  <Skeleton key={j} className="size-[13px] rounded-[2px]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
      <div className="flex flex-col gap-2 pb-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="rounded-lg border border-edge p-8">
        <Skeleton className="mx-auto mb-4 size-11 rounded-lg" />
        <Skeleton className="mx-auto h-3.5 w-40" />
        <Skeleton className="mx-auto mt-2 h-3 w-56" />
      </div>
    </div>
  );
}

const VARIANTS: Record<SkeletonVariant, () => ReactElement> = {
  dashboard: DashboardSkeleton,
  habits: HabitsSkeleton,
  analytics: AnalyticsSkeleton,
  generic: GenericSkeleton,
};

interface ViewSkeletonProps {
  view: View;
}

export function ViewSkeleton({ view }: ViewSkeletonProps) {
  const Component = VARIANTS[skeletonVariant(view)];
  return (
    <div className={cn('animate-fade-up')} aria-busy="true" aria-label="Loading">
      <Component />
    </div>
  );
}
