import { type ReactNode, useCallback, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { arrayMove } from '@dnd-kit/sortable';
import { HabitContext } from './useHabits';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAppReady } from '@/hooks/useAppReady';
import { useToast } from '@/context/toastContext';
import type { Habit, HabitColor } from '@/types/habit';
import { sampleHabits } from '@/lib/sampleData';

export type { Habit };

function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits-v2', []);
  const isReady = useAppReady();
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
      setHabits((current) => {
        const target = current.find((h) => h.id === id);
        if (target) toast(`"${target.name}" removed`, 'info');
        return current.filter((h) => h.id !== id);
      });
    },
    [setHabits, toast],
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

  const clearAllHabits = useCallback(() => {
    setHabits([]);
    toast('All habits cleared', 'info');
  }, [setHabits, toast]);

  const loadDemoHabits = useCallback(() => {
    setHabits(sampleHabits);
    toast('Demo habits loaded', 'info');
  }, [setHabits, toast]);

  const value = useMemo(
    () => ({
      isReady,
      habits,
      addHabit,
      deleteHabit,
      toggleHabitCompletion,
      reorderHabits,
      clearAllHabits,
      loadDemoHabits,
    }),
    [
      isReady,
      habits,
      addHabit,
      deleteHabit,
      toggleHabitCompletion,
      reorderHabits,
      clearAllHabits,
      loadDemoHabits,
    ],
  );

  return <HabitContext value={value}>{children}</HabitContext>;
}

export default HabitProvider;
