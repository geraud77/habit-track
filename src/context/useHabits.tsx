import { useContext } from "react";
import { type Habit } from "./habitProvider";
import { createContext } from "react";

interface Context {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
}

export const HabitContext = createContext<null | Context>(null);

export function useHabits() {
  const habitsContext = useContext(HabitContext);
  if (habitsContext === null) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return habitsContext;
}
