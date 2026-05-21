import { type ReactNode, useCallback, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { arrayMove } from '@dnd-kit/sortable';
import { HabitContext } from './useHabits';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/context/toastContext';
import type { Habit, HabitColor } from '@/types/habit';
import { sampleHabits } from '@/lib/sampleData';

export type { Habit };

function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits-v2', sampleHabits);
  const { toast } = useToast();

  const addHabit = useCallback(
    (name: string, color: HabitColor) => {
      setHabits((current) => [
        ...current,
        { id: crypto.randomUUID(), name, color, createdAt: new Date(), completions: [] },
      ]);
      toast(`"${name}" added`, 'success');
    },
    [setHabits, toast],
  );

  const deleteHabit = useCallback(
    (id: string) => {
      // Read name from the current closure — safe here because this function
      // is only called from synchronous user events (button clicks), never
      // from async paths where the closure could be stale.
      const target = habits.find((h) => h.id === id);
      setHabits((current) => current.filter((h) => h.id !== id));
      if (target) toast(`"${target.name}" removed`, 'info');
    },
    // habits is intentionally in deps: we need the latest value for the name lookup.
    [habits, setHabits, toast],
  );

  const toggleHabitCompletion = useCallback(
    (id: string, date: Date) => {
      setHabits((current) =>
        current.map((habit) => {
          if (habit.id !== id) return habit;
          const alreadyCompleted = habit.completions.some((d) => isSameDay(d, date));
          const completions = alreadyCompleted
            ? habit.completions.filter((d) => !isSameDay(d, date))
            : [...habit.completions, date];
          return { ...habit, completions };
        }),
      );
    },
    [setHabits],
  );

  const reorderHabits = useCallback(
    (fromIndex: number, toIndex: number) => {
      setHabits((current) => arrayMove(current, fromIndex, toIndex));
    },
    [setHabits],
  );

  // Stable object reference — only changes when habits identity or a mutation
  // function reference changes.
  const value = useMemo(
    () => ({ habits, addHabit, deleteHabit, toggleHabitCompletion, reorderHabits }),
    [habits, addHabit, deleteHabit, toggleHabitCompletion, reorderHabits],
  );

  return <HabitContext value={value}>{children}</HabitContext>;
}

export default HabitProvider;
