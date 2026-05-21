import { type ReactNode } from "react";
import { isSameDay } from "date-fns";
import { HabitContext } from "./useHabits";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface Habit {
  id: string;
  name: string;
  completions: Date[];
}

interface HabitProviderProps {
  children: ReactNode;
}

function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

  // this function will add a new habit
  function addHabit(name: string) {
    setHabits((current) => [
      ...current,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }
  // this function will delete a habit

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }
  // this function will toggle the completion of a habit for a given date
  function toggleHabitCompletion(id: string, date: Date) {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== id) return habit;
        const alreadyCompleted = habit.completions.some((d) =>
          isSameDay(d, date),
        );
        const completions = alreadyCompleted
          ? habit.completions.filter((d) => !isSameDay(d, date))
          : [...habit.completions, date];
        return { ...habit, completions };
      }),
    );
  }

  return (
    <div>
      <HabitContext
        value={{ habits, addHabit, deleteHabit, toggleHabitCompletion }}
      >
        {children}
      </HabitContext>
    </div>
  );
}

export default HabitProvider;
