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
  badge: string;
  dayButton: string;
  dayButtonActive: string;
}

export const COLOR_MAP: Record<HabitColor, ColorConfig> = {
  violet: {
    dot: 'bg-violet-400',
    badge: 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/25',
    dayButton: 'hover:bg-violet-500/15 hover:text-violet-300',
    dayButtonActive:
      'bg-violet-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.45)] ring-2 ring-violet-400/30',
  },
  emerald: {
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25',
    dayButton: 'hover:bg-emerald-500/15 hover:text-emerald-300',
    dayButtonActive:
      'bg-emerald-500 text-white shadow-[0_0_18px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/30',
  },
  blue: {
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25',
    dayButton: 'hover:bg-blue-500/15 hover:text-blue-300',
    dayButtonActive:
      'bg-blue-500 text-white shadow-[0_0_18px_rgba(59,130,246,0.45)] ring-2 ring-blue-400/30',
  },
  amber: {
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25',
    dayButton: 'hover:bg-amber-500/15 hover:text-amber-300',
    dayButtonActive:
      'bg-amber-500 text-white shadow-[0_0_18px_rgba(245,158,11,0.45)] ring-2 ring-amber-400/30',
  },
  rose: {
    dot: 'bg-rose-400',
    badge: 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/25',
    dayButton: 'hover:bg-rose-500/15 hover:text-rose-300',
    dayButtonActive:
      'bg-rose-500 text-white shadow-[0_0_18px_rgba(244,63,94,0.45)] ring-2 ring-rose-400/30',
  },
  cyan: {
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25',
    dayButton: 'hover:bg-cyan-500/15 hover:text-cyan-300',
    dayButtonActive:
      'bg-cyan-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.45)] ring-2 ring-cyan-400/30',
  },
};
