import { memo } from 'react';
import { format, isFuture, isSameDay, isToday } from 'date-fns';
import { Trash2, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useHabits } from '@/context/useHabits';
import { COLOR_MAP } from '@/types/habit';
import type { Habit } from '@/types/habit';
import { getStreak } from '@/lib/habits';
import { cn } from '@/lib/utils';

export interface HabitItemProps {
  habit: Habit;
  visibleDates: Date[];
  index?: number;
}

function HabitItemComponent({ habit, visibleDates, index = 0 }: HabitItemProps) {
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

  const weekDone = visibleDates.filter((d) =>
    habit.completions.some((c) => isSameDay(c, d)),
  ).length;
  const weekTotal = visibleDates.filter((d) => !isFuture(d)).length;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        animationDelay: `${index * 40}ms`,
      }}
      className={cn(
        'group animate-fade-up interactive-card rounded-xl border',
        'border-edge bg-surface shadow-card',
        isDragging && 'z-10 opacity-95 shadow-lg shadow-black/15 border-edge-strong',
      )}
      {...attributes}
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              {...listeners}
              aria-label="Drag to reorder"
              className={cn(
                'shrink-0 cursor-grab text-subtle active:cursor-grabbing',
                'opacity-0 transition-opacity group-hover:opacity-100 hover:text-muted-foreground',
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
              type="button"
              onClick={() => deleteHabit(habit.id)}
              aria-label={`Delete ${habit.name}`}
              className={cn(
                'rounded-md p-1 text-subtle',
                'opacity-0 transition-all duration-150 group-hover:opacity-100',
                'hover:bg-rose-500/10 hover:text-rose-500',
              )}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        <div className="flex gap-1">
          {visibleDates.map((date) => {
            const completed = habit.completions.some((d) => isSameDay(date, d));
            const future = isFuture(date) && !isToday(date);
            const today = isToday(date);

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={future}
                onClick={() => toggleHabitCompletion(habit.id, date)}
                aria-label={`${format(date, 'EEEE, MMM d')} — ${completed ? 'completed' : 'incomplete'}`}
                aria-pressed={completed}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-[5px]',
                  'rounded-xl border px-1 py-[9px] select-none',
                  'transition-all duration-150 active:scale-[0.94]',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-violet-500/60 focus-visible:ring-offset-1',
                  'focus-visible:ring-offset-transparent',
                  completed
                    ? [colors.dayButtonActive, 'border-transparent', 'animate-day-complete']
                    : today
                      ? 'border-edge-strong bg-surface-raised text-foreground hover:bg-surface-hover'
                      : 'border-transparent bg-transparent text-subtle hover:bg-surface hover:text-muted-foreground',
                  !completed && colors.dayButton,
                  future && 'pointer-events-none cursor-not-allowed opacity-[0.18]',
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

export const HabitItem = memo(HabitItemComponent);
