import { format, isToday } from 'date-fns';
import {
  BarChart2,
  Bell,
  Brain,
  CalendarDays,
  Check,
  Flame,
  Lightbulb,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { useHabitStats } from '@/hooks/useHabitStats';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useNav } from '@/context/navigationContext';
import { AiInsightCard } from '@/components/AiInsightCard';
import { CompletionCheckbox } from '@/components/CompletionCheckbox';
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState';
import { MiniHeatMap } from '@/components/dashboard/MiniHeatMap';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { COLOR_MAP } from '@/types/habit';
import { getStreak } from '@/lib/habits';
import type { Habit } from '@/types/habit';
import { Panel } from '@/components/ui/Panel';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

// ── Score gauge ─────────────────────────────────────────────────────────────────

function scoreTone(value: number) {
  if (value >= 80) return 'text-emerald-400';
  if (value >= 50) return 'text-violet-400';
  return 'text-amber-400';
}

function ScoreGauge({
  label,
  value,
  icon: Icon,
  description,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
}) {
  return (
    <Panel className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="label">{label}</span>
        <Icon size={13} strokeWidth={1.8} className="text-subtle" />
      </div>
      <div className={cn('text-[36px] font-semibold leading-none tracking-[-0.06em] tabular-nums', scoreTone(value))}>
        {value}
        <span className="text-[16px] font-medium text-subtle">/100</span>
      </div>
      <ProgressBar value={value} size="md" />
      <p className="text-[11px] leading-snug text-subtle">{description}</p>
    </Panel>
  );
}

// ── Daily progress hero ───────────────────────────────────────────────────────

function DailyProgressCard({
  done,
  total,
  percent,
  allDone,
}: {
  done: number;
  total: number;
  percent: number;
  allDone: boolean;
}) {
  return (
    <Panel
      className={cn(
        'dashboard-hero-panel relative overflow-hidden p-5 transition-colors duration-500',
        allDone && 'border-violet-500/35 animate-celebrate',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="label">Daily progress</span>
          <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-foreground">
            {total > 0 ? (
              <>
                {done}
                <span className="text-[18px] text-subtle">/{total}</span>
              </>
            ) : (
              '—'
            )}
          </p>
          <p className="mt-1.5 text-[12px] text-muted-foreground">
            {total > 0
              ? `${percent}% of today's habits complete`
              : 'Add habits to track daily progress'}
          </p>
        </div>

        <div className="flex size-[88px] shrink-0 items-center justify-center rounded-full border-[3px] border-edge sm:mr-2">
          <div
            className="flex size-[76px] items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(
                oklch(0.60 0.20 293) ${percent * 3.6}deg,
                var(--edge) 0deg
              )`,
            }}
          >
            <div className="flex size-[62px] flex-col items-center justify-center rounded-full bg-surface">
              <span className="text-[18px] font-semibold tabular-nums text-foreground">
                {percent}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProgressBar value={percent} className="mt-4" size="md" />
    </Panel>
  );
}

// ── Weekly completion chart ───────────────────────────────────────────────────

function WeeklyChart({
  data,
  average,
}: {
  data: { day: Date; percent: number }[];
  average: number;
}) {
  return (
    <Panel>
      <div className="mb-4 flex items-baseline justify-between">
        <span className="label">Weekly completion</span>
        <span className="text-[12px] font-medium tabular-nums text-muted-foreground">
          {average}% avg
        </span>
      </div>
      <div className="flex h-[100px] items-end gap-1.5">
        {data.map(({ day, percent: p }) => (
          <div
            key={day.toISOString()}
            className="group flex flex-1 flex-col items-center gap-1.5"
          >
            <span className="text-[9px] font-medium tabular-nums text-subtle opacity-0 transition-opacity group-hover:opacity-100">
              {p}%
            </span>
            <div
              className={cn(
                'w-full rounded-t-[3px] transition-all duration-500 ease-out',
                isToday(day)
                  ? 'bg-violet-500'
                  : 'bg-edge-strong group-hover:bg-muted-foreground/50',
              )}
              style={{ height: `${Math.max(6, p)}%`, minHeight: '6px' }}
            />
            <span className="text-[9px] leading-none text-subtle">
              {format(day, 'EEEEE')}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ── Goal completion stats ───────────────────────────────────────────────────────

function GoalStatsPanel({
  goals,
}: {
  goals: ReturnType<typeof useDashboardMetrics>['goals'];
}) {
  const rows = [
    { label: 'Daily goal', ...goals.daily, sub: `${goals.daily.current}/${goals.daily.target} habits` },
    { label: 'Weekly target', ...goals.weekly, sub: `${goals.weekly.percent}% completion rate` },
    { label: 'Monthly target', ...goals.monthly, sub: `${goals.monthly.percent}% over 30 days` },
  ] as const;

  return (
    <Panel className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="label">Goal completion</span>
        <Target size={13} strokeWidth={1.8} className="text-subtle" />
      </div>

      <div className="flex flex-col gap-3.5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[12px] font-medium text-foreground">{row.label}</span>
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {row.percent}%
              </span>
            </div>
            <ProgressBar value={row.percent} />
            <p className="mt-1 text-[10px] text-subtle">{row.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-edge pt-3">
        <p className="text-[11px] text-subtle">
          <span className="font-medium text-foreground">{goals.habitsOnTrack}</span>
          {' '}of {goals.habitsTotal} habits on track (≥70% monthly)
        </p>
      </div>
    </Panel>
  );
}

// ── Upcoming reminders ──────────────────────────────────────────────────────────

function RemindersPanel({
  reminders,
  onComplete,
}: {
  reminders: ReturnType<typeof useDashboardMetrics>['reminders'];
  onComplete: (id: string) => void;
}) {
  return (
    <Panel className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="label">Upcoming reminders</span>
        <Bell size={13} strokeWidth={1.8} className="text-subtle" />
      </div>

      {reminders.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
          <Check size={20} strokeWidth={1.8} className="text-emerald-400" />
          <p className="text-[12px] font-medium text-foreground">All caught up</p>
          <p className="text-[11px] text-subtle">No pending habits for today.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1">
          {reminders.map(({ habit, streak, dueLabel }) => {
            const colors = COLOR_MAP[habit.color];
            return (
              <li key={habit.id}>
                <button
                  type="button"
                  onClick={() => onComplete(habit.id)}
                  className="interactive-row flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left"
                >
                  <span className={cn('size-[6px] shrink-0 rounded-full', colors.dot)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-foreground">
                      {habit.name}
                    </p>
                    <p className="text-[10px] text-subtle">{dueLabel}</p>
                  </div>
                  {streak > 0 && (
                    <span className={cn('shrink-0 text-[10px] font-medium', colors.badge, 'rounded-full px-1.5 py-0.5')}>
                      {streak}d
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

// ── Today habit row ─────────────────────────────────────────────────────────────

function HabitTodayRow({ habit }: { habit: Habit }) {
  const { toggleHabitCompletion } = useHabits();
  const colors = COLOR_MAP[habit.color];
  const completed = habit.completions.some((c) => isToday(c));
  const streak = getStreak(habit.completions);

  return (
    <button
      type="button"
      onClick={() => toggleHabitCompletion(habit.id, new Date())}
      className="interactive-row flex w-full items-center gap-3 px-4 py-[11px] text-left active:scale-[0.995]"
    >
      <CompletionCheckbox completed={completed} activeClassName={colors.dayButtonActive} />
      <span
        className={cn(
          'flex-1 text-[13px] font-medium transition-colors duration-150',
          completed ? 'text-subtle line-through decoration-subtle/50' : 'text-foreground',
        )}
      >
        {habit.name}
      </span>
      {streak > 0 && (
        <span className={cn('shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium', colors.badge)}>
          {streak}d
        </span>
      )}
    </button>
  );
}

// ── Main view ───────────────────────────────────────────────────────────────────

export function DashboardView() {
  const { habits, toggleHabitCompletion } = useHabits();
  const { doneToday, total, percent, weeklyData, weeklyAvg, topStreak, allDoneToday } =
    useHabitStats();
  const metrics = useDashboardMetrics();
  const { navigate } = useNav();

  const hour = new Date().getHours();
  const greeting =
    hour < 5 ? 'Good night'
    : hour < 12 ? 'Good morning'
    : hour < 17 ? 'Good afternoon'
    : 'Good evening';

  if (habits.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
        <div>
          <h1 className="text-[17px] font-semibold tracking-[-0.022em] text-foreground">
            {greeting}, Alex
          </h1>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <DashboardEmptyState
          onAddHabit={() => navigate('habits')}
          onShowTips={() => navigate('insights')}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label mb-1">Overview</p>
          <h1 className="text-[22px] font-semibold tracking-[-0.03em] text-foreground sm:text-[24px]">
            {greeting}, Alex
          </h1>
          <p className="mt-1 text-[13px] text-subtle">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        {allDoneToday && (
          <span className="shrink-0 animate-scale-in rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
            All done today ✓
          </span>
        )}
      </div>

      {/* Daily progress */}
      <DailyProgressCard
        done={doneToday}
        total={total}
        percent={percent}
        allDone={allDoneToday}
      />

      {/* Focus + Consistency scores */}
      <div className="grid gap-3 sm:grid-cols-2">
        <ScoreGauge
          label="Focus score"
          value={metrics.focusScore}
          icon={Brain}
          description="Blend of today's completion and your 7-day rhythm."
        />
        <ScoreGauge
          label="Consistency score"
          value={metrics.consistencyScore}
          icon={TrendingUp}
          description="30-day completion rate plus streak stability."
        />
      </div>

      {/* Weekly chart + Goals */}
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <WeeklyChart data={weeklyData} average={weeklyAvg} />
        </div>
        <div className="lg:col-span-2">
          <GoalStatsPanel goals={metrics.goals} />
        </div>
      </div>

      {/* Streak heatmap */}
      <section>
        <SectionHeader
          title="Habit streak heatmap"
          action={{ label: 'Full analytics →', onClick: () => navigate('analytics') }}
        />
        <Panel>
          <MiniHeatMap days={metrics.heatmapWeeks} weeks={12} />
        </Panel>
      </section>

      {/* AI insight + Reminders */}
      <div className="grid gap-3 lg:grid-cols-2">
        <section>
          <SectionHeader
            title="Productivity insights"
            action={{ label: 'All insights →', onClick: () => navigate('insights') }}
          />
          {metrics.primaryInsight ? (
            <div className="flex flex-col gap-2">
              <AiInsightCard insight={metrics.primaryInsight} compact />
              {metrics.allInsights
                .filter((i) => i.id !== metrics.primaryInsight?.id)
                .slice(0, 2)
                .map((insight, i) => (
                  <AiInsightCard key={insight.id} insight={insight} index={i + 1} compact />
                ))}
            </div>
          ) : (
            <Panel className="text-[12px] text-subtle">
              Keep tracking — insights appear as patterns emerge.
            </Panel>
          )}
        </section>

        <section>
          <RemindersPanel
            reminders={metrics.reminders}
            onComplete={(id) => toggleHabitCompletion(id, new Date())}
          />
        </section>
      </div>

      {/* Quick stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Best streak', value: topStreak.streak > 0 ? `${topStreak.streak}d` : '—', sub: topStreak.name || '—', icon: Flame },
          { label: 'Weekly avg', value: `${weeklyAvg}%`, sub: 'last 7 days', icon: BarChart2 },
          { label: 'On track', value: `${metrics.goals.habitsOnTrack}/${total}`, sub: '≥70% monthly', icon: Target },
          { label: 'Pending', value: metrics.reminders.length, sub: 'due today', icon: Bell },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Panel key={label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="label">{label}</span>
              <Icon size={12} strokeWidth={1.8} className="text-subtle" />
            </div>
            <p className="text-[20px] font-semibold tabular-nums tracking-[-0.04em] text-foreground">
              {value}
            </p>
            <p className="truncate text-[10px] text-subtle">{sub}</p>
          </Panel>
        ))}
      </div>

      {/* Today's habits */}
      <section>
        <SectionHeader
          title="Today's habits"
          action={{ label: 'Manage →', onClick: () => navigate('habits') }}
        />
        <div className="overflow-hidden rounded-lg border border-edge shadow-card divide-y divide-edge">
          {habits.map((habit) => (
            <HabitTodayRow key={habit.id} habit={habit} />
          ))}
        </div>
      </section>

      {/* Explore */}
      <section>
        <SectionHeader title="Explore" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: BarChart2, label: 'Analytics', desc: '90-day heatmap & breakdowns', view: 'analytics' as const },
            { icon: Lightbulb, label: 'Insights', desc: 'Full pattern library', view: 'insights' as const },
            { icon: CalendarDays, label: 'Calendar', desc: 'Monthly completion view', view: 'calendar' as const },
          ].map(({ icon: Icon, label, desc, view }) => (
            <button
              key={view}
              type="button"
              onClick={() => navigate(view)}
              className="interactive-card flex flex-col items-start gap-2 rounded-lg border border-edge bg-surface p-4 text-left shadow-card active:scale-[0.98]"
            >
              <Icon size={15} strokeWidth={1.75} className="text-muted-foreground" />
              <p className="text-[13px] font-medium text-foreground">{label}</p>
              <p className="text-[11px] text-subtle">{desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
