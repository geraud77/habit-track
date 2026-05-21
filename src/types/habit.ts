export type HabitColor = 'violet' | 'emerald' | 'blue' | 'amber' | 'rose' | 'cyan';

export interface Habit {
  id: string;
  name: string;
  color: HabitColor;
  createdAt: Date;
  completions: Date[];
}

export const HABIT_COLORS: HabitColor[] = [
  'violet',
  'emerald',
  'blue',
  'amber',
  'rose',
  'cyan',
];

export interface ColorConfig {
  dot: string;
  bar: string;
  badge: string;
  dayButton: string;
  /** Solid fill, no glow — keeps the UI clean and production-grade. */
  dayButtonActive: string;
}

export const COLOR_MAP: Record<HabitColor, ColorConfig> = {
  violet: {
    dot: 'bg-violet-400',
    bar: 'bg-violet-500',
    badge: 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/25',
    dayButton: 'hover:bg-violet-500/15 hover:text-violet-300',
    dayButtonActive: 'bg-violet-500 text-white',
  },
  emerald: {
    dot: 'bg-emerald-400',
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25',
    dayButton: 'hover:bg-emerald-500/15 hover:text-emerald-300',
    dayButtonActive: 'bg-emerald-500 text-white',
  },
  blue: {
    dot: 'bg-blue-400',
    bar: 'bg-blue-500',
    badge: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25',
    dayButton: 'hover:bg-blue-500/15 hover:text-blue-300',
    dayButtonActive: 'bg-blue-500 text-white',
  },
  amber: {
    dot: 'bg-amber-400',
    bar: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25',
    dayButton: 'hover:bg-amber-500/15 hover:text-amber-300',
    dayButtonActive: 'bg-amber-500 text-white',
  },
  rose: {
    dot: 'bg-rose-400',
    bar: 'bg-rose-500',
    badge: 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25',
    dayButton: 'hover:bg-rose-500/15 hover:text-rose-300',
    dayButtonActive: 'bg-rose-500 text-white',
  },
  cyan: {
    dot: 'bg-cyan-400',
    bar: 'bg-cyan-500',
    badge: 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25',
    dayButton: 'hover:bg-cyan-500/15 hover:text-cyan-300',
    dayButtonActive: 'bg-cyan-500 text-white',
  },
};
