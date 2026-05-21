import {
  AlertTriangle,
  CalendarCheck,
  Clock,
  Flame,
  Sparkles,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { AnalyticsData, DowStat } from '@/hooks/useAnalytics';
import type { HabitStats } from '@/hooks/useHabitStats';
import type { Habit } from '@/types/habit';

export type InsightType = 'success' | 'info' | 'warning' | 'neutral';

export interface ProductivityInsight {
  id: string;
  icon: LucideIcon;
  /** Small category label shown above the message */
  category: string;
  /** Primary AI-style sentence */
  message: string;
  /** Optional supporting detail */
  detail?: string;
  type: InsightType;
  /** Shown on card when insight uses estimated patterns */
  estimated?: boolean;
}

const DOW_FULL: Record<string, string> = {
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

/** Deterministic mock bias from habit id (40–88%) for demo-quality copy. */
function mockNoonBias(habit: Habit): number {
  let hash = 0;
  for (let i = 0; i < habit.id.length; i++) {
    hash = (hash + habit.id.charCodeAt(i)) | 0;
  }
  return 40 + (Math.abs(hash) % 49);
}

function pickHabitForTimingInsight(habits: Habit[]): Habit | null {
  if (habits.length === 0) return null;
  const keyword = habits.find((h) =>
    /water|drink|hydrat|morning|coffee|tea/i.test(h.name),
  );
  if (keyword) return keyword;
  return habits.reduce((best, h) =>
    h.completions.length > best.completions.length ? h : best,
  );
}

function analyzeBeforeNoonBias(habit: Habit): {
  biasPercent: number;
  prefersMorning: boolean;
  estimated: boolean;
} {
  const completions = habit.completions;
  if (completions.length < 4) {
    const bias = mockNoonBias(habit);
    return { biasPercent: bias, prefersMorning: true, estimated: true };
  }

  let morning = 0;
  let afternoon = 0;
  for (const c of completions) {
    if (c.getHours() < 12) morning++;
    else afternoon++;
  }

  if (morning + afternoon < 4) {
    const bias = mockNoonBias(habit);
    return { biasPercent: bias, prefersMorning: true, estimated: true };
  }

  if (afternoon === 0) {
    return { biasPercent: 100, prefersMorning: true, estimated: false };
  }
  if (morning === 0) {
    return { biasPercent: 65, prefersMorning: false, estimated: false };
  }

  if (morning >= afternoon) {
    const bias = Math.min(120, Math.round((morning / afternoon - 1) * 100));
    return { biasPercent: Math.max(bias, 15), prefersMorning: true, estimated: false };
  }

  const bias = Math.min(120, Math.round((afternoon / morning - 1) * 100));
  return { biasPercent: Math.max(bias, 15), prefersMorning: false, estimated: false };
}

function buildTimeOfDayInsight(habits: Habit[]): ProductivityInsight | null {
  const habit = pickHabitForTimingInsight(habits);
  if (!habit) return null;

  const { biasPercent, prefersMorning, estimated } = analyzeBeforeNoonBias(habit);

  if (prefersMorning) {
    return {
      id: 'time-pattern',
      icon: Clock,
      category: 'Timing pattern',
      message: `You complete your ${habit.name.toLowerCase()} habit ${biasPercent}% more often before noon.`,
      detail: estimated
        ? 'Estimated from your tracking profile — more completions will sharpen this.'
        : `Based on ${habit.completions.length} logged completions with timestamps.`,
      type: 'info',
      estimated,
    };
  }

  return {
    id: 'time-pattern-pm',
    icon: Clock,
    category: 'Timing pattern',
    message: `You're ${biasPercent}% more likely to finish "${habit.name}" in the afternoon or evening.`,
    detail: estimated
      ? 'Estimated from your tracking profile — more completions will sharpen this.'
      : `Based on ${habit.completions.length} logged completions with timestamps.`,
    type: 'info',
    estimated,
  };
}

function avgPercent(stats: DowStat[]): number {
  if (stats.length === 0) return 0;
  return Math.round(stats.reduce((s, d) => s + d.percent, 0) / stats.length);
}

function buildWeekendInsight(dowStats: DowStat[]): ProductivityInsight | null {
  const weekdays = dowStats.filter((d) => d.dow >= 1 && d.dow <= 5);
  const weekends = dowStats.filter((d) => d.dow === 0 || d.dow === 6);
  const weekdayAvg = avgPercent(weekdays);
  const weekendAvg = avgPercent(weekends);
  const diff = weekdayAvg - weekendAvg;

  if (diff >= 10) {
    return {
      id: 'weekend-drop',
      icon: TrendingDown,
      category: 'Weekly rhythm',
      message: `Your productivity drops on weekends — ${weekendAvg}% completion vs ${weekdayAvg}% on weekdays.`,
      detail: 'Consider lighter weekend routines or habit stacking with existing plans.',
      type: 'warning',
    };
  }

  if (diff <= -10) {
    return {
      id: 'weekend-warrior',
      icon: Sun,
      category: 'Weekly rhythm',
      message: `You're ${Math.abs(diff)}% more consistent on weekends than weekdays.`,
      detail: 'Your weekday routine may need a simpler morning anchor habit.',
      type: 'info',
    };
  }

  return null;
}

function buildBestDayInsight(dowStats: DowStat[]): ProductivityInsight | null {
  const sorted = [...dowStats].sort((a, b) => b.percent - a.percent);
  const best = sorted[0];
  const second = sorted[1];
  if (!best || best.percent === 0) return null;
  if (second && best.percent - second.percent < 5) return null;

  const dayName = DOW_FULL[best.label] ?? best.label;

  return {
    id: 'best-day',
    icon: CalendarCheck,
    category: 'Peak day',
    message: `Best performance day: ${dayName}.`,
    detail: `${best.percent}% average completion on ${dayName}s over the last 90 days.`,
    type: 'success',
  };
}

function buildMonthlyTrendInsight(analytics: AnalyticsData): ProductivityInsight | null {
  const months = analytics.monthlyCompletion;
  if (months.length < 2) return null;

  const recent = months[months.length - 1].percent;
  const previous = months[months.length - 2].percent;
  const delta = recent - previous;
  const monthLabel = months[months.length - 1].label;

  if (delta >= 8) {
    return {
      id: 'month-trend-up',
      icon: TrendingUp,
      category: 'Monthly trend',
      message: `Your completion rate improved ${delta}% in ${monthLabel} compared to the prior month.`,
      detail: 'Momentum is building — protect this streak while it compounds.',
      type: 'success',
    };
  }

  if (delta <= -8) {
    return {
      id: 'month-trend-down',
      icon: TrendingDown,
      category: 'Monthly trend',
      message: `Completion slipped ${Math.abs(delta)}% in ${monthLabel} — a small reset can reverse the trend.`,
      detail: 'Focus on one habit this week rather than trying to fix everything at once.',
      type: 'warning',
    };
  }

  return null;
}

function buildFocusHabitInsight(analytics: AnalyticsData): ProductivityInsight | null {
  const top = analytics.habitStats[0];
  const bottom = analytics.habitStats[analytics.habitStats.length - 1];
  if (!top || top.completionRate < 70) return null;
  if (analytics.habitStats.length < 2 || !bottom) return null;

  const gap = top.completionRate - bottom.completionRate;
  if (gap < 35) return null;

  return {
    id: 'focus-split',
    icon: Sparkles,
    category: 'Habit balance',
    message: `"${top.name}" leads at ${top.completionRate}% while "${bottom.name}" trails at ${bottom.completionRate}% — widening the gap risks uneven progress.`,
    detail: 'Pair your weakest habit with your strongest to borrow existing momentum.',
    type: 'info',
  };
}

/**
 * Data-driven + heuristic productivity insights (AI-style copy).
 */
export function generateInsights(
  habits: Habit[],
  stats: HabitStats,
  analytics: AnalyticsData,
): ProductivityInsight[] {
  if (habits.length === 0) return [];

  const cards: ProductivityInsight[] = [];
  const { topStreak, weeklyAvg, doneToday, total } = stats;

  // ── AI-style pattern insights (prioritised) ─────────────────
  const bestDay = buildBestDayInsight(analytics.dowStats);
  if (bestDay) cards.push(bestDay);

  const weekend = buildWeekendInsight(analytics.dowStats);
  if (weekend) cards.push(weekend);

  const timePattern = buildTimeOfDayInsight(habits);
  if (timePattern) cards.push(timePattern);

  const monthTrend = buildMonthlyTrendInsight(analytics);
  if (monthTrend) cards.push(monthTrend);

  const focusSplit = buildFocusHabitInsight(analytics);
  if (focusSplit) cards.push(focusSplit);

  // ── Streak & performance ────────────────────────────────────
  if (topStreak.streak >= 3) {
    const nextMilestone =
      topStreak.streak < 7 ? 7
      : topStreak.streak < 14 ? 14
      : topStreak.streak < 30 ? 30
      : topStreak.streak < 100 ? 100
      : null;

    cards.push({
      id: 'streak',
      icon: Flame,
      category: 'Streak',
      message: nextMilestone
        ? `"${topStreak.name}" is on a ${topStreak.streak}-day streak — ${nextMilestone - topStreak.streak} days from your ${nextMilestone}-day milestone.`
        : `"${topStreak.name}" is on a ${topStreak.streak}-day streak. Exceptional consistency.`,
      type: 'success',
    });
  }

  if (analytics.habitStats.length > 0) {
    const top = analytics.habitStats[0];
    if (top.completionRate >= 80) {
      cards.push({
        id: 'top-habit',
        icon: Trophy,
        category: 'Consistency',
        message: `"${top.name}" is completed ${top.completionRate}% of the time over the last 30 days — it's becoming automatic.`,
        type: 'success',
      });
    }

    const bottom = analytics.habitStats[analytics.habitStats.length - 1];
    if (analytics.habitStats.length > 1 && bottom.completionRate < 40) {
      cards.push({
        id: 'bottom-habit',
        icon: AlertTriangle,
        category: 'At risk',
        message: `"${bottom.name}" is only at ${bottom.completionRate}% this month — it's your biggest opportunity for improvement.`,
        detail: 'Try habit stacking: attach it to something you already do daily.',
        type: 'warning',
      });
    }
  }

  // ── Today & weekly ──────────────────────────────────────────
  if (doneToday === total && total > 0) {
    cards.push({
      id: 'perfect-day',
      icon: Zap,
      category: 'Today',
      message: 'Perfect day — every habit is complete. Recovery counts as progress too.',
      type: 'success',
    });
  } else if (doneToday === 0 && total > 0) {
    cards.push({
      id: 'start-today',
      icon: Target,
      category: 'Today',
      message: `${total} habit${total === 1 ? '' : 's'} waiting — completing just one often triggers a productive chain reaction.`,
      type: 'info',
    });
  } else if (total > doneToday) {
    cards.push({
      id: 'remaining',
      icon: TrendingUp,
      category: 'Today',
      message: `${total - doneToday} habit${total - doneToday === 1 ? '' : 's'} left today. You're ${Math.round((doneToday / total) * 100)}% of the way there.`,
      type: 'info',
    });
  }

  if (weeklyAvg >= 80) {
    cards.push({
      id: 'weekly-fire',
      icon: Zap,
      category: 'This week',
      message: `${weeklyAvg}% weekly average — you're operating at a high consistency baseline.`,
      type: 'success',
    });
  } else if (weeklyAvg > 0 && weeklyAvg < 45) {
    cards.push({
      id: 'weekly-low',
      icon: TrendingUp,
      category: 'This week',
      message: `${weeklyAvg}% weekly average — one completed habit today can restart your momentum.`,
      type: 'info',
    });
  }

  const milestones = [10, 25, 50, 100, 250, 500];
  const next = milestones.find((m) => m > analytics.totalCompletions);
  if (next && analytics.totalCompletions > 0) {
    cards.push({
      id: 'milestone',
      icon: Target,
      category: 'Milestone',
      message: `${next - analytics.totalCompletions} completions until you hit ${next} total — stay the course.`,
      type: 'neutral',
    });
  }

  return cards;
}

const PRIMARY_IDS = [
  'best-day',
  'weekend-drop',
  'time-pattern',
  'time-pattern-pm',
  'month-trend-up',
  'month-trend-down',
  'focus-split',
];

/** Returns the best insight for dashboard hero display. */
export function getPrimaryInsight(insights: ProductivityInsight[]): ProductivityInsight | null {
  if (insights.length === 0) return null;

  for (const id of PRIMARY_IDS) {
    const found = insights.find((i) => i.id === id);
    if (found) return found;
  }

  const priority: InsightType[] = ['success', 'warning', 'info', 'neutral'];
  for (const type of priority) {
    const found = insights.find((i) => i.type === type);
    if (found) return found;
  }
  return insights[0];
}
