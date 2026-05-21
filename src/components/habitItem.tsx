import { format, isFuture, isSameDay, isToday } from 'date-fns';
import { Trash2, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useHabits } from '@/context/useHabits';
import { COLOR_MAP } from '@/types/habit';
import type { Habit } from '@/types/habit';
import { getStreak } from '@/lib/habits';
import { cn } from '@/lib/utils';

interface HabitItemProps {
  habit: Habit;
  visibleDates: Date[];
}

export default function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const { deleteHabit, toggleHabitCompletion } = useHabits();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: habit.id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const colors = COLOR_MAP[habit.color];
  const streak = getStreak(habit.completions);

  // Count applicable days (today or earlier) for the week fraction display.
  const weekDone = visibleDates.filter((d) =>
    habit.completions.some((c) => isSameDay(c, d)),
  ).length;
  const weekTotal = visibleDates.filter((d) => !isFuture(d)).length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group rounded-2xl border transition-all duration-150',
        'border-edge bg-surface',
        'hover:border-edge-strong hover:bg-surface-raised',
        isDragging && 'z-10 shadow-2xl shadow-black/20 opacity-95 border-edge-strong',
      )}
      {...attributes}
    >
      <div className="flex flex-col gap-3 p-4">

        {/* ── Title row ── */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">

            <button
              {...listeners}
              aria-label="Drag to reorder"
              className={cn(
                'shrink-0 cursor-grab text-subtle active:cursor-grabbing',
                'opacity-0 group-hover:opacity-100 transition-opacity hover:text-muted-foreground',
              )}
            >
              <GripVertical size={14} />
            </button>

            <span className={cn('size-[7px] shrink-0 rounded-full', colors.dot)} />

            <span className="truncate text-[14px] font-medium tracking-[-0.01em] text-foreground">
              {habit.name}
            </span>

            {streak > 0 && (
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5',
                  'text-[11px] font-medium tracking-[-0.005em]',
                  colors.badge,
                )}
              >
                🔥 {streak}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {weekTotal > 0 && (
              <span className="text-[12px] tabular-nums text-subtle">
                {weekDone}/{weekTotal}
              </span>
            )}
            <button
              onClick={() => deleteHabit(habit.id)}
              aria-label={`Delete ${habit.name}`}
              className={cn(
                'rounded-md p-1 text-subtle',
                'opacity-0 group-hover:opacity-100 transition-all duration-150',
                'hover:bg-rose-500/10 hover:text-rose-500',
              )}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* ── Day buttons row ── */}
        <div className="flex gap-1">
          {visibleDates.map((date) => {
            const completed = habit.completions.some((d) => isSameDay(date, d));
            const future = isFuture(date) && !isToday(date);
            const today = isToday(date);

            return (
              <button
                key={date.toISOString()}
                disabled={future}
                onClick={() => toggleHabitCompletion(habit.id, date)}
                aria-label={`${format(date, 'EEEE, MMM d')} — ${completed ? 'completed' : 'incomplete'}`}
                aria-pressed={completed}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-[5px]',
                  'rounded-xl py-[9px] px-1 select-none',
                  'border transition-all duration-150',
                  // Focus ring for keyboard navigation
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-violet-500/60 focus-visible:ring-offset-1',
                  'focus-visible:ring-offset-transparent',
                  completed
                    ? [colors.dayButtonActive, 'border-transparent']
                    : today
                      ? 'border-edge-strong bg-surface-raised text-foreground hover:bg-surface-hover'
                      : 'border-transparent bg-transparent text-subtle hover:bg-surface hover:text-muted-foreground',
                  colors.dayButton,
                  future && 'cursor-not-allowed opacity-[0.18] pointer-events-none',
                )}
              >
                <span
                  style={{ fontSize: '9px', letterSpacing: '0.07em' }}
                  className={cn(
                    'font-medium uppercase leading-none',
                    completed ? 'opacity-80' : 'opacity-50',
                  )}
                >
                  {format(date, 'EEE')}
                </span>

                <span
                  className={cn(
                    'text-[15px] font-semibold leading-none tracking-[-0.02em]',
                    !completed && today && 'text-foreground',
                  )}
                >
                  {format(date, 'd')}
                </span>

                {/* Dot marks today when not yet completed */}
                {today && !completed && (
                  <span className="absolute bottom-[5px] size-[3px] rounded-full bg-violet-500" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
