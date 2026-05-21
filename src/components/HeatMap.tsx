import { addDays, addWeeks, format, isSameDay, startOfWeek, subDays } from 'date-fns';
import { cn } from '@/lib/utils';
import type { HeatMapDay } from '@/hooks/useAnalytics';

/**
 * GitHub-style 90-day completion heatmap.
 * Each column = one week (Mon–Sun). Oldest on the left, today on the right.
 */

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-edge',
  1: 'bg-violet-500/20',
  2: 'bg-violet-500/45',
  3: 'bg-violet-500/70',
  4: 'bg-violet-500',
};

const ROW_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

interface HeatMapProps {
  days: HeatMapDay[];
}

export function HeatMap({ days }: HeatMapProps) {
  const today = new Date();
  const earliest = subDays(today, 89);

  // Start from the Monday on or before the earliest day
  const gridStart = startOfWeek(earliest, { weekStartsOn: 1 });

  // Build weeks (columns), each week is an array of 7 days (null = outside our range)
  const weeks: (Date | null)[][] = [];
  let cursor = gridStart;
  while (cursor <= today) {
    const week: (Date | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(cursor, i);
      week.push(d >= earliest && d <= today ? d : null);
    }
    weeks.push(week);
    cursor = addWeeks(cursor, 1);
  }

  function getDayData(date: Date): HeatMapDay | undefined {
    return days.find((d) => isSameDay(d.date, date));
  }

  // Derive month labels: show a label above the first column of each new month
  const monthLabels: (string | null)[] = weeks.map((week, wi) => {
    const firstReal = week.find((d) => d !== null);
    if (!firstReal) return null;
    const isFirstWeek = wi === 0;
    const prevWeekFirst = wi > 0 ? weeks[wi - 1].find((d) => d !== null) : null;
    if (isFirstWeek || (prevWeekFirst && prevWeekFirst.getMonth() !== firstReal.getMonth())) {
      return format(firstReal, 'MMM');
    }
    return null;
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 min-w-max">
        {/* Day-of-week labels */}
        <div className="flex flex-col gap-[3px] mt-[18px]">
          {ROW_LABELS.map((label, i) => (
            <div key={i} className="h-[13px] flex items-center justify-end w-6">
              <span className="text-[9px] text-subtle leading-none">{label}</span>
            </div>
          ))}
        </div>

        {/* Grid columns */}
        <div className="flex flex-col gap-1">
          {/* Month labels */}
          <div className="flex gap-[3px] h-[14px]">
            {weeks.map((_, wi) => (
              <div key={wi} className="w-[13px] flex items-end">
                {monthLabels[wi] && (
                  <span className="text-[9px] text-subtle leading-none whitespace-nowrap">
                    {monthLabels[wi]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Heatmap cells */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => {
                  const data = day ? getDayData(day) : undefined;
                  return (
                    <div
                      key={di}
                      className={cn(
                        'size-[13px] rounded-[2px] transition-colors duration-200',
                        day
                          ? LEVEL_CLASSES[data?.level ?? 0]
                          : 'invisible',
                      )}
                      title={
                        day && data
                          ? `${format(day, 'MMM d')}: ${data.count}/${data.total} habits`
                          : day
                          ? format(day, 'MMM d')
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] text-subtle">Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div key={level} className={cn('size-[11px] rounded-[2px]', LEVEL_CLASSES[level])} />
        ))}
        <span className="text-[10px] text-subtle">More</span>
      </div>
    </div>
  );
}
