import { useMemo } from 'react';
import { isSameDay, isToday, subDays } from 'date-fns';
import { useHabits } from '@/context/useHabits';
import { getStreak } from '@/lib/habits';
import type { HabitColor } from '@/types/habit';

export interface DayData {
  day: Date;
  percent: number;
}

export interface HabitStats {
  /** Number of habits with at least one completion today. */
  doneToday: number;
  /** Total number of habits. */
  total: number;
  /** Today's completion as a 0–100 percentage. */
  percent: number;
  /** True only when every habit has been completed today. */
  allDoneToday: boolean;
  /** Completion percentage for each of the last 7 days. */
  weeklyData: DayData[];
  /** Average completion percentage across the last 7 days. */
  weeklyAvg: number;
  /** The habit with the longest current consecutive streak. */
  topStreak: { name: string; streak: number; color: HabitColor };
}

/**
 * Derives all analytics from the current habits list.
 * Extracted as a custom hook so it can be reused across components
 * and tested in isolation.
 */
export function useHabitStats(): HabitStats {
  const { habits } = useHabits();

  return useMemo<HabitStats>(() => {
    const today = new Date();
    const total = habits.length;
    const doneToday = habits.filter((h) => h.completions.some((c) => isToday(c))).length;
    const percent = total > 0 ? Math.round((doneToday / total) * 100) : 0;
    const allDoneToday = total > 0 && doneToday === total;

    const last7 = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i));
    const weeklyData: DayData[] = last7.map((day) => {
      const completed = habits.filter((h) =>
        h.completions.some((c) => isSameDay(c, day)),
      ).length;
      return { day, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
    });
    const weeklyAvg =
      weeklyData.length > 0
        ? Math.round(weeklyData.reduce((s, d) => s + d.percent, 0) / weeklyData.length)
        : 0;

    const topStreak = habits.reduce(
      (best, h) => {
        const s = getStreak(h.completions);
        return s > best.streak ? { name: h.name, streak: s, color: h.color } : best;
      },
      { name: '', streak: 0, color: 'violet' as HabitColor },
    );

    return { doneToday, total, percent, allDoneToday, weeklyData, weeklyAvg, topStreak };
  }, [habits]);
}
