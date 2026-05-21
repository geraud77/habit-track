import { useEffect, useRef } from 'react';
import { format, isToday } from 'date-fns';
import { COLOR_MAP } from '@/types/habit';
import { useHabitStats } from '@/hooks/useHabitStats';
import { useToast } from '@/context/toastContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';

const LABEL = 'text-[10px] font-medium uppercase tracking-[0.07em] text-subtle';
const VALUE = 'text-[22px] font-semibold tracking-[-0.02em] tabular-nums text-foreground leading-none';
const SUB = 'text-[12px] text-muted-foreground tracking-[-0.005em]';

/** Returns a human message based on today's progress. */
function getInsight(doneToday: number, total: number, topStreak: { name: string; streak: number }): string {
  if (total === 0) return '';
  if (doneToday === 0) return `${total} habit${total === 1 ? '' : 's'} waiting for you today.`;
  if (doneToday === total) return `Every habit done. Outstanding day! 🎉`;
  const remaining = total - doneToday;
  if (topStreak.streak >= 7) return `${topStreak.streak}-day streak on "${topStreak.name}" 🔥 Don't break it.`;
  return `${remaining} more to go — you've got this.`;
}

export function StatsPanel() {
  const stats = useHabitStats();
  const { toast } = useToast();
  const { doneToday, total, percent, allDoneToday, weeklyData, weeklyAvg, topStreak } = stats;

  // Fire a one-time celebration toast the moment all habits flip to done.
  // useRef tracks the previous value so it only fires on the transition, not on every render.
  const prevAllDone = useRef(allDoneToday);
  useEffect(() => {
    if (allDoneToday && !prevAllDone.current) {
      toast('Every habit done today. Perfect! 🎉', 'success');
    }
    prevAllDone.current = allDoneToday;
  }, [allDoneToday, toast]);

  if (total === 0) return null;

  const insight = getInsight(doneToday, total, topStreak);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'grid grid-cols-3 divide-x overflow-hidden rounded-xl border shadow-card',
          'border-edge divide-edge bg-surface transition-colors duration-500',
          allDoneToday && 'border-violet-500/25 animate-celebrate',
        )}
      >
        {/* ── Today ── */}
        <div
          className={cn(
            'flex flex-col justify-between gap-3 p-4 transition-colors duration-500',
            allDoneToday && 'bg-violet-500/[0.07]',
          )}
        >
          <span className={LABEL}>Today</span>
          <div>
            <p className={cn(VALUE, allDoneToday && 'text-violet-500')}>
              {doneToday}
              <span className={cn('text-[14px]', allDoneToday ? 'text-violet-400/60' : 'text-subtle')}>
                /{total}
              </span>
            </p>
            <p className={cn(SUB, 'mt-1')}>{percent}% complete</p>
            <ProgressBar value={percent} className="mt-2.5" />
          </div>
        </div>

        {/* ── 7-Day Chart ── */}
        <div className="flex flex-col justify-between gap-3 p-4">
          <span className={LABEL}>Last 7 Days</span>
          <div className="flex h-12 items-end gap-[3px]">
            {weeklyData.map(({ day, percent: p }) => (
              <div
                key={day.toISOString()}
                className="group relative flex flex-1 flex-col items-center"
                title={`${format(day, 'EEE d')}: ${p}%`}
              >
                <div
                  className={cn(
                    'w-full rounded-t-[2px] transition-all duration-500',
                    isToday(day)
                      ? 'bg-violet-500'
                      : 'bg-edge-strong group-hover:bg-muted-foreground/30',
                  )}
                  style={{ height: `${Math.max(3, p)}%`, minHeight: '3px' }}
                />
              </div>
            ))}
          </div>
          <p className={SUB}>{weeklyAvg}% avg</p>
        </div>

        {/* ── Best Streak ── */}
        <div className="flex flex-col justify-between gap-3 p-4">
          <span className={LABEL}>Best Streak</span>
          <div>
            <p className={VALUE}>
              {topStreak.streak > 0 ? (
                <>
                  {topStreak.streak}
                  <span className="text-[14px] text-subtle">d</span>
                </>
              ) : (
                '—'
              )}
            </p>
            <div className={cn(SUB, 'mt-1 flex items-center gap-1.5 min-w-0')}>
              {topStreak.streak > 0 && (
                <span className={cn('size-1.5 shrink-0 rounded-full', COLOR_MAP[topStreak.color].dot)} />
              )}
              <span className="truncate">
                {topStreak.streak > 0 ? topStreak.name : 'No streak yet'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Motivational insight ── */}
      {insight && (
        <p className="px-1 text-[12px] text-subtle tracking-[-0.005em]">{insight}</p>
      )}
    </div>
  );
}
