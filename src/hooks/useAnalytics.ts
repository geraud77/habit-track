import { useMemo } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import { useHabits } from '@/context/useHabits';
import { getStreak } from '@/lib/habits';
import type { Habit, HabitColor } from '@/types/habit';

export interface HeatMapDay {
  date: Date;
  count: number;
  total: number;
  /** 0 = no completions, 4 = all habits done */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface HabitStat {
  id: string;
  name: string;
  color: HabitColor;
  /** 0–100, based on last 30 days */
  completionRate: number;
  currentStreak: number;
  totalCompletions: number;
}

export interface DowStat {
  dow: number;
  label: string;
  percent: number;
}

export interface WeeklyTrendPoint {
  weekStart: Date;
  label: string;
  percent: number;
  completed: number;
  possible: number;
}

export interface MonthlyPoint {
  monthStart: Date;
  label: string;
  percent: number;
  completed: number;
  possible: number;
}

export interface StreakStat {
  id: string;
  name: string;
  color: HabitColor;
  currentStreak: number;
  completionRate30: number;
}

export interface AnalyticsData {
  heatmapDays: HeatMapDay[];
  habitStats: HabitStat[];
  dowStats: DowStat[];
  weeklyTrend: WeeklyTrendPoint[];
  monthlyCompletion: MonthlyPoint[];
  streakStats: StreakStat[];
  totalCompletions: number;
  bestStreak: number;
  /** Overall completion % over the last 30 days */
  thirtyDayAvg: number;
}

function completionPercentForDays(
  habits: Habit[],
  days: Date[],
): { percent: number; completed: number; possible: number } {
  const total = habits.length;
  if (total === 0 || days.length === 0) {
    return { percent: 0, completed: 0, possible: 0 };
  }
  let completed = 0;
  for (const day of days) {
    completed += habits.filter((h) =>
      h.completions.some((c) => isSameDay(c, day)),
    ).length;
  }
  const possible = days.length * total;
  return {
    percent: Math.round((completed / possible) * 100),
    completed,
    possible,
  };
}

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function useAnalytics(): AnalyticsData {
  const { habits } = useHabits();

  return useMemo(() => {
    const today = new Date();
    const days90 = Array.from({ length: 90 }, (_, i) => subDays(today, 89 - i));
    const days30 = Array.from({ length: 30 }, (_, i) => subDays(today, 29 - i));

    // ── 90-day heatmap ──────────────────────────────────────
    const heatmapDays: HeatMapDay[] = days90.map((day) => {
      const count = habits.filter((h) =>
        h.completions.some((c) => isSameDay(c, day)),
      ).length;
      const total = habits.length;
      const ratio = total > 0 ? count / total : 0;
      const level: 0 | 1 | 2 | 3 | 4 =
        ratio === 0 ? 0
        : ratio <= 0.25 ? 1
        : ratio <= 0.5 ? 2
        : ratio <= 0.75 ? 3
        : 4;
      return { date: day, count, total, level };
    });

    // ── Per-habit stats (last 30 days) ──────────────────────
    const habitStats: HabitStat[] = habits
      .map((habit) => {
        const done = days30.filter((d) =>
          habit.completions.some((c) => isSameDay(c, d)),
        ).length;
        return {
          id: habit.id,
          name: habit.name,
          color: habit.color,
          completionRate: Math.round((done / 30) * 100),
          currentStreak: getStreak(habit.completions),
          totalCompletions: habit.completions.length,
        };
      })
      .sort((a, b) => b.completionRate - a.completionRate);

    // ── Day-of-week breakdown (last 90 days) ────────────────
    const dowStats: DowStat[] = [0, 1, 2, 3, 4, 5, 6].map((dow) => {
      const daysOfType = days90.filter((d) => getDay(d) === dow);
      const completions = daysOfType.reduce(
        (sum, day) =>
          sum +
          habits.filter((h) => h.completions.some((c) => isSameDay(c, day))).length,
        0,
      );
      const maxPossible = daysOfType.length * habits.length;
      return {
        dow,
        label: DOW_LABELS[dow],
        percent: maxPossible > 0 ? Math.round((completions / maxPossible) * 100) : 0,
      };
    });

    // ── Aggregate metrics ───────────────────────────────────
    const totalCompletions = habits.reduce((sum, h) => sum + h.completions.length, 0);
    const bestStreak = Math.max(0, ...habits.map((h) => getStreak(h.completions)));

    const thirtyDayTotal = days30.reduce(
      (sum, day) =>
        sum + habits.filter((h) => h.completions.some((c) => isSameDay(c, day))).length,
      0,
    );
    const thirtyDayMax = days30.length * habits.length;
    const thirtyDayAvg = thirtyDayMax > 0
      ? Math.round((thirtyDayTotal / thirtyDayMax) * 100)
      : 0;

    // ── Weekly trend (last 12 weeks) ─────────────────────────
    const weeklyTrend: WeeklyTrendPoint[] = Array.from({ length: 12 }, (_, i) => {
      const weekStart = startOfWeek(subWeeks(today, 11 - i), { weekStartsOn: 1 });
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const rangeEnd = weekEnd > today ? today : weekEnd;
      const days = eachDayOfInterval({ start: weekStart, end: rangeEnd });
      const { percent, completed, possible } = completionPercentForDays(habits, days);
      return {
        weekStart,
        label: format(weekStart, 'MMM d'),
        percent,
        completed,
        possible,
      };
    });

    // ── Monthly completion (last 6 months) ─────────────────
    const monthlyCompletion: MonthlyPoint[] = Array.from({ length: 6 }, (_, i) => {
      const monthStart = startOfMonth(subMonths(today, 5 - i));
      const monthEnd = endOfMonth(monthStart);
      const rangeEnd = monthEnd > today ? today : monthEnd;
      const days = eachDayOfInterval({ start: monthStart, end: rangeEnd });
      const { percent, completed, possible } = completionPercentForDays(habits, days);
      return {
        monthStart,
        label: format(monthStart, 'MMM'),
        percent,
        completed,
        possible,
      };
    });

    // ── Streak analytics (per habit) ───────────────────────
    const streakStats: StreakStat[] = habits
      .map((habit) => {
        const done = days30.filter((d) =>
          habit.completions.some((c) => isSameDay(c, d)),
        ).length;
        return {
          id: habit.id,
          name: habit.name,
          color: habit.color,
          currentStreak: getStreak(habit.completions),
          completionRate30: Math.round((done / 30) * 100),
        };
      })
      .sort((a, b) => b.currentStreak - a.currentStreak || b.completionRate30 - a.completionRate30);

    return {
      heatmapDays,
      habitStats,
      dowStats,
      weeklyTrend,
      monthlyCompletion,
      streakStats,
      totalCompletions,
      bestStreak,
      thirtyDayAvg,
    };
  }, [habits]);
}
