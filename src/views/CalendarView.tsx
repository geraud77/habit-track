import { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { COLOR_MAP } from '@/types/habit';
import { cn } from '@/lib/utils';

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CalendarView() {
  const { habits } = useHabits();
  const [month, setMonth] = useState(new Date());

  const today = new Date();
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  // Pad to full weeks (Mon–Sun)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  // Compute per-day stats once
  const dayStats = new Map(
    days.map((day) => {
      const completed = habits.filter((h) =>
        h.completions.some((c) => isSameDay(c, day)),
      );
      return [
        day.toDateString(),
        {
          completed,
          rate: habits.length > 0 ? completed.length / habits.length : 0,
        },
      ];
    }),
  );

  const isCurrentMonth = isSameMonth(month, today);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
      <PageHeader title="Calendar" subtitle="Monthly habit completion view" />

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
          {format(month, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-1">
          {!isCurrentMonth && (
            <button
              onClick={() => setMonth(today)}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-violet-400 transition-colors hover:bg-violet-500/10"
            >
              Today
            </button>
          )}
          <button
            onClick={() => setMonth((m) => subMonths(m, 1))}
            aria-label="Previous month"
            className="rounded-md p-1 text-subtle transition-colors hover:bg-surface hover:text-foreground"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => setMonth((m) => addMonths(m, 1))}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className="rounded-md p-1 text-subtle transition-colors hover:bg-surface hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="overflow-hidden rounded-lg border border-edge shadow-card">
        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 border-b border-edge">
          {DAY_HEADERS.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[11px] font-medium text-subtle"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const inMonth = isSameMonth(day, month);
            const stats = dayStats.get(day.toDateString());
            const today_ = isToday(day);
            const future = isFuture(day) && !today_;
            const completedHabits = stats?.completed ?? [];
            const completionRate = stats?.rate ?? 0;

            // Show at most 4 dots + overflow indicator
            const shownHabits = completedHabits.slice(0, 4);
            const overflow = completedHabits.length - shownHabits.length;

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'relative flex min-h-[64px] flex-col gap-1 border-b border-r border-edge p-2',
                  // Remove right border on last column, bottom border on last row
                  (i + 1) % 7 === 0 && 'border-r-0',
                  i >= days.length - 7 && 'border-b-0',
                  !inMonth && 'opacity-30',
                  today_ && 'bg-violet-500/[0.05]',
                )}
              >
                {/* Date number */}
                <span
                  className={cn(
                    'inline-flex size-[20px] items-center justify-center rounded-full',
                    'text-[12px] font-medium leading-none tabular-nums',
                    today_
                      ? 'bg-violet-500 text-white'
                      : inMonth
                      ? 'text-foreground'
                      : 'text-subtle',
                  )}
                >
                  {format(day, 'd')}
                </span>

                {/* Completion dots */}
                {inMonth && !future && completedHabits.length > 0 && (
                  <div className="flex flex-wrap gap-[3px]">
                    {shownHabits.map((habit) => (
                      <div
                        key={habit.id}
                        className={cn('size-[5px] rounded-full', COLOR_MAP[habit.color].dot)}
                        title={habit.name}
                      />
                    ))}
                    {overflow > 0 && (
                      <div
                        className="size-[5px] rounded-full bg-subtle"
                        title={`+${overflow} more`}
                      />
                    )}
                  </div>
                )}

                {/* Completion rate bar at cell bottom */}
                {inMonth && !future && completionRate > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-edge">
                    <div
                      className="h-full bg-violet-500/60 transition-all duration-500"
                      style={{ width: `${completionRate * 100}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      {habits.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center gap-1.5">
              <div className={cn('size-[6px] rounded-full', COLOR_MAP[habit.color].dot)} />
              <span className="text-[11px] text-subtle">{habit.name}</span>
            </div>
          ))}
        </div>
      )}

      {habits.length === 0 && (
        <EmptyState
          icon={CalendarDays}
          title="No habits yet"
          description="Add habits to start seeing your calendar fill up."
        />
      )}
    </div>
  );
}
