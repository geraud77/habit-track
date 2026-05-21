import {
  BarChart2,
  CalendarDays,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  Settings2,
  type LucideIcon,
} from 'lucide-react';

/** App view identifiers — single source of truth for routing */
export type View =
  | 'dashboard'
  | 'habits'
  | 'analytics'
  | 'insights'
  | 'calendar'
  | 'settings';

export const VIEW_ORDER: View[] = [
  'dashboard',
  'habits',
  'analytics',
  'insights',
  'calendar',
  'settings',
];

export const PAGE_LABELS: Record<View, string> = {
  dashboard: 'Dashboard',
  habits: 'Habits',
  analytics: 'Analytics',
  insights: 'Insights',
  calendar: 'Calendar',
  settings: 'Settings',
};

export interface NavItemConfig {
  id: View;
  label: string;
  icon: LucideIcon;
  /** Shorter label for mobile tab bar */
  mobileLabel?: string;
}

export const PRIMARY_NAV: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', mobileLabel: 'Home', icon: LayoutDashboard },
  { id: 'habits', label: 'Habits', icon: ListChecks },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
];

export const SETTINGS_NAV: NavItemConfig = {
  id: 'settings',
  label: 'Settings',
  icon: Settings2,
};

/** Keywords for command palette search */
export const COMMAND_KEYWORDS: Record<View, string[]> = {
  dashboard: ['home', 'overview'],
  habits: ['track', 'list', 'today'],
  analytics: ['charts', 'stats', 'data'],
  insights: ['ai', 'tips', 'patterns'],
  calendar: ['month', 'schedule'],
  settings: ['preferences', 'theme'],
};
