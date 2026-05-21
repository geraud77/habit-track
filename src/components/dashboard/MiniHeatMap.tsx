import { addDays, addWeeks, format, isSameDay, startOfWeek, subDays } from 'date-fns';
import { cn } from '@/lib/utils';
import type { HeatMapDay } from '@/hooks/useAnalytics';

const LEVEL: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-edge',
  1: 'bg-violet-500/25',
  2: 'bg-violet-500/50',
  3: 'bg-violet-500/75',
  4: 'bg-violet-500',
};

interface MiniHeatMapProps {
  days: HeatMapDay[];
  weeks?: number;
}

/** Compact streak heatmap for the dashboard (default: 12 weeks). */
export function MiniHeatMap({ days, weeks = 12 }: MiniHeatMapProps) {
  const today = new Date();
  const earliest = subDays(today, weeks * 7 - 1);
  const gridStart = startOfWeek(earliest, { weekStartsOn: 1 });

  const columns: (Date | null)[][] = [];
  let cursor = gridStart;
  while (cursor <= today) {
    const col: (Date | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(cursor, i);
      col.push(d >= earliest && d <= today ? d : null);
    }
    columns.push(col);
    cursor = addWeeks(cursor, 1);
  }

  function levelFor(date: Date): 0 | 1 | 2 | 3 | 4 {
    return days.find((d) => isSameDay(d.date, date))?.level ?? 0;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[2px] min-w-max">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[2px]">
            {col.map((day, di) => (
              <div
                key={di}
                className={cn(
                  'size-[9px] rounded-[1px] transition-colors duration-200',
                  day ? LEVEL[levelFor(day)] : 'invisible',
                )}
                title={day ? format(day, 'MMM d') : undefined}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-[9px] text-subtle">Less</span>
        {([0, 1, 2, 3, 4] as const).map((l) => (
          <div key={l} className={cn('size-[8px] rounded-[1px]', LEVEL[l])} />
        ))}
        <span className="text-[9px] text-subtle">More</span>
        <span className="ml-auto text-[9px] text-subtle">Last {weeks} weeks</span>
      </div>
    </div>
  );
}
