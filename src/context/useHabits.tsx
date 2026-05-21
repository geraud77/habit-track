import { useContext, createContext } from 'react';
import type { Habit, HabitColor } from '@/types/habit';

export interface HabitContextValue {
  /** False briefly on mount while skeletons display */
  isReady: boolean;
  habits: Habit[];
  addHabit: (name: string, color: HabitColor) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
  reorderHabits: (fromIndex: number, toIndex: number) => void;
  clearAllHabits: () => void;
  /** Load sample habits for demo / portfolio preview */
  loadDemoHabits: () => void;
}

export const HabitContext = createContext<HabitContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useHabits() {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabits must be used within a HabitProvider');
  return ctx;
}
