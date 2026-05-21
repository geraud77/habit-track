import { BarChart2, CheckCircle2, Flame, ListChecks, TrendingUp, type LucideIcon } from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { useAnalytics } from '@/hooks/useAnalytics';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { ChartShell } from '@/components/charts/ChartShell';
import { WeeklyTrendChart } from '@/components/charts/WeeklyTrendChart';
import { MonthlyCompletionChart } from '@/components/charts/MonthlyCompletionChart';
import { StreakAnalyticsChart } from '@/components/charts/StreakAnalyticsChart';
import { HeatMap } from '@/components/HeatMap';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { COLOR_MAP } from '@/types/habit';
import type { HabitStat } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div className="interactive-card flex flex-col gap-2.5 rounded-lg border border-edge bg-surface p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="label">{label}</span>
        <Icon size={13} strokeWidth={1.8} className="text-subtle" />
      </div>
      <div className="text-[26px] font-semibold leading-none tracking-[-0.05em] tabular-nums text-foreground">
        {value}
      </div>
    </div>
  );
}

function HabitConsistencyRow({ stat, index }: { stat: HabitStat; index: number }) {
  const colors = COLOR_MAP[stat.color];
  return (
    <div
      className="flex items-center gap-3 animate-fade-up"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <span className={cn('size-[6px] shrink-0 rounded-full', colors.dot)} />
      <span className="w-32 truncate text-[12px] text-muted-foreground">{stat.name}</span>
      <ProgressBar value={stat.completionRate} className="flex-1" barClassName={colors.bar} />
      <div className="flex w-20 items-center justify-end gap-1.5">
        {stat.currentStreak > 0 && (
          <span className="text-[10px] text-subtle">{stat.currentStreak}d</span>
        )}
        <span className="w-8 text-right text-[11px] font-medium tabular-nums text-muted-foreground">
          {stat.completionRate}%
        </span>
      </div>
    </div>
  );
}

export function AnalyticsView() {
  const { habits } = useHabits();
  const analytics = useAnalytics();

  const trendDelta =
    analytics.weeklyTrend.length >= 2
      ? analytics.weeklyTrend[analytics.weeklyTrend.length - 1].percent -
        analytics.weeklyTrend[analytics.weeklyTrend.length - 2].percent
      : 0;

  if (habits.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
        <PageHeader title="Analytics" subtitle="Visualize your habit performance over time" />
        <EmptyState
          icon={BarChart2}
          title="No data yet"
          description="Add habits and start tracking to unlock charts, heatmaps, and streak analytics."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-7 px-6 py-7 pb-24 md:pb-10">
      <PageHeader
        title="Analytics"
        subtitle="Visualize your habit performance over time"
      />

      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total completions" value={analytics.totalCompletions} icon={CheckCircle2} />
        <StatCard
          label="Best streak"
          value={analytics.bestStreak > 0 ? `${analytics.bestStreak}d` : '—'}
          icon={Flame}
        />
        <StatCard label="30-day avg" value={`${analytics.thirtyDayAvg}%`} icon={TrendingUp} />
        <StatCard label="Active habits" value={habits.length} icon={ListChecks} />
      </div>

      {/* Weekly trend — hero chart */}
      <ChartShell
        title="Weekly trend"
        subtitle="Last 12 weeks"
        footer={
          <p className="text-[11px] text-subtle">
            {trendDelta >= 0 ? (
              <>
                <span className="font-medium text-emerald-400">+{trendDelta}%</span> vs last week
              </>
            ) : (
              <>
                <span className="font-medium text-amber-400">{trendDelta}%</span> vs last week
              </>
            )}
            {' · '}Average completion rate per week
          </p>
        }
      >
        <WeeklyTrendChart data={analytics.weeklyTrend} />
      </ChartShell>

      {/* Monthly + Streak side by side */}
      <div className="grid gap-3 lg:grid-cols-2">
        <ChartShell title="Monthly completion" subtitle="Last 6 months">
          <MonthlyCompletionChart data={analytics.monthlyCompletion} />
        </ChartShell>

        <ChartShell title="Streak analytics" subtitle="Current streaks by habit">
          <StreakAnalyticsChart data={analytics.streakStats} />
        </ChartShell>
      </div>

      {/* Consistency heatmap */}
      <ChartShell
        title="Habit consistency heatmap"
        subtitle="Last 90 days · darker = more habits completed"
      >
        <HeatMap days={analytics.heatmapDays} />
      </ChartShell>

      {/* Per-habit 30-day rates */}
      <ChartShell title="Habit consistency" subtitle="30-day completion rate by habit">
        <div className="flex flex-col gap-3.5">
          {analytics.habitStats.map((stat, i) => (
            <HabitConsistencyRow key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </ChartShell>
    </div>
  );
}
