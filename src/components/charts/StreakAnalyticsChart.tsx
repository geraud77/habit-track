import type { StreakStat } from '@/hooks/useAnalytics';
import { COLOR_MAP } from '@/types/habit';
import { cn } from '@/lib/utils';

interface StreakAnalyticsChartProps {
  data: StreakStat[];
}

export function StreakAnalyticsChart({ data }: StreakAnalyticsChartProps) {
  if (data.length === 0) return null;

  const maxStreak = Math.max(...data.map((d) => d.currentStreak), 1);

  return (
    <div className="flex flex-col gap-3">
      {data.map((stat, i) => {
        const colors = COLOR_MAP[stat.color];
        const widthPct = stat.currentStreak > 0
          ? Math.max(8, (stat.currentStreak / maxStreak) * 100)
          : 4;

        return (
          <div
            key={stat.id}
            className="animate-fade-up grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-2">
                <span className={cn('size-[6px] shrink-0 rounded-full', colors.dot)} />
                <span className="truncate text-[12px] font-medium text-foreground">
                  {stat.name}
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-edge">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full progress-fill',
                    colors.bar,
                  )}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[15px] font-semibold tabular-nums leading-none text-foreground">
                {stat.currentStreak > 0 ? stat.currentStreak : '—'}
                {stat.currentStreak > 0 && (
                  <span className="text-[10px] font-medium text-subtle">d</span>
                )}
              </p>
              <p className="mt-0.5 text-[10px] tabular-nums text-subtle">
                {stat.completionRate30}% / 30d
              </p>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between border-t border-edge pt-3 text-[10px] text-subtle">
        <span>Bar length = relative streak length</span>
        <span>Longest: {maxStreak} days</span>
      </div>
    </div>
  );
}
