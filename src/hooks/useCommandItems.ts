import { useCallback, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import {
  Check,
  ListChecks,
  Moon,
  Plus,
  RotateCcw,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import {
  COMMAND_KEYWORDS,
  PAGE_LABELS,
  PRIMARY_NAV,
  SETTINGS_NAV,
  type View,
} from '@/config/navigation';
import { useCommandPalette } from '@/context/commandPaletteContext';
import { useNav } from '@/context/navigationContext';
import { useHabits } from '@/context/useHabits';
import { useThemeContext } from '@/context/themeContext';
import { useToast } from '@/context/toastContext';
import { useOnboarding } from '@/context/onboardingContext';

export type CommandSection = 'navigation' | 'habits' | 'actions';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  section: CommandSection;
  keywords?: string[];
  onSelect: () => void;
}

export const COMMAND_SECTION_LABELS: Record<CommandSection, string> = {
  navigation: 'Go to',
  habits: 'Habits',
  actions: 'Actions',
};

export function matchesCommandQuery(item: CommandItem, q: string): boolean {
  if (!q) return true;
  const hay = [item.label, item.hint, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q.split(/\s+/).every((word) => hay.includes(word));
}

const ALL_NAV = [...PRIMARY_NAV, SETTINGS_NAV];

export function useCommandItems() {
  const { close } = useCommandPalette();
  const { view, navigate } = useNav();
  const { habits, toggleHabitCompletion, loadDemoHabits } = useHabits();
  const { theme, toggleTheme } = useThemeContext();
  const { toast } = useToast();
  const { resetOnboarding } = useOnboarding();

  const today = useMemo(() => new Date(), []);

  const buildItems = useCallback((): CommandItem[] => {
    const items: CommandItem[] = [];

    for (const { id, icon } of ALL_NAV) {
      const v = id as View;
      items.push({
        id: `nav-${v}`,
        label: PAGE_LABELS[v],
        hint: v === view ? 'Current page' : undefined,
        icon,
        section: 'navigation',
        keywords: COMMAND_KEYWORDS[v],
        onSelect: () => {
          navigate(v);
          close();
        },
      });
    }

    for (const habit of habits) {
      const done = habit.completions.some((d) => isSameDay(d, today));
      items.push({
        id: `habit-${habit.id}`,
        label: habit.name,
        hint: done ? 'Completed today' : 'Mark complete today',
        icon: done ? Check : ListChecks,
        section: 'habits',
        keywords: [habit.name, 'toggle', 'complete', 'search'],
        onSelect: () => {
          toggleHabitCompletion(habit.id, today);
          toast(
            done ? `Unchecked “${habit.name}”` : `Completed “${habit.name}”`,
            done ? 'info' : 'success',
          );
          close();
        },
      });
    }

    items.push(
      {
        id: 'action-add-habit',
        label: 'Add habit',
        hint: 'Go to Habits',
        icon: Plus,
        section: 'actions',
        keywords: ['new', 'create'],
        onSelect: () => {
          navigate('habits');
          close();
          requestAnimationFrame(() => {
            window.dispatchEvent(new CustomEvent('habitflow:focus-habit-form'));
          });
        },
      },
      {
        id: 'action-theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: theme === 'dark' ? Sun : Moon,
        section: 'actions',
        keywords: ['theme', 'appearance', 'dark', 'light'],
        onSelect: () => {
          toggleTheme();
          toast(theme === 'dark' ? 'Light mode enabled' : 'Dark mode enabled', 'info');
          close();
        },
      },
      {
        id: 'action-demo',
        label: 'Load demo habits',
        icon: RotateCcw,
        section: 'actions',
        keywords: ['sample', 'data', 'demo'],
        onSelect: () => {
          loadDemoHabits();
          close();
        },
      },
      {
        id: 'action-onboarding',
        label: 'Replay onboarding',
        icon: RotateCcw,
        section: 'actions',
        keywords: ['welcome', 'tutorial', 'start'],
        onSelect: () => {
          resetOnboarding();
          toast('Onboarding restarted', 'info');
          close();
        },
      },
    );

    return items;
  }, [
    view,
    habits,
    today,
    theme,
    navigate,
    close,
    toggleHabitCompletion,
    toggleTheme,
    toast,
    loadDemoHabits,
    resetOnboarding,
  ]);

  return useMemo(() => buildItems(), [buildItems]);
}
