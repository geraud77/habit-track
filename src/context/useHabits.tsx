import { useContext, createContext } from 'react';
import type { Habit, HabitColor } from '@/types/habit';

interface HabitContextValue {
  habits: Habit[];
  addHabit: (name: string, color: HabitColor) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
  reorderHabits: (fromIndex: number, toIndex: number) => void;
}

export const HabitContext = createContext<HabitContextValue | null>(null);

export function useHabits() {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabits must be used within a HabitProvider');
  return ctx;
}
