import { useMemo } from 'react';
import { format, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { cn } from '@/lib/utils';
import type { Theme } from '@/hooks/useTheme';

interface HeaderProps {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
  onGoToToday: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

export default function Header({
  visibleDates,
  onPrev,
  onNext,
  onGoToToday,
  theme,
  toggleTheme,
}: HeaderProps) {
  const { habits } = useHabits();

  const doneToday = habits.filter((h) => h.completions.some((c) => isToday(c))).length;
  const total = habits.length;
  const percent = total > 0 ? Math.round((doneToday / total) * 100) : 0;
  const isCurrentWeek = visibleDates.some((d) => isToday(d));

  // Formatted strings only change when the day rolls over.
  const todayStr = useMemo(() => format(new Date(), 'EEEE, MMMM d'), []);
  const dateRange = useMemo(
    () =>
      `${format(visibleDates[0], 'MMM d')} – ${format(visibleDates[visibleDates.length - 1], 'MMM d')}`,
    [visibleDates],
  );

  return (
    <header className="flex flex-col gap-5">

      {/* ── Brand row ── */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-violet-500 leading-none select-none">✦</span>
            <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
              Habit Tracker
            </h1>
          </div>
          <p className="text-[13px] text-muted-foreground tracking-[-0.005em]">{todayStr}</p>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className={cn(
            'flex size-8 items-center justify-center rounded-lg',
            'text-subtle transition-colors hover:text-foreground',
            'border border-edge bg-surface hover:bg-surface-hover',
          )}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      {/* ── Today's progress (bare strip — no wrapping card) ── */}
      {total > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-muted-foreground">
              {doneToday} of {total} done today
            </span>
            <span className="text-[12px] tabular-nums text-muted-foreground">{percent}%</span>
          </div>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-edge">
            <div
              className="h-full rounded-full bg-violet-500 transition-[width] duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Divider ── */}
      <div className="h-px bg-edge" />

      {/* ── Week navigation ── */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-foreground/60 tracking-[-0.005em]">
          {dateRange}
        </span>

        <div className="flex items-center gap-1">
          <NavButton onClick={onPrev} aria-label="Previous week">
            <ChevronLeft size={13} />
          </NavButton>
          <NavButton onClick={onNext} disabled={isCurrentWeek} aria-label="Next week">
            <ChevronRight size={13} />
          </NavButton>
          {!isCurrentWeek && (
            <button
              onClick={onGoToToday}
              className={cn(
                'ml-0.5 rounded-md px-2.5 py-1 text-[12px] font-medium',
                'border border-edge bg-surface text-muted-foreground',
                'transition-colors hover:bg-surface-hover hover:text-foreground',
              )}
            >
              Today
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function NavButton({
  onClick,
  disabled,
  children,
  ...props
}: React.ComponentProps<'button'> & { disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex size-7 items-center justify-center rounded-md',
        'border border-edge bg-surface text-subtle',
        'transition-colors hover:bg-surface-hover hover:text-foreground',
        'disabled:cursor-not-allowed disabled:opacity-25',
      )}
      {...props}
    >
      {children}
    </button>
  );
}
