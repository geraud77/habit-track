import { lazy, Suspense, type ComponentType } from 'react';
import type { View } from '@/config/navigation';
import { ViewSkeleton } from '@/components/skeletons/ViewSkeleton';

const DashboardView = lazy(() =>
  import('@/views/DashboardView').then((m) => ({ default: m.DashboardView })),
);
const HabitsView = lazy(() =>
  import('@/views/HabitsView').then((m) => ({ default: m.HabitsView })),
);
const AnalyticsView = lazy(() =>
  import('@/views/AnalyticsView').then((m) => ({ default: m.AnalyticsView })),
);
const InsightsView = lazy(() =>
  import('@/views/InsightsView').then((m) => ({ default: m.InsightsView })),
);
const CalendarView = lazy(() =>
  import('@/views/CalendarView').then((m) => ({ default: m.CalendarView })),
);
const SettingsView = lazy(() =>
  import('@/views/SettingsView').then((m) => ({ default: m.SettingsView })),
);

const VIEW_MAP: Record<View, ComponentType> = {
  dashboard: DashboardView,
  habits: HabitsView,
  analytics: AnalyticsView,
  insights: InsightsView,
  calendar: CalendarView,
  settings: SettingsView,
};

interface ViewRendererProps {
  view: View;
}

/** Renders the active view with code-splitting — only loads the chunk when navigated to */
export function ViewRenderer({ view }: ViewRendererProps) {
  const Component = VIEW_MAP[view];
  return (
    <Suspense fallback={<ViewSkeleton view={view} />}>
      <Component />
    </Suspense>
  );
}
