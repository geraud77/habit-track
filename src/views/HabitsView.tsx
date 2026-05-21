import { useEffect, useRef, useState } from 'react';
import { FOCUS_HABIT_FORM } from '@/hooks/useGlobalKeyboard';
import { addWeeks, eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HabitForm, HabitList } from '@/components/habits';
import { StatsPanel } from '@/components/StatsPanel';
import { PageHeader } from '@/components/PageHeader';
import { cn } from '@/lib/utils';

export function HabitsView() {
  const [weekOffset, setWeekOffset] = useState(0);
  const formInputRef = useRef<HTMLInputElement | null>(null);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  const isCurrentWeek = weekOffset === 0;
  const dateRange = `${format(visibleDates[0], 'MMM d')} – ${format(visibleDates[6], 'MMM d')}`;

  useEffect(() => {
    function onFocusForm() {
      formInputRef.current?.focus();
    }
    window.addEventListener(FOCUS_HABIT_FORM, onFocusForm);
    return () => window.removeEventListener(FOCUS_HABIT_FORM, onFocusForm);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-7 pb-24 md:pb-10">
      <PageHeader
        title="Habits"
        subtitle={format(new Date(), 'EEEE, MMMM d')}
      />

      <StatsPanel />

      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-subtle">{dateRange}</span>
        <div className="flex items-center gap-1">
          {!isCurrentWeek && (
            <button
              onClick={() => setWeekOffset(0)}
              className={cn(
                'rounded-md px-2 py-1 text-[11px] font-medium',
                'text-violet-400 transition-colors hover:bg-violet-500/10',
              )}
            >
              Today
            </button>
          )}
          <button
            onClick={() => setWeekOffset((o) => o - 1)}
            aria-label="Previous week"
            className="rounded-md p-1 text-subtle transition-colors hover:bg-surface hover:text-foreground"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            disabled={isCurrentWeek}
            aria-label="Next week"
            className="rounded-md p-1 text-subtle transition-colors hover:bg-surface hover:text-foreground disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <HabitForm inputRef={formInputRef} />
      <HabitList visibleDates={visibleDates} />
    </div>
  );
}
