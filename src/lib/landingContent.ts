import {
  BarChart2,
  Brain,
  CalendarDays,
  Keyboard,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
} from 'lucide-react';

export const LANDING_STATS = [
  { value: '$0', label: 'Free to use' },
  { value: '100%', label: 'Data stays on your device' },
  { value: '∞', label: 'Unlimited habits' },
] as const;

export const FEATURES: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: LayoutDashboard,
    title: 'Command center dashboard',
    description:
      'Daily progress, focus scores, weekly trends, and AI insights in one calm overview.',
  },
  {
    icon: BarChart2,
    title: 'Deep analytics',
    description:
      'Streak analytics, monthly completion charts, and consistency heatmaps from real data.',
  },
  {
    icon: Brain,
    title: 'Smart insights',
    description:
      'Natural-language tips on your best days, weekend patterns, and habit timing.',
  },
  {
    icon: ListChecks,
    title: 'Frictionless tracking',
    description:
      'Drag-and-drop ordering, one-tap completions, and keyboard shortcuts for power users.',
  },
  {
    icon: CalendarDays,
    title: 'Calendar view',
    description:
      'See completion dots across the month and spot gaps before they become streak breaks.',
  },
  {
    icon: Keyboard,
    title: 'Built for speed',
    description:
      'Command palette, keyboard shortcuts, and dark mode for quick daily check-ins.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'I open it every morning, tap my habits for the week, and the streak badges keep me honest. Simple and fast.',
    name: 'Jordan Lee',
    role: 'Product Designer',
    initials: 'JL',
  },
  {
    quote:
      'The analytics heatmap showed I was skipping weekends. I adjusted my routine and my completion rate went up within two weeks.',
    name: 'Samira Patel',
    role: 'Software Engineer',
    initials: 'SP',
  },
  {
    quote:
      'Having dashboard, calendar, and insights in one place beats juggling three different apps for the same habits.',
    name: 'Alex Morgan',
    role: 'Daily user',
    initials: 'AM',
  },
] as const;

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to build a consistent routine.',
    featured: false,
    cta: 'Get started',
    features: [
      'Unlimited habits',
      'Dashboard & analytics',
      'Insights & calendar',
      'Local storage — your data stays on device',
      'Dark & light mode',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$8',
    period: 'per month',
    description: 'For builders who want sync and advanced coaching.',
    featured: true,
    cta: 'Coming soon',
    features: [
      'Everything in Starter',
      'Cloud sync across devices',
      'Export habits as JSON',
      'Custom reminders',
      'Priority insight models',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    price: '$18',
    period: 'per seat / mo',
    description: 'Accountability groups and shared habit challenges.',
    featured: false,
    cta: 'Contact',
    features: [
      'Everything in Pro',
      'Shared team dashboards',
      'Group streak challenges',
      'Admin analytics',
      'SSO (roadmap)',
    ],
  },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Demo', href: '#product' },
  ],
  resources: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Documentation', href: '#features' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
} as const;

export const SHOWCASE_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'habits', label: 'Habits', icon: ListChecks },
] as const;
