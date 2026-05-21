import { useMemo } from 'react';
import { isToday, subDays } from 'date-fns';
import { useHabits } from '@/context/useHabits';
import { useHabitStats } from '@/hooks/useHabitStats';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getStreak } from '@/lib/habits';
import { generateInsights, getPrimaryInsight, type ProductivityInsight } from '@/lib/insights';
import type { Habit } from '@/types/habit';
import type { HeatMapDay } from '@/hooks/useAnalytics';

export interface HabitReminder {
  habit: Habit;
  streak: number;
  /** Suggested time label for UX */
  dueLabel: string;
}

export interface GoalStats {
  daily: { current: number; target: number; percent: number };
  weekly: { current: number; target: number; percent: number };
  monthly: { current: number; target: number; percent: number };
  habitsOnTrack: number;
  habitsTotal: number;
}

export interface DashboardMetrics {
  focusScore: number;
  consistencyScore: number;
  primaryInsight: ProductivityInsight | null;
  allInsights: ProductivityInsight[];
  reminders: HabitReminder[];
  goals: GoalStats;
  /** Last 12 weeks for compact dashboard heatmap */
  heatmapWeeks: HeatMapDay[];
}

export function useDashboardMetrics(): DashboardMetrics {
  const { habits } = useHabits();
  const stats = useHabitStats();
  const analytics = useAnalytics();

  return useMemo(() => {
    const { percent, weeklyAvg, doneToday, total } = stats;

    // Focus: today's execution weighted with weekly rhythm
    const focusScore =
      total > 0 ? Math.round(percent * 0.65 + weeklyAvg * 0.35) : 0;

    // Consistency: 30-day rate + streak stability bonus
    const habitsWithStreak = habits.filter((h) => getStreak(h.completions) >= 3).length;
    const streakBonus =
      total > 0 ? Math.round((habitsWithStreak / total) * 12) : 0;
    const consistencyScore = Math.min(
      100,
      analytics.thirtyDayAvg + streakBonus,
    );

    const allInsights = generateInsights(habits, stats, analytics);
    const primaryInsight = getPrimaryInsight(allInsights);

    // Reminders: incomplete today, prioritise active streaks
    const reminders: HabitReminder[] = habits
      .filter((h) => !h.completions.some((c) => isToday(c)))
      .map((habit) => {
        const streak = getStreak(habit.completions);
        return {
          habit,
          streak,
          dueLabel: streak >= 3 ? 'Before midnight — streak at risk' : 'Due today',
        };
      })
      .sort((a, b) => b.streak - a.streak);

    const habitsOnTrack = analytics.habitStats.filter((h) => h.completionRate >= 70).length;

    const goals: GoalStats = {
      daily: {
        current: doneToday,
        target: total,
        percent,
      },
      weekly: {
        current: weeklyAvg,
        target: 100,
        percent: weeklyAvg,
      },
      monthly: {
        current: analytics.thirtyDayAvg,
        target: 100,
        percent: analytics.thirtyDayAvg,
      },
      habitsOnTrack,
      habitsTotal: total,
    };

    // Last 84 days (12 weeks) for mini heatmap
    const heatmapWeeks = analytics.heatmapDays.filter((d) =>
      d.date >= subDays(new Date(), 83),
    );

    return {
      focusScore,
      consistencyScore,
      primaryInsight,
      allInsights,
      reminders,
      goals,
      heatmapWeeks,
    };
  }, [habits, stats, analytics]);
}
